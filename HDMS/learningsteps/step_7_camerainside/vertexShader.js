var vertexShaderText="attribute vec4 vPosition;"+
		     "attribute vec4 vPosition1;"+
		"attribute vec3 vNormal;"+
		"attribute vec2 vTexCoord;"+
		"varying vec3 interpolatedNormal;"+
		"varying vec4 interpolatedPosition;"+
		"varying vec2 texCoord;"+
		"varying vec3 Eye;"+
		"attribute vec4 vColor;"+
		"uniform mat4 Translation;"+
		"uniform mat4 Rotation;"+
		"uniform mat4 AnimationTranslation;"+
		"uniform mat4 AnimationRotation;"+
		"mat4 Xiw;"+
		"mat4 Projection;"+
		"struct camera_type {"+
			"vec3 lookat;"+
			"vec3 position;"+
			"vec3 leftpos;"+
			"vec3 rightpos;"+
			"vec3 worldup;"+
			"float aspect;"+
			"mat4 projectionMatrix;"+
			"float FOV;"+
			"mat4 rightCameraMatrix;"+
			"mat4 rightViewMatrix;"+
			"mat4 leftCameraMatrix;"+
			"mat4 leftViewMatrix;"+
		"} camera;"+
		"struct canvas_type {"+
			"float width;"+
			"float height;"+
		"} canvas;"+
		"uniform float canvaswidth;"+
		"uniform float canvasheight;"+
		"uniform float verticalAngle;"+
		"uniform float horizontalAngle;"+
		"uniform vec3 cameraPosition;"+
		"uniform float cameraIndex;"+
		"void adjustLeftCamera();"+
		"void adjustRightCamera();"+
		"void lookAndPosition();"+
		"void adjustCamera(float index);"+
		"void main(){"+	
			"canvas.width=canvaswidth;"+
			"canvas.height=canvasheight;"+
			"camera.position=cameraPosition;"+
			"lookAndPosition();"+
			"adjustCamera(cameraIndex);"+
			"vec4 mvPosition =vec4( Translation*vPosition);"+
			"gl_Position = vec4(Projection * Xiw*mvPosition);"+
			"vec3 transformedNormal = vec3( normalize( AnimationRotation*Rotation*vec4(vNormal.xyz,1.0)).xyz);"+
			"interpolatedNormal=transformedNormal;"+
			"interpolatedPosition=mvPosition;"+
			"texCoord = vTexCoord;"+
			"Eye=camera.lookat;"+
		"}"+
		"void lookAndPosition(){"+
			"float ver=float(radians(verticalAngle));"+
			"float verP=float(radians(verticalAngle+90.0));"+
			"float hor=float(radians(horizontalAngle));"+
			"float horP=float(radians(horizontalAngle+90.0));"+
			"float horM=float(radians(horizontalAngle-90.0));"+
			"camera.lookat[1]=float(sin(ver)+camera.position[1]);"+
			"camera.lookat[0]=float(cos(hor)*sin(verP)+camera.position[0]);"+
			"camera.lookat[2]=float(sin(hor)*sin(verP)+camera.position[2]);"+
			"camera.leftpos[1]=camera.position[1];"+
			"camera.leftpos[0]=0.02*cos(horP)+camera.position[0];"+
			"camera.leftpos[2]=0.02*sin(horP)+camera.position[2];"+
			"camera.rightpos[1]=camera.position[1];"+
			"camera.rightpos[0]=0.02*cos(horM)+camera.position[0];"+
			"camera.rightpos[2]=0.02*sin(horM)+camera.position[2];"+
			"camera.worldup[1]=sin(verP);"+
			"camera.worldup[0]=cos(hor)*sin(-ver);"+
			"camera.worldup[2]=sin(hor)*sin(-ver);"+
		"}"+
		"mat4 makePerspective(float fieldOfViewInRadians, float aspect, float near, float far) {"+
			"float PI=3.141592653589793;"+  
			"float f = tan(PI * 0.5 - 0.5 * fieldOfViewInRadians);"+
			"float rangeInv = 1.0 / (near - far);"+
			"return mat4("+
				"f / aspect, 0, 0, 0,"+
			    	"0, f, 0, 0,"+
			    	"0, 0, (near + far) * rangeInv, -1,"+
			     	"0, 0, near * far * rangeInv * 2.0, 0"+
			  	");"+
		"}"+
		"mat4 makeLookAt(vec3 cameraPosition, vec3 target, vec3 up) {"+
  			"vec3 zAxis = normalize(cameraPosition-target);"+
			"vec3 xAxis = cross(up, zAxis);"+
			"vec3 yAxis = cross(zAxis, xAxis);"+
			"return mat4("+
			   	"xAxis[0], xAxis[1], xAxis[2], 0,"+
			     	"yAxis[0], yAxis[1], yAxis[2], 0,"+
			     	"zAxis[0], zAxis[1], zAxis[2], 0,"+
			    	"cameraPosition[0],"+
			     	"cameraPosition[1],"+
			     	"cameraPosition[2],"+
			     	"1);"+
		"}"+
		"mat4 makeInverse(mat4 m) {"+
		  "float m00 = m[0 ][ 0];"+
		  "float m01 = m[0 ][ 1];"+
		  "float m02 = m[0 ][2];"+
		  "float m03 = m[0 ][ 3];"+
		  "float m10 = m[1 ][ 0];"+
		  "float m11 = m[1 ][ 1];"+
		  "float m12 = m[1 ][ 2];"+
		  "float m13 = m[1 ][ 3];"+
		  "float m20 = m[2 ][ 0];"+
		  "float m21 = m[2 ][ 1];"+
		  "float m22 = m[2 ][ 2];"+
		  "float m23 = m[2 ][ 3];"+
		  "float m30 = m[3 ][ 0];"+
		  "float m31 = m[3 ][ 1];"+
		  "float m32 = m[3 ][ 2];"+
		  "float m33 = m[3 ][ 3];"+
		  "float tmp_0  = m22 * m33;"+
		  "float tmp_1  = m32 * m23;"+
		  "float tmp_2  = m12 * m33;"+
		  "float tmp_3  = m32 * m13;"+
		  "float tmp_4  = m12 * m23;"+
		  "float tmp_5  = m22 * m13;"+
		  "float tmp_6  = m02 * m33;"+
		  "float tmp_7  = m32 * m03;"+
		  "float tmp_8  = m02 * m23;"+
		  "float tmp_9  = m22 * m03;"+
		  "float tmp_10 = m02 * m13;"+
		  "float tmp_11 = m12 * m03;"+
		  "float tmp_12 = m20 * m31;"+
		  "float tmp_13 = m30 * m21;"+
		  "float tmp_14 = m10 * m31;"+
		  "float tmp_15 = m30 * m11;"+
		  "float tmp_16 = m10 * m21;"+
		  "float tmp_17 = m20 * m11;"+
		  "float tmp_18 = m00 * m31;"+
		  "float tmp_19 = m30 * m01;"+
		  "float tmp_20 = m00 * m21;"+
		  "float tmp_21 = m20 * m01;"+
		  "float tmp_22 = m00 * m11;"+
		  "float tmp_23 = m10 * m01;"+
		  "float t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -  (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);"+
		  "float t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -  (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);"+
		  "float t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);"+
		  "float t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);"+
		  "float d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);"+
		  "return mat4("+
		    "d * t0,"+
		    "d * t1,"+
		    "d * t2,"+
		    "d * t3,"+
		    "d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -  (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),"+
		    "d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -  (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),"+
		    "d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),"+
		    "d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),"+
		    "d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),"+
		    "d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),"+
		    "d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),"+
		    "d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),"+
		    "d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),"+
		    "d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),"+
		    "d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),"+
		    "d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))"+
		  ");"+
		"}"+	
		"void adjustCamera(float index){"+
			"camera.aspect = canvas.width / 2.0/canvas.height;"+
			"camera.projectionMatrix = mat4(makePerspective(radians(50.0), camera.aspect, 0.1, 2000.0));"+
			"if(index==0.0){"+
				"adjustLeftCamera();"+
			"}"+
			"if(index==1.0){"+
				"adjustRightCamera();"+
			"}"+
			"Projection=camera.projectionMatrix;"+
		"}"+
		"void adjustRightCamera(){"+
			"camera.rightCameraMatrix = makeLookAt(camera.rightpos, camera.lookat, camera.worldup);"+
			"camera.rightViewMatrix = makeInverse(camera.rightCameraMatrix);"+
			"Xiw=camera.rightViewMatrix;"+
		"}"+
		"void adjustLeftCamera(){"+
			"camera.leftCameraMatrix = makeLookAt(camera.leftpos, camera.lookat, camera.worldup);"+
			"camera.leftViewMatrix = makeInverse(camera.leftCameraMatrix);"+
			"Xiw=camera.leftViewMatrix;"+
		"}";


















