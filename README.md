# Introduction

This is a card game engine. The engine is meant for developers who want to offer a creative and playfull way to explain a certain concept.
The game consist of 
1. tracking social media for (errorness) statements about a certain concept, e.g. crypto currencies and then 
2. offer informative virtual cards that address a neutral strength and weaknesses analysis of a certain feature or chracteristic of the concept. For example: "what about the energy consumption of cryptocurrencies.
3. Use the card in a reply, plain or with extra explanation
4. Score points by getting acknowledgement (likes, thumbs up, forwards etc.) from a community.

The focus in my work is the explain concepts and terms with imaginary expressed in sites and educational tools. See more: [dwarshuis.com](https:\\dwarshuis.com)

Here are the live versions of the cardsets:
* [Bitcoin misconceptions](https://blockchainbird.com/t/btc/)
* [Blockchain bullshit buster](https://blockchainbird.com/t/bcb/)
* [Misconception about self sovereign identity](https://blockchainbird.com/t/id/)

This repo contains:
* Card game engine
* Realtime Twitter keyword monitor
* the scores calculated for the game
* there's a possibility to create quizzes

The monitor can be used to find misconceptions realtime.

Here are the `repos` of the cardgame implementation, or the card _sets_:
* Repo Bitcoin misconceptions - [cardgame-btc](https://github.com/blockchainbird/cardgame-btc/)
* Repo Blockchain bullshit buster - [cardgame-bcb](https://github.com/blockchainbird/cardgame-bcb/)
* Repo Misconception about self sovereign identity - [cardgame-id](https://github.com/blockchainbird/cardgame-id/)

## Why create a Card game and a specific topical stack of cards?
There's always somebody wrong on the internet. When that itches, We need to get it right, don't we? And it needs to be fair. So we start writing, right away. As if it has urgency and it hasn't been done before....

_No, no, no. stop!_ A cardgame offers a platform to create reusable information. Easy to use, expert-backed and a slow game attached to it. So don't waste your time, use others knowledge and preparatory work.

#### What's the cardgame about?
You can choose any relevant topic that needs explaining, needs background information, needs it myths busted, etc.

#### Who's right, who's wrong?

Most cardgames *don't pretend to be right in everything at all times*. Our objective has been to:
 - present a **nuanced and more complete** take on the matter
 - **substantiate the answers** with empirical data gathered from reknowned sources in the field
 - offer **a way to improve the answers** by anyone via the [Telegram-group](https://t.me/bcbird)


## For who is the cardgame
Choose your own target group. The idea is however to activate them with the game, like for example a twitter poll. 

## What do we offer?
Fixed URLs to cards, questions, answers, related video, podcast, opinions of experts, and further reading.

We provide the tools in order to individualize your responses with the fixed URLS in social media:
1. Add your own tailor-made text
2. Snippets selection
3. Add pre-defined texts (neutral and for ease of use)
4. Send fixed urls of cards and fixed catergories of cards

## Copyright & License

All content in this repository is copyright by the contributors.

All text is licensed CC-BY, and all code is licensed under the MIT License.

Contributors: Kor Dwarshuis <@kordwarshuis>, Henk van Cann <@henkvancann>

## General instructions

* Cd to cardgame main directory, find file `.ev.example` 
* Copy file `.env-example` to `.env`, check that the file exists
* Run `npm install` from commandline to install dependencies

## Test on local machine
* Run `npm run serve` to start a webserver/ Click one of the links that will be provided, Example:
```
  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.178.68:8080/
```


## Stage to production server


#### Instructions for pushing to live:

The repository is a general repository from which you can create a BTC (Bitcoin) version and a BCB (Blockchain) version.

Before pushing to live server **four** files have to be edited in order to make it the BTC or the BCB version:



### 1: Filename: `/vue.config.js`

Open the file with a text-editor, e.g. `nano`<br/>
`nano ./vue.config.js`<br/>
Now you have a choice either to build a **Bitcoin** or **Blockchain** version. You can't build both a the same time. Uncomment the relevant code in `./vue.config.js`. 

Example<br/>
```
 //=============
  // BTC version
  publicPath: process.env.NODE_ENV === 'production' ? '/t/btc/' : '/',
  //=============

  //=============
  // BCB version
  // publicPath: process.env.NODE_ENV === 'production' ? '/t/bcb/' : '/',
  //=============

```
In vue.config.js you can define the subdirectory where you finally want to place the app.

### 2: Filename: `/public/.htaccess`

Open the file with a text-editor, e.g. `nano`<br/>
`nano ./public/.htaccess`<br/>
Now you have a choice either to build a **Bitcoin** or **Blockchain** version. You can't build both a the same time. Uncomment the relevant code in `./public/.htaccess`. 

Example: <br/>
```
    ####################
    # BTC version:
    RewriteBase /t/btc/
    ####################

    ####################
    # BCB version:
    # RewriteBase /t/bcb/
    ####################

```
### 3: Filename: `/.env`
Open the file with a text-editor, e.g. `nano`<br/>
`nano ./.env`<br/>
Now you have a choice either to build a **Bitcoin** or **Blockchain** version. You can't build both a the same time. Uncomment the relevant code in `./.env`. 

Please note: you have to restart local webserver to see changes in `.env` in effect.

Example:<br/>
```
####################
# BTC specific version:
####################
VUE_APP_TITLE="Bitcoin Misconceptions."
VUE_APP_DESCRIPTION="Misconceptions about bitcoin hold back progress. Found a misconception? Lookup-Copy-Paste our permanent links with curated expert info!"
VUE_APP_AUTHOR="Blockchain Bird"
VUE_APP_SOCIAL_MEDIA_IMAGE=social-media-bitcoin4.jpg
VUE_APP_SOCIAL_MEDIA_IMAGE_WIDTH=1200
VUE_APP_SOCIAL_MEDIA_IMAGE_HEIGHT=628
VUE_APP_GOOGLE_ANALYTICS_ID="XXXXXXXX"
####################

####################
# BCB specific version:
####################
#VUE_APP_TITLE="Blockchain Misconceptions."
#VUE_APP_DESCRIPTION="Misconceptions about blockchain hold back progress. Found a misconception? Lookup-Copy-Paste our permanent links with curated expert info!"
#VUE_APP_AUTHOR="Blockchain Bird"
#VUE_APP_SOCIAL_MEDIA_IMAGE=social-media-blockchain4.jpg
#VUE_APP_SOCIAL_MEDIA_IMAGE_WIDTH=1200
#VUE_APP_SOCIAL_MEDIA_IMAGE_HEIGHT=628
#VUE_APP_GOOGLE_ANALYTICS_ID="XXXXXXXX"
####################
```


Please note: `/.env` is not in repository, use `/.env.example` and create `/.env`. See instructions [here](#General-instructions)

### 4: Filename: `/live.sh`
Uncomment the relevant code in `./live.sh` and add your ssh login credentials to your hosting service.

Run `npm run build` to create a `./dist` directory (production version)

##### Optional script provided
This script can be used to push the build to the live web server.
Please note: `/live.sh` is not in repository, use `/live.example.sh` and create `/live.sh`.

More info on https://vuejs.org


## Technical information

This app is built in Vue.js. 

Libraries also used:

* Phirehose (https://github.com/fennb/phirehose)

The content is managed via Google Sheets, and then pulled to a .csv file via PHP
De content is pulled from the .csv file via D3.js:

Google Sheets -> data.csv -> card game

The Google Sheets step is not necessary and can be removed from the working flow if desired.

The .CSV step helps to speed the loading time, since Google Sheets tends to be slow at times.

## UX design

[Read more](./UX-design.md)
