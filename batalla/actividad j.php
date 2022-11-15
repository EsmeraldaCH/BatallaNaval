
<?php

include("conexion.php");
$con=conectar();

$nombre=$_POST['nombre'];
$apellido=$_POST['apellido'];

if($nombre!=null||$apellido!=null){
    $sql="insert into jugador(Nombre,Apellido) values('".$nombre."','".$apellido."')";
        mysqli_query($con,$sql);

        if($user=1){
            header("Location: battle.html");
        }
}




?>