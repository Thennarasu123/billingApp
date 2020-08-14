<?php
header("Access-Control-Allow-Origin: *");

$data = json_decode(file_get_contents("php://input"), true);
echo $data.' input ';
date_default_timezone_set('Asia/Kolkata');
error_reporting(E_ERROR | E_PARSE);
$params = array();
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$server = 'localhost';
$connectionInfo = array( "Database"=>"billing","UID"=>"sa", "PWD"=>"services",/*  *//* "Database"=>"DB_PM","UID"=>"sa","PWD"=>"thens123" *//* , "UID"=>"sa", "PWD"=>"services"  */);
$conn = sqlsrv_connect( $server, $connectionInfo );
echo "billing server";
exit;
?>