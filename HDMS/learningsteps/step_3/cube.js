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
var texture;
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


	for(var i=0; i<pot.vertexPositions.length;i++)
	{
		var tut=pot.vertexPositions[i];
		pot.vertexPositions[i]=tut*0.3;
	}

	//associate out shader variables with our data bufferData
	var vBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(pot['vertexPositions']), gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation ( program, "vPosition" );
	gl.vertexAttribPointer ( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vPosition );


	//associate out shader variables with our data bufferData
	var nBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, nBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(pot1['vertexNormals']), gl.STATIC_DRAW );
	
	var vNormal = gl.getAttribLocation ( program, "vNormal" );
	gl.vertexAttribPointer ( vNormal, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vNormal );


	//associate out shader variables with our data bufferData
	var vTexCoord = gl.getAttribLocation ( program, "vTexCoord" );
	var tBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, tBuffer );
	gl.vertexAttribPointer ( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(pot2['uv']), gl.STATIC_DRAW );
	gl.enableVertexAttribArray ( vTexCoord );
	
	render(program);
}


function render (program)
{
	
	textureFunction(gl,program);
	if(flag) {theta[axis]+=2.0;}

	gl.uniform3fv(thetaLoc, theta);
	gl.uniform1f(scale, scaleFactor);
	
	
	
	//time=time+0.1;
	//gl.uniform1f(timeLoc,time);
	
	gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
	
	gl.drawArrays ( gl.TRIANGLES, 0, pot['vertexPositions'].length/3);

	requestAnimFrame ( render );
}

function scaleFunction(a)
{
	scaleFactor+=a;
}
function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
};

function  setupTextureFilteringAndMips(width, height) {
  	if (isPowerOf2(width) && isPowerOf2(height)) {
    	// the dimensions are power of 2 so generate mips and turn on 
    	// tri-linear filtering.
    
    		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
  	} 
	else 
	{
    		// at least one of the dimensions is not a power of 2 so set the filtering
    		// so WebGL will render it.
	    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  	}
}

function textureFunction(gl,program)
{
	texture = gl.createTexture();
	image = new Image();
	//image.crossOrigin = "use-credentials";
	
	image.onload=function(){
	    		
	  	gl.bindTexture(gl.TEXTURE_2D, texture);
		// Set the parameters so we can render any size image.
		/*
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		*/
	  	// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		setupTextureFilteringAndMips(image.width, image.height);
		//gl.generateMips(gl.TEXTURE_2D);
		/*
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);  */

	}

	image.src = "brick.png";
}


