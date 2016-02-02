#!/bin/bash

SSH_KEY="${1:-/root/.ssh/id_rsa}"
DOCKER_IMAGE="docker.io/economist/base-node:latest"
HOST_IP=$(ip route get 1 | awk '{print $NF;exit}')
WITH_SINOPIA=${WITH_SINOPIA:-"true"}
SINOPIA_URL="http://${HOST_IP}:4873"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
# Fake the environment for the default semantic-release verifier
export TRAVIS_PULL_REQUEST="true"
if [ "$BRANCH" = "master" ]
then
  TRAVIS_PULL_REQUEST="false"
fi


[[ ${NPM_TOKEN:-} = '' ]] && { echo "NPM_TOKEN empty"; exit 1; }
[[ ${SAUCE_ACCESS_KEY:-} = '' ]] && { echo "SAUCE_ACCESS_KEY empty"; exit 2; }
[[ ${SAUCE_USERNAME:-} = '' ]] && { echo "SAUCE_USERNAME empty"; exit 3; }

docker pull "${DOCKER_IMAGE}"

exec docker run \
    -v "${SSH_KEY}":/root/.ssh/id_rsa \
    -v "$(pwd)":/code \
    -e CI="true" \
    -e NODE_ENV="${NODE_ENV:-test}" \
    -e TRAVIS="true" \
    -e BRANCH="${BRANCH}" \
    -e TRAVIS_BRANCH="${BRANCH}" \
    -e TRAVIS_PULL_REQUEST="${TRAVIS_PULL_REQUEST}" \
    -e npm_config_loglevel="${npm_config_loglevel:-warn}" \
    -e NPM_TOKEN="${NPM_TOKEN}" \
    -e GH_TOKEN="${GH_TOKEN}" \
    "${DOCKER_IMAGE}" \
    /bin/sh -cx "\
        trap 'chmod 777 node_modules -R' EXIT &&\
        cd /code &&\
        chmod 777 . &&\
        umask 000 &&\
        umask -S &&\
        ls -la &&\
        printf \"@economist:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=%s\n\" \"$NPM_TOKEN\" > ~/.npmrc &&\
        { \
          [ \"$WITH_SINOPIA\" != \"true\" ] || \
          (
            curl -I \"$SINOPIA_URL\" --max-time 5 &&\
            npm set registry \"$SINOPIA_URL\" &&\
            echo \"Using sinopia cache registry available on $SINOPIA_URL\" ;\
          );
          true ;\
        } &&\
	npm run env &&\
        npm i &&\
        SAUCE_USERNAME=${SAUCE_USERNAME} \
        SAUCE_ACCESS_KEY=${SAUCE_ACCESS_KEY} \
        npm t &&\
        { \
          git config --global user.email 'ecprod@economist.com' ;\
          git config --global user.name 'GoCD' ;\
          true ;\
        } &&\
        { \
          [ \"$BRANCH\" != \"master\" ] ||\
          npm run pages ;\
        } &&\
        {
          [ \"$BRANCH\" != \"master\" ] ||\
          npm run semantic-release ;\
        } ;\
        RETURN_CODE=\"\$?\" ;\
        echo \"Build finished with status \$RETURN_CODE\" ;\
        exit \"\$RETURN_CODE\"
    ";
