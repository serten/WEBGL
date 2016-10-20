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
"uniform vec3 Eye;"+
"varying vec4 fAmbientProduct;"+
"void main()"+
"{"+
	"vec4 fColor;"+
	"vec4 color=vec4(0.0,0.0,0.0,1.0);"+	
	"vec4 ambient = fAmbientProduct;"+
	"vec3 L;"+
	"L = normalize((LightPosition0).xyz);"+
	"vec3 lightDirection;"+
	"lightDirection = normalize(LightPosition0.xyz - interpolatedPosition.xyz);"+
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
		"color = ( LightColor0 * directionalLightWeighting  );"+
	"}"+
	"fColor=color+ambient;"+
	"fColor.a = 1.0;"+
	"if( tex==1.0) "+
		"gl_FragColor =fColor*texture2D(texture,vec2(texCoord.s,1.0-texCoord.t));"+
	"else "+
		"gl_FragColor = fColor;"+
"}";

