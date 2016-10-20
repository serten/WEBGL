var gl;
var program;
var program2;

var lightL0;
var lightColorL0;
var lightL1;
var lightColorL1;
var lightL2;
var lightColorL2;
var lightL3;
var lightColorL3;
var lightL4;
var lightColorL4;

var numOfLightsL;
var eyeL;

var shinL;
var lightAmbientL;
var lightDiffuseL;
var lightSpecularL;
var translationL;
var rotationL;
var animationTranslationL;
var animationRotationL;

var points=[];
var colors=[];
var vertices=[];
var vertexColors =[];

var texture;
var textureL;
var bumpTexture;
var bumpTextureL;
var bumpL;
var texOnL;
var canvas;

var XwiL ;
var XwiLNormal;
var projectionL;

var firstRender=true;

function init()
{
	//framerate = new Framerate("framerate");
	canvas = document.getElementById("gl-canvas");
	gl = WebGLUtils.setupWebGL(canvas);

	if(!gl)
	{
		alert("WebGL isn't available");
	}

	gl.enable(gl.DEPTH_TEST);


	// Configure WebGL

	//gl.viewport(0, 0, canvas.width/2,canvas.height);

	gl.clearColor(0.0, 0.1, 0.5, 1.0);

	// Load shaders and initialize attribute buffers

	program = initShaders (gl, vertexShaderText, fragmentShaderText);
	
	gl.useProgram( program );

	

	lightL0 = gl.getUniformLocation ( program, "LightPosition0" );
	lightColorL0 = gl.getUniformLocation ( program, "LightColor0" );

	lightL1 = gl.getUniformLocation ( program, "LightPosition1" );
	lightColorL1 = gl.getUniformLocation ( program, "LightColor1" );

	lightL2 = gl.getUniformLocation ( program, "LightPosition2" );
	lightColorL2 = gl.getUniformLocation ( program, "LightColor2" );

	lightL3 = gl.getUniformLocation ( program, "LightPosition3" );
	lightColorL3 = gl.getUniformLocation ( program, "LightColor3" );

	lightL4 = gl.getUniformLocation ( program, "LightPosition4" );
	lightColorL4 = gl.getUniformLocation ( program, "LightColor4" );

	shinL=gl.getUniformLocation (program, "Shininess");

	numOfLightsL = gl.getUniformLocation ( program, "NumberOfLights" );


	lightAmbientL = gl.getUniformLocation ( program, "AmbientProduct" );

	lightDiffuseL = gl.getUniformLocation ( program, "DiffuseProduct" );

	lightSpecularL = gl.getUniformLocation ( program, "SpecularProduct" );

	XwiL = gl.getUniformLocation ( program, "Xiw" );

	XwiLNormal = gl.getUniformLocation ( program, "XiwNormal" );

	projectionL = gl.getUniformLocation ( program, "Projection" );

	texOnL = gl.getUniformLocation ( program, "tex" );

	bumpL = gl.getUniformLocation ( program, "bum"+"p" );

	eyeL = gl.getUniformLocation (program, "Eye");

	textureL = gl.getUniformLocation(program, "texture");

	bumpTextureL = gl.getUniformLocation(program, "bumpTexture");

	// tell u_myFirstTexture to use texture unit #7
	gl.uniform1i(textureL, 4);

	// tell u_mySecondTexture to use texture unit #4
	gl.uniform1i(bumpTextureL, 7);
	//toggleFullScreen();
	////console.log("Init Completed");
	//gl.useProgram( program2 );

	gl.uniform1f(texOnL,1.0);
	gl.uniform1f(bumpL, 0.0);





}

function toggleFullScreen() {
  canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  canvas.width=screen.width;
  canvas.height=screen.height;
  
}
/////////////////////////////////////////get geometry from server////////////////////
var serverBusy=true;
var xmlhttp=null;
window.onload=function httpReq()
{
	xmlhttp = new XMLHttpRequest();

	//var countries;
	//var url = "http://192.168.0.9/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/step11.php?lod="+recallLOD;//mobile
	//var url = "http://54.187.253.246/step11.php?lod=10";http://localhost/learningsteps/step_11_DRAWING_COORDINATES/
	//var url = "http://localhost/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/step11.php?lod="+recallLOD;
	var url = "http://192.168.0.9/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/postgre_query_MBR.php?lat="+0+"&long="+0+"&height="+100+"&LOD="+100;
	var txt;
	xmlhttp.onreadystatechange = function() {
	    if ((xmlhttp.status == 200)&&(serverBusy)) {
		
		var result = xmlhttp.responseText;
		txt=JSON.parse(result); 
	
		       
		var verticeArray = [];
		var normalArray = [];
		var txtArray = [];
		var lengthResponse=txt.var.length
		countries=[];
		serverBusy=false;
		for(var country=0;country<txt.var.length;country++)
		{
			if(txt.var[country].length==1)
			{

			}
			else if((txt.var[country].length==2))
			{

				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);

				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);
			

			}
			else if((txt.var[country].length==3))
			{
				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);

				verticeArray.push(txt.var[country][1][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][1][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);
			
			}
			else if(txt.var[country].length>3)
			{
				var check = 0;
				for(coordinate=0;coordinate<txt.var[country].length;coordinate++)
				{
					if((check==0))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);
					
						check=1;
					}
					else if ((coordinate==(txt.var[country].length-2)))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][0][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);
					
						//console.log(country+"  "+txt.var[country][coordinate][0]);
						coordinate++;
						check=2;
					}
					else if((check==1))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);
						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);
				
					}

				}
			}
		}
		//horizontal lines:
		for(i=0;i<11;i++)
		{
			verticeArray.push(i*9);
			verticeArray.push(0.0);
			verticeArray.push(180);			

			if(i==0)
			{
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
			}
			else
			{
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				
			}

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(i*9);
			verticeArray.push(0.0);
			verticeArray.push(-180);			

			
			txtArray.push(0.0);
			txtArray.push(1.0);
		}

		for(i=1;i<11;i++)
		{
			verticeArray.push(-i*9);
			verticeArray.push(0.0);
			verticeArray.push(180);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-i*9);
			verticeArray.push(0.0);
			verticeArray.push(-180);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);
		}

		//vertical lines:
		for(i=0;i<11;i++)
		{
			verticeArray.push(90);
			verticeArray.push(0.0);
			verticeArray.push(i*18);			

			if(i==0)
			{
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
			}
			else
			{
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				
			}
			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-90);
			verticeArray.push(0.0);
			verticeArray.push(i*18);			


			txtArray.push(0.0);
			txtArray.push(1.0);
		}
		for(i=1;i<11;i++)
		{
			verticeArray.push(90);
			verticeArray.push(0.0);
			verticeArray.push(-i*18);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-90);
			verticeArray.push(0.0);
			verticeArray.push(-i*18);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);
		}
		countries = {"meshId"  : "countries", "vertices": verticeArray,"normals": normalArray,"textureCoordinates": txtArray};
		serverBusy=true;
		main();
		}
	
	    
	};
	xmlhttp.open("GET", url, true);
	
	xmlhttp.send();
}
////////////////////////////////////////postgre////////////////////////////////////
var firstLAT,firstLONG,firstHeight;

