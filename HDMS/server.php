<?php




$port=2001;


$socket = stream_socket_server("udp://127.0.0.1:$port", $errno, $errstr, STREAM_SERVER_BIND);
if (!$socket) {
    die("$errstr ($errno)");
}

do {
    $pkt = stream_socket_recvfrom($socket, 100, 0, $peer);

    //$data= socket_read($socket,100,PHP_NORMAL_READ);


    echo "$peer : $pkt\n";
    stream_socket_sendto($socket, date("D M j H:i:s Y\r\n"), 0, $peer);

    $handle;


if(file_exists("permenant.txt")) {
   
    $handle       = fopen("permenant.txt", "a+");
    
}
else {
	$handle = fopen("permenant.txt","w");
}
fwrite($handle, "$peer\n");
fclose($handle);



} while ($pkt !== false);




/*
$s=socket_create(AF_INET,SOCK_DGRAM,0);
$buf;
socket_bind($s,"localhost",$port);
if(socket_recvfrom($s,$buf,100,0,$rip,$rport))
{
	asd();
}

//echo $buf;


function asd()
{

Global $s, $buf, $rip,$rport,$port ;

echo "Received from => $rip ,:$rport  -  $buf";

socket_sendto($s,"HI FROM \n ",100,0,"localhost",$port);

}
*/





/*
$socket = stream_socket_server("udp://127.0.0.1:1113", $errno, $errstr, STREAM_SERVER_BIND);
if (!$socket) {
    die("$errstr ($errno)");
}

do {
    $pkt = stream_socket_recvfrom($socket, 1, 0, $peer);

    $data =fread($pkt,1024);
    echo "$data: $peer\n";
    //stream_socket_sendto($socket, date("D M j H:i:s Y\r\n"), 0, $peer);
} while ($pkt !== false);
*/

?>