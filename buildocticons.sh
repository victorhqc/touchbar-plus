#!/usr/bin/env bash

cd srcgen
npm i
npm i canvas --build-from-source
npm run build
