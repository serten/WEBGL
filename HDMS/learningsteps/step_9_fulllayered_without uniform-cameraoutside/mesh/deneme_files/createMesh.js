

function createMesh()
{
	var strvertices = 'var countries ={"meshId"   : "countries", "vertices" : [';
	var srtnormals  = '"normals" : [';
	var srttxt      = '"textureCoordinates" : [';

	for(var country=0;country<txt.var.length;country++)
	{
		for(coordinate=0;coordinate<txt.var[country].length;coordinate++)
		{
			strvertices+='<br>'+txt.var[country][coordinate][0]+', 0.0, '+txt.var[country][coordinate][1]+',<br>';
			srtnormals+='<br> 0.0, 0.0, 0.0,<br>';
			srttxt+='<br> 0.0, 0.0,<br>';
		}
	}
	strvertices += '],';
	srtnormals += '],';
	srttxt += ']}';
	strvertices += srtnormals+srttxt;
	$("#demo").html(strvertices);


}
