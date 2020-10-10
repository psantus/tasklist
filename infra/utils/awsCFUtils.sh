#!/usr/bin/env bash

set -o pipefail  # trace ERR through pipes
set -o errtrace  # trace ERR through 'time command' and other functions
set -o nounset   ## set -u : exit the script if you try to use an uninitialised variable
set -o errexit   ## set -e : exit the script if any statement returns a non-true return value

awsCFUtils_dir=$(cd -P -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)

#
# Settings
#

_NC='\e[0m'
_RED='\e[31m'
_CYAN='\e[36m'

# waiting parameters, 15 minutes by default
_sleepTime=5
_sleepLoops=180

# Display info message
# $1 => message
_debug () {
    echo -e "$*"
}

# Display info message
# $1 => message
_info () {
     echo -e "${_CYAN}$*${_NC}"
}

# Display error message
# $1 => message
_error () {
    >&2 echo -e "${_RED}$*${_NC}"
}

#
# $1 le message d'erreur
# $2 return code to analyse
checkForError () {
    local _ret=$?
    if [ $# -gt 1 ]; then
      _ret=$2
    fi
    if [ ! ${_ret} -eq 0 ]; then
        _error "$1"
        exit ${_ret}
    fi
}

#
# $1 le message d'erreur
# $2 return code to analyse
_fail () {
  local _msg=$1
  local _code=1
  if [ $# -gt 1 ]; then
    _code=$2
  fi
  _error ${_msg}
  exit ${_code}
}

_begin=$(date +%s)
# Display duration since passed timing
# $1 begin time in seconds (date +%s)
displayDuration() {
  local begin=
  if [ $# -gt 0 ]; then
    begin=$1
  else
    begin=_begin
  fi
  local _end=$(date +%s)
  local _diff=$(($_end - $begin))
  local _minutes=$(($_diff / 60))
  local _seconds=$(($_diff % 60))
  _info "Duration : $_minutes m $_seconds s"
}

# $1 stack name
function cloudFormationStackStatus() {
  local stackName="$1"
  shift
  local cliOptions="$1"
  shift
  aws cloudformation describe-stacks \
    --stack-name "$stackName" \
    --query 'Stacks[0].StackStatus' \
    ${cliOptions} \
    --output text | tr -d '"' \
    || echo ''  2> /dev/null
}

# $1 stack name
function doCloudFormationDelete() {
  local stackName="$1"
  shift
  local cliOptions="$1"
  shift
  _info "deleting $stackName"
  aws cloudformation delete-stack \
      ${cliOptions} \
    --stack-name "$stackName"
}

# $1 stack name
function waitCloudFormationStackStable() {
  local stackName="$1"
  shift
  local cliOptions="$1"

  _info "Waiting for $stackName stack"
  if ! isStackExisting "${stackName}" "${cliOptions}"; then
    _debug "Stack ${stackName} does not exists"
    return 0 # Ok
  fi

  local cpt=${_sleepLoops}
  while [ ${cpt} -gt 0 ]
  do
    local stackStatus=$(cloudFormationStackStatus "${stackName}" "${cliOptions}")
    _debug "\tStatus($cpt):\t${stackStatus}"

    if ! [[ "$stackStatus" =~ ^.*IN_PROGRESS$ ]]; then
      break
    fi

    ((cpt--))
    sleep ${_sleepTime}
  done

  local stackStatus=$(cloudFormationStackStatus "${stackName}" "${cliOptions}")
  _debug "\tEnd Status:\t${stackStatus}"
  if [[ "$stackStatus" =~ ^.*IN_PROGRESS$ ]]; then
    _fail "Stack ${stackName} still 'IN PROGRESS'"
  fi
}

# $1 stack name
function ensureCloudFormationStackStableOk() {
  local stackName="$1"
  local stackStatus=$(cloudFormationStackStatus "${stackName}" "${cliOptions}")
  _info "Stack ${stackName} status:\t${stackStatus}"
  [[ "$stackStatus" =~ ^CREATE_COMPLETE|UPDATE_COMPLETE$ ]] || _fail "Stack ${stackName} operation failed : ${stackStatus}"
}

# Remove a failed stack
# $1 stack name
function doRemoveCloudFormationFailedStack() {
  local stackName="$1"
  shift
  local cliOptions="$1"
  shift

  if  isStackExisting "${stackName}" "${cliOptions}"; then
    _info "Removing $stackName stack if it previously failed"

    waitCloudFormationStackStable ${stackName} "${cliOptions}"

    local stackStatus=$(cloudFormationStackStatus "$stackName" "${cliOptions}")
    echo "$stackStatus"
    if [[ "$stackStatus" =~ ^(ROLLBACK_.*|.*_FAILED)$ ]] ; then
      doCloudFormationDelete "${stackName}" "${cliOptions}"
      waitCloudFormationStackStable "${stackName}" "${cliOptions}"
    fi
  fi
}

# stack exists ? 0 yes, 1 no
# $1 stackname
function isStackExisting() {
  local stackName="$1"
  shift
  local cliOptions="$1"

  aws cloudformation describe-stacks \
    --stack-name "${stackName}" \
    ${cliOptions} \
    --query "Stacks[*].{sn:StackName}" &> /dev/null \
    || return 1 # false

  return 0 # true
}

# Launch a stack as creation or update
# $1 stackName
# $2 template URL (https://s3....)
function doLaunchStack() {
  local stackName="$1"
  shift
  local template="$1"
  shift
  local cliOptions="$1"

  _info "Deploying Stack named $stackName using template $template"

  local _CFcommand="create-stack"
  if  isStackExisting "${stackName}" "${cliOptions}"; then
    _info "Stack named $stackName already exists"
    _CFcommand="update-stack"
  #  _CFcommand="create-change-set --change-set-name chg-$(date +%s)"
  fi

  local templateArgs=
  if [ -f "${template}" ]; then
    _debug "Template is a file : ${template}"
    #Windows-hack
    template="c:/${template:7}"
    templateArgs=" --template-body file://${template}"
  else
    _debug "Template is assumed to be a url : ${template}"
    templateArgs=" --template-url  ${template}"
  fi

  args=''
  if [ -n "${ParamList}" ]; then
    args="--parameters $ParamList"
  fi

  if [ -n "${TagList}" ]; then
    args="${args} --tags $TagList"
  fi

  stackId=$(aws cloudformation $_CFcommand \
    --stack-name ${stackName} \
    ${templateArgs} \
    --query "StackId" \
    --capabilities CAPABILITY_NAMED_IAM \
    --output text \
    ${args} \
    ${cliOptions}) || _error "Failed to execute cloudformation stack"


  echo ${stackId:-}
}

# $1 From: local folder or s3:// url
# $2 To: local folder or s3:// url
function doSyncWithS3Bucket() {
  local _folderSource=$1
  local _bucketTarget=$2

  _debug From $_folderSource to $_bucketTarget
  aws s3 sync $_folderSource $_bucketTarget
}

# Build the argument line for the CF template: add a key value pair to the paramlist
# $1 key
# $2 value
ParamList=''
addToParamList() {
  if [[ $# -eq 2 ]]; then
    local key="${1}"
    local value="${2}"

    ParamList="${ParamList}ParameterKey=\"${key}\",ParameterValue=\"${value}\" "
  fi
}

TagList=''
_tag_costGroup_key='costGroup'
_tag_costID_key='costID'

# Build the argument line for the CF template: add a key value pair to the taglist
# $1 key
# $2 value
addToTagList() {
  if [[ $# -eq 2 ]]; then
    local key="${1}"
    local value="${2}"

    TagList="$TagList Key=${key},Value=${value}"
  fi
}

# Add tags about costs
# $1 costGroup value
# $2 costID value
addCostTags() {
  local costGroupValue="${1:-}"
  local costIDValue="${2:-}"
  [[ -z "${costGroupValue}" ]] || addToTagList "${_tag_costGroup_key}" "${costGroupValue}"
  [[ -z "${costIDValue}"    ]] || addToTagList "${_tag_costID_key}"    "${costIDValue}"
}

getCertificateFromArn() {
  local arn="${1:-}"

  aws acm get-certificate --certificate-arn ${arn}
}

getCertificateArnFromDomain() {
  export DomainName="${1}"

  aws acm list-certificates \
    --query "CertificateSummaryList[?starts_with(DomainName,\`${DomainName}\`)].CertificateArn" \
    --output=text \
    | awk '{print $(NF)}'
}

# Build the argument line for the CF template: retrieve the corresponding certificate for a domain name
# and add it to the parameter list
# $1 extension domain name of the targeted certificate
retrieveCertificateFromParam() {
  local DomainName="${1}"
  local ParameterName="${1%%.*}${2:-CertificateArn}"
  local IgnoreError="${3:-}"

  retrieveCertificate ${DomainName} ${ParameterName} ${IgnoreError}
}

# Build the argument line for the CF template: retrieve the corresponding certificate for a domain name
# and add it to the parameter list
# $1 extension domain name of the targeted certificate
retrieveCertificate() {
  local DomainName="${1}"
  local ParameterName="${2:-CertificateArn}"
  local IgnoreError="${3:-}"

  local certificateArn="$(getCertificateArnFromDomain "${DomainName}")"
  local certificate="$(getCertificateFromArn "${certificateArn}")"
  if [[ ! -z "${certificate}" ]]; then
    _info "Certificate for domain ${DomainName} : ${certificateArn}"
    addToParamList "${ParameterName//-}" "${certificateArn}"
  else
    if [[ -z "${IgnoreError}" ]]; then
      _fail "Can not find a valid certificate ARN for domain ${DomainName}"
    else
      _info "Can not find a valid certificate ARN for domain ${DomainName}"
    fi
  fi
}

# Retrieve Public Zone Id in route 53
# $1 infra stack name (option, default Infra)
getPublicZoneId() {
  local infraStackname="${1:-Infra}"
  aws cloudformation describe-stacks --stack-name ${infraStackname} --query 'Stacks[].Outputs[?OutputKey==`PublicHostedZone`].OutputValue' --output=text
}

# Generation of a TLS certificate in ACM with DNs validation
# $1 base domain name (for ex prod.energy-pool.eu)
# $2 extension name for the domain certificate
# $3 optional additional names for this certificate (multi host certificates)
generateTLSCertificate() {
  local _BaseDNS="$1"
  local _DomainNameExt="$2"
  local _AlternativesNamesExt=""
  if [ $# -gt 2 ]; then
    _AlternativesNamesExt="$3"
  fi

  local _existingCertificateArn=$(getCertificateArnFromDomain "${_DomainNameExt}.${_BaseDNS}")
  if [ ! -z "${_existingCertificateArn}" ]; then
     _info "TLS certificate already exists for ${_DomainNameExt}.${_BaseDNS} : ${_existingCertificateArn}"
     return
  fi

  _info "Generating certificate for $_DomainNameExt.$_BaseDNS $_AlternativesNamesExt"

  # Compute subjet alternatives
  local alternativeNames=""
  local validationOptions=""
  for i in "$_DomainNameExt" "$_AlternativesNamesExt"
  do
    if [ ! -z ${i} ]; then
      alternativeNames="${alternativeNames}${i}.${_BaseDNS} "
      validationOptions=${validationOptions}"DomainName=$i.$_BaseDNS,ValidationDomain=$_BaseDNS "
    fi
  done

  # Generation idempotency token
  local _idemToken=$(echo ${_DomainNameExt}| tr -d '-')

  _info "Certification request"
  local _certificateArn=$(aws acm request-certificate \
    --domain-name $_DomainNameExt.$_BaseDNS \
    --idempotency-token $_idemToken \
    --validation-method DNS \
    --subject-alternative-names $alternativeNames \
    --domain-validation-options $validationOptions \
    --query "CertificateArn" \
    --output text)

  _debug "Return certificateArn ${_certificateArn}"
  if [ ${#_certificateArn} -lt 50 ]; then
    _fail "Certificate ARN seems to be malformated"
  fi
}

# Wait for requirements about dns validation of a certificate to be available
# $1 certificate ARN (might already been validated
waitCertificateDnsValidationOptions(){
  local _certificateArn="$1"

  _info "Waiting for certificate validation options"
  local _sleepTime=2
  local _sleepLoops=40
  local c=${_sleepLoops}
  local _options=$(getCertificateDnsValidationOptions ${_certificateArn})
  while [[ ${c} -gt 0 && ${#_options} -lt 25 ]]; do
    (( c-- ))
    _options=$(getCertificateDnsValidationOptions ${_certificateArn})
    sleep ${_sleepTime}
  done
}

# Validation of domain certificate with DNS entry adding
# $1 certificate ARN to validation
# $2 route 53 zone where DNS validation will take place
validateTLSCertificate() {
  if [ $# -ne 2 ]; then
    _fail "Not enough arguments to validate this certificate"
  fi

  local _certificateArn="$1"
  local _hostedZoneId="$2"

  if [[ $(getCertificateValidationStatus ${_certificateArn}) != *"PENDING"* ]]; then
    _debug "Certificate does not need validation"
    return
  fi

  waitCertificateDnsValidationOptions "${_certificateArn}"

  _debug "Compute DNS records to add for certificates validation"
  local route53Changes=$(aws acm describe-certificate \
    --certificate-arn $_certificateArn --query "Certificate.DomainValidationOptions[0]" | \
    jq -r "[ { \
      \"Action\": \"CREATE\", \
      \"ResourceRecordSet\": { \
        \"Name\": .ResourceRecord.Name, \
        \"Type\": .ResourceRecord.Type, \
        \"TTL\": 60, \
        \"ResourceRecords\": [ \
          {\"Value\": .ResourceRecord.Value} \
        ] \
      } \
    }]")

  _debug "Add DNS records for validation"
  outputFile=$(mktemp -t Route53AddEntries-XXXXXX.json )
  echo "{\"Changes\": $route53Changes }" > ${outputFile}
  aws route53 change-resource-record-sets --hosted-zone-id $_hostedZoneId --change-batch file://${outputFile}
  rm -f ${outputFile}
}

# Remove a DNS entry for a domain certificate
# $1 certificate ARN to validation
# $2 route 53 zone where DNS validation will take place
removeDNSEntryForTLSCertificate() {
  if [ $# -ne 2 ]; then
    _error "Not enough arguments to validate this certificate"
    return
  fi
  export DomainName="${1}."
  local _hostedZoneId="$2"

  local _certificateArn=$(aws acm list-certificates --query "CertificateSummaryList[?starts_with(DomainName,\`${DomainName}\`)].CertificateArn" --output text | awk '{print $1}')
  _debug "Is the certificate existing ?"
  if [ ! -z ${_certificateArn} ]; then

    local _RecordName=$(aws acm describe-certificate \
      --certificate-arn ${_certificateArn} \
      --query "Certificate.DomainValidationOptions[*].ResourceRecord.Name" \
      --output text \
    )

    _debug "Is the record already removed ?"
    local _recordCount=$(aws route53 list-resource-record-sets --hosted-zone-id $_hostedZoneId --query "ResourceRecordSets[*].Name" | grep -c ${_RecordName} )

    if [ ${_recordCount} -eq 1 ]; then
      _debug "Compute DNS records to remove for certificates validation"
      local route53Changes=$(aws acm describe-certificate \
        --certificate-arn $_certificateArn --query "Certificate.DomainValidationOptions[0]" | \
        jq -r "[ { \
          \"Action\": \"DELETE\", \
          \"ResourceRecordSet\": { \
            \"Name\": .ResourceRecord.Name, \
            \"Type\": .ResourceRecord.Type, \
            \"TTL\": 60, \
            \"ResourceRecords\": [ \
              {\"Value\": .ResourceRecord.Value} \
            ] \
          } \
        }]")

      _debug "Remove DNS records for validation"
      outputFile=$(mktemp -t Route53AddEntries-XXXXXX.json )
      echo "{\"Changes\": $route53Changes }" > ${outputFile}
      aws route53 change-resource-record-sets --hosted-zone-id $_hostedZoneId --change-batch file://${outputFile}
      rm -f ${outputFile}
    fi
  fi
}

# Retrieve a certificate validation status
# $1 certificate ARN to check
getCertificateValidationStatus() {
  local _certificateArn="$1"

  aws acm describe-certificate \
    --certificate-arn ${_certificateArn} \
    --query "Certificate.DomainValidationOptions[0].ValidationStatus" \
    --output text
}

# Retrieve a certificate validation options
# $1 certificate ARN to check
getCertificateDnsValidationOptions() {
  local _certificateArn="$1"

  aws acm describe-certificate \
    --certificate-arn ${_certificateArn} \
    --query "Certificate.DomainValidationOptions[0].ResourceRecord" \
    --output text
}

# Full processing of a domain certificate generation
# $1 root domain name (for ex prod.energy-pool.eu)
# $2 extension name for the domain certificate
# $3 public hosted zone id (for DNS validation)
generationTLSCertificateAndValidateUsingAwsDNS() {
  local rootDomainName="$1"
  local extensionDomainName="$2"
  local publicHostedZoneId="$3"

  if [ -z "${rootDomainName}" ]; then
    _fail "Missing root domain name for generationTLSCertificateAndValidateUsingAwsDNS method"
  fi
  if [ -z "${extensionDomainName}" ]; then
    _fail "Missing extension name for generationTLSCertificateAndValidateUsingAwsDNS method"
  fi
  if [ -z "${publicHostedZoneId}" ]; then
    _fail "Missing public hosted zone id for generationTLSCertificateAndValidateUsingAwsDNS method"
  fi

  generateTLSCertificate "${rootDomainName}" "${extensionDomainName}"
  local _certificateArn=$(getCertificateArnFromDomain "${extensionDomainName}.${rootDomainName}")

  if [[ $(getCertificateValidationStatus ${_certificateArn}) == *"PENDING"* ]]; then
    # 5 seconds more to wait for AWS certificate publication
    sleep 5

    _info "Add DNS entries for certificate validation"
    validateTLSCertificate ${_certificateArn} "${publicHostedZoneId}"
    _info "Exiting even if validation is pending; should be available in less than 30 minutes"
  fi
}

# processing of a domain certificate generation for external dns
# generates certificate request
# then wait for the request to be processed
# and display validation information
# $1 extension name for the domain certificate (e.g engineering)
generationTLSCertificateUsingExternalDNS() {
  local rootDomainName="energy-pool.eu"
  local extensionDomainName="$1"
  if [ -z "${extensionDomainName}" ]; then
    _fail "Missing extension name for generationTLSCertificateAndValidateUsingAwsDNS method"
  fi

  generateTLSCertificate ${rootDomainName} ${extensionDomainName}
  local _certificateArn=$(getCertificateArnFromDomain "${extensionDomainName}.${rootDomainName}")

  if [[ $(getCertificateValidationStatus ${_certificateArn}) == *"PENDING"* ]]; then
    waitCertificateDnsValidationOptions "${_certificateArn}"
    _error "Certificate for ${rootDomainName} ${extensionDomainName} requires validation using dns record : $(getCertificateDnsValidationOptions "${_certificateArn}")"
  fi
}

# Add a secondary certificate to an existing listener
# $1 dns for the certificate (e.g. engineering.energy-pool.eu)
# $2 listener arn
addCertificateToListener() {
  local _officialDNS="$1"
  local _listenerArn="$2"

  if [ -z "${_listenerArn}" ]; then
    _fail "Can not find listener to add certificate to"
  fi

  _certificateArn="$(getCertificateArnFromDomain "${_officialDNS}")"
  if [ -z "${_certificateArn}" ]; then
    _info "Can not find certificate ARN for domain ${_officialDNS}"
    return
  fi

  if [[ $(getCertificateValidationStatus ${_certificateArn}) == *"PENDING"* ]]; then
    _error "Certificate for ${_officialDNS} requires validation using dns record : $(getCertificateDnsValidationOptions "${_certificateArn}")"
    return
  fi

  _info "Certificate for domain ${_officialDNS} : ${_certificateArn} will be added to listener ${_listenerArn}"
  # find the listener
  aws elbv2 add-listener-certificates \
    --listener-arn "${_listenerArn}" \
    --certificates CertificateArn=${_certificateArn}
}

# Read a key from a stack output
# $1 Cloudformation stack name
# $2 output key
readStackOutputByKey() {
  local stackName="$1"
  local outputKey="$2"
  aws cloudformation describe-stacks --stack-name "${stackName}" \
    --query "Stacks[].Outputs[?OutputKey==\`${outputKey}\`].OutputValue" \
    --output text || _fail "Can't read key ${outputKey} from stack ${stackName}"
}

# Find stack by tags
# $1 tag EPEnv value
# $2 tag EPStack value
getStackByTags() {
  local EPEnv="$1"
  local EPStack="$2"

  # search a stack with tag EPStack and EPEnv
  # and the stack is not nested ie: the stack has not a 'ParentId' attribute
  aws cloudformation describe-stacks \
    --query 'Stacks[? ! ParentId && Tags[?Key==`EPStack` && Value=='"\`${EPStack}\`"'] && Tags[?Key==`EPEnv` && Value=='"\`${EPEnv}\`"']].StackName' \
    --output text
}

importPubKey() {
  local _publicKeyFilename=$1

  if [ -r ${_publicKeyFilename} ];
  then
    local _keyname="$(basename -- ${_publicKeyFilename%.*})"

    aws ec2 import-key-pair --key-name "${_keyname}" --public-key-material file://${_publicKeyFilename}
  fi
}

isPubKeyAvalaible() {
  local _keyname=$1

  aws ec2 describe-key-pairs --key-names ${_keyname} > /dev/null 2>&1
  local _ret=$?

  return ${_ret}
}

deletePubKey() {
  local _keyname=$1

  local _result=$(aws ec2 delete-key-pair --key-name ${_keyname} 2> /dev/null)
  local _ret=$?

  return ${_ret}
}

# Get tag value for an AMI
# $1 ami reference
# $2 tag name
readTagvalueForAmi() {
  local ami="$1"
  local tagName="$2"
  local _result=$(aws ec2 describe-images --image-ids ${ami} \
    --query "Images[0].Tags[?Key==\`${tagName}\`].Value"\
    --output text)
  if [[ -z "${_result}" ]] || [[ "${_result}" == "None" ]]; then
    return
  fi
  echo "${_result}"
}

# addToTagList a specific tag from AMI
# $1 ami reference
# $2 tag name
addToTagListFromAmi() {
  local ami="$1"
  local tagname="$2"

  local _result="$(readTagvalueForAmi "${ami}" "${tagname}")"
  if [[ ! -z "${_result}" ]]; then
    _debug "Adding tag : ${tagname} ${_result}"
    addToTagList "${tagname}" "${_result}"
  else
    _error "No value found for tag ${tagname}"
  fi
}

# Get tag name list for an AMI
# $1 ami reference
readTagnameListForAmi() {
  local ami="$1"
  aws ec2 describe-images --image-ids ${ami} \
    --query 'Images[0].Tags[*].Key' --output text
}


#easyRSA_exec="${awsCFUtils_dir}/infra/vpn-client/EasyRSA/easyrsa"
#[[ -f "${easyRSA_exec}" ]] || _fail "Tool for managing certificates is absent : ${easyRSA_exec}"

_pki_path=''
ensurePkiPath() {
  if [ -z "${_pki_path:-}" ]; then
    _pki_path="${currentDir:-.}/pki"
    _debug "forcing _pki_path : ${_pki_path}"
  fi
}

# Launch a Certificate Management command
launchEasyRsa() {
  ensurePkiPath
  _debug "Using pki path : ${_pki_path}"
  EASYRSA_PKI="${_pki_path}" "${easyRSA_exec}" $@
}

# Due to git ways empty directory are pruned
# To keep those directory from being lost through git
# this method add an empty .gitkeep file (if empty)
# $1 directory
ensureDirectoryPresence() {
  local directoryPath="${1:-}"
  [[ -d "${directoryPath}" ]] || _fail "Can not find directory ${directoryPath}"

  if [[ $(ls -1 "${directoryPath}" | wc -l) -eq 0 ]]; then
    _debug "Adding .gitkeep into ${directoryPath}"
    touch "${directoryPath}/.gitkeep"
  fi
}

# Generate certificate authority
# $1 domain name
generateCaCertificate() {
  local domain_name="${1:-}"
  ensurePkiPath
  local ca_crt_file="${_pki_path}/ca.crt"
  if [[ ! -f "${ca_crt_file}" ]]; then
    _info "Generate self sign certificates authority using EasyRSA"
    # this will init directory tree for certificates
    launchEasyRsa init-pki <<< yes
    # Generate Root certificate authority
    launchEasyRsa build-ca nopass <<< "${domain_name}"
    # some folders need to be kept even if they are empty
    ensureDirectoryPresence "${_pki_path}/renewed/certs_by_serial"
    ensureDirectoryPresence "${_pki_path}/renewed/private_by_serial"
    ensureDirectoryPresence "${_pki_path}/renewed/reqs_by_serial"
    ensureDirectoryPresence "${_pki_path}/revoked/certs_by_serial"
    ensureDirectoryPresence "${_pki_path}/revoked/private_by_serial"
    ensureDirectoryPresence "${_pki_path}/revoked/reqs_by_serial"
  else
    _debug "Using CA cert:      ${ca_crt_file}"
  fi
}

# Generate server certificate for a domain
# $1 domain name
generateServerCertificate() {
  local domain_name="${1:-}"
  ensurePkiPath
  local server_crt_file="${_pki_path}/issued/${domain_name}.crt"
  if [[ ! -f "${server_crt_file}" ]]; then
    _info "Generate self sign server certificates using EasyRSA"
    launchEasyRsa build-server-full "${domain_name}" nopass
  else
    _debug "Using server cert : ${server_crt_file}"
  fi
}

# Generate client and export to pkcs12
# $1 client identifier name
generateClientCertificate() {
  local user_id="${1:-}"
  ensurePkiPath
  local user_crt_file="${_pki_path}/private/${user_id}.p12"
  if [[ ! -f "${user_crt_file}" ]]; then
    _info "Generate self sign client certificates and key using EasyRSA"
    launchEasyRsa build-client-full "${user_id}"
  else
    _debug "Certificate already exists  : ${user_crt_file}"
  fi
}

# Revoke client certificate
# $1 client identifier name
revokeClientCertificate() {
  local user_id="${1:-}"
  ensurePkiPath
  local user_crt_file="${_pki_path}/issued/${user_id}.crt"
  if [[ -f "${user_crt_file}" ]]; then
    _info "Revoke client certificates using EasyRSA"
    launchEasyRsa revoke "${user_id}" <<< yes
  else
    _error "Certificate does not exists  : ${user_crt_file}"
  fi
}

# Disconnect a client
# $1 endpointId
# $2 client identifier name
disconnectClient() {
  local endpoint_id="${1:-}"
  local user_id="${2:-}"

  _info "Terminating connections for client ${user_id} on endpoint ${endpoint_id}"
  local user_connections=$(aws ec2 describe-client-vpn-connections \
    --client-vpn-endpoint-id "${endpoint_id}" \
    --query "Connections[?CommonName==\`${user_id}\` && Status.Code==\`active\`].ConnectionId" \
    --output text)

  if [[ ! -z "${user_connections}" ]]; then
    _info "Revoked user has connections : ${user_connections}"
    for p in ${user_connections}; do
      _debug "Disconnecting '${p}'"
      aws ec2 terminate-client-vpn-connections \
        --client-vpn-endpoint-id "${endpoint_id}" \
        --connection-id "${p}"
    done
  fi
}

# Update Certificate Revocation List
generateCertificateRevocationList() {
  ensurePkiPath
  launchEasyRsa gen-crl
}

# Update AWS VPN Client Endpoint Certificate Revocation List
# $1 endpointId
# $2 crl file
importCertificateRevocationList() {
  local endpoint_id="${1:-}"
  local crl_file="${2:-}"
  [[ -z "${endpoint_id}" ]] && _fail "Missing endpoint id"
  if [[ -z "${crl_file}" ]]; then
      ensurePkiPath
      crl_file="${_pki_path}/crl.pem"
  fi
  [[ -r "${crl_file}" ]] || _fail "CRL file not found : ${crl_file}"
  _info "Updating Certificate Revocation List for Endpoint : ${endpoint_id} with : ${crl_file}"
  aws ec2 import-client-vpn-client-certificate-revocation-list \
    --certificate-revocation-list "file://${crl_file}" \
    --client-vpn-endpoint-id "${endpoint_id}"
}

# Manage certificate generation and deployment
# $1 domain name
# $2 mode : ca, server, root
ensureCertificateDeployed() {
  local domain_name="${1:-}"
  local mode="${2:-ca}"

  [[ -z "${domain_name}" ]] && _fail "Domain name is mandatory (first parameter)"

  ensurePkiPath

  # certificate locations
  local ca_crt_file="${_pki_path}/ca.crt"
  local normal_crt_file="${_pki_path}/issued/${domain_name}.crt"

  # Key locations
  local ca_key_file="${_pki_path}/private/ca.key"
  local normal_key_file="${_pki_path}/private/${domain_name}.key"

  local cert_file_to_import=''
  local key_file=''
  local cert_chain_file=''
  case "${mode}" in
    "ca")
      generateCaCertificate "${domain_name}"
    ;;
    "server")
      generateServerCertificate "${domain_name}"
      cert_file_to_import="${normal_crt_file}"
      key_file="${normal_key_file}"
      cert_chain_file="${ca_crt_file}"
    ;;
    "root")
      generateCaCertificate "${domain_name}"
      cert_file_to_import="${ca_crt_file}"
      key_file="${ca_key_file}"
      cert_chain_file=""
    ;;
  esac

  if [[ -r "${cert_file_to_import}" ]]; then
    _info "Importing server certificate"
    local _certificate_arn="$(getCertificateArnFromDomain "${domain_name}")"
    importCertificate "${cert_file_to_import}" "${key_file}" "${cert_chain_file}" "${_certificate_arn}"
  fi
}

# Import or update certificate into ACM
# $1 Certificate file
# $2 Private key file
# $3 optional Certificate chain : for a non self signed certificate, the certificate chain (see aws acm import-certificate help)
# $4 optional Certificate ARN : for updating an already imported certificate
importCertificate() {
  local certificateFile="${1:-}"
  local keyFile="${2:-}"
  local certificateChainFile="${3:-}"
  local certificateArn="${4:-}"

  [[ -z "${certificateFile}" ]] && _fail "Certificate file (first parameter is mandatory)"
  [[ -z "${keyFile}" ]] && _fail "Private key file (second parameter is mandatory)"

  [[ -r "${certificateFile}" ]] || _fail "Can not read certificate file ${certificateFile}"
  [[ -r "${keyFile}" ]] || _fail "Can not read private key file ${keyFile}"

  local _optionalParams=''
  if [[ -r "${certificateChainFile}" ]]; then
    _debug "Import using certificate chain"
    _optionalParams="${_optionalParams} --certificate-chain file://${certificateChainFile}"
  fi
  if [[ ! -z "${certificateArn}" ]]; then
    _debug "Updating certificate"
    _optionalParams="${_optionalParams} --certificate-arn ${certificateArn}"
  fi

  aws acm import-certificate \
    --certificate "file://${certificateFile}" \
    --private-key "file://${keyFile}" ${_optionalParams}
}

# Get current value for AMI id parameter (supposed to be named ec2AMI)
# Result is empty if no stack or no parameter
# $1 stack name
# $2 env stack name
getCurrentAmi() {
  local stack_name="${1:-}"
  local EPEnvName="${2:-}"

  [[ -z "${stack_name}" ]] && _fail "First argument, stack name, is mandatory"
  [[ -z "${EPEnvStackName}" ]] && _fail "Second argument, environment stack name, is mandatory"

  local app_stack_name="$(getStackByTags "${EPEnvName}" "${stack_name}")"
  if [[ -z "${app_stack_name}" ]]; then
    return
  fi
  local _result=$(aws cloudformation describe-stacks --stack-name "${app_stack_name}" \
        --query 'Stacks[0].Parameters[?ParameterKey==`ec2AMI`].ParameterValue'  \
        --output text)
  if [[ "${_result}" == "None" ]]; then
    return
  fi
  echo "${_result}"
}

# Get account Id in wich cli will run
# Check if this account Id is equal to the targeted account

_checkCurrentAccount () {
  local targetedAccount="${1:-}"
  account=$(aws sts  get-caller-identity --query "Account" --output text)
  if [ "${account}" -ne "${targetedAccount}"  ]; then
    echo "Not in the good account !"
    exit 1
fi
}

# Get the last AMI id for an application, for an environmnent
# $1 application_name aka taorescue, ops
# $2 environment name aka prep,prod (optional, some ami do not vary with env)
getLastAmiFor() {
  local application_name="${1:-}"
  local env_name="${2:-}"

  local ami_name_format=''
  if [[ -z "${env_name}" ]]; then
    ami_name_format="ami-${application_name}-*"
  else
    ami_name_format="ami-${application_name}-*-${env_name}-*"
  fi

  local _result=$(aws ec2 describe-images \
    --executable-users self \
    --filters \
      "Name=name,Values=${ami_name_format}"  \
      'Name=state,Values=available' \
    --query 'Images[].{Name:Name, CreationDate:CreationDate, ImageId:ImageId}' \
    | jq 'sort_by(.CreationDate) |.[-1] | .ImageId' --raw-output)
  if [[ "${_result}" != 'null' ]]; then
    echo "${_result}"
  fi
}

findActiveVpcPeeringIDByCidr() {
  local requesterCidr="${1:-}"
  local accepterCidr="${2:-}"

  local filters=''
  filters="${filters} Name=status-code,Values=active "
  filters="${filters} Name=requester-vpc-info.cidr-block,Values=${requesterCidr}"
  if [[ ! -z "${accepterCidr}" ]]; then
    filters="${filters} Name=accepter-vpc-info.cidr-block,Values=${accepterCidr}"
  fi

  aws ec2 describe-vpc-peering-connections \
    --filters ${filters} \
    --query "VpcPeeringConnections[0].VpcPeeringConnectionId" \
    --output text
}

askConfirmation() {
  read -p "Are you sure? (y/n) " -n 1 -r
  echo    # (optional) move to a new line
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo  "Script continues"
  else
    _fail "exiting script"
  fi
}

# Get instance profile arn from its name
# $1 instance profile name
getInstanceProfileArnFromName() {
  local instanceProfileName="${1:-}"
  aws iam list-instance-profiles \
    --query "InstanceProfiles[?InstanceProfileName==\`${instanceProfileName}\`].Arn" \
    --output text
}
