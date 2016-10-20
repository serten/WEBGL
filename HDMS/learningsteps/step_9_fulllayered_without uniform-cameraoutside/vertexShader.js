var vertexShaderText="attribute vec4 vPosition;\n"+
	"attribute vec3 vNormal;\n"+
	"attribute vec2 vTexCoord;\n"+
	"attribute vec3 translation;\n"+
	"attribute vec3 rotation;\n"+
	"attribute vec3 ambientProduct;\n"+
        "varying vec3 interpolatedNormal;\n"+
	"varying vec4 interpolatedPosition;\n"+
	"varying vec2 texCoord;"+
	"uniform mat4 Xiw;\n"+
	"uniform mat4 Projection;\n"+
	"varying vec4 fAmbientProduct;\n"+
	"varying float fShininess;\n"+
	"void main(){"+
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
		"fAmbientProduct=vec4(ambientProduct,1.0);\n"+
		"texCoord = vTexCoord;"+
	"}";
	
