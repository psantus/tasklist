#!/usr/bin/env bash

set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset  # fail on unset variables

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

doCloudFormationDelete backend "${cliOptions}"

