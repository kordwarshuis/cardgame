import {
    formatDistance
} from 'date-fns';
import {
    convertTwitterTimeStamp
} from "@/assets/js/convertTwitterTimeStamp.js";

export function timestampTweet(time) {
    return formatDistance(convertTwitterTimeStamp(time), Date.now());
}

function TweetAgeInMS(time) {
    return (new Date(new Date().getTime()) - (convertTwitterTimeStamp(time)).getTime());
}

export var recalculateTweetTimeStamps = function () {
    function a() {
        var allTimestamps = document.querySelectorAll('.timestamptweet');
        var allTweets = document.querySelectorAll('.tweets-container .card');
        allTimestamps.forEach(function (item) {
            item.innerHTML = timestampTweet(item.dataset.createdate);

            // if tweet is older than 14400000ms (4 hour) a html attribute class is attached
            if (TweetAgeInMS(item.dataset.createdate) > 14400000) {
                item.closest('.card').classList.add("oldTweet");
            }
        });
    }

    a();
    setInterval(function () {
        a();
    }, 60000);
};