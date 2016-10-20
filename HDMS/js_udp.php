<html>
<head>
<script>

function js_client()
{
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
client.bind(2001);

var message = new Buffer ('my datagram');
client.send(message, 0, message.length, 2001, "104.32.173.168");
}
</script>
</head>
<body>

<input type="button" onclick="js_client()" />

</body>
<html>