function postgreCheck()
{

	if(Math.abs(firstLAT-camera.latt)>2.0)
	{
		firstLAT=camera.latt;
		newGeomPostGre();
	}
	
	if(Math.abs(firstLONG-camera.longg)>2.0)
	{
		firstLONG=camera.longg;
		newGeomPostGre();
	}
	if(Math.abs(firstHeight-camera.position[1])>2.0)
	{
		firstHeight=camera.position[1];
		newGeomPostGre();
	}


}
function newGeomPostGre()
{

xmlhttp = new XMLHttpRequest();

	var url = "http://192.168.0.9/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/postgre_query_MBR.php?lat="+camera.latt+"&long="+camera.longg+"&height="+(camera.position[1])+"&LOD="+camera.position[1];
	var txt;
	xmlhttp.onreadystatechange = function() {
	    if ((xmlhttp.status == 200)&&(serverBusy)) {
		
		var result = xmlhttp.responseText;
		txt=JSON.parse(result); 
	
		       
		var verticeArray = [];
		var normalArray = [];
		var txtArray = [];
		var lengthResponse=txt.var.length
		countries=[];
		serverBusy=false;
		for(var country=0;country<txt.var.length;country++)
		{
			if(txt.var[country].length==1)
			{

			}
			else if((txt.var[country].length==2))
			{

				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);

				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);
			

			}
			else if((txt.var[country].length==3))
			{
				verticeArray.push(txt.var[country][0][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);

				verticeArray.push(txt.var[country][1][0]);
				verticeArray.push(0.0);verticeArray.push(txt.var[country][1][1]);
				//verticeArray.push(0.0);

				//normalArray.push(country/lengthResponse);
				//normalArray.push(1.0-country/lengthResponse);
				normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

				txtArray.push(0.0);
				txtArray.push(1.0);
			
			}
			else if(txt.var[country].length>3)
			{
				var check = 0;
				for(coordinate=0;coordinate<txt.var[country].length;coordinate++)
				{
					if((check==0))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);
					
						check=1;
					}
					else if ((coordinate==(txt.var[country].length-2)))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][0][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][0][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);
					
						//console.log(country+"  "+txt.var[country][coordinate][0]);
						coordinate++;
						check=2;
					}
					else if((check==1))
					{
						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);

						txtArray.push(0.0);
						txtArray.push(1.0);

						verticeArray.push(txt.var[country][coordinate][0]);
						verticeArray.push(0.0);verticeArray.push(txt.var[country][coordinate][1]);
						//verticeArray.push(0.0);

						//normalArray.push(country/lengthResponse);
						//normalArray.push(1.0-country/lengthResponse);
						normalArray.push(1.0);normalArray.push(1.0);normalArray.push(1.0);


						txtArray.push(0.0);
						txtArray.push(1.0);
				
					}

				}
			}
		}

		//horizontal lines:
		for(i=0;i<11;i++)
		{
			verticeArray.push(i*9);
			verticeArray.push(0.0);
			verticeArray.push(180);			

			if(i==0)
			{
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
			}
			else
			{
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				
			}

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(i*9);
			verticeArray.push(0.0);
			verticeArray.push(-180);			

			txtArray.push(0.0);
			txtArray.push(1.0);
		}

		for(i=1;i<11;i++)
		{
			verticeArray.push(-i*9);
			verticeArray.push(0.0);
			verticeArray.push(180);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-i*9);
			verticeArray.push(0.0);
			verticeArray.push(-180);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);
		}

		//vertical lines:
		for(i=0;i<11;i++)
		{
			verticeArray.push(90);
			verticeArray.push(0.0);
			verticeArray.push(i*18);			

			if(i==0)
			{
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
				normalArray.push(1);
			}
			else
			{
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				normalArray.push(0);
				
			}

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-90);
			verticeArray.push(0.0);
			verticeArray.push(i*18);			

			txtArray.push(0.0);
			txtArray.push(1.0);
		}
		for(i=1;i<11;i++)
		{
			verticeArray.push(90);
			verticeArray.push(0.0);
			verticeArray.push(-i*18);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);

			verticeArray.push(-90);
			verticeArray.push(0.0);
			verticeArray.push(-i*18);			

			normalArray.push(0);
			normalArray.push(0);
			normalArray.push(0.0);

			txtArray.push(0.0);
			txtArray.push(1.0);
		}
	
		countries = {"meshId"  : "countries", "vertices": verticeArray,"normals": normalArray,"textureCoordinates": txtArray};
		mesh.Initialize (countries);
		mesh.textureMappingOn=1;
		mesh.ambientProduct=[0.1,0.1,0.1,1.0];
		mesh.diffuseProduct=[0.0,0.0,0.0,0.0];
		mesh.specularProduct=[0.0,0.0,0.0,0.0];
	  	mesh.rotation=[0.0,0.0,0.0];
		mesh.translation=[0.0,0.0,0.0];
		mesh.shininess=30.0;
		mesh.imageId=13;
		numberOfObjects=0;
		addMeshToObj();
		packObjects();
		sendMainArrayToShader();
		serverBusy=true;
		}
	
	    
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}









