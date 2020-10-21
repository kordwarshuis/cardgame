// Convert URLs (w/ or w/o protocol), @mentions, and #hashtags into anchor links
// http://roadha.us/2011/03/create-anchor-links-in-twitter-status-text-with-javascript/
export function twitterLinks(text) {
    var base_url = 'http://twitter.com/'; // identica: 'http://identi.ca/'
    var hashtag_part = 'search?q=#'; // identica: 'tag/'
    // convert URLs into links
    text = text.replace(
        /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
        function ($0, $1, $2) {
            return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
        });
    // convert protocol-less URLs into links
    text = text.replace(
        /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
        function ($0, $1, $2) {
            return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
        });
    // convert @mentions into follow links
    text = text.replace(
        /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
        function ($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + $ +
                '" title="Follow ' + $3 + '" target="_blank">@' + $3 +
                '</a>');
        });
    // convert #hashtags into tag search links
    text = text.replace(
        /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
        function ($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3 +
                '" title="Search tag: ' + $3 + '" target="_blank">#' + $3 +
                '</a>');
        });
    return text;
}