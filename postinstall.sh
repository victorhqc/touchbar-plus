#!/usr/bin/env bash

if [[ -z "$REBUILD" ]]; then
  echo "Post install disabled, if you want to rebuild native dependencies, run the following"
  echo "REBUILD=1 npm i"
else
  npm run rebuild
fi
