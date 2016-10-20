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

var objmove=[];
var fudgeFactor;
window.onload = function init()
{
	
	canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if(!gl)
	{
		alert("WebGL isn't available");
	}
	
	gl.enable(gl.DEPTH_TEST);	

	 
	// Configure WebGL
	
	//gl.viewport(0, 0, canvas.width/2,canvas.height);
	
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	
	// Load shaders and initialize attribute buffers

	var program = initShaders (gl, "vertex-shader", "fragment-shader");
		
	gl.useProgram( program );

	timeLoc = gl.getUniformLocation ( program, "time" ); 
	
	theta = [0,0,0];
	thetaLoc = gl.getUniformLocation ( program, "theta" );
	
	objmove=[0,0,0];
	moveLoc = gl.getUniformLocation ( program, "moveLoc");	
	
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
		pot.vertexPositions[i]=tut*0.1;
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

	var fudgeLocation = gl.getUniformLocation(program, "u_fudgeFactor");
	
	fudgeFactor = 0;

	gl.uniform1f(fudgeLocation, fudgeFactor);

	XspL = gl.getUniformLocation ( program, "Xsp" );
	
	XpiL = gl.getUniformLocation ( program, "Xpi" );

	XwiL = gl.getUniformLocation ( program, "Xiw" );


//intial values of camera
	camera.FOV=45;
	camera.position[0]=3;
	camera.position[1]=1;
	camera.position[2]=3;

	camera.leftpos[0]=camera.position[0];
	camera.leftpos[1]=camera.position[1];
	camera.leftpos[2]=camera.position[2];
	camera.rightpos[0]=camera.position[0];
	camera.rightpos[1]=camera.position[1];
	camera.rightpos[2]=camera.position[2];


	camera.lookat[0]=0;
	camera.lookat[1]=0;
	camera.lookat[2]=0;
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

        textureFunction(gl,program);
	updateValuesToHtml();
	adjustCamera();
	//render(program);
}


function render ()
{	
	//gl.uniform3fv(thetaLoc, theta);
	gl.uniform1f(scale, scaleFactor);
	
	
	
	gl.drawArrays ( gl.TRIANGLES, 0, pot['vertexPositions'].length/3);
	
	//requestAnimFrame ( render );
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
		
	  	// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		setupTextureFilteringAndMips(image.width, image.height);
		
		adjustCamera();
	}

	image.src = "rainbow.jpg";
}

var Xsp=[]; 
var Xpi=[];
var Xiw=[];
var Xm=[];
var camera=[ "FOV", "worldup", "lookat", "position"];
camera.position=[];
camera.leftpos=[];
camera.rightpos=[];
camera.worldup=[];
camera.lookat=[];
var INT_MAX;
var PI;

function posFunction(index,value){

	camera.position[index]+=value;
        camera.lookat[index]+=value;
	updateValuesToHtml();
	adjustCamera();
	
}
function lookFunction(index,value){

	camera.lookat[index]+=value;
	updateValuesToHtml();
	adjustCamera();
	
}

