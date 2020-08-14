<?php
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);
 
// connect to the mysql database
$params = array();
$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
$server = 'localhost';
$connectionInfo = array( "Database"=>"billing","UID"=>"sa", "PWD"=>"services",/*  *//* "Database"=>"DB_PM","UID"=>"sa","PWD"=>"thens123" *//* , "UID"=>"sa", "PWD"=>"services"  */);
$conn = sqlsrv_connect( $server, $connectionInfo );
//mysqli_set_charset($link,'utf8');
 
// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request)+0;
 
// escape the columns and values from the input object
$columns = preg_replace('/[^a-z0-9_]+/i','',array_keys($input));
$values = array_map(function ($value) use ($conn) {
  if ($value===null) return null;
  return mysqli_real_escape_string($link,(string)$value);
},array_values($input));
 
// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
  $set.=($i>0?',':'').'`'.$columns[$i].'`=';
  $set.=($values[$i]===null?'NULL':'"'.$values[$i].'"');
}
 
// create SQL based on HTTP method
switch ($method) {
  case 'GET':
    $sql = "select * from `$table`".($key?" WHERE id=$key":''); break;
  case 'PUT':
    $sql = "update `$table` set $set where id=$key"; break;
  case 'POST':
    $sql = "INSERT INTO ".$table. ".."; break;
  case 'DELETE':
    $sql = "delete `$table` where id=$key"; break;
}
 
// excecute SQL statement
$result = sqlsrv_query($conn,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(sqlsrv_errors());
}
 
// print results, insert id or affected row count
if ($method == 'GET') {
  if (!$key) echo '[';
  for ($i=0;$i<sqlsrv_num_rows($result);$i++) {
    echo ($i>0?',':'').json_encode(sqlsrv_fetch_array($result));
  }
  if (!$key) echo ']';
} elseif ($method == 'POST') {
  //echo mysqli_insert_id($link);
  echo sqlsrv_query($conn, $sql, $params);
} else {
  echo sqlsrv_query($conn, $sql, $params);
}
 
// close mysql connection
mysqli_close($link);