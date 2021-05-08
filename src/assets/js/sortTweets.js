import {
    tweetStreamAttentionSeeker
} from '@/assets/js/tweetStreamAttentionSeeker';

export function sort(key) {
    // https://stackoverflow.com/a/282711 modified
    var container = document.querySelector(".tweets-realtime .tweets");
    var items = document.querySelectorAll(".tweets-realtime .tweet");
    // tweet at the top, anchor needed for scrolling to top
    var topTweet = document.querySelector("#topTweet");

    var itemsArr = [];
    var aa = 0;
    var bb = 0;

    for (var i in items) {
        if (items.hasOwnProperty(i)) {
            itemsArr.push(items[i]);
        }
    }

    itemsArr.sort(function (a, b) {
        aa = parseInt(a.querySelector('.' + key).dataset[key], 10);
        bb = parseInt(b.querySelector('.' + key).dataset[key], 10);

        return aa === bb ?
            0 :
            (aa < bb ? 1 : -1);
    });

    for (i = 0; i < itemsArr.length; ++i) {
        container.appendChild(itemsArr[i]);
    }

    // scroll
    // this query will return only one element, the first one, exactly what we need here:
    document.querySelector(".tweet").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
    });
    tweetStreamAttentionSeeker();
}