///////////////////////////////////////// MAIN  /////////////////////////////////////
//window.onload=function main()
function main()
{
	////console.log("main function called");

	//intial values of camera
	camera.FOV=75;
	camera.position[0]=0;
	camera.position[1]=100;
	camera.position[2]=0;

	firstLAT=camera.position[0];
	firstLONG=camera.position[2];
	firstHeight=camera.position[1];


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

	horizontalAngle=0;
	verticalAngle=-90;
	lookandposition();

	images.addNewTexture("texture/brick2.png");		//0
	images.addNewTexture("texture/rainbow.jpg");		//1
	images.addNewTexture("texture/dirt.png");		//2
	images.addNewTexture("texture/rustedmetal.png");	//3
	images.addNewTexture("texture/sky1.png");		//4
	images.addNewTexture("texture/sky2.png");		//5
	images.addNewTexture("texture/sky3.png");		//6
	images.addNewTexture("texture/sky4.png");		//7
	images.addNewTexture("texture/kubemapping2.jpg");	//8
	images.addNewTexture("texture/stonewall.jpg");		//9
	images.addNewTexture("texture/zemin.jpg");		//10
	images.addNewTexture("texture/cati.jpg");		//11
	images.addNewTexture("texture/skyball.png");		//12
	images.addNewTexture("texture/building.png");		//13
	images.addNewTexture("texture/bistin.png");		//14
	images.addNewTexture("texture/normal.png");		//15
	images.addNewTexture("texture/normal2.png");		//16
	images.addNewTexture("texture/stonewallbump.jpg");	//17
	images.addNewTexture("texture/rustedmetalbump.jpg");	//18
	images.addNewTexture("texture/brick2bump.jpg");		//19
	images.addNewTexture("texture/newroof.png");		//20
	images.addNewTexture("texture/newroofbump.png");	//21

	mesh.Initialize (countries);
	mesh.textureMappingOn=1;
	mesh.ambientProduct=[0.1,0.1,0.1,1.0];
	mesh.diffuseProduct=[0.0,0.0,0.0,0.0];
	mesh.specularProduct=[0.0,0.0,0.0,0.0];
  	mesh.rotation=[0.0,0.0,0.0];
	mesh.translation=[0.0,0.0,0.0];
	mesh.shininess=30.0;
	mesh.imageId=13;
	addMeshToObj();
/*
	mesh.Initialize (building);
	mesh.textureMappingOn=0;
	mesh.ambientProduct=[0.1,0.1,0.1,1.0];
	mesh.diffuseProduct=[0.0,0.0,0.0,0.0];
	mesh.specularProduct=[0.0,0.0,0.0,0.0];
  	mesh.rotation=[0.0,0.0,0.0];
	mesh.translation=[0.0,0.0,35.0];
	mesh.shininess=30.0;
	mesh.imageId=13;
	addMeshToObj();

	mesh.Initialize (ground);
	mesh.textureMappingOn=1;
	mesh.ambientProduct=[0.2,0.2,0.2,1.0];
	mesh.diffuseProduct=[0.0,0.0,0.0,0.0];
	mesh.specularProduct=[0.0,0.0,0.0,0.0];
	mesh.shininess=0.0;
  	mesh.translationMatrix[0]=10.0;
	mesh.translationMatrix[10]=10.0;
	mesh.imageId=2;
	mesh.bump=false;
	mesh.bumpImageId=18;
	addMeshToObj();

	mesh.Initialize (axis);
	mesh.textureMappingOn=1;
	mesh.ambientProduct=[0.8,0.8,0.8,1.0];
	mesh.diffuseProduct=[0.0,0.0,0.0,0.0];
	mesh.specularProduct=[0.0,0.0,0.0,0.0];
	mesh.shininess=30.0;
	mesh.imageId=1;
	mesh.translationMatrix[12]=-4;
	mesh.translationMatrix[13]=2;
	mesh.translationMatrix[14]=5;
	mesh.rotation=[0.0,0.0,0.0];
	mesh.translation=[-4.0,2.0,5.0];

	addMeshToObj();
*/
	/*for(var i=0;i<10;i++)
	{
		for(var j=0;j<20;j++)
		{
			for(var k=0;k<20;k++){
				mesh.ambientProduct=[0.2*j,0.1*i,0.5,1.0];
				mesh.translation[0]=(i-1)*15;
				mesh.translation[1]=k*10;
				mesh.translation[2]=(j+1)*15;
				addMeshToObj();
			}
		}
	}*/

	init();

  	light.Initialize ([0.0, 100000.0, 10000.0, 7.0],[0.9,0.9,0.9,1.0]);

  	lightsToShader();
	packObjects();
	sendMainArrayToShader();
	beginRender();
}
var deger=0;
var imgId=14;
function beginRender()
{
	var elapsed1 = new Date().getTime() - start1;
	var aa1=elapsed1;
	document.getElementById("framerate").innerHTML = "afterdrawcall-Time:"+aa1+"ms";

	start2 = new Date().getTime();
	//movelight(0,Math.sin(radians(deger))*16,40.0,Math.cos(radians(deger))*16);
	//deger++;
	////console.log("--: beginRender function called");
	gl.clear ( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

	for (var j=0; j<2 ; j++)  //For two cameras left and right
	{
		adjustCamera(j);
		var length=0;		
		//gl.drawElements (gl.TRIANGLES, mainArray.indices.length,gl.UNSIGNED_SHORT, 0);
		gl.drawArrays(gl.LINES, 0 ,mainArray.length/c);
		/*for(var i = 0; i<numberOfObjects; i++)
		{    		
			var begin=length;			
			length+=(obj[i].zippedData.length/c);
			gl.drawArrays ( gl.TRIANGLES, begin, length);


		}*/
	}
	elapsed2 = new Date().getTime() - start2;
	var aa2=elapsed2;	
	document.getElementById("framerate2").innerHTML = "beforeddrawcall-Time:"+aa2+"ms";

	start1 = new Date().getTime();
	//goForward();
	//framerate.snapshot();
	requestAnimationFrame (beginRender,canvas );
  	//obj[0].animationOn=false;
  	//obj[0].translationVector=[0,0,0];
	
}

var elapsed1;
var aa=elapsed1;
var start1;
var elapsed2;
var aa=elapsed2;
var start2;

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
          "imageId",
	  "bumpImageId",
	  "bump",
	  "imageLoaded",
	  "animationOn",
	  "rotationAngles",
	  "translationVector",
	  "tanslation",
	  "rotation",
	  "animationTranslation",
	  "animationRotation"];

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
	this.animationTranslation = [1.0,0.0,0.0,0.0,
			     0.0,1.0,0.0,0.0,
			     0.0,0.0,1.0,0.0,
			     0.0,0.0,0.0,1.0];

	this.animationRotation = [1.0,0.0,0.0,0.0,
			     0.0,1.0,0.0,0.0,
			     0.0,0.0,1.0,0.0,
			     0.0,0.0,0.0,1.0];
	this.imageId=false;
	this.bumpImageId=false;
	this.bump=false;
        this.scale =false;
        this.shininess = false;
    	this.ambientProduct = false;
	this.diffuseProduct = false;
        this.specularProduct = false;
	this.textureMappingOn = 2.0;
        this.imageLoaded = false;
	this.animationOn=false;
	this.rotationAngles=[0.0,0.0,0.0];
	this.translationVector=[0.0,0.0,0.0];
	this.rotation=[0.0,0.0,0.0];
	this.translation=[0.0,0.0,0.0];

	////console.log("--: "+meshId.meshId+" mesh Created");

}



