<html>

<?php
error_reporting(E_ALL);
$portName = $_SERVER['REMOTE_PORT'];
$ip = $_SERVER['REMOTE_ADDR'];

$handle = fopen("connection","w");

fwrite($handle, $ip);

fwrite($handle, "\n");

fwrite($handle, $portName);
    
fwrite($handle, "\n".date("Y/m/d")."  :  ".date("h:i:sa"));
    
    

echo "hello = $ip : $portName";

fclose($handle);


?>


<body>


<script>

window.onload = function()
{
    
    //setTimeout(location.reload(),1000);
    
}



</script>





</body>
