/*var vertexShaderText="attribute vec4 vPosition;\n"+
		"attribute vec3 vNormal;\n"+
		"attribute vec2 vTexCoord;\n"+
		"varying vec3 interpolatedNormal;\n"+
		"varying vec4 interpolatedPosition;\n"+
		"varying vec2 texCoord;\n"+
		"uniform mat4 Translation;\n"+
		"uniform mat4 Rotation;\n"+
		"uniform mat4 AnimationTranslation;\n"+
		"uniform mat4 AnimationRotation;\n"+
		"uniform mat4 Xiw;\n"+
		"uniform mat4 XiwNormal;\n"+
		"uniform mat4 Projection;\n"+
		"void main(){\n"+
			"vec4 mvPosition =vec4( AnimationTranslation*Translation*AnimationRotation*Rotation*vPosition);\n"+
			"gl_Position = vec4(Projection * Xiw*mvPosition);\n"+
			"vec3 transformedNormal = vec3( normalize( AnimationRotation*Rotation*vec4(vNormal.xyz,1.0)).xyz);\n"+
			"interpolatedNormal=transformedNormal;\n"+
			"interpolatedPosition=mvPosition;\n"+
			"texCoord = vTexCoord;\n"+
		"}\n";
*/
var vertexShaderText;
function createVertexShader(numberOfObjects)
{
  var buf="attribute vec4 vPosition;\n"+
		      "attribute vec3 vNormal;\n"+
		      "attribute vec2 vTexCoord;\n"+
          "varying vec3 interpolatedNormal;\n"+
		      "varying vec4 interpolatedPosition;\n"+
		      "varying vec2 texCoord;\n"+
		      "uniform mat4 Xiw;\n"+
		      "uniform mat4 XiwNormal;\n"+
		      "uniform mat4 Projection;\n";
  buf+=createObjectStatus(numberOfObjects);
  buf+="void main(){";
  buf+=createPositionConditional(numberOfObjects);
  buf+="gl_Position = vec4(Projection * Xiw*mvPosition);\n";
  buf+=createNormalConditional(numberOfObjects);
  buf+="interpolatedNormal=transformedNormal;\n"+
			 "interpolatedPosition=mvPosition;\n";
  buf+="texCoord = vTexCoord;\n"+
		   "}\n";

  vertexShaderText=buf;
}



function createNormalConditional(numberOfObjects)
{
  var buf="vec3 transformedNormal;\n";
  for(var i=0;i<numberOfObjects;i++)
  {
      buf+="if(vPosition.w == "+i.toString()+".0)\n"+
           "{transformedNormal = vec3( normalize( AnimationRotation["+i.toString()+"]*Rotation["+i.toString()+
                                           "]*vec4(vNormal.xyz,1.0)).xyz);\n"+
           "}\n";
  }
  return buf;

}

function createPositionConditional(numberOfObjects)
{
  var buf="vec4 mvPosition;\n";
  for(var i=0;i<numberOfObjects;i++)
  {
      buf+="if(vPosition.w == "+i.toString()+".0)\n"+
           "{mvPosition =vec4( AnimationTranslation["+i.toString()+"]*Translation["+i.toString()+
                                  "]*AnimationRotation["+i.toString()+"]*Rotation["+i.toString()+"]*vec4(vPosition.xyz,1.0));\n"+
           "}\n";
  }
  return buf;

}

function createObjectStatus(numberOfObjects)
{
  var i=numberOfObjects;
  var buf="uniform mat4 Translation["+i.toString()+"];\n"+
		        "uniform mat4 Rotation["+i.toString()+"];\n"+
		        "uniform mat4 AnimationTranslation["+i.toString()+"];\n"+
		        "uniform mat4 AnimationRotation["+i.toString()+"];\n";
  /*
  for(var i=0;i<numberOfObjects;i++)
  {
    buf=buf+"uniform mat4 Translation["+i.toString()+"];\n"+
		        "uniform mat4 Rotation["+i.toString()+"];\n"+
		        "uniform mat4 AnimationTranslation["+i.toString()+"];\n"+
		        "uniform mat4 AnimationRotation["+i.toString()+"];\n";
  }*/
  return buf;

}