mesh.applyRotation= function()
{

	this.rotationMatrix=makeXRotation(radians(this.rotationAngles[0]));

	this.rotationMatrix=matrixMultiply(this.rotationMatrix, makeYRotation(radians(this.rotationAngles[1])));

	this.rotationMatrix=matrixMultiply(this.rotationMatrix,makeZRotation(radians(this.rotationAngles[2])));

}

function addMeshToObj()
{

	obj[numberOfObjects]=mesh.slice();

  	obj[numberOfObjects].sourceInfo=mesh.sourceInfo.slice();

	obj[numberOfObjects].sourceInfo.meshId =mesh.sourceInfo.meshId.slice();

  	if(mesh.sourceInfo.verticesExist)
		obj[numberOfObjects].vertices=new Float32Array( mesh.vertices);

	if(mesh.sourceInfo.normalsExist)
		obj[numberOfObjects].normals=new Float32Array(mesh.normals);

	if(mesh.sourceInfo.textureCoordinatesExist)
		obj[numberOfObjects].textureCoordinates=new Float32Array(mesh.textureCoordinates);

  	obj[numberOfObjects].zippedData;

  	if(mesh.sourceInfo.vertexColorsExist)
		obj[numberOfObjects].vertexColors=mesh.vertexColors.slice();

	obj[numberOfObjects].translationMatrix=mesh.translationMatrix.slice();
	obj[numberOfObjects].animationTranslation=mesh.animationTranslation.slice();
	obj[numberOfObjects].scale=mesh.scale;
	obj[numberOfObjects].rotationMatrix=mesh.rotationMatrix.slice();
	obj[numberOfObjects].animationRotation=mesh.animationRotation.slice();
	obj[numberOfObjects].shininess=mesh.shininess;
	obj[numberOfObjects].ambientProduct=mesh.ambientProduct.slice();
	obj[numberOfObjects].diffuseProduct=mesh.diffuseProduct.slice();
	obj[numberOfObjects].specularProduct=mesh.diffuseProduct.slice();
	obj[numberOfObjects].textureMappingOn=mesh.textureMappingOn;
	obj[numberOfObjects].imageId=mesh.imageId;
	obj[numberOfObjects].bumpImageId=mesh.bumpImageId;
	obj[numberOfObjects].bump=mesh.bump;
	obj[numberOfObjects].imageLoaded=mesh.imageLoaded;
	obj[numberOfObjects].animationOn=mesh.animationOn;
	obj[numberOfObjects].rotationAngles=mesh.rotationAngles.slice();
	obj[numberOfObjects].translationVector=mesh.translationVector.slice();
	obj[numberOfObjects].rotation=mesh.rotation.slice();
	obj[numberOfObjects].translation=mesh.translation.slice();
	obj[numberOfObjects].ilkdefa=true;
  	createZipData(numberOfObjects);

	numberOfObjects++;

	////console.log("--: Mesh added to obj array. Number of objects: "+numberOfObjects);
}

