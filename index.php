<?php

  require("connessionedatabase.php");
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
 

  $array;
  $size=20;
  $page=0;
  $elementi;
  $query="select count(id) as tot from employees";
    if ($result = $mysqli->query($query)) {
      while ($row = $result->fetch_assoc()) {
        $elementi=$row["tot"];
      }
    }
$paginetot=ceil($elementi/$size);

  $method = $_SERVER['REQUEST_METHOD'];
  if ($method == 'POST'){
    

  } elseif ($method == 'GET'){
     
    $query="select * from employees order by id limit ".$page.",".$size;
    if ($result = $mysqli->query($query)) {
      while ($row = $result->fetch_assoc()) {
        $array[]=$row;
      }
    }
    $pagine=array(
      "size" => $size,
      "total_Elements" => $elementi,
      "TotalPages" => $paginetot,
      "number" => $page
      );
      
      $array[]=["pages" => $pagine];

$data=json_encode( $array);
echo $data;

  } elseif ($method == 'PUT'){
      

  } elseif ($method == 'DELETE'){
   
  }

  $mysqli->close();
?>