var scene;
var globals = 
{
    gameobjectcounter : 0
};

function BasicMesh()
{
    this.vertexBuffer           = null;
    this.normalBuffer           = null;
    this.textureCoordBuffer     = null;
    this.indexBuffer            = null;
    this.shaderTechnique        = null;
    this.isEdgeDetection        = false;
}

BasicMesh.prototype.init = function(vertices, normals, texturecoords, indices, edgeDetection)
{
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    this.vertexBuffer.itemSize = 3;
    this.vertexBuffer.numItems = vertices.length/3;
       
    this.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    this.normalBuffer.itemSize = 3;
    this.normalBuffer.numItems = normals.length/3;
    
    this.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texturecoords), gl.STATIC_DRAW);
    this.textureCoordBuffer.itemSize = 2;
    this.textureCoordBuffer.numItems = texturecoords.length/2;

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = indices.length;

    this.isEdgeDetection = edgeDetection;
};

BasicMesh.prototype.draw = function()
{
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    setMatrixUniforms();
    setLightingUniforms();
    setMaterialProperties();
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "isEdgeDetection"), this.isEdgeDetection); 
    
    if(this.shaderTechnique == "grass")
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, grassTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    else if(this.shaderTechnique == "red")
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, redTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    else if(this.shaderTechnique == "blue")
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, blueTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    else if(this.shaderTechnique == "purple")
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, purpleTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    else if(this.shaderTechnique == "yellow")
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, yellowTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    else
    {
        gl.activeTexture(gl.TEXTURE0);
    +   gl.bindTexture(gl.TEXTURE_2D, myTexture);
    +   gl.uniform1i(shaderProgram.samplerUniform, 0);
    }
    
    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function GameObject()
{
    this.transform     = null;
    this.mesh          = null;
    this.name          = null;
}

GameObject.prototype.init = function()
{
    this.worldtransform = mat4.create();
    mat4.identity(this.worldtransform);
    this.name = "Object" + globals.gameobjectcounter;    
    globals.gameobjectcounter++;
}

GameObject.prototype.update = function()
{
    mat4.set(mvMatrix, this.worldtransform);
}

function toggleFullScreen() {
    var canvas = document.getElementById("canvas");
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

document.addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
        toggleFullScreen();
        webGLStart();
      }
    }, false);

window.addEventListener("orientationchange", function(e){
    toggleFullScreen();
    webGLStart();
    StartDeviceOrientationProperties.set = false;
}, false);

function webGLStart() {
    console.log("started");
    var canvas = document.getElementById("canvas");
    
    initGL(canvas);
    initShaders();
    initBuffers();
    initTexture();
    initWorld();
    canvas.addEventListener("touchstart", function(e) {
        toggleFullScreen();
        webGLStart();
    }, false);
    

    gl.clearColor(1.0, 1.0,1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    
    document.onkeydown = moveFunction;

    tick();
}

function initBuffers() {

}

var rPyramid = 0;
var rCube = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth/2, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(60, (gl.viewportWidth/2) / gl.viewportHeight, 0.1, 1000.0, pMatrix);
    
    mat4.rotate(pMatrix, degToRad(DeviceOrientationProperties.alpha), [1,0,0]);
    mat4.rotate(pMatrix, degToRad(DeviceOrientationProperties.beta), [0,1,0]);
    mat4.rotate(pMatrix, degToRad(DeviceOrientationProperties.gamma), [0,0,1]);
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0.45, -5, -40]);
    mvPushMatrix();
    mat4.translate(mvMatrix, [0, 0, 80]);
    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(rPyramid), [0, 1, 0]);
    mat4.scale(mvMatrix, [0.5, 0.5, 0.5]);
    mvPushMatrix();
    scene[0].draw();
    mvPopMatrix();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, -5, -80]);
    mvPushMatrix();
    mat4.scale(mvMatrix, [0.2, 0.2, 0.2]);
    mvPushMatrix();
    scene[1].draw();
    mvPopMatrix();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [50, -5, -40]);
    mvPushMatrix();
    scene[2].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [-50, -5, -40]);
    mvPushMatrix();
    scene[3].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.scale(mvMatrix, [20, 20, 20]);
    mvPushMatrix();
    scene[4].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, -206, 0]);
    mvPushMatrix();
    mat4.scale(mvMatrix, [400, 400, 400]);
    mvPushMatrix();
    scene[5].draw();
    mvPopMatrix();
    mvPopMatrix();
    
    mvPopMatrix();
    
    //Right Camera
    gl.viewport(gl.viewportWidth/2, 0, gl.viewportWidth/2, gl.viewportHeight);

    //Projection Matrix won't change
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [-0.45, -5, -40]);
    mvPushMatrix();
    mat4.translate(mvMatrix, [0, 0, 80]);
    mvPushMatrix();
    mat4.rotate(mvMatrix, degToRad(rPyramid), [0, 1, 0]);
    mat4.scale(mvMatrix, [0.5, 0.5, 0.5]);
    mvPushMatrix();
    scene[0].draw();
    mvPopMatrix();
    mvPopMatrix();
    
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, -5, -80]);
    mvPushMatrix();
    mat4.scale(mvMatrix, [0.2, 0.2, 0.2]);
    mvPushMatrix();
    scene[1].draw();
    mvPopMatrix();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [50, -5, -40]);
    mvPushMatrix();
    scene[2].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [-50, -5, -40]);
    mvPushMatrix();
    scene[3].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.scale(mvMatrix, [20, 20, 20]);
    mvPushMatrix();
    scene[4].draw();
    mvPopMatrix();
    
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, -206, 0]);
    mvPushMatrix();
    mat4.scale(mvMatrix, [400, 400, 400]);
    mvPushMatrix();
    scene[5].draw();
    mvPopMatrix();
    mvPopMatrix();
    mvPopMatrix();
}


