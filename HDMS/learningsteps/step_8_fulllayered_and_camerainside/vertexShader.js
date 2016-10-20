var vertexShaderText="attribute vec4 vPosition;\n"+
	"attribute vec3 vNormal;\n"+
	"attribute vec2 vTexCoord;\n"+
	"attribute vec3 translation;\n"+
	"attribute vec3 rotation;\n"+
	"attribute vec3 ambientProduct;\n"+
	"attribute vec3 diffuseProduct;\n"+
	"attribute vec3 specularProduct;\n"+
        "varying vec3 interpolatedNormal;\n"+
	"varying vec3 Eye;"+
	"varying vec4 interpolatedPosition;\n"+
	"varying vec2 texCoord;\n"+
	"mat4 Xiw;\n"+
	"mat4 Projection;\n"+
	"struct camera_type {\n"+
		"vec3 lookat;\n"+
		"vec3 position;\n"+
		"vec3 leftpos;\n"+
		"vec3 rightpos;\n"+
		"vec3 worldup;\n"+
		"float aspect;\n"+
		"mat4 projectionMatrix;\n"+
		"float FOV;\n"+
		"mat4 rightCameraMatrix;\n"+
		"mat4 rightViewMatrix;\n"+
		"mat4 leftCameraMatrix;\n"+
		"mat4 leftViewMatrix;\n"+
	"} camera;\n"+
	"struct canvas_type {\n"+
		"float width;\n"+
		"float height;\n"+
	"} canvas;\n"+
	"uniform float canvaswidth;\n"+
	"uniform float canvasheight;\n"+
	"uniform float verticalAngle;\n"+
	"uniform float horizontalAngle;\n"+
	"uniform vec3 cameraPosition;\n"+
	"uniform float cameraIndex;\n"+
	"uniform float newValue;\n"+
	"void adjustLeftCamera();\n"+
	"void adjustRightCamera();\n"+
	"void lookAndPosition();\n"+
	"bool first=true;\n"+
	"void adjustCamera(float index);\n"+
	"varying vec4 fAmbientProduct, fDiffuseProduct, fSpecularProduct;\n"+
	"varying float fShininess;\n"+
	"void main(){"+
		"canvas.width=canvaswidth;\n"+
		"canvas.height=canvasheight;\n"+
		"camera.position=cameraPosition;\n"+
		"lookAndPosition();\n"+
		"adjustCamera(cameraIndex);\n"+
		"mat4 transMat = mat4(1.0,0.0,0.0,0.0,\n"+
				     "0.0,1.0,0.0,0.0,\n"+
				     "0.0,0.0,1.0,0.0,\n"+
				     "translation[0],translation[1],translation[2],1.0);\n"+
		"mat4 xrot =  mat4(1.0,0.0,0.0,0.0,\n"+
				  "0.0,cos(rotation[0]),-sin(rotation[0]),0.0,\n"+
				  "0.0,sin(rotation[0]),cos(rotation[0]),0.0,\n"+
				  "0.0,0.0,0.0,1.0);\n"+
		"mat4 yrot =  mat4(cos(rotation[1]),0.0,sin(rotation[1]),0.0,\n"+
				  "0.0,1.0,0.0,0.0,\n"+
				  "-sin(rotation[1]),0.0,cos(rotation[1]),0.0,\n"+
				  "0.0,0.0,0.0,1.0);\n"+	
		"mat4 zrot =  mat4(cos(rotation[2]),-sin(rotation[2]),0.0,0.0,\n"+
				  "sin(rotation[2]),cos(rotation[2]),0.0,0.0,\n"+
				  "0.0,0.0,1.0,0.0,\n"+
				  "0.0,0.0,0.0,1.0);\n"+
		"mat4 rotMat = xrot*yrot*zrot;\n"+
		"vec4 mvPosition =vec4(transMat*rotMat*vPosition);\n"+
		"gl_Position = vec4(Projection * Xiw*mvPosition);\n"+
		"vec3 transformedNormal = vec3( normalize( rotMat*vec4(vNormal.xyz,1.0)).xyz);\n"+
		"interpolatedNormal=transformedNormal;\n"+
		"interpolatedPosition=mvPosition;\n"+
		"texCoord = vTexCoord;\n"+
		"Eye=camera.lookat;\n"+
		"fAmbientProduct=vec4(ambientProduct,1.0);\n"+
		"fDiffuseProduct=vec4(diffuseProduct,1.0);\n"+
		"fSpecularProduct=vec4(specularProduct,1.0);\n"+
	"}"+
	"void lookAndPosition(){\n"+
		"float ver=float(radians(verticalAngle));\n"+
		"float verP=float(radians(verticalAngle+90.0));\n"+
		"float hor=float(radians(horizontalAngle));\n"+
		"float horP=float(radians(horizontalAngle+90.0));\n"+
		"float horM=float(radians(horizontalAngle-90.0));\n"+
		"camera.lookat[1]=float(sin(ver)+camera.position[1]);"+
		"camera.lookat[0]=float(cos(hor)*sin(verP)+camera.position[0]);\n"+
		"camera.lookat[2]=float(sin(hor)*sin(verP)+camera.position[2]);\n"+
		"camera.leftpos[1]=camera.position[1];\n"+
		"camera.leftpos[0]=0.02*cos(horP)+camera.position[0];\n"+
		"camera.leftpos[2]=0.02*sin(horP)+camera.position[2];\n"+
		"camera.rightpos[1]=camera.position[1];\n"+
		"camera.rightpos[0]=0.02*cos(horM)+camera.position[0];\n"+
		"camera.rightpos[2]=0.02*sin(horM)+camera.position[2];\n"+
		"camera.worldup[1]=sin(verP);\n"+
		"camera.worldup[0]=cos(hor)*sin(-ver);\n"+
		"camera.worldup[2]=sin(hor)*sin(-ver);\n"+
	"}\n"+
	"mat4 makePerspective(float fieldOfViewInRadians, float aspect, float near, float far) {\n"+
		"float PI=3.141592653589793;\n"+  
		"float f = tan(PI * 0.5 - 0.5 * fieldOfViewInRadians);\n"+
		"float rangeInv = 1.0 / (near - far);\n"+
		"return mat4(\n"+
			"f / aspect, 0, 0, 0,\n"+
		    	"0, f, 0, 0,\n"+
		    	"0, 0, (near + far) * rangeInv, -1,\n"+
		     	"0, 0, near * far * rangeInv * 2.0, 0\n"+
		  	");\n"+
		"}\n"+
	"mat4 makeLookAt(vec3 cameraPosition, vec3 target, vec3 up) {\n"+
		"vec3 zAxis = normalize(cameraPosition-target);\n"+
		"vec3 xAxis = cross(up, zAxis);\n"+
		"vec3 yAxis = cross(zAxis, xAxis);\n"+
		"return mat4(\n"+
		   	"xAxis[0], xAxis[1], xAxis[2], 0,\n"+
		     	"yAxis[0], yAxis[1], yAxis[2], 0,\n"+
		     	"zAxis[0], zAxis[1], zAxis[2], 0,\n"+
		    	"cameraPosition[0],\n"+
		     	"cameraPosition[1],\n"+
		     	"cameraPosition[2],\n"+
		     	"1);\n"+
	"}\n"+
	"mat4 makeInverse(mat4 m) {\n"+
		  "float m00 = m[0 ][ 0];\n"+
		  "float m01 = m[0 ][ 1];\n"+
		  "float m02 = m[0 ][2];\n"+
		  "float m03 = m[0 ][ 3];\n"+
		  "float m10 = m[1 ][ 0];\n"+
		  "float m11 = m[1 ][ 1];\n"+
		  "float m12 = m[1 ][ 2];\n"+
		  "float m13 = m[1 ][ 3];\n"+
		  "float m20 = m[2 ][ 0];\n"+
		  "float m21 = m[2 ][ 1];\n"+
		  "float m22 = m[2 ][ 2];\n"+
		  "float m23 = m[2 ][ 3];\n"+
		  "float m30 = m[3 ][ 0];\n"+
		  "float m31 = m[3 ][ 1];\n"+
		  "float m32 = m[3 ][ 2];\n"+
		  "float m33 = m[3 ][ 3];\n"+
		  "float tmp_0  = m22 * m33;\n"+
		  "float tmp_1  = m32 * m23;\n"+
		  "float tmp_2  = m12 * m33;\n"+
		  "float tmp_3  = m32 * m13;\n"+
		  "float tmp_4  = m12 * m23;\n"+
		  "float tmp_5  = m22 * m13;\n"+
		  "float tmp_6  = m02 * m33;\n"+
		  "float tmp_7  = m32 * m03;\n"+
		  "float tmp_8  = m02 * m23;\n"+
		  "float tmp_9  = m22 * m03;\n"+
		  "float tmp_10 = m02 * m13;\n"+
		  "float tmp_11 = m12 * m03;\n"+
		  "float tmp_12 = m20 * m31;\n"+
		  "float tmp_13 = m30 * m21;\n"+
		  "float tmp_14 = m10 * m31;\n"+
		  "float tmp_15 = m30 * m11;\n"+
		  "float tmp_16 = m10 * m21;\n"+
		  "float tmp_17 = m20 * m11;\n"+
		  "float tmp_18 = m00 * m31;\n"+
		  "float tmp_19 = m30 * m01;\n"+
		  "float tmp_20 = m00 * m21;\n"+
		  "float tmp_21 = m20 * m01;\n"+
		  "float tmp_22 = m00 * m11;\n"+
		  "float tmp_23 = m10 * m01;\n"+
		  "float t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -  (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);\n"+
		  "float t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -  (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);\n"+
		  "float t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);\n"+
		  "float t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);\n"+
		  "float d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);\n"+
		  "return mat4(\n"+
		    "d * t0,\n"+
		    "d * t1,\n"+
		    "d * t2,\n"+
		    "d * t3,\n"+
		    "d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -  (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),\n"+
		    "d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -  (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),\n"+
		    "d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),\n"+
		    "d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),\n"+
		    "d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),\n"+
		    "d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),\n"+
		    "d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),\n"+
		    "d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),\n"+
		    "d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),\n"+
		    "d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),\n"+
		    "d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),\n"+
		    "d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))\n"+
		  ");\n"+
		"}\n"+	
		"void adjustCamera(float index){\n"+
			"camera.aspect = canvas.width / 2.0/canvas.height;\n"+
			"camera.projectionMatrix = mat4(makePerspective(radians(80.0), camera.aspect, 0.1, 2000.0));\n"+
			"if(index==0.0){\n"+
				"adjustLeftCamera();\n"+
			"}\n"+
			"if(index==1.0){\n"+
				"adjustRightCamera();\n"+
			"}\n"+
			"Projection=camera.projectionMatrix;\n"+
		"}\n"+
		"void adjustRightCamera(){\n"+
			"camera.rightCameraMatrix = makeLookAt(camera.rightpos, camera.lookat, camera.worldup);\n"+
			"camera.rightViewMatrix = makeInverse(camera.rightCameraMatrix);\n"+
			"Xiw=camera.rightViewMatrix;\n"+
		"}"+
		"void adjustLeftCamera(){\n"+
			"camera.leftCameraMatrix = makeLookAt(camera.leftpos, camera.lookat, camera.worldup);\n"+
			"camera.leftViewMatrix = makeInverse(camera.leftCameraMatrix);\n"+
			"Xiw=camera.leftViewMatrix;\n"+
		"}\n";