var c; //Interleafed array counter, indicates the bandwidth

function createZipData(n)
{
  c=18;
 
  obj[n].zippedData=[];
  for(var i=0; i<obj[n].vertices.length/(3);i++)
  {
    obj[n].zippedData[i*c] = obj[n].vertices[i*3];
    obj[n].zippedData[i*c+1] = obj[n].vertices[i*3+1];
    obj[n].zippedData[i*c+2] = obj[n].vertices[i*3+2];
    obj[n].zippedData[i*c+3] = 1.0;
    obj[n].zippedData[i*c+4] = obj[n].normals[i*3];
    obj[n].zippedData[i*c+5] = obj[n].normals[i*3+1];
    obj[n].zippedData[i*c+6] = obj[n].normals[i*3+2];
    if(obj[n].sourceInfo.textureCoordinatesExist)
    {
      obj[n].zippedData[i*c+7] = obj[n].textureCoordinates[i*2];
      obj[n].zippedData[i*c+8] = obj[n].textureCoordinates[i*2+1];
    }
    else
    {
      obj[n].zippedData[i*c+7] = 0;
      obj[n].zippedData[i*c+8] =0;

    }
      	obj[n].zippedData[i*c+9] = obj[n].ambientProduct[0];
	obj[n].zippedData[i*c+10] = obj[n].ambientProduct[1];
	obj[n].zippedData[i*c+11] = obj[n].ambientProduct[2];
	obj[n].zippedData[i*c+12] = obj[n].translation[0];
	obj[n].zippedData[i*c+13] = obj[n].translation[1];
	obj[n].zippedData[i*c+14] = obj[n].translation[2];
	obj[n].zippedData[i*c+15] = obj[n].rotation[0];
	obj[n].zippedData[i*c+16] = obj[n].rotation[1];
	obj[n].zippedData[i*c+17] = obj[n].rotation[2];
	//obj[n].zippedData[i*25+24] = obj[n].shininess;
	 			
    }
    
}
var mainArray;
function packObjects()
{

  var temp=[];
  for(var i=0;i<numberOfObjects;i++)
  {
    temp=temp.concat(obj[i].zippedData);
  }
  mainArray=new Float32Array(temp);

}



function sendMainArrayToShader()
{
  mainArray.vPosition = gl.getAttribLocation ( program, "vPosition" );
  mainArray.vNormal = gl.getAttribLocation ( program, "vNormal" );
  mainArray.vTexCoord = gl.getAttribLocation ( program, "vTexCoord" );
  mainArray.translation = gl.getAttribLocation ( program, "translation" );
  mainArray.rotation = gl.getAttribLocation ( program, "rotation" );
  mainArray.ambientProduct = gl.getAttribLocation ( program, "ambientProduct" );
  mainArray.diffuseProduct = gl.getAttribLocation ( program, "diffuseProduct" );
  mainArray.specularProduct = gl.getAttribLocation ( program, "specularProduct" );
  //mainArray.shininess = gl.getAttribLocation ( program, "shininess" );


  mainArray.vBuffer = gl.createBuffer();
  gl.bindBuffer (gl.ARRAY_BUFFER,mainArray.vBuffer);
  gl.bufferData ( gl.ARRAY_BUFFER, new Float32Array(mainArray), gl.STATIC_DRAW );

  mainArray.indices=[]
  for(var i=0;i<mainArray.length/c;i++)
  {
	mainArray.indices[i]=i;	
	
  }
 for(var i=0;i<mainArray.length/c;i++)
  {
	mainArray.indices[i+mainArray.length/c]=i;	
	
  }
  for(var i=0;i<mainArray.length/c;i++)
  {
	mainArray.indices[i+mainArray.length/c+mainArray.length/c]=i;	
	
  }
	//mainArray.indices[mainArray.length/c]=1;	

  //VBO
  mainArray.iBuffer = gl.createBuffer();
  gl.bindBuffer (gl.ELEMENT_ARRAY_BUFFER, mainArray.iBuffer);
  gl.bufferData (gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mainArray.indices), gl.STATIC_DRAW);


  gl.vertexAttribPointer ( mainArray.vPosition, 4, gl.FLOAT, false, c*4, 0 );
  gl.vertexAttribPointer ( mainArray.vNormal, 3, gl.FLOAT, false, c*4, 16 );
  gl.vertexAttribPointer (  mainArray.vTexCoord, 2, gl.FLOAT, false, c*4, 28 );
  gl.vertexAttribPointer (  mainArray.ambientProduct, 3, gl.FLOAT, false, c*4, 36 );
  gl.vertexAttribPointer (  mainArray.translation, 3, gl.FLOAT, false, c*4, 48 );
  gl.vertexAttribPointer (  mainArray.rotation, 3, gl.FLOAT, false, c*4, 60 );
  //gl.vertexAttribPointer (  mainArray.shininess, 1, gl.FLOAT, false, 100, 96 );
  gl.enableVertexAttribArray (mainArray.vPosition );
  gl.enableVertexAttribArray (mainArray.vNormal );
  gl.enableVertexAttribArray (mainArray.vTexCoord );
  gl.enableVertexAttribArray ( mainArray.ambientProduct );
  gl.enableVertexAttribArray ( mainArray.translation );
  gl.enableVertexAttribArray ( mainArray.rotation );
  //gl.enableVertexAttribArray ( mainArray.shininess );

}

