<?php 
    // https://stackoverflow.com/a/43664611
    $data = file_get_contents(" URL TO GOOGLE SHEETS – ASK FOR THE URL");

    // $var_str = var_export($data, true);
    // file_put_contents('data.csv', $var_str);
    $var_str = var_export($data, true);
    file_put_contents('../data/cards.csv', $var_str);


    // function writeContent($data) {
    //     $var_str = var_export($data, true);
    //     file_put_contents('data.csv', $var_str);
    // }

    // function sendMessage() {
        // the message
        // $msg = "Content updated.";

        // use wordwrap() if lines are longer than 70 characters
        // $msg = wordwrap($msg,70);

        // send email
        // mail("kor@dwarshuis.com","Hi this is an automated message to let you know etc etc \n\nThis is a new line.",$msg);
    // }

    // writeContent();
    // sendMessage();

    
    // sleep( 300 );

    // $var_str = var_export($data, true);
    // file_put_contents('data.csv', $var_str);

    // sleep( 300 );

    // $var_str = var_export($data, true);
    // file_put_contents('data.csv', $var_str);

    // sendMessage();



?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<body style="text-align: center;">
    <button style="font-size: 30px; margin-top: 1em;">Publish content card game</button>
    <div style="margin-top: 1em; font-size: 2em;" id="message"></div>
    <script>
        document.querySelector("button").addEventListener("click", function(){
            window.location = window.location;
        }, false);

        document.querySelector("#message").innerHTML = "Published: " + new Date();

    </script>
</body>
</html>
