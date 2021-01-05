import {
    formatDistance
} from 'date-fns';
import {
    convertTwitterTimeStamp
} from "@/assets/js/convertTwitterTimeStamp.js";

export function timestampTweet(time) {
    return formatDistance(convertTwitterTimeStamp(time), Date.now());
}

export var recalculateTweetTimeStamps = function () {
    function a() {
        var allTimestamps = document.querySelectorAll('.timestamptweet');
        allTimestamps.forEach(function (item) {
            item.innerHTML = timestampTweet(item.dataset.createdate);
        });
    }

    a();
    setInterval(function () {
        a();
    }, 60000);
};