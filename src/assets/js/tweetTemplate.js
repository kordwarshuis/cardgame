import {
    twitterLinks
} from "./twitterLinks";
import {
    timestampTweet
} from "@/assets/js/calculateTweetTimeStamps";

import {
    svgfile
} from "@/assets/img/icons/flat/verified-svg.js";

export var tweetTemplate = function (
    createdAt = "Thu Jan 01 00:00:00 +0000 1970",
    idStr = "0",
    text = "-",
    lang = "en",
    timestampMs = "0",
    userName = "-",
    userScreenName = "-",
    userFollowersCount = "-",
    userProfileImageUrlHttps = "",
    userVerified = "-"
) {
    var verifiedString = "";
    var isVerified = false;

    if (userVerified === false) {
        verifiedString = "No ";
        isVerified = false;
    } else {
        verifiedString = "Yes " + svgfile;
        isVerified = true;
    }

    var template = "<div data-verified='"+ isVerified +"' class='card mb-3 pt-3 tweet displayBlokTweet" + "'>" +
        "<div class='card-body p-2'>" +
        "<div class='row pt-3'>" +
        "<button class='close'><span class='visuallyhidden'>remove this tweet</span>×</button>" +
        //IMAGE
        "<div class='col-auto' >" +
        "<img style='width: 50px;' class='float-left' data-src='" + userProfileImageUrlHttps + "' src='" + require('@/assets/img/logo/logo.png') + "' alt=''></img>" +
        "</div>" +

        // TEXT
        "<div class='col pl-0'>" +
        "<div class='row'>" +
        // TWEET
        "<div class='col-12'>" +
        "<p>" + twitterLinks(text) + "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +

        "<div class='row mb-3'>" +
        "<div class='col-6'>Name: " + userName + "</div>" +
        "<div class='col-6'></div>" +

        "<div class='col-6 mb-3'>Verified: " + verifiedString + "</div>" +
        "<div class='col-6 mb-3'>Followers: <span class='followerscount' data-followerscount='" + userFollowersCount + "'>" + userFollowersCount + "</span></div>" +

        "<div class='col-6'></div>" +
        "<div data-createdate='" + createdAt + "' data-timestampms='" + timestampMs + "' class='col-6 timestamptweet timestampms'>" +
        timestampTweet(createdAt) + "</div>" +
        "</div>" +

        "<div class='row'>" +
        "<div class='col-6'><a class='go-to-tweet btn btn-primary m-1' target='_blank' rel='noopener' href='https://twitter.com/" + userScreenName + "/status/" + idStr + "'>" + "Go to tweet</a></div>" +
        "<div class='col-6 text-right'><button type='button' class='btn btn-primary mt-1 mr-1 ml-0 select-tweet'>Bookmark</button></div>" +
        "</div>" +
        "</div>" +
        "</div>";
    return template;
};