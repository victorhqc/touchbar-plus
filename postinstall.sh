#!/usr/bin/env bash

if [[ -z "$CI" ]]; then
  npm run rebuild
else
  echo "Post install disabled in CI"
fi
