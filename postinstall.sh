#!/usr/bin/env bash

if [[ -z "$REBUILD" ]]; then
  echo "Post install disabled"
else
  npm run rebuild
fi
