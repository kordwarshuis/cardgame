export function tweetStreamAttentionSeeker() {
    var allTweets = document.querySelectorAll('.tweets-realtime .newTweet');

    allTweets.forEach(element => {
        element.classList.add('attention-seeker');
        setTimeout(function () {
            element.classList.remove('attention-seeker');
        }, 500);
    });
}