function handleAnimation(index)
{

	obj[index].animationTranslation=makeTranslation(obj[index].translationVector[0],obj[index].translationVector[1],obj[index].translationVector[2]);
	obj[index].translationMatrix=matrixMultiply(obj[index].translationMatrix,obj[index].animationTranslation);



	obj[index].animationRotation=makeXRotation(radians(obj[index].rotationAngles[0]));
	obj[index].rotationMatrix=matrixMultiply(obj[index].rotationMatrix,obj[index].animationRotation);


	obj[index].animationRotation=makeYRotation(radians(obj[index].rotationAngles[1]));
	obj[index].rotationMatrix=matrixMultiply(obj[index].rotationMatrix,obj[index].animationRotation);

	obj[index].animationRotation=makeZRotation(radians(obj[index].rotationAngles[2]));
	obj[index].rotationMatrix=matrixMultiply(obj[index].rotationMatrix,obj[index].animationRotation);




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
	     "leftCameraMatrix",
	     "leftViewMatrix",
	     "leftSelfViewMatrix",
	     "rightCameraMatrix",
	     "rightViewMatrix",
	     "rightSelfViewMatrix",
	     "latt",
	     "longg"	];
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
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.projectionMatrix = makePerspective(radians(camera.FOV), camera.aspect, 0.1, 2000);
	}
	if(index==0)
	{
		adjustLeftCamera();

	}
	if(index==1)
	{
		adjustRightCamera();

	}

	gl.uniformMatrix4fv(projectionL,gl.TRUE, new Float32Array(camera.projectionMatrix));


}

function adjustLeftCamera()
{
	gl.viewport(0, 0, canvas.width/2,canvas.height);
	if(camera.newValues)
	{

		camera.leftCameraMatrix = makeLookAt(camera.leftpos, camera.lookat, camera.worldup);
		camera.leftViewMatrix = makeInverse(camera.leftCameraMatrix);
		camera.leftSelfViewMatrix = camera.leftViewMatrix.slice();//matrixMultiply ( camera.leftViewMatrix , camera.projectionMatrix );
		camera.leftViewMatrix[0]=1;
		camera.leftViewMatrix[5]=1;
		camera.leftViewMatrix[10]=1;
		camera.leftViewMatrix[12]=0;
		camera.leftViewMatrix[13]=0;
		camera.leftViewMatrix[14]=0;
                camera.leftViewMatrix[15]=1;


	}

	gl.uniformMatrix4fv(XwiL,gl.TRUE, new Float32Array(camera.leftSelfViewMatrix));

	gl.uniformMatrix4fv(XwiLNormal,gl.TRUE, new Float32Array(camera.leftViewMatrix));

	gl.uniform3fv(eyeL, vec3(camera.lookat));

}

function adjustRightCamera()
{
	gl.viewport(canvas.width/2, 0, canvas.width/2,canvas.height);
	if(camera.newValues)
	{
		camera.rightCameraMatrix = makeLookAt(camera.rightpos, camera.lookat, camera.worldup);
		camera.rightViewMatrix = makeInverse(camera.rightCameraMatrix);
		camera.rightSelfViewMatrix = camera.rightViewMatrix.slice();//matrixMultiply ( camera.rightViewMatrix , camera.projectionMatrix );
		camera.rightViewMatrix[0]=1;
		camera.rightViewMatrix[5]=1;
		camera.rightViewMatrix[10]=1;
		camera.rightViewMatrix[12]=0;
		camera.rightViewMatrix[13]=0;
		camera.rightViewMatrix[14]=0;
    		camera.rightViewMatrix[15]=1;

		camera.newValues=false;


	}

	gl.uniformMatrix4fv(XwiL,gl.TRUE, new Float32Array(camera.rightSelfViewMatrix));

	gl.uniformMatrix4fv(XwiLNormal,gl.TRUE, new Float32Array(camera.rightViewMatrix));

	gl.uniform3fv(eyeL, vec3(camera.lookat));

}


