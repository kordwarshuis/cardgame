# Rules of the game and how scores are calculated periodically

First read:
- [README](../README.md)
- [Home](Home.md) of the documentation

### What's the "game" in the cardgame
Periodically we count the number of likes, retweets and responses you get on the use of a card link. You score points relatively to the number of followers you have. Weekly we create **a high score list** that grants the players eternal fame. 
![Grand score list all times](../Images/grand-champion.jpg)

### Game rules
The current rules of the game are here:

#### First and foremost: respect 
It's a twitter - game. However Twitter is used with respect and all it's users will be handled with respect. In a tweet we might criticize what people think of what they do, **but we never flame people**. Strict on the content, soft towards the people. Always. 
> Examples:<br/>
> You are stupid -> No! "You say stupid things" -> OK <br/>
> Incapable bag of shit you are -> No! "IMO You lack abilities" -> OK

First offence means we exclude you from the ranking for a week, second offence is out for half a year, third offence we will permanently block the twitter-id involved.

#### Harvest use of cards
Cards have a unique fixed url. Periodically we harvest the public data about the use of the url in twitter, we count the points and print a report.

#### Awarding cards and points
The routine of our game is: 
1. search all cards in a fixed timeframe (e.g. a week)
2. identify all card game tweets per twitter-id
3. search alle likes, retweets en responses per twitter-id and card combination
4. a retweet of a preceding handed out card, will give the retweeter and the original tweeter points. Original tweeter gets 0,5, retweeter gets 1 point.
5. People with a small number of followers get a bonus for their points. 0-1K index number is 1, 1-10K index number is 0,75, 10K-100K, index number is 0,5 100K and above: 0,25.
6. A _like_ is 1 point, and currently both a _retweet_ (with or without comment) and a _response_ are also 1 point.

Example:<br/>
@tw1ttWhaling13 has 15K followers<br/>
@Sma11butF13rce has 500 followers<br/>

The weekly harvest routine found:
@tw1ttWhaling13 uses card 'Criminals' and gets: 5 responses (excluding his own responses), 10 retweets and 50 likes
@Sma11butF13rce uses card 'Energy-waste' and gets: 3 responses (excluding his own responses), 1 retweets and 5 likes
@Sma11butF13rce has retweeted to the '_Tax evasion_' card of @tw1ttWhaling13 of _last_ week and responded to it too. That response seemed to be spot on because @Sma11butF13rce got 10 likes and 5 retweets on that comment.

##### How will be the points be calculated of this example?
The straight Twitter-like credits would be: <br/>
@tw1ttWhaling13: 5+10+50 = 65 plus this weeks points from last week's tweet: 10+5 = 15. 80 points in total.<br/>
@Sma11butF13rce:3+1+5 = 9 points<br/>

> This is not much of a game, is it. We need more acknowledgement for @Sma11butF13rce...

**The Card game credits will be:** <br/>
@tw1ttWhaling13 is a whale in categorie 3 twitter-followers: the index number is 0,5, @Sma11butF13rce: the index number is 1.

So based on rules 4,5,6 above: <br/>
@tw1ttWhaling13: 80 points in total times index 0,5 (rule 5) = 40 points + 0,5*15 points (rule 4) = 47,5 points.  <br/>
@Sma11butF13rce:3+1+5 = 9 points*index 1 = 9 points + 1 times 15 points = 24 points.

#### Disclaimer enforcement of game rules
The Card game 'high score' routine uses Google and Twitter to harvest and log the use of the cards (Google results) . We provide those results for those players who think they have been nicked by the high score.
We don't know for sure if Google and Twitter hand over the right results. Anyway we base our scoring on the results and provide a log file per week.

#### Periodical report
Consisting of: 
1. High score and eternal fame for certain twitter-ids
2. Verifiable proofs of rule execution by the routine described above.
3. Tweets about the score

### Card game goes forward?
This has certainly not fully materialized yet. The game could be enhanced in different directions: 
1. score points for the number of likes you get when you use one of the links to cards
2. score points for the number of posts (mind you, it could encourage spam to "win" the game)
3. score points for the number of cards you receive (however this is rather sarcastic)
Feel free to come up with ideas for the game element in the tool.