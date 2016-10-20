<?php

$port=2001;

//echo $_SERVER['REMOTE_ADDR'];
$ADDR="".$_SERVER['REMOTE_ADDR'];

//$port="".$_SERVER['REMOTE_PORT'];



$s=socket_create(AF_INET,SOCK_DGRAM,0);


socket_sendto($s,"HI FROM: $ADDR \n ",100,0,"localhost",$port);






?>
