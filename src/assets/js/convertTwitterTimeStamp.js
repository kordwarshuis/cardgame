// https://stackoverflow.com/a/59329495
// input can be json string or object
export function convertTwitterTimeStamp(timestamp) {
    // https://stackoverflow.com/a/2766516/9749918
    var date = new Date(
        timestamp.replace(/^\w+ (\w+) (\d+) ([\d:]+) \+0000 (\d+)$/, "$1 $2 $4 $3 UTC")
    );
    return date;
}