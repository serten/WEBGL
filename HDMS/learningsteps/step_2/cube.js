var gl;
var points=[];
var colors=[];

var vertices=[];
var vertexColors =[];

var time=0;
var axis;
var xAxis=0;
var yAxis=1;
var zAxis=2;
var flag = false;
var i=0;
var scaleFactor=1.0;
var scale;
window.onload = function init()
{
	
	document.getElementById("xButton").onclick=
		function(){axis = xAxis};

	document.getElementById("yButton").onclick=
		function(){axis = yAxis};

	document.getElementById("zButton").onclick=
		function(){axis = zAxis};

	document.getElementById("ButtonT").onclick=
		function(){flag = !flag};	
	
	var canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl)
	{
		alert("WebGL isn't available");
	}
	
	gl.enable(gl.DEPTH_TEST);	

	 
	
	vertices = [
		vec4 (-0.5, -0.5,  0.5, 1.0 ),
		vec4 (-0.5,  0.5,  0.5, 1.0 ),
		vec4 ( 0.5,  0.5,  0.5, 1.0 ),
		vec4 ( 0.5, -0.5,  0.5, 1.0 ),
		vec4 (-0.5, -0.5, -0.5, 1.0 ),
		vec4 (-0.5,  0.5, -0.5, 1.0 ),
		vec4 ( 0.5,  0.5, -0.5, 1.0 ),
		vec4 ( 0.5, -0.5, -0.5, 1.0 ),
	];

	vertexColors = [
		vec4 (0.0, 0.0, 0.0, 1.0 ),
		vec4 (1.0, 0.0, 0.0, 1.0 ),
		vec4 (1.0, 1.0, 0.0, 1.0 ),
		vec4 (0.0, 1.0, 0.0, 1.0 ),
		vec4 (0.0, 0.0, 1.0, 1.0 ),
		vec4 (1.0, 0.0, 1.0, 1.0 ),
		vec4 (0.0, 1.0, 1.0, 1.0 ),
		vec4 (1.0, 1.0, 1.0, 1.0 ),
	];

	
	//colorCube();

	// var noktalar = new Float32Array([-0.5, 0.5, 0.5, 1, -0.5, -0.5, 0.5, 1, 0.5, -0.5, 0.5, 1, -0.5, 0.5, 0.5, 1, 0.5, -0.5, 0.5, 1, 0.5, 0.5, 0.5, 1]);
	// Configure WebGL
	
	gl.viewport(0, 0, canvas.width,canvas.height);
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	
	// Load shaders and initialize attribute buffers

	var program = initShaders (gl, "vertex-shader", "fragment-shader");
		
	gl.useProgram( program );

	timeLoc = gl.getUniformLocation ( program, "time" ); 
	
	theta = [0,0,0];
	thetaLoc = gl.getUniformLocation ( program, "theta" );
	
	light = gl.getUniformLocation ( program, "LightPosition" );
	gl.uniform4fv (light, vec4(0.0, 5.0, -5.0, 1.0) );

shin=gl.getUniformLocation (program, "Shininess");
gl.uniform1f(shin,30.0);

scale=gl.getUniformLocation (program, "scale");

light1 = gl.getUniformLocation ( program, "AmbientProduct" );
	gl.uniform4fv (light1, vec4(0.5, 0.2, 0.5, 1.0) );
light2 = gl.getUniformLocation ( program, "DiffuseProduct" );
	gl.uniform4fv (light2, vec4(0.5, 0.2, 0.5, 1.0) );
light3 = gl.getUniformLocation ( program, "SpecularProduct" );
	gl.uniform4fv (light3, vec4(0.5, 0.2, 0.5, 1.0) );	

	/*// Colors
	var cBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData (	gl.ARRAY_BUFFER, flatten( colors ), gl.STATIC_DRAW );
	
	var vColor = gl.getAttribLocation ( program, "vColor" );
	gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 ); 
	gl.enableVertexAttribArray ( vColor );
	// Load the data inti GPU
	*/

	for(var i=0; i<pot.vertexPositions.length;i++)
	{
		var tut=pot.vertexPositions[i];
		pot.vertexPositions[i]=tut*0.3;
	}
	var vBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(pot['vertexPositions']), gl.STATIC_DRAW );
	
	//associate out shader variables with our data bufferData
	
	var vPosition = gl.getAttribLocation ( program, "vPosition" );
	gl.vertexAttribPointer ( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vPosition );


	var nBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, nBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(pot1['vertexNormals']), gl.STATIC_DRAW );
	
	//associate out shader variables with our data bufferData
	
	var vNormal = gl.getAttribLocation ( program, "vNormal" );
	gl.vertexAttribPointer ( vNormal, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vNormal );






	render();
}

/*
function render()
{
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays( gl.TRIANGLES, 0, 36);
	requestAnimFrame ( render ); 
	
	
}
*/

function render ()
{
	
	if(flag) {theta[axis]+=2.0;
}

	gl.uniform3fv(thetaLoc, theta);
	gl.uniform1f(scale, scaleFactor);
	
	
	
	//time=time+0.1;
	//gl.uniform1f(timeLoc,time);
	
	gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	gl.drawArrays ( gl.TRIANGLES, 0, pot['vertexPositions'].length/3);

	requestAnimFrame ( render );
}

function quad (a, b, c, d)
{
	var indices = [a, b, c, a, c, d];
	for (var i = 0; i < indices.length; i++)
	{
		points.push(vertices[indices[i]]);
		
		// for vertex colors use
		//colors.push(vertexColors[indices[i]]);

		// for solid colored faces use
		colors.push(vertexColors[a]);				
	}
}

function colorCube ()
{
	quad(1,0,3,2);
	quad(2,3,7,6);
	quad(3,0,4,7);
	quad(6,5,1,2);
	quad(4,5,6,7);
	quad(5,4,0,1);	
	
}

function scaleFunction( a)
{
	scaleFactor+=a;
}

