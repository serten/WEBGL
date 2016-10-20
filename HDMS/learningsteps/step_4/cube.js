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
var canvas;

var XspL ;
var XpiL;
var XwiL ;

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
	
	canvas = document.getElementById("gl-canvas");
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
		//console.log(pot.vertexPositions[i]);
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
	
	
	XspL = gl.getUniformLocation ( program, "Xsp" );
	
	XpiL = gl.getUniformLocation ( program, "Xpi" );

	XwiL = gl.getUniformLocation ( program, "Xiw" );
//intial values of camera
	camera.FOV=60;
	camera.position[0]=1;
	camera.position[1]=1;
	camera.position[2]=1;
	camera.lookat[0]=0.1;
	camera.lookat[1]=0.1;
	camera.lookat[2]=0.1;
	camera.worldup[0]=0;
	camera.worldup[1]=1;
	camera.worldup[2]=0;
	
	INT_MAX=100000000.0;
	PI=3.14;

	for(var i=0;i<4;i++){
		Xsp[i]=[];
		Xpi[i]=[];
		Xiw[i]=[];
		Xm[i]=[];
	}
	render(program);
}


function render (program)
{
	
	textureFunction(gl,program);
	adjustCamera(gl,program);
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

var Xsp=[]; 
var Xpi=[];
var Xiw=[];
var Xm=[];
var camera=[ "FOV", "worldup", "lookat", "position"];
camera.position=[];
camera.worldup=[];
camera.lookat=[];
var INT_MAX;
var PI;

function posFunction(index,value){

	camera.position[index]+=value;
}
function lookFunction(index,value){

	camera.lookat[index]+=value;
}

function adjustCamera(gl, program){
	
/*
	//setup Xsp

	Xsp[0][0]=1;
	Xsp[0][1]=0;
	Xsp[0][2]=0;
	Xsp[0][3]=0;

	Xsp[1][0]=0;
	Xsp[1][1]=1;
	Xsp[1][2]=0;
	Xsp[1][3]=0;
	
	Xsp[2][0]=0;
	Xsp[2][1]=0;
	Xsp[2][2]=INT_MAX;
	Xsp[2][3]=0;

	Xsp[3][0]=0;
	Xsp[3][1]=0;
	Xsp[3][2]=0;
	Xsp[3][3]=1;
	

	
	


	

	
	//Adjusting the FOV inside Xsp
	Xsp[2][2]=INT_MAX*Math.tan(PI*(camera.FOV)/180/2);
	//projection xform Xpi 
	Xpi[0][0]=1;Xpi[0][1]=0;Xpi[0][2]=0;Xpi[0][3]=0;
	Xpi[1][0]=0;Xpi[1][1]=1;Xpi[1][2]=0;Xpi[1][3]=0;
	Xpi[2][0]=0;Xpi[2][1]=0;Xpi[2][2]=1;Xpi[2][3]=0;
	Xpi[3][0]=0;Xpi[3][1]=0;Xpi[3][2]=Math.tan(PI*(camera.FOV)/180/2);Xpi[3][3]=1;

	//FROM POWERPOINT-------------------------------------------------------------------------------------FOR Xiw
	//z=cl
	
	var campvec=[];
	var hold=Math.sqrt(camera.position[0]*camera.position[0]+camera.position[1]*camera.position[1]+camera.position[2]*camera.position[2]);
	
	campvec[0]=camera.position[0]/hold;
	campvec[1]=camera.position[1]/hold;
	campvec[2]=camera.position[2]/hold;
	

	var zvector=[];
	zvector[0]=camera.lookat[0]-camera.position[0];
	zvector[1]=camera.lookat[1]-camera.position[1];
	zvector[2]=camera.lookat[2]-camera.position[2];

	//z=cl/|cl| unit z vector
	hold=Math.sqrt(zvector[0]*zvector[0]+
		       zvector[1]*zvector[1]+
		       zvector[2]*zvector[2]);

	zvector[0]=zvector[0]/hold;
	zvector[1]=zvector[1]/hold;	
	zvector[2]=zvector[2]/hold;

	
	//up direction (unit vector)
	hold=Math.sqrt(camera.worldup[0]*camera.worldup[0]+
		            camera.worldup[1]*camera.worldup[1]+
					camera.worldup[2]*camera.worldup[2]);
	
        var worldupvector=[];
	worldupvector[0]=camera.worldup[0]/hold;
	worldupvector[1]=camera.worldup[1]/hold;
	worldupvector[2]=camera.worldup[2]/hold;
////////////////////////////////////////////////////////from internet
	//Finding sidevector X = z X worldup
	var xvector=[];
	xvector[0]=zvector[1]*worldupvector[2]-zvector[2]*worldupvector[1];
	xvector[1]=zvector[2]*worldupvector[0]-zvector[0]*worldupvector[2];
	xvector[2]=zvector[0]*worldupvector[1]-zvector[1]*worldupvector[0];

	//finding y vector  y = z X xvector
	var yvector=[];
	yvector[0]=zvector[1]*xvector[2]-zvector[2]*xvector[1];
	yvector[1]=zvector[2]*xvector[0]-zvector[0]*xvector[2];
	yvector[2]=zvector[0]*xvector[1]-zvector[1]*xvector[0];
		
Xiw[0][0]=xvector[0];
Xiw[0][1]=xvector[1];
Xiw[0][2]=xvector[2];
Xiw[0][3]=0;

Xiw[1][0]=yvector[0];
Xiw[1][1]=yvector[1];
Xiw[1][2]=yvector[2];
Xiw[1][3]=0;

Xiw[2][0]=zvector[0];
Xiw[2][1]=zvector[1]
Xiw[2][2]=zvector[2]
Xiw[2][3]=0;

Xiw[3][0]=camera.position[0];
Xiw[3][1]=camera.position[1];
Xiw[3][2]=camera.position[2];
Xiw[3][3]=1;
////////////////////////////////////////////////////////7
	//u'=up - (up . Z) Z
/*	hold=zvector[0]*worldupvector[0]+zvector[1]*worldupvector[1]+zvector[2]*worldupvector[2];
	var upvector=[];	
	upvector[0]=worldupvector[0]-hold*zvector[0];
	upvector[1]=worldupvector[1]-hold*zvector[1];
	upvector[2]=worldupvector[2]-hold*zvector[2];

	
	//y=up'/|up'|
	var yvector=[];
	hold=Math.sqrt(upvector[0]*upvector[0]+
								 upvector[1]*upvector[1]+
								 upvector[2]*upvector[2]);
	yvector[0]= upvector[0]/hold;
	yvector[1]= upvector[1]/hold;
	yvector[2]= upvector[2]/hold;

	//Finding sidevector X = Y X Z
	var xvector=[];
	xvector[0]=yvector[1]*zvector[2]-yvector[2]*zvector[1];
	xvector[1]=yvector[2]*zvector[0]-yvector[0]*zvector[2];
	xvector[2]=yvector[0]*zvector[1]-yvector[1]*zvector[0];
	

	//x vector normalization
	hold = Math.sqrt(xvector[0]*xvector[0]+
						 xvector[1]*xvector[1]+
				         xvector[2]*xvector[2]);
	xvector[0]=xvector[0]/hold;
	xvector[1]=xvector[1]/hold;
	xvector[2]=xvector[2]/hold;

	//computing Xiw

	Xiw[0][0]=xvector[0];
	Xiw[1][0]=xvector[1];
	Xiw[2][0]=xvector[2];
	Xiw[3][0]=(-xvector[0]*camera.position[0]+
		   -xvector[1]*camera.position[1]+
		   -xvector[2]*camera.position[2]);

	Xiw[0][1]=yvector[0];
	Xiw[1][1]=yvector[1];
	Xiw[2][1]=yvector[2];
	Xiw[3][1]=(-yvector[0]*camera.position[0]+
							   -yvector[1]*camera.position[1]+
		                       -yvector[2]*camera.position[2]);

	Xiw[0][2]=zvector[0];
	Xiw[1][2]=zvector[1];
	Xiw[2][2]=zvector[2];
	Xiw[3][2]=(-zvector[0]*camera.position[0]+
							   -zvector[1]*camera.position[1]+
		                       -zvector[2]*camera.position[2]);

	Xiw[0][3]=0;
	Xiw[1][3]=0;
	Xiw[2][3]=0;
	Xiw[3][3]=1;
*/

// Compute the camera's matrix using look at.
  var cameraMatrix = makeLookAt(camera.position, camera.lookat, camera.worldup);
 
  // Make a view matrix from the camera matrix.
  var viewMatrix = inverse4(cameraMatrix);










	console.log('hello');



	//var xinverse = inverse4(Xiw);
	//Xpi = perspective(90,100,0,100);
        //Xpi = ortho(-2,2,-2,2,-1,10000);//left, right, bottom, top, near, far
	//Xm=lookAt( camera.position, camera.lookat, camera.worldup );
	//var XspL = gl.getUniformLocation ( program, "Xsp" );
	gl.uniformMatrix4fv(XspL,gl.TRUE, new Float32Array(flatten(Xsp)));
	//var XpiL = gl.getUniformLocation ( program, "Xpi" );
	gl.uniformMatrix4fv(XpiL,gl.TRUE, new Float32Array(flatten(Xpi)));
	//var XwiL = gl.getUniformLocation ( program, "Xiw" );
	gl.uniformMatrix4fv(XwiL,gl.TRUE, new Float32Array(flatten(cameraMatrix)));
	//initilaizing the Ximage stack order of Xsp-Xpi-Xiw
	/*
	GzPushMatrix(render, render->Xsp);
	GzPushMatrix(render, render->camera.Xpi);
	GzPushMatrix(render, render->camera.Xiw);
	*/
}
function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}
function subtractVectors(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function normalize(v) {
  var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  // make sure we don't divide by 0.
  if (length > 0.00001) {
    return [v[0] / length, v[1] / length, v[2] / length];
  } else {
    return [0, 0, 0];
  }
}
function makeLookAt(cameraPosition, target, up) {
  var zAxis = normalize(
      subtractVectors(target, cameraPosition));
  var xAxis = cross(up, zAxis);
  var yAxis = cross(zAxis, xAxis);
 
  return [
     xAxis[0], xAxis[1], xAxis[2], 0,
     yAxis[0], yAxis[1], yAxis[2], 0,
     zAxis[0], zAxis[1], zAxis[2], 0,
     cameraPosition[0],
     cameraPosition[1],
     cameraPosition[2],
     1];
}
