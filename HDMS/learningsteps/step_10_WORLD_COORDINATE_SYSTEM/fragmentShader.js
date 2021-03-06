var fragmentShaderText="precision highp float;"+
"varying vec3 interpolatedNormal;"+
"varying vec4 interpolatedPosition;"+
"varying vec2 texCoord;"+
"uniform sampler2D texture;"+
"uniform sampler2D bumpTexture;"+
"uniform float tex;"+
"uniform float bump;"+
"uniform vec4 LightPosition0;"+
"uniform vec4 LightColor0;"+
"uniform vec4 LightPosition1;"+
"uniform vec4 LightColor1;"+
"uniform vec4 LightPosition2;"+
"uniform vec4 LightColor2;"+
"uniform vec4 LightPosition3;"+
"uniform vec4 LightColor3;"+
"uniform vec4 LightPosition4;"+
"uniform vec4 LightColor4;"+
"uniform float NumberOfLights;"+
"uniform vec3 Eye;"+
"uniform vec4 AmbientProduct, DiffuseProduct, SpecularProduct;"+
"uniform float Shininess;"+

"void main()"+
"{"+
	"vec4 fColor;"+
	"vec4 color=vec4(0.0,0.0,0.0,1.0);"+	
	"vec4 ambient = AmbientProduct;"+
	"int index=int(NumberOfLights);"+
	"for(int i=0;i<1;i++)"+
	"{"+
		"vec3 L;"+
		"if(i==0) "+
			"L = normalize((LightPosition0).xyz);"+
		"else if(i==1) "+
			"L = normalize((LightPosition1).xyz);"+
		"else if(i==2) "+
			"L = normalize((LightPosition2).xyz);"+
		"else if(i==3) "+
			"L = normalize((LightPosition3).xyz);"+
		"else if(i==4) "+
			"L = normalize((LightPosition4).xyz);"+
		"vec3 lightDirection;"+
		"if(i==0)  "+
			"lightDirection = normalize(LightPosition0.xyz - interpolatedPosition.xyz);"+
		"else if(i==1) "+
			"lightDirection = normalize(LightPosition1.xyz -interpolatedPosition.xyz);"+
		"else if(i==2) "+
			"lightDirection = normalize(LightPosition2.xyz - interpolatedPosition.xyz);"+
		"else if(i==3) "+
			"lightDirection = normalize(LightPosition3.xyz - interpolatedPosition.xyz);"+
		"else if(i==4) "+
			"lightDirection = normalize(LightPosition4.xyz - interpolatedPosition.xyz);"+
		"if(bump == 1.0) "+
		"{"+
			"vec4 bumpColor = texture2D(bumpTexture,vec2(texCoord.s,1.0-texCoord.t));"+
			"vec4 bumpNormal;"+
			"bumpNormal.xyz = (2.0 * bumpColor.rgb) - 1.0;"+
			"bumpNormal.y=1.0-bumpNormal.y;"+
			"bumpNormal.x=1.0-bumpNormal.x;"+
			"bumpNormal.z=1.0-bumpNormal.z;"+
			"vec3 N = normalize (bumpNormal.xyz);"+
			"color = LightColor0 * max(dot(N, lightDirection), 0.0);"+
			"}"+
		"else "+
		"{"+
			"float directionalLightWeighting = max(dot(interpolatedNormal, lightDirection), 0.0);"+
			"if(i==0) "+
				"color = ( LightColor0 * directionalLightWeighting  );"+
			"else if(i==1) "+
				"color += ( LightColor1 * directionalLightWeighting  );"+
			"else if(i==2) "+
				"color += (LightColor2 * directionalLightWeighting  );"+
			"else if(i==3) "+
				"color += ( LightColor3 * directionalLightWeighting  );"+
			"else if(i==4) "+
				"color += ( LightColor4 * directionalLightWeighting  );"+
		"}"+	
	"}"+
	"fColor=color+ambient;"+
	"fColor.a = 1.0;"+
	"if( (tex==1.0)) "+
		"gl_FragColor =fColor*texture2D(texture,vec2(texCoord.s,1.0-texCoord.t));"+
	"else "+
		"gl_FragColor = fColor;"+
"}";

