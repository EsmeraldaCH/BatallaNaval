<?php

include("conexion.php");
$con=conectar();

$nombre=$_POST['nombre'];
$apellido=$_POST['apellido'];

if($nombre!=null||$talla!=null){
    $sql="insert into jujador(Nombre,Apellido) values('".$nombre."','".$apellido."')";
        mysqli_query($con,$sql);

        if($user=1){
            header("location:index.php");
        }
}

?>