function adjustCamera(){

gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

for(var j=0;j<10;j++){
	
	if(j==1)
		{var transMat=translate( -3,0,-2);}
	if(j==2)
		{var transMat=translate( -6,0,-3);}

	if(j==3)
		{var transMat=translate( -4,0,-6);}
	if(j==4)
		{var transMat=translate( -9,0,-6);}
	if(j==5)
		{var transMat=translate( -6,0,-9);}
	if(j==6)
		{var transMat=translate( -7,0,-9);}
	if(j==7)
		{var transMat=translate( -3,0,-9);}
	if(j==8)
		{var transMat=translate( -9,0,-3);}

	if(j==9)
		{var transMat=translate( -9,0,-6);}
	

	
    for(var i=0;i<2;i++){
	
	   
	    // Compute the projection matrix
	    var aspect = canvas.clientWidth / 2/canvas.clientHeight;
	    var projectionMatrix =
		makePerspective(radians(camera.FOV), aspect, 1, 2000);

	    // Compute the camera's matrix using look at.
	    if(i==0)
	    	{
			gl.viewport(0, 0, canvas.width/2,canvas.height);
			var cameraMatrix = makeLookAt(camera.leftpos, camera.lookat, camera.worldup);
		}	    
	   if(i==1)
	    	{
			gl.viewport(canvas.width/2, 0, canvas.width/2,canvas.height);
			
			var cameraMatrix = makeLookAt(camera.rightpos, camera.lookat, camera.worldup);
			
		}


	    

	    // Make a view matrix from the camera matrix.
	    var viewMatrix = makeInverse(cameraMatrix);

	if(j==0){
	    var matrix = matrixMultiply(viewMatrix, projectionMatrix);
	}
	else
	{
		var matrix = flatten(transMat);
		matrix = matrixMultiply(matrix, viewMatrix);	
		matrix = matrixMultiply(matrix, projectionMatrix)
	}
	    // Set the matrix.
	    //gl.uniformMatrix4fv(matrixLocation, false, matrix);

	    //gl.uniformMatrix4fv(XspL,gl.TRUE, new Float32Array(flatten(Xsp)));

	    //gl.uniformMatrix4fv(XpiL,gl.TRUE, new Float32Array(flatten(Xpi)));
	   
	    gl.uniformMatrix4fv(XwiL,gl.TRUE, new Float32Array(matrix));
	   //initilaizing the Ximage stack order of Xsp-Xpi-Xiw  from CS580
	render();
    }
}
}



function makeLookAt(cameraPosition, target, up) {
  var zAxis = normalize(
      subtractVectors(cameraPosition, target));
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

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
}

function makePerspective(fieldOfViewInRadians, aspect, near, far) {
  var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
  var rangeInv = 1.0 / (near - far);

  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (near + far) * rangeInv, -1,
    0, 0, near * far * rangeInv * 2, 0
  ];
};

function makeTranslation(tx, ty, tz) {
  return [
     1,  0,  0,  0,
     0,  1,  0,  0,
     0,  0,  1,  0,
    tx, ty, tz,  1
  ];
}

function makeXRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    1, 0, 0, 0,
    0, c, s, 0,
    0, -s, c, 0,
    0, 0, 0, 1
  ];
};

function makeYRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);

  return [
    c, 0, -s, 0,
    0, 1, 0, 0,
    s, 0, c, 0,
    0, 0, 0, 1
  ];
};

function makeZRotation(angleInRadians) {
  var c = Math.cos(angleInRadians);
  var s = Math.sin(angleInRadians);
  return [
     c, s, 0, 0,
    -s, c, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1,
  ];
}

function makeScale(sx, sy, sz) {
  return [
    sx, 0,  0,  0,
    0, sy,  0,  0,
    0,  0, sz,  0,
    0,  0,  0,  1,
  ];
}

function matrixMultiply(a, b) {
  var a00 = a[0*4+0];
  var a01 = a[0*4+1];
  var a02 = a[0*4+2];
  var a03 = a[0*4+3];
  var a10 = a[1*4+0];
  var a11 = a[1*4+1];
  var a12 = a[1*4+2];
  var a13 = a[1*4+3];
  var a20 = a[2*4+0];
  var a21 = a[2*4+1];
  var a22 = a[2*4+2];
  var a23 = a[2*4+3];
  var a30 = a[3*4+0];
  var a31 = a[3*4+1];
  var a32 = a[3*4+2];
  var a33 = a[3*4+3];
  var b00 = b[0*4+0];
  var b01 = b[0*4+1];
  var b02 = b[0*4+2];
  var b03 = b[0*4+3];
  var b10 = b[1*4+0];
  var b11 = b[1*4+1];
  var b12 = b[1*4+2];
  var b13 = b[1*4+3];
  var b20 = b[2*4+0];
  var b21 = b[2*4+1];
  var b22 = b[2*4+2];
  var b23 = b[2*4+3];
  var b30 = b[3*4+0];
  var b31 = b[3*4+1];
  var b32 = b[3*4+2];
  var b33 = b[3*4+3];
  return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
          a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
          a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
          a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
          a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
          a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
          a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
          a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
          a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
          a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
          a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
          a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
          a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
          a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
          a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
          a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
}

function makeInverse(m) {
  var m00 = m[0 * 4 + 0];
  var m01 = m[0 * 4 + 1];
  var m02 = m[0 * 4 + 2];
  var m03 = m[0 * 4 + 3];
  var m10 = m[1 * 4 + 0];
  var m11 = m[1 * 4 + 1];
  var m12 = m[1 * 4 + 2];
  var m13 = m[1 * 4 + 3];
  var m20 = m[2 * 4 + 0];
  var m21 = m[2 * 4 + 1];
  var m22 = m[2 * 4 + 2];
  var m23 = m[2 * 4 + 3];
  var m30 = m[3 * 4 + 0];
  var m31 = m[3 * 4 + 1];
  var m32 = m[3 * 4 + 2];
  var m33 = m[3 * 4 + 3];
  var tmp_0  = m22 * m33;
  var tmp_1  = m32 * m23;
  var tmp_2  = m12 * m33;
  var tmp_3  = m32 * m13;
  var tmp_4  = m12 * m23;
  var tmp_5  = m22 * m13;
  var tmp_6  = m02 * m33;
  var tmp_7  = m32 * m03;
  var tmp_8  = m02 * m23;
  var tmp_9  = m22 * m03;
  var tmp_10 = m02 * m13;
  var tmp_11 = m12 * m03;
  var tmp_12 = m20 * m31;
  var tmp_13 = m30 * m21;
  var tmp_14 = m10 * m31;
  var tmp_15 = m30 * m11;
  var tmp_16 = m10 * m21;
  var tmp_17 = m20 * m11;
  var tmp_18 = m00 * m31;
  var tmp_19 = m30 * m01;
  var tmp_20 = m00 * m21;
  var tmp_21 = m20 * m01;
  var tmp_22 = m00 * m11;
  var tmp_23 = m10 * m01;

  var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  return [
    d * t0,
    d * t1,
    d * t2,
    d * t3,
    d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
    d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
    d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
    d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
    d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
    d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
    d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
    d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
    d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
    d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
    d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
    d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
  ];
}

function matrixVectorMultiply(v, m) {
  var dst = [];
  for (var i = 0; i < 4; ++i) {
    dst[i] = 0.0;
    for (var j = 0; j < 4; ++j)
      dst[i] += v[j] * m[j * 4 + i];
  }
  return dst;
};

function updateValuesToHtml(){

	$("#posX").html(camera.position[0]);
	$("#posY").html(camera.position[1]);
	$("#posZ").html(camera.position[2]);
	$("#lookX").html(camera.lookat[0]);
	$("#lookY").html(camera.lookat[1]);
	$("#lookZ").html(camera.lookat[2]);
}

function objFunction(index,value){

	objmove[index]+=value;
	gl.uniform3fv(moveLoc, objmove);
	adjustCamera();
}

 window.addEventListener("deviceorientation", handleOrientation, true);
window.addEventListener("progress", tick, true);
document.addEventListener("keydown", function(e) {
      if (e.keyCode == 38) {
        tick();
      }
    }, false);

function tick()
{
	/*if(theta[1]>0)
	{	
		camera.position[0]=camera.position[0]+0.01*Math.cos((180-theta[2])/60);  //horizontal
    		camera.position[2]= camera.position[2]+0.01*Math.sin((180-theta[2])/60);  //horizontal
		
	}

    else*/
	alert("done");
	{
		
		camera.position[0]= camera.position[0]+0.01*Math.cos(-theta[2]/60);  //horizontal
    		camera.position[2]= camera.position[2]+0.01*Math.sin(-theta[2]/60);  //horizontal
	}
	updateValuesToHtml();
	lookandposition ();
	adjustCamera();
}


function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    // Do stuff with the new orientation data
    //console.log("called");    
    document.getElementById("X").innerHTML = "X : "+ alpha;
    document.getElementById("Y").innerHTML = "Y : "+ beta;
    document.getElementById("Z").innerHTML = "Z : "+ gamma;
    
    theta[0]=beta;
    theta[1]=gamma;
    theta[2]=alpha;

    if( (beta == null)||(gamma == null) || (alpha == null) )
    {
    theta[0]=90;
    theta[1]=90;
    theta[2]=130;
    }
    lookandposition ();

    

    updateValuesToHtml();
    adjustCamera();
    

}


function lookandposition ()
{
    if(theta[1]>0)
	{	
		//alert(theta[1]-180);
		camera.lookat[1]=2* Math.sin((120-theta[1])/60);
		camera.lookat[0]= 2*Math.cos((180-theta[2])/60);  //horizontal
    		camera.lookat[2]= 2*Math.sin((180-theta[2])/60);  //horizontal

		//left camera
		camera.leftpos[1]=camera.position[1];
		camera.leftpos[0]=0.1*Math.cos((270-theta[2])/60)+camera.position[0];;
		camera.leftpos[2]=0.1*Math.sin((270-theta[2])/60)+camera.position[2];;

		//right camera
		camera.rightpos[1]=camera.position[1];
		camera.rightpos[0]=0.1*Math.cos((90-theta[2])/60)+camera.position[0];;
		camera.rightpos[2]=0.1*Math.sin((90-theta[2]/60))+camera.position[2];;
	}

    else
	{
		camera.lookat[1]=2* Math.sin(-(120-theta[1])/60);
		camera.lookat[0]= 2*Math.cos(-theta[2]/60);  //horizontal
    		camera.lookat[2]= 2*Math.sin(-theta[2]/60);  //horizontal

		//left camera
		camera.leftpos[1]=camera.position[1];
		camera.leftpos[0]=0.1*Math.cos((90-theta[2])/60)+camera.position[0];
		camera.leftpos[2]=0.1*Math.sin((90-theta[2])/60)+camera.position[2];

		//right camera
		camera.rightpos[1]=camera.position[1];
		camera.rightpos[0]=0.1*Math.cos((-90-theta[2])/60)+camera.position[0];
		camera.rightpos[2]=0.1*Math.sin((-90-theta[2]/60))+camera.position[2];		
	}

}
/*
var 	jerkX = 0,
	jerkY = 0,
	jerkZ = 0,
	jerkXBig = false,
	jerkYBig = false,
	jerkZBig = false,
accelX = 0,
	accelY = 0,
	accelZ = 0;

window.addEventListener('devicemotion', function(evt){
		jerkX = evt.acceleration.x?(evt.acceleration.x-accelX).toFixed(2):0;
		jerkXBig = Math.abs(jerkX);
		jerkY = evt.acceleration.y?(evt.acceleration.y-accelY).toFixed(2):0;
		jerkYBig = Math.abs(jerkY);
		jerkZ = evt.acceleration.z?(evt.acceleration.z-accelZ).toFixed(2):0;
		jerkZBig = Math.abs(jerkZ);
		accelX = evt.acceleration.x?evt.acceleration.x.toFixed(2):0;
		accelY = evt.acceleration.y?evt.acceleration.y.toFixed(2):0;
		accelZ = evt.acceleration.z?evt.acceleration.z.toFixed(2):0;

	        console.log ("x: "+jerkXBig + ",   Y: "+jerkYBig + ",   Z: "+jerkZBig);
	
		(jerkXBig < 1) || (jerkYBig <1) || (jerkZBig <1)? null : console.log ("x: "+jerkX + ",   Y: "+jerkY + ",   Z: "+jerkZ);;
		
}, true);
*/


