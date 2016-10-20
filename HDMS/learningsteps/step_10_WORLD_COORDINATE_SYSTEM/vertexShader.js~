var vertexShaderText="attribute vec4 vPosition;"+
		     "attribute vec4 vPosition1;"+
		"attribute vec3 vNormal;"+
		"attribute vec2 vTexCoord;"+
		"varying vec3 interpolatedNormal;"+
		"varying vec4 interpolatedPosition;"+
		"varying vec2 texCoord;"+
		"attribute vec4 vColor;"+
		"uniform mat4 Translation;"+
		"uniform mat4 Rotation;"+
		"uniform mat4 AnimationTranslation;"+
		"uniform mat4 AnimationRotation;"+
		"uniform mat4 Xiw;"+
		"uniform mat4 XiwNormal;"+
		"uniform mat4 Projection;"+
		"void main(){"+
			"vec4 mvPosition =vec4( AnimationTranslation*Translation*AnimationRotation*Rotation*vPosition);"+
			"gl_Position = vec4(Projection * Xiw*mvPosition);"+
			"vec3 transformedNormal = vec3( normalize( AnimationRotation*Rotation*vec4(vNormal.xyz,1.0)).xyz);"+
			"interpolatedNormal=transformedNormal;"+
			"interpolatedPosition=mvPosition;"+
			"texCoord = vTexCoord;"+
		"}";
