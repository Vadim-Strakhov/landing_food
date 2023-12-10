<?php 

// // Forms

//_ Первый способ через XMLHttpReques

// $_POST = json_decode(file_get_contents('php://input'), true); //_ Для json

// echo var_dump($_POST );

//_ Второй способ через fetch

//* Для json

$_POST = json_decode(file_get_contents('php://input'), true); 

echo var_dump($_POST );

//* Для  formData

// echo var_dump($_POST );

?>