import {
    tweetStreamAttentionSeeker
} from '@/assets/js/tweetStreamAttentionSeeker';

export function toggleVerifiedTweets() {
    // https://stackoverflow.com/a/282711 modified
    var items = document.querySelectorAll(".tweets-realtime .tweet");

    items.forEach(function (a) {
        if (a.querySelector('.verified').dataset.verified !== "true") {
            a.classList.toggle('displayBlokTweet');
        }
    });
}