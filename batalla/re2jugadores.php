<?php



include("conexion.php");
$con=conectar();

$nombre1= $_POST["nombre1"];
$apellido1= $_POST["apellido1"];

$nombre2= $_POST["nombre2"];
$apellido2= $_POST["apellido2"];

if($nombre1!=null||$apellido1!=null||$nombre2!=null||$apellido2!=null){
    $sql="insert into jugadores(Nombre1,Apellido1, Nombre2, Apellido2) values('".$nombre1."','".$apellido1."','".$nombre2."','".$apellido2."')";
        mysqli_query($con,$sql);

        if($user=1){
            header("Location: batalla .html");
        }
}
?>