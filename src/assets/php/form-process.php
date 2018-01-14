<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Proszę podać imię ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email jest wymagany ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Treść jest wymagana ";
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
$Body .= "Dane: ".$name . "\n";
$Body .= "Miasto: ".$city . "\n";
$Body .= "Telefon: ".$phone . "\n";
$Body .= "Email: ".$email . "\n";
$Body .= "Wiadomość: ".$message . "\n";


// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Coś poszło nie tak :(";
    } else {
        echo $errorMSG;
    }
}

?>