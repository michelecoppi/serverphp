<?
  require("connessionedatabase.php");
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: *');


 

  $array= array();
  $page = @$_GET["page"] ?? 0;
  $size = @$_GET["size"] ?? 20;
  $id = @$_GET["id"] ?? 0;
  $elementi;
  $query="select count(id) as tot from employees";
    if ($result = $mysqli->query($query)) {
      while ($row = $result->fetch_assoc()) {
        $elementi=$row["tot"];
      }
    }
$paginetot=ceil($elementi/$size);

$query="select * from employees order by id limit ".$page.",".$size;
if ($result = $mysqli->query($query)) {
  while ($row = $result->fetch_assoc()) {
    $impiegati[]=$row;
  }
}


$array['_embedded']= array(
  "employees" => $impiegati
);


$array['pages']=array(
"size" => $size,
"totalElements" => $elementi,
"TotalPages" => $paginetot,
"number" => $page
);

  $method = $_SERVER['REQUEST_METHOD'];

  if ($method == 'POST'){
    $datiPOST = json_decode(file_get_contents('php://input'), true);

    $firstname=$datiPOST["first_name"];
    $lastname=$datiPOST["last_name"];
    $gender=$datiPOST["gender"];

    $queryPOST="INSERT INTO employees (first_name, last_name, gender) VALUES ('$firstname','$lastname','$gender')" ;
    $resultPOST= $mysqli-> query($queryPOST);
     
    echo json_encode($datiPOST);

    } elseif ($method == 'GET'){

$data=json_encode( $array);
echo $data;

  } elseif ($method == 'PUT'){
    $datiPUT = json_decode(file_get_contents('php://input'), true);
 
    $firstname=$datiPUT["first_name"];
    $lastname=$datiPUT["last_name"];
    $gender=$datiPUT["gender"];


    $queryPUT="UPDATE employees SET first_name ='$firstname' , last_name = '$lastname', gender ='$gender' WHERE id = $id";
    $resultPUT = $mysqli-> query($queryPUT);
    echo json_encode($datiPUT);
  } elseif ($method == 'DELETE'){
   

   $queryDELETE="DELETE from employees where id =".$id ;
   $resultDELETE= $mysqli-> query($queryDELETE);

   echo json_encode($array);
  }

  $mysqli->close();
?>