function lookandposition ()
{

	camera.latt=camera.position[0]+(camera.position[1]*Math.tan(radians(verticalAngle+90))*Math.cos(radians(horizontalAngle)));
	camera.longg=camera.position[2]+(camera.position[1]*Math.tan(radians(verticalAngle+90))*Math.sin(radians(horizontalAngle)))
	postgreCheck();
	
	
	$("#distance").html("lat:"+camera.latt+"   long:"+camera.longg+"  height:"+camera.position[1]);
	camera.newValues=true;

	var ver=radians(verticalAngle);
	var verP=radians(verticalAngle+90);
	var hor=radians(horizontalAngle);
	var horP=radians(horizontalAngle+90);
	var horM=radians(horizontalAngle-90);

	camera.lookat[1]= Math.sin(ver)+camera.position[1];
	camera.lookat[0]= Math.cos(hor)*Math.sin(verP)+camera.position[0];  //horizontal
    	camera.lookat[2]= Math.sin(hor)*Math.sin(verP)+camera.position[2];  //horizontal

	//left camera
	camera.leftpos[1]=camera.position[1];
	camera.leftpos[0]=0.02*Math.cos(horP)+camera.position[0];
	camera.leftpos[2]=0.02*Math.sin(horP)+camera.position[2];

	//right camera
	camera.rightpos[1]=camera.position[1];
	camera.rightpos[0]=0.02*Math.cos(horM)+camera.position[0];
	camera.rightpos[2]=0.02*Math.sin(horM)+camera.position[2];


	//worldup vector
	camera.worldup[1]=Math.sin(verP);
	camera.worldup[0]=Math.cos(hor)*Math.sin(-ver);
	camera.worldup[2]=Math.sin(hor)*Math.sin(-ver);

	//updateValuesToHtml();
}
function updateValuesToHtml(){

	$("#posX").html(camera.position[0]);
	$("#posY").html(camera.position[1]);
	$("#posZ").html(camera.position[2]);
	$("#lookX").html(camera.lookat[0]-camera.position[0]);
	$("#lookY").html(camera.lookat[1]-camera.position[1]);
	$("#lookZ").html(camera.lookat[2]-camera.position[2]);
	$("#upX").html(camera.worldup[0]);
	$("#upY").html(camera.worldup[1]);
	$("#upZ").html(camera.worldup[2]);
}

//////////////////////////////////////// LIGHT ////////////////////////////////////

var light=[];
var numberOfLights=0;

light.Initialize = function (position,lightColor)
{
	light[numberOfLights]=['position', 'lightColor'];
	light[numberOfLights].position=position;
	light[numberOfLights].lightColor=lightColor;

/*
	//below is for light object for the scene - star shaped
	mesh.Initialize (lightobject);
	mesh.textureMappingOn=0;
	mesh.ambientProduct=lightColor;
	mesh.diffuseProduct=lightColor;
	mesh.specularProduct=lightColor;
	mesh.shininess=30.0;
	mesh.imageId=1;
	mesh.translationMatrix[0]=0.05;
	mesh.translationMatrix[5]=0.05;
	mesh.translationMatrix[10]=0.05;
	mesh.translationMatrix[12]=position[0];
	mesh.translationMatrix[13]=position[1];
	mesh.translationMatrix[14]=position[2];
	addMeshToObj();*/
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

		gl.uniform4fv ( lightL0, light [lightIndex].position );
		gl.uniform4fv ( lightColorL0,light [lightIndex].lightColor );
		/*document.getElementById("lightX").innerHTML = ""+ light [0].position[0];//275
    		document.getElementById("lightY").innerHTML = ""+ light [0].position[1];//177
   		document.getElementById("lightZ").innerHTML = ""+ light [0].position[2];//84*/
	}

	else if(lightIndex==1)
	{
		gl.uniform4fv ( lightL1, light [lightIndex].position );
		gl.uniform4fv ( lightColorL1,light [lightIndex].lightColor );

	}

	else if(lightIndex==2)
	{
		gl.uniform4fv ( lightL2, light [lightIndex].position );
		gl.uniform4fv ( lightColorL2,light [lightIndex].lightColor );

	}

	else if(lightIndex==3)
	{
		gl.uniform4fv ( lightL3, light [lightIndex].position );
		gl.uniform4fv ( lightColorL3,light [lightIndex].lightColor );

	}

	else if(lightIndex==4)
	{
		gl.uniform4fv ( lightL4, light [lightIndex].position );
		gl.uniform4fv ( lightColorL4,light [lightIndex].lightColor );

	}



	return ////console.log("--: "+lightIndex+" . light sent to vertex shader");

}

function movelight(index,x,y,z)
{
	light[index].position=[x,y,z,1.0];
	obj[index].translationMatrix[12]=x;
	obj[index].translationMatrix[13]=y;
	obj[index].translationMatrix[14]=z;
	lightsToShader();
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

	images[index] = new Image();

	//image.crossOrigin = "use-credentials";
	images[index].src = source;
	images[index].index = index;
	images[index].imageLoaded = false;
	images[index].ilkdefa=true;
	images[index].onload= function()
	{
		images[index].imageLoaded = true;
		if(index==imgId)
			handleTexture(index,false);
	}
	

	////console.log("--: "+index+" . textureFunction finished");
}

function handleTexture(index,bump)
{
	if(bump)
	{

		bumpTexture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE7);
		gl.bindTexture(gl.TEXTURE_2D, bumpTexture);
		// Upload the image into the texture.
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[index]);

		setupTextureFilteringAndMips(images[index].width, images[index].height);
	}
	else
	{
		if(true)
		{
			texture = gl.createTexture();
			gl.activeTexture(gl.TEXTURE4);
			gl.bindTexture(gl.TEXTURE_2D, texture);
			// Upload the image into the texture.
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[index]);
//			images[index].ilkdefa=false;
		}
		else
		{
			gl.activeTexture(gl.TEXTURE4);
			gl.bindTexture(gl.TEXTURE_2D, texture);
		}
		setupTextureFilteringAndMips(images[index].width, images[index].height);
	}
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
	//toggleFullScreen();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 87) {
      	   goForward();
      }
    }, false);

function goForward()
{
	camera.position[0]+=Math.cos(radians(horizontalAngle))*0.1;
	camera.position[2]+=Math.sin(radians(horizontalAngle))*0.1;
	lookandposition();
	//beginRender();
}