function tick() {
    requestAnimFrame(tick);
    drawScene();
    animate();
}


var gl;

function initGL(canvas) {
    try {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl = canvas.getContext("webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {

    }

    if (!gl) {
        alert("WebGL initialization failed");
    }
}

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}


function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid PopMatrix!";
    }

    mvMatrix = mvMatrixStack.pop();
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

var shaderProgram;

function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
 
    shaderProgram.materialAmbient = gl.getUniformLocation(shaderProgram, "ambient_cofficient");
    shaderProgram.materialDiffuse = gl.getUniformLocation(shaderProgram, "diffuse_cofficient");
    shaderProgram.materialSpecular = gl.getUniformLocation(shaderProgram, "specular_cofficient");
    shaderProgram.materialShiness = gl.getUniformLocation(shaderProgram, "shininess");

}

var myTexture;
var grassTexture;
var yellowTexture;
var redTexture;
var blueTexture;
var purpleTexture;
function initTexture()
{
    myTexture = gl.createTexture();
    myTexture.image = new Image();
    myTexture.image.onload = function()
        {
            handleLoadedTexture(myTexture);
        }
    
    var img = generatePNG(512,512,128);
    myTexture.image.src="img/skybox.png";
    
    grassTexture = gl.createTexture();
    grassTexture.image = new Image();
    grassTexture.image.onload = function()
    {
        handleLoadedTexture(grassTexture);
    }
    
    grassTexture.image.src="img/grass.png";
    
    redTexture = gl.createTexture();
    redTexture.image = new Image();
    redTexture.image.onload = function()
    {
        handleLoadedTexture(redTexture);
    }
    
    redTexture.image.src="img/red.png";
    
    
    blueTexture = gl.createTexture();
    blueTexture.image = new Image();
    blueTexture.image.onload = function()
    {
        handleLoadedTexture(blueTexture);
    }
    
    blueTexture.image.src="img/blue.png";
    
    
    purpleTexture = gl.createTexture();
    purpleTexture.image = new Image();
    purpleTexture.image.onload = function()
    {
        handleLoadedTexture(purpleTexture);
    }
    
    purpleTexture.image.src="img/purple.png";
    
    
    yellowTexture = gl.createTexture();
    yellowTexture.image = new Image();
    yellowTexture.image.onload = function()
    {
        handleLoadedTexture(yellowTexture);
    }
    
    yellowTexture.image.src="img/yellow.png";
    
    
}

function handleLoadedTexture(texture)
{
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.GL_LINEAR );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.GL_LINEAR );
    
    var ext = (
          gl.getExtension('EXT_texture_filter_anisotropic') ||
          gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
          gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
        );
        if (ext){
          var max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          gl.texParameteri(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
        }
    
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        alert("This element does not exist");
        return null;
    }
    var str = "";
    var k = shaderScript.firstChild;

    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }

        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    
    var normalMatrix = mat3.create();
    mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

