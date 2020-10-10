#!/usr/bin/env bash

cf_stack='backend'
cf_template='backend.yml'

cliOptions=$1
#
# load utilities
#
currentDir=$(cd -P -- "$(dirname -- "$BASH_SOURCE[0]")" && pwd -P)
if [ -r ./utils/awsCFUtils.sh ]; then
  source ./utils/awsCFUtils.sh
fi
_utilities="${currentDir}/utils/awsCFUtils.sh"
if [ ! -r "${_utilities}" ]; then
  echo "Failed to read file ${_utilities}"
  exit 1
fi
source "${_utilities}"

# Params
addToParamList "graphQLAPIName" "CollaborativeTaskManager"

doRemoveCloudFormationFailedStack "${cf_stack}" "${cliOptions}"

doLaunchStack "${cf_stack}" "${currentDir}/${cf_template}" "${cliOptions}" "${ParamList}"

waitCloudFormationStackStable "${cf_stack}" "${cliOptions}"