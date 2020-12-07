#!/bin/bash
# SIMPLE SCRIPT THAT COPIES FILES TO LIVE SITE
# INSTRUCTIONS
# adding --progress option to rsync command will output progress to screen

# INSTRUCTIONS
# 1: COPY THIS TO A FILE NAMED live.sh
# 2: ENTER CORRECT PATHNAMES
#
#

####################
# TEST version:

cp vue.config.test.js vue.config.js
cp .env.test.env .env
cp public/.test.htaccess public/.htaccess

# CREATE A BUILD IN /dist
npm run build


# COPY TO LIVE SERVER

rsync -vurt --delete dist/. blockcbird@blockchainbird.com:/home/blockcbird/public_html/t/cardgametest/
####################