function setLightingUniforms()
{
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "num_lights"), lighting['numlights']); 
//    console.log(lighting['numlights']);
    for (var i = 0; i < lighting['numlights']; i++) {
        //console.log(lighting['lights'][i]['color'][0]);
        gl.uniform3f(gl.getUniformLocation(shaderProgram, "lights[" + i + "].color"), lighting['lights'][i]['color'][0], lighting['lights'][i]['color'][1], lighting['lights'][i]['color'][2]);  
        gl.uniform3f(gl.getUniformLocation(shaderProgram, "lights[" + i + "].direction"), lighting['lights'][i]['direction'][0], lighting['lights'][i]['direction'][1], lighting['lights'][i]['direction'][2]);  
    } 
    gl.uniform3f(gl.getUniformLocation(shaderProgram, "ambient"), lighting['ambient']['color'][0], lighting['ambient']['color'][1], lighting['ambient']['color'][2]);  
}

function setMaterialProperties() 
{
    gl.uniform3f(shaderProgram.materialAmbient, ambientCoefficient[0], ambientCoefficient[1], ambientCoefficient[2]);  
    gl.uniform3f(shaderProgram.materialDiffuse, diffuseCoefficient[0], diffuseCoefficient[1], diffuseCoefficient[2]);  
    gl.uniform3f(shaderProgram.materialSpecular, specularCoefficient[0], specularCoefficient[1], specularCoefficient[2]);
    gl.uniform1f(shaderProgram.materialShiness, shininess);
}

window.onload = function () {
    webGLStart();
}

var lastTime = 0;

function animate() {
    var timeNow = new Date().getTime();

    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

        rPyramid += (90 * elapsed) / 1000.0;
        rCube += (75 * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}


function initWorld()
{
    scene = new Array();
    var teapot = new BasicMesh();
    
    teapot.init(pot['vertexPositions'], pot['vertexNormals'], pot['vertexTextureCoords'], pot['indices'], true);
    
    var object = new BasicMesh();
    var bol = magic(merrygoround);
    object.shaderTechnique = "red";
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], true);
    
    scene.push(object);
    
    
    
    
    object = new BasicMesh();
    bol = magic(swing);
    object.shaderTechnique = "yellow";
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], true);
    
    scene.push(object);
    
    
    
    object = new BasicMesh();
    bol = magic(slide);
    object.shaderTechnique = "blue";
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], true);
    
    scene.push(object);
    
    
    
    object = new BasicMesh();
    bol = magic(seesaw);
    object.shaderTechnique = "purple";
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], true);
    
    scene.push(object);
    
    
    
    object = new BasicMesh();
    bol = sphere;
    
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], false);
    
    scene.push(object);
    
    
    object = new BasicMesh();
    bol = magic(box);
    object.shaderTechnique = "grass";
    object.init(bol["vertices"], bol["normals"], bol["texturecoords"], bol["faces"], false);
    
    scene.push(object);
}

var DeviceOrientationProperties = 
{
    alpha : 0,
    beta : 0,
    gamma : 0
};

var StartDeviceOrientationProperties =
{
    alpha : 0,
    beta : 0,
    gamma : 0,
    set : false,
}


window.addEventListener("deviceorientation", handleOrientation, true);
            
function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha    = event.alpha;
  var beta     = event.beta;
  var gamma    = event.gamma;

/*
Device      World
X           -Z
Y           X
Z           Y


*/
    if(!StartDeviceOrientationProperties.set)
    {
        StartDeviceOrientationProperties.alpha = gamma;
        StartDeviceOrientationProperties.beta = -alpha;
        StartDeviceOrientationProperties.gamma = beta;
        StartDeviceOrientationProperties.set = true;
        
        if(gamma > 0)
        {
            document.getElementById("error").style.visibility = "visible";
        }
        else
        {
            document.getElementById("error").style.visibility = "hidden";
        }
    }
    
DeviceOrientationProperties.alpha = gamma - StartDeviceOrientationProperties.alpha;
DeviceOrientationProperties.beta = (-alpha) - StartDeviceOrientationProperties.beta;
DeviceOrientationProperties.gamma = beta - StartDeviceOrientationProperties.gamma;
    
    
}

function moveFunction(event)
{
    if(event.keyCode == 39)
    {
        //Left
        DeviceOrientationProperties.beta++;
    }
    
    else if(event.keyCode == 37)
    {
        DeviceOrientationProperties.beta--;
    }
}

//Keep Screen Awake
noSleepTimer = setInterval(function() {
        window.location = window.location;
        setTimeout(window.stop, 0);
      }, 30000);
