
<?php
// Configuration

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = $protocol.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/";

echo $url;

$domain = 'https://blockchainbird.org';
$pathCardGame1 = '/t/btc/';
$pathCardGame2 = '/t/bcb/';
$pathCardGame3 = '/t/id/';
$card = 'card/';
$content = 'https://blockchainbird.org/t/data/cards.csv';
$uniqueHeaderName = 'Unique URL';
$stackName = 'Stack';

// https://phpenthusiast.com/blog/parse-csv-with-php
// The nested array to hold all the arrays
$cardContent = [];

// Open file
if (($h = fopen("{$content}", "r")) !== false) {
    // Each line in the file is converted into an individual array that we call $data
    // The items of the array are comma separated
    while (($data = fgetcsv($h, 1000, ",")) !== false) {
        // Each individual array is being pushed into the nested array
        $cardContent[] = $data;
        // echo $data;
    }

    // Close the file
    fclose($h);
}

// find where the Unique URL is
// select the first row
$row0 = $cardContent[0];
for ($i = 0; $i < count($row0); $i++) {
    if ($row0[$i] == $uniqueHeaderName) {
        $arrayPositionUniqueURL = $i;
    }
    if ($row0[$i] == $stackName) {
        $arrayPositionStack = $i;
    }
}
//BTC
foreach ($cardContent as $key => $value) {
    if (strpos($cardContent[$key][$arrayPositionStack], '1') > -1) {
        foreach ($value as $key2 => $value2) {
            if ($row0[$key2] == $uniqueHeaderName && $value2 != $uniqueHeaderName) {
                echo $domain . $pathCardGame1 . $card . $value2 . "\r\n";
            }
        }
    }
}
//BCB
foreach ($cardContent as $key => $value) {
    if (strpos($cardContent[$key][$arrayPositionStack], '2') > -1) {
        foreach ($value as $key2 => $value2) {
            if ($row0[$key2] == $uniqueHeaderName && $value2 != $uniqueHeaderName) {
                echo $domain . $pathCardGame2 . $card . $value2 . "\r\n";
            }
        }
    }
}
//ID
foreach ($cardContent as $key => $value) {
    if (strpos($cardContent[$key][$arrayPositionStack], '3') > -1) {
        foreach ($value as $key2 => $value2) {
            if ($row0[$key2] == $uniqueHeaderName && $value2 != $uniqueHeaderName) {
                echo $domain . $pathCardGame3 . $card . $value2 . "\r\n";
            }
        }
    }
}
