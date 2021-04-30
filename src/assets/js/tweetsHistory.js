import {
    tweetTemplate
} from "./tweetTemplate";

import {
    lazyloadImages
} from "@/assets/js/lazyloadImages";

export var tweetsHistory = function () {
    var tweetsContainer = document.querySelector(".tweets-realtime .tweets");
    // loading spinner:
    tweetsContainer.insertAdjacentHTML("afterbegin", '<div class="mx-auto"><div class="loading-historic-tweets m-5 spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div></div>');

    fetch(process.env.VUE_APP_REALTIME_TWITTER_HISTORY_JSON)

        // 1 json
        // .then(response => response.json())

        // 2 text
        .then(response => response.text())

        .then(data => {
            var response = JSON.parse(data);
            response = response.statuses;
            var domTemp = "";
            for (let i = 0; i < response.length; i++) {
                domTemp += tweetTemplate(
                    response[i].created_at,
                    response[i].id_str,
                    response[i].text,
                    response[i].lang,
                    response[i].timestamp_ms,
                    response[i].user.name,
                    response[i].user.screen_name,
                    response[i].user.followers_count,
                    response[i].user.profile_image_url_https,
                    response[i].user.verified
                );
            }
            
            document.querySelector(".tweets-realtime .tweets").insertAdjacentHTML("afterbegin", domTemp);

            lazyloadImages();

            // remove loading spinner:
            var loader = document.querySelector('.loading-historic-tweets');
            loader.parentNode.removeChild(loader);
        })
        .catch(error => {
            // handle the error
            console.log("No historic tweets available");

        });
};