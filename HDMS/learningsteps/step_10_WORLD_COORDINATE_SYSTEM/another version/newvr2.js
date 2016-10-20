var gl;
var program;

var lightL0;
var lightL1;
var lightL2;
var lightL3;
var lightL4;
var numOfLightsL;
var eyeL;

var shinL;
var lightAmbientL;
var lightDiffuseL;
var lightSpecularL;
var translationL;

var points=[];
var colors=[];
var vertices=[];
var vertexColors =[];

var texture;
var texOnL;
var canvas;

var XwiL ;

var firstRender=true;

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

	program = initShaders (gl, "vertex-shader", "fragment-shader");
		
	gl.useProgram( program );
	
	lightL0 = gl.getUniformLocation ( program, "LightPosition0" );
	lightL1 = gl.getUniformLocation ( program, "LightPosition1" );
	lightL2 = gl.getUniformLocation ( program, "LightPosition2" );
	lightL3 = gl.getUniformLocation ( program, "LightPosition3" );
	lightL4 = gl.getUniformLocation ( program, "LightPosition4" );

	shinL=gl.getUniformLocation (program, "Shininess");

	numOfLightsL = gl.getUniformLocation ( program, "NumberOfLights" );


	lightAmbientL = gl.getUniformLocation ( program, "AmbientProduct" );

	lightDiffuseL = gl.getUniformLocation ( program, "DiffuseProduct" );
	
	lightSpecularL = gl.getUniformLocation ( program, "SpecularProduct" );
	
	translationL = gl.getUniformLocation ( program, "Translation");

	XwiL = gl.getUniformLocation ( program, "Xiw" );

	texOnL = gl.getUniformLocation ( program, "tex" );

	eyeL = gl.getUniformLocation (program, "Eye");

	//intial values of camera
	camera.FOV=45;
	camera.position[0]=-2.0;
	camera.position[1]=1.0;
	camera.position[2]=-2.0;

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

	////console.log("Init Completed");
	main();

}
///////////////////////////////////////// MAIN  /////////////////////////////////////
function main()
{
	////console.log("main function called");

	images.addNewTexture("brick2.png");	
	images.addNewTexture("rainbow.jpg");
	images.addNewTexture("dirt.png");

	mesh.Initialize (teapot);
	mesh.imageSource="rainbow.jpg"
	mesh.textureMappingOn=1;
	mesh.ambientProduct=[0.5,0.5,0.5,1.0];
	mesh.diffuseProduct=[0.5,0.5,0.5,1.0];
	mesh.specularProduct=[0.5,0.5,0.5,1.0];
	mesh.shininess=30.0;
	mesh.image=1;	
	mesh.translationMatrix[0]=0.05;
	mesh.translationMatrix[5]=0.05;
	mesh.translationMatrix[10]=0.05;	
	addMeshToObj(0);

	mesh.translationMatrix[12]=0.0;
	mesh.translationMatrix[14]=2.2;
	mesh.image=1;	
	mesh.textureMappingOn=1;
	addMeshToObj(0);

	mesh.translationMatrix[12]=-2.2;
	mesh.translationMatrix[14]=-0.0;
	mesh.image=0;	
	mesh.textureMappingOn=1;
	addMeshToObj(0);

	mesh.Initialize (floor);
	mesh.imageSource="brick.png"
	mesh.textureMappingOn=1;
	mesh.ambientProduct=[0.5,0.5,0.5,1.0];
	mesh.diffuseProduct=[0.5,0.5,0.5,1.0];
	mesh.specularProduct=[0.5,0.5,0.5,1.0];
	mesh.shininess=0.0;
	mesh.translationMatrix[12]=-10.0;
	mesh.translationMatrix[14]=-10.0;
	mesh.translationMatrix[0]=10.0;
	mesh.translationMatrix[5]=2.0;
	mesh.translationMatrix[10]=10.0;
	mesh.image=2;	
	addMeshToObj(1);

	mesh.Initialize (cow);
	mesh.imageSource="rainbow.jpg"
	mesh.textureMappingOn=0;
	mesh.ambientProduct=[0.0,0.5,0.5,1.0];
	mesh.diffuseProduct=[0.0,0.5,0.5,1.0];
	mesh.specularProduct=[0.5,0.5,0.5,1.0];
	mesh.shininess=30.0;
	mesh.image=1;	
	mesh.translationMatrix[0]=0.5;
	mesh.translationMatrix[5]=0.5;
	mesh.translationMatrix[10]=0.5;
	mesh.translationMatrix[12]=-5.0;
	mesh.translationMatrix[13]=1.0;
	mesh.translationMatrix[14]=-0.0;	
	addMeshToObj(2);


	light.Initialize ([-2.0, 2.0, -1.0, 1.0]);
	lightsToShader();
	//adjustCamera();
	
	horizontalAngle=90;
	lookandposition();
	beginRender();
}

function beginRender()
{
	////console.log("--: beginRender function called");
	gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	for (var j=0; j<2 ; j++)
	{
		adjustCamera(j);
	for (var index=0; index<numberOfObjects;index++)
	{
		
		if((obj[index].textureMappingOn==1)&&(images[obj[index].image].imageLoaded==true))			
				handleTexture(obj[index].image);

		objPropertiesToShader(index);
		render(index);
		/*if(obj[i].imageLoaded==true)
		{	
			adjustCamera(i);
		}
		else
		{
			textureFunction(i);
			////console.log("--: "+i+" . object");
		
		}*/
		
	}
	}
	
	/*angle++;
	lookandposition();
	requestAnimFrame (beginRender ); 
*/

}

function render(index)
{
	gl.drawArrays ( gl.TRIANGLES, 0, obj[index].vertices.length/3)
	////console.log("--: "+index+" . object rendered");
}

//////////////////////////////  OBJECTS    ////////////////////////////////////////////////////////////////

var obj=[];

var numberOfObjects=0;

var currentObject=false;

var mesh=["sourceInfo",
	  "vertices", 
	  "vertexColors",
   	  "normals", 
    	  "textureCoordinates", 
          "translationMatrix", 
          "scale", 
          "rotationMatrix",
          "shininess",
    	  "ambientProduct",
	  "diffuseProduct",
          "specularProduct",
	  "textureMappingOn",
          "imageSource",
	  "image",
	  "imageLoaded",
	  "meshId"];


mesh.sourceInfo=["meshId",
		 "verticesExist",
		 "vertexColorsExist",
		 "normalsExist",
		 "textureCoordinatesExist"];

mesh.Initialize = function (meshId)
{
	this.sourceInfo.meshId = meshId.meshId.slice();
	if(meshId.vertices != null)
	{
		this.vertices = meshId.vertices;
		this.sourceInfo.verticesExist = true;
	}
	else
	{
		
		this.sourceInfo.verticesExist = false;
	}

	if(meshId.vertexColors != null)
	{

		this.vertexColors = meshId.vertexColors;
		this.sourceInfo.vertexColorsExist = true;
	}
	else
	{
		this.sourceInfo.vertexColorsExist = false;
		
	}

	if(meshId.normals != null)
	{

		this.normals = meshId.normals;
		this.sourceInfo.normalsExist = true;
	}
	else
	{
		this.sourceInfo.normalsExist = false;
	}

	if(meshId.textureCoordinates != null)
	{
		this.textureCoordinates = meshId.textureCoordinates;
		this.sourceInfo.textureCoordinatesExist = true;
	}
	else
	{
		this.sourceInfo.textureCoordinatesExist = false;
	}

	this.translationMatrix = [1.0,0.0,0.0,0.0,
			     0.0,1.0,0.0,0.0,
			     0.0,0.0,1.0,0.0,
			     0.0,0.0,0.0,1.0]; 

	this.rotationMatrix = [1.0,0.0,0.0,0.0,
			     0.0,1.0,0.0,0.0,
			     0.0,0.0,1.0,0.0,
			     0.0,0.0,0.0,1.0]; 
        this.scale =false; 
        this.shininess = false;
    	this.ambientProduct = false;
	this.diffuseProduct = false;
        this.specularProduct = false;
	this.textureMappingOn = 2.0;
        this.imageSource = false;
	this.imageLoaded = false;
	this.meshId=0;
	////console.log("--: "+meshId.meshId+" mesh Created");
}

function addMeshToObj(id)
{
	
	obj[numberOfObjects]=mesh.slice();
	obj[numberOfObjects].meshId=id;	
	if(mesh.sourceInfo.verticesExist)
		obj[numberOfObjects].vertices=mesh.vertices.slice();
		
	obj[numberOfObjects].sourceInfo=mesh.sourceInfo.slice();

	if(mesh.sourceInfo.vertexColorsExist)
		obj[numberOfObjects].vertexColors=mesh.vertexColors.slice();

	if(mesh.sourceInfo.normalsExist)
		obj[numberOfObjects].normals=mesh.normals.slice();

	if(mesh.sourceInfo.textureCoordinatesExist)
		obj[numberOfObjects].textureCoordinates=mesh.textureCoordinates.slice();

	obj[numberOfObjects].translationMatrix=mesh.translationMatrix.slice();
	obj[numberOfObjects].scale=mesh.scale;
	obj[numberOfObjects].rotationMatrix=mesh.rotationMatrix.slice();
	obj[numberOfObjects].shininess=mesh.shininess;
	obj[numberOfObjects].ambientProduct=mesh.ambientProduct.slice();
	obj[numberOfObjects].diffuseProduct=mesh.diffuseProduct.slice();
	obj[numberOfObjects].specularProduct=mesh.diffuseProduct.slice();
	obj[numberOfObjects].textureMappingOn=mesh.textureMappingOn;
	obj[numberOfObjects].imageSource=mesh.imageSource.slice();
	obj[numberOfObjects].image=mesh.image;
	obj[numberOfObjects].imageLoaded=mesh.imageLoaded;
	obj[numberOfObjects].meshId=mesh.meshId;
	numberOfObjects++;

	////console.log("--: Mesh added to obj array. Number of objects: "+numberOfObjects);
}

function objPropertiesToShader(index)
{
	var meshId = gl.getUniformLocation (program, "meshId");
	gl.uniform1i(meshId, obj[index].meshId);
	gl.uniformMatrix4fv(translationL,gl.TRUE, new Float32Array(obj[index].translationMatrix));
}
function meshPropertiesToShader(index)
{
	gl.uniform1f(shinL, mesh[index].shininess);
	gl.uniform4fv(lightAmbientL, vec4(mesh[index].ambientProduct));
	gl.uniform4fv(lightDiffuseL, vec4(mesh[index].diffuseProduct));
	gl.uniform4fv(lightSpecularL, vec4(mesh[index].specularProduct));

	gl.uniform1f(texOnL,mesh[index].textureMappingOn);
	

	/*for(var i=0; i<obj[index].vertices.length;i++)
	{
		var tut=obj[index].vertices[i];
		obj[index].vertices=tut*0.1;
		//////console.log(pot.vertexPositions[i]);
	}*/
	//associate out shader variables with our data bufferData
	var vBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(mesh[index].vertices), gl.STATIC_DRAW );
	
	var vPosition;
	if(index==0)	
		vPosition = gl.getAttribLocation ( program, "vPosition1" );
	if(index==1)	
		vPosition = gl.getAttribLocation ( program, "vPosition2" );
	if(index==2)	
		vPosition = gl.getAttribLocation ( program, "vPosition3" );


	gl.vertexAttribPointer ( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vPosition );


	//associate out shader variables with our data bufferData
	var nBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, nBuffer );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(mesh[index].normals), gl.STATIC_DRAW );

	var Normal;
	if(index==0)	
		vNormal = gl.getAttribLocation ( program, "vNormal1" );

	if(index==1)	
		vNormal = gl.getAttribLocation ( program, "vNormal2" );

	if(index==2)	
		vNormal = gl.getAttribLocation ( program, "vNormal3" );


	gl.vertexAttribPointer ( vNormal, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray ( vNormal );


	//associate out shader variables with our data bufferData

	var vTexCoord;
	if(index==0)	
		vTexCoord = gl.getAttribLocation ( program, "vTexCoord1" );
	if(index==1)	
		vTexCoord = gl.getAttribLocation ( program, "vTexCoord2" );
	if(index==2)	
		vTexCoord = gl.getAttribLocation ( program, "vTexCoord3" );
	var tBuffer = gl.createBuffer();
	gl.bindBuffer ( gl.ARRAY_BUFFER, tBuffer );
	gl.vertexAttribPointer ( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
	gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(mesh[index].textureCoordinates), gl.STATIC_DRAW );
	gl.enableVertexAttribArray ( vTexCoord );

	////console.log("--: "+index+" . object info sent to shader");
}


//////////////////////////////////// CAMERA  ////////////////////////////////////////////////////
var horizontalAngle=0;
var verticalAngle=0;
var camera=[ "FOV", 
             "worldup", 
             "lookat", 
             "position" ,
             "newValues", 
             "aspect",
             "projectionMatrix",
	     "cameraMatrix",
	     "viewMatrix",
	     "selfViewMatrix"];
camera.position=[];
camera.leftpos=[];
camera.rightpos=[];
camera.worldup=[];
camera.lookat=[];
projectionMatrix=[];
cameraMatrix=[];
viewMatrix=[];
selfViewMatrix=[];
camera.newValues = true;

function adjustCamera(index)
{
	
	if(camera.newValues)
	{
		// Compute the projection matrix
		camera.aspect = canvas.clientWidth / 2/canvas.clientHeight;
		camera.projectionMatrix = makePerspective(radians(camera.FOV), camera.aspect, 0.1, 2000);

		// Compute the camera's matrix using look at. there are two cameras
		/*for(var i=0;i<2;i++)
		{*/
		   
			if(index==0)
		    	{
				gl.viewport(0, 0, canvas.width/2,canvas.height);
				camera.cameraMatrix = makeLookAt(camera.leftpos, camera.lookat, camera.worldup);
				
			}	    
			if(index==1)
		    	{
				gl.viewport(canvas.width/2, 0, canvas.width/2,canvas.height);			
				camera.cameraMatrix = makeLookAt(camera.rightpos, camera.lookat, camera.worldup);			
				
			}
			
			// Make a view matrix from the camera matrix.
			camera.viewMatrix = makeInverse(camera.cameraMatrix);
			camera.selfViewMatrix = matrixMultiply ( camera.viewMatrix , camera.projectionMatrix);
			//camera.newValues=false;
	

			gl.uniformMatrix4fv(XwiL,gl.TRUE, new Float32Array(camera.selfViewMatrix));

			////console.log("--: Camera adjust finished");

			////console.log("--: render called for "+i+" . camera");

			//send the eye vector to shader

			gl.uniform3fv(eyeL, vec3(camera.position));

			
			
		//}
	}
		   
}

function lookandposition ()
{
    /*if(angle>0)
	{	
		//alert(theta[1]-180);
		//camera.lookat[1]=2* Math.sin((120-theta[1])/60);
		camera.lookat[0]= 2*Math.cos((180-angle)/60);  //horizontal
    		camera.lookat[2]= 2*Math.sin((180-angle)/60);  //horizontal

		//left camera
		camera.leftpos[1]=camera.position[1];
		camera.leftpos[0]=0.1*Math.cos((270-angle)/60)+camera.position[0];
		camera.leftpos[2]=0.1*Math.sin((270-angle)/60)+camera.position[2];

		//right camera
		camera.rightpos[1]=camera.position[1];
		camera.rightpos[0]=0.1*Math.cos((90-angle)/60)+camera.position[0];
		camera.rightpos[2]=0.1*Math.sin((90-angle)/60)+camera.position[2];
	}

    else
	{
		//camera.lookat[1]=2* Math.sin(-(120-theta[1])/60);
		camera.lookat[0]= 2*Math.cos(-angle/60);  //horizontal
    		camera.lookat[2]= 2*Math.sin(-angle/60);  //horizontal

		//left camera
		camera.leftpos[1]=camera.position[1];
		camera.leftpos[0]=0.1*Math.cos((90-angle)/60)+camera.position[0];
		camera.leftpos[2]=0.1*Math.sin((90-angle)/60)+camera.position[2];

		//right camera
		camera.rightpos[1]=camera.position[1];
		camera.rightpos[0]=0.1*Math.cos((-90-angle)/60)+camera.position[0];
		camera.rightpos[2]=0.1*Math.sin((-90-angle)/60)+camera.position[2];		
	}
	*/

	
	camera.lookat[1]= Math.sin(radians(verticalAngle))+camera.position[1];
	camera.lookat[0]= Math.cos(radians(horizontalAngle))+camera.position[0];  //horizontal
    	camera.lookat[2]= Math.sin(radians(horizontalAngle))+camera.position[2];  //horizontal

	//left camera
	camera.leftpos[1]=camera.position[1];
	camera.leftpos[0]=0.02*Math.cos(radians(horizontalAngle+90))+camera.position[0];
	camera.leftpos[2]=0.02*Math.sin(radians(horizontalAngle+90))+camera.position[2];

	//right camera
	camera.rightpos[1]=camera.position[1];
	camera.rightpos[0]=0.02*Math.cos(radians(horizontalAngle-90))+camera.position[0];
	camera.rightpos[2]=0.02*Math.sin(radians(horizontalAngle-90))+camera.position[2];	

	updateValuesToHtml();
}
function updateValuesToHtml(){

	$("#posX").html(camera.position[0]);
	$("#posY").html(camera.position[1]);
	$("#posZ").html(camera.position[2]);
	$("#lookX").html(camera.lookat[0]);
	$("#lookY").html(camera.lookat[1]);
	$("#lookZ").html(camera.lookat[2]);
}

//////////////////////////////////////// LIGHT ////////////////////////////////////

var light=[];
var numberOfLights=0;

light.Initialize = function (position)
{
	light[numberOfLights]=[];
	light[numberOfLights]=position;	
	numberOfLights++;
}

function lightsToShader()
{

	for (var i=0;i<numberOfLights;i++)
	{
		assignLights(i);
	}
	gl.uniform1f ( numOfLightsL, numberOfLights );
	

	return ////console.log("--: "+numberOfLights+" light was assigned");
}

function assignLights(lightIndex)
{

	if(lightIndex==0)
	{
		
		gl.uniform4fv ( lightL0, light [lightIndex] );
	}

	else if(lightIndex==1)
	{
		gl.uniform4fv ( lightL1, light [lightIndex] );
	}

	else if(lightIndex==2)
	{
		gl.uniform4fv ( lightL2, light [lightIndex] );
	}

	else if(lightIndex==3)
	{
		gl.uniform4fv ( lightL3, light [lightIndex] );
	}

	else if(lightIndex==4)
	{
		gl.uniform4fv ( lightL4, light [lightIndex] );
	}
		
	

	return ////console.log("--: "+lightIndex+" . light sent to vertex shader");

}


/////////////////////////////////// TEXTURE  ////////////////////////////////////////

var images=[];
var numberOfImages=0;

images.addNewTexture=function(source)
{
	textureFunction(numberOfImages,source);
	numberOfImages++;
}



function textureFunction(index,source)
{
	////console.log("--: "+index+" . texture creation begin");
	texture = gl.createTexture();
	images[index] = new Image();

	//image.crossOrigin = "use-credentials";
	images[index].src = source;
	images[index].index = index;
	images[index].imageLoaded = false;
	
	images[index].onload= function()
	{
		images[index].imageLoaded = true;		
	}	
	
	////console.log("--: "+index+" . textureFunction finished");
}

function handleTexture(index)
{
	gl.bindTexture(gl.TEXTURE_2D, texture);
	// Upload the image into the texture.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[index]);
	setupTextureFilteringAndMips(images[index].width, images[index].height);
	////console.log("--: "+index+" . texture loaded");
}


function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function  setupTextureFilteringAndMips(width, height)
 {
  	if (isPowerOf2(width) && isPowerOf2(height)) 
	{
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
	////console.log("--: Texture Filtering Completed");
}
/*
function textureFunction(index)
{
	////console.log("--: "+index+" . object textureFunction called");
	texture = gl.createTexture();
	obj[index].image = new Image();
	//image.crossOrigin = "use-credentials";
	obj[index].image.src = obj[index].imageSource;
	obj[index].image.index=index;
		
	
	obj[index].image.onload= function()
	{
		obj[this.index].imageLoaded=true;		
		adjustCamera(this.index);
	}	
	
	////console.log("--: "+index+" . object textureFunction finished");
}

function handleTexture(index)
{
	gl.bindTexture(gl.TEXTURE_2D, texture);
	// Upload the image into the texture.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, obj[index].image);
	setupTextureFilteringAndMips(obj[index].image.width, obj[index].image.height);
	////console.log("--: "+index+" . object texture loaded");
	////console.log("--: begin render called");
}
*/
///////////////////////////////////// I/O ////////////////////////////////////////
document.addEventListener("keydown", function(e) {
      if (e.keyCode == 39) {
        changeHorizontalAngle(1);
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 37) {
        changeHorizontalAngle(-1);
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 38) {
        changeVerticalAngle(1);
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 40) {
        changeVerticalAngle(-1);
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 87) {
        camera.position[0]+=0.01;
	lookandposition();
	beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 83) {
        camera.position[0]-=0.01;
	lookandposition();
	beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 65) {
        camera.position[2]+=0.01;
	lookandposition();
	beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 68) {
        camera.position[2]-=0.01;
	lookandposition();
	beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode ==33) {
        camera.position[1]+=0.01;
	lookandposition();
	beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 34) {
        camera.position[1]-=0.01;
	lookandposition();
	beginRender();
      }
    }, false);


function changeHorizontalAngle(i)
{
	horizontalAngle+=i;
	lookandposition();
	beginRender();

}

function changeVerticalAngle(i)
{
	verticalAngle+=i;
	lookandposition();
	beginRender();

}

//window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    // Do stuff with the new orientation data
    //////console.log("called");    
    document.getElementById("X").innerHTML = "X : "+ alpha;//275
    document.getElementById("Y").innerHTML = "Y : "+ beta;//177
    document.getElementById("Z").innerHTML = "Z : "+ gamma;//84
    

	if( (beta == null)||(gamma == null) || (alpha == null) )
    	{
    
    	}
 	else
	{	
		if(gamma<0)
		{
			horizontalAngle=-(alpha-270);//90
			verticalAngle=gamma-90;//0
		}
		else
		{
			horizontalAngle=-(alpha-90);//90
			verticalAngle=-((-gamma)-90);//0

		}
	        lookandposition(); 
	        beginRender();
  	}

 
}

///////////////////////////////////  AUXILIARY FUNCTIONS ///////////////////////////
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



