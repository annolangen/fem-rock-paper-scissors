#!/bin/bash

DEST=~/github/annolangen.github.io/rock-paper-scissors

rm -rf dist .parcel-cache $DEST/*
npm run build
cp dist/* $DEST
cd $DEST/..
git add .
git commit -m 'Republish countries'
git push
