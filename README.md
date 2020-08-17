# Introduction

This is a card game that aims to fight Bitcoin misconceptions and Blockchain over-promising gibberish.

## Public explanation about the Card game Prejudice: 
https://github.com/blockchainbird/cards_prejudice/wiki

## Copyright & License

All content in this repository is copyright by the contributors.

All text is licensed CC-BY, and all code is licensed under the MIT License.

Contributors: Kor Dwarshuis <@kordwarshuis>, Henk van Cann <@henkvancann>



## Technical

This project is built in old style JavaScript. The starting point was https://tympanus.net/codrops/2018/05/23/grid-layout-with-motion-hover/

Libraries also used:
* Phirehose (https://github.com/fennb/phirehose)



This project does NOT use:
* Webpack or related technologies
* BabelJS or related technologies
* AngularJS, ReactJS or VueJS frameworks

The content is managed via Google Sheets and the data is pulled via Tabletop.js (https://github.com/jsoma/tabletop) and via D3.js:

Tabletop.js --> published to a .CSV file --> .CSV file is pulled in via D3.js API

The .CSV step helps to speed the loading time, since Google Sheets tends to be slow at times.



## Start and stop phirehose queries

Phirehose is a PHP library running PHP scripts that should be run from the command line. Phirehose collects realtime tweets containing a certain string.


### On the server:
Phirehose : a php library for collecting tweets

### Search words / queries:
The queries are in phirehose-collect.php

phirehose-collect.php
phirehose-consume.php
tweets.json : This is where the query result is written to.

Notice: the php scripts run in directory /twitter-phirehose

### Procedure

#### Log in on blockchainbird via SSH

$ ssh xxxd@xxx.com

#### START

Go to the correct directory:

`$ cd public_html/t/twitter-phirehose/`
(Don't type the dollar sign, this is to show that it's the terminal)

Start the php process that collects:

`$ screen -dmS phirehosecollect php phirehose-collect.php`

Start the php process that consumes:

`$ screen -dmS phirehoseconsume php phirehose-consume.php`

Go to the screen showing phirehose-collect

`$ screen -r phirehosecollect`

Leave screen with output:

`$ ctrl-a`

`$ d`

Go to the screen showing phirehose-consume

`$ screen -r phirehoseconsume`

Leave screen with output:

`$ ctrl-a`

`$ d`


Overview of processes with screen:

`$ screen -list`

#### STOP

To stop processes

Check what processes are running:

`$ ps -u xxx`

Kill a certain process:

`$ kill -9 UID`

Find the UID via screen -list:

`$ screen -list`

If you killed the processes and you return to screen -list, you will see that a process is dead and you can wipe it. 

Close terminal and leave:
`$ logout`

End.
