#!/bin/bash
# SIMPLE SCRIPT THAT COPIES FILES TO LIVE SITE
# INSTRUCTIONS
# adding --progress option to rsync command will output progress to screen

# INSTRUCTIONS
# 1: COPY THIS TO A FILE NAMED live.sh
# 2: ENTER CORRECT PATHNAMES
#
#

# CREATE A BUILD IN /dist
npm run build


# COPY TO LIVE SERVER

####################
# BTC version:
rsync -vurt --delete dist/* xxxxx@xxxxx.com:/xxx/xxx/xxxxx/t/btc/
####################


####################
# BCB version:
# rsync -vurt --delete dist/* xxxxx@xxxxx.com:/xxx/xxx/xxxxx/t/bcb/
####################