document.addEventListener("keydown", function(e) {
      if (e.keyCode == 83) {
        camera.position[0]-=Math.cos(radians(horizontalAngle))*0.1;
	camera.position[2]-=Math.sin(radians(horizontalAngle))*0.1;

	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 65) {
        camera.position[0]-=Math.cos(radians(horizontalAngle+90))*0.1;
	camera.position[2]-=Math.sin(radians(horizontalAngle+90))*0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 68) {
        camera.position[0]+=Math.cos(radians(horizontalAngle+90))*0.1;
	camera.position[2]+=Math.sin(radians(horizontalAngle+90))*0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode ==33) {
        camera.position[1]+=0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 34) {
        camera.position[1]-=0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 90) {
        camera.FOV-=0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 88) {
        camera.FOV+=0.1;
	lookandposition();
	//beginRender();
      }
    }, false);

function zoomIN()
{
	camera.FOV-=1;
	lookandposition();
}

function zoomOUT()
{
	camera.FOV+=1;
	lookandposition();
}


function changeHorizontalAngle(i)
{
	horizontalAngle+=i;
	lookandposition();
	//beginRender();

}

function changeVerticalAngle(i)
{
	verticalAngle+=i;
	lookandposition();
	//beginRender();

}

window.addEventListener("deviceorientation", handleOrientation, true);


$(document).click(function(event){toggleFullScreen();});

function handleOrientation(event) {

    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    // Do stuff with the new orientation data
    //////console.log("called");
    //document.getElementById("X").innerHTML = "X : "+ alpha;//275
    //document.getElementById("Y").innerHTML = "Y : "+ beta;//177
    //document.getElementById("Z").innerHTML = "Z : "+ gamma;//84


	if( (beta == null)||(gamma == null) || (alpha == null) )
    	{

    	}
 	else
	{
		if(gamma<0)
		{
			horizontalAngle=-(alpha-270);//90
			verticalAngle=-gamma-90;//0
		}
		else
		{
			horizontalAngle=-(alpha-90);//90
			verticalAngle=-((gamma)-90);//0

		}
	        lookandposition();
	        //beginRender();
  	}


}

////////////////////////////////////  FRAME RATE  ////////////////////////////////
//
// Framerate object
//
// This object keeps track of framerate and displays it as the innerHTML text of the
// HTML element with the passed id. Once created you call snapshot at the end
// of every rendering cycle. Every 500ms the framerate is updated in the HTML element.
//
Framerate = function(id)
{
    this.numFramerates = 10;
    this.framerateUpdateInterval = 500;
    this.id = id;

    this.renderTime = -1;
    this.framerates = [ ];
    self = this;
    var fr = function() { self.updateFramerate() }
    setInterval(fr, this.framerateUpdateInterval);
}

Framerate.prototype.updateFramerate = function()
{
    var tot = 0;
    for (var i = 0; i < this.framerates.length; ++i)
        tot += this.framerates[i];

    var framerate = tot / this.framerates.length;
    framerate = Math.round(framerate);
    document.getElementById(this.id).innerHTML = "Framerate:"+framerate+"fps";
}

Framerate.prototype.snapshot = function()
{
    if (this.renderTime < 0)
        this.renderTime = new Date().getTime();
    else {
        var newTime = new Date().getTime();
        var t = newTime - this.renderTime;
        if (t == 0)
            return;
        var framerate = 1000/t;
        this.framerates.push(framerate);
        while (this.framerates.length > this.numFramerates)
            this.framerates.shift();
        this.renderTime = newTime;
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



function getProgramInfo(gl, program) {
    var result = {
        attributes: [],
        uniforms: [],
        attributeCount: 0,
        uniformCount: 0
    },
        activeUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS),
        activeAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    // Taken from the WebGl spec:
    // http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
    var enums = {
        0x8B50: 'FLOAT_VEC2',
        0x8B51: 'FLOAT_VEC3',
        0x8B52: 'FLOAT_VEC4',
        0x8B53: 'INT_VEC2',
        0x8B54: 'INT_VEC3',
        0x8B55: 'INT_VEC4',
        0x8B56: 'BOOL',
        0x8B57: 'BOOL_VEC2',
        0x8B58: 'BOOL_VEC3',
        0x8B59: 'BOOL_VEC4',
        0x8B5A: 'FLOAT_MAT2',
        0x8B5B: 'FLOAT_MAT3',
        0x8B5C: 'FLOAT_MAT4',
        0x8B5E: 'SAMPLER_2D',
        0x8B60: 'SAMPLER_CUBE',
        0x1400: 'BYTE',
        0x1401: 'UNSIGNED_BYTE',
        0x1402: 'SHORT',
        0x1403: 'UNSIGNED_SHORT',
        0x1404: 'INT',
        0x1405: 'UNSIGNED_INT',
        0x1406: 'FLOAT'
    };

    // Loop through active uniforms
    for (var i=0; i < activeUniforms; i++) {
        var uniform = gl.getActiveUniform(program, i);
        uniform.typeName = enums[uniform.type];
        result.uniforms.push(uniform);
        result.uniformCount += uniform.size;
    }

    // Loop through active attributes
    for (var i=0; i < activeAttributes; i++) {
        var attribute = gl.getActiveAttrib(program, i);
        attribute.typeName = enums[attribute.type];
        result.attributes.push(attribute);
        result.attributeCount += attribute.size;
    }

    return result;
}
