#!/bin/bash

DEST=~/github/annolangen.github.io/multi-step

rm -rf dist .parcel-cache $DEST/*
npm run build
cp dist/* $DEST
cd $DEST/..
git add .
git commit -m 'Republish countries'
git push
