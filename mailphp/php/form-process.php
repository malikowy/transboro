<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}

// CITY
    $city = $_POST["city"];

// PHONE
    $phone = $_POST["phone"];


$EmailTo = "blackbird969@gmail.com";
$Subject = "Nowa wiadomość z formularza";

// prepare email body text
$Body = "";
$Body .= "Name: ".$name . "\n";
$Body .= "City: ".$city . "\n";
$Body .= "Phone: ".$phone . "\n";
$Body .= "Email: ".$email . "\n";
$Body .= "Message: ".$message . "\n";


// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>