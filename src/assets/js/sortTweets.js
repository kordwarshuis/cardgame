export function sort(key) {

    // console.log("sorting started");
    // Declaring Variables 
    var geek_list, i, run, li, stop;

    // Taking content of list as input 

    // setTimeout(function(){
    //     geek_list = document.querySelector(".tweets-realtime");
    // console.log('geek_list: ', geek_list);
    // }, 1000);
    geek_list = document.querySelector(".tweets-realtime .tweets");
    // console.log('geek_list: ', geek_list);

    run = true;

    while (run) {
        run = false;
        li = geek_list.querySelectorAll('.tweet');
        // console.log('li: ', li);

        // Loop traversing through all the list items 
        for (i = 0; i < (li.length - 1); i++) {
            stop = false;
            console.log('key: ', li[i].querySelector(key));
            console.log('XXXXXX: ', li[i].querySelector(key));
            // if (parseInt(li[i].querySelector(key).dataset[key].trim(), 10) <
            //     parseInt(li[i + 1].querySelector(key).dataset[key].trim(), 10)) {
            //     stop = true;
            //     break;
            // }
        }

        /* If the current item is smaller than  
           the next item then adding it after  
           it using insertBefore() method */
        if (stop) {
            document.querySelector(".tweets-realtime .tweets").insertBefore(
                li[i + 1], li[i]);

            run = true;
            
        }


    }


    // document.querySelector(".tweets-realtime .tweets").scrollTop = 0;


    var topTweet = document.querySelector("#topTweet");
        
    if (topTweet) {
        // topTweet.remove();
        topTweet.removeAttribute('id');
    }
    
    document.querySelector(".tweets-realtime .tweets .tweet").setAttribute('id', 'topTweet');

    // document.querySelector("#topTweet").scrollTo(0, 0);
    document.querySelector("#topTweet").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

}