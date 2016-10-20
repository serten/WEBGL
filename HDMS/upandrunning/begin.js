
gl=initWebGL(document.getElementById("experimental-webgl"));

function initWebGL(canvas) {
	var gl;
	try
	{
		gl = canvas.getContext("experimental-webgl");
	}
	catch (e)
	{
		var msg = "Error creating WebGL Context!: " + e.toString();
		alert(msg);
		throw Error(msg);
	}
	return gl;
}
