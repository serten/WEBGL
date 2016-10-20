

function create__Mesh()
{
	var strvertices = 'var countries ={"meshId"   : "countries", "vertices" : [';
	var srtnormals  = '"normals" : [';
	var srttxt      = '"textureCoordinates" : [';

	for(var country=0;country<txt.var.length;country++)
	{
		for(coordinate=0;coordinate<txt.var[country].length;coordinate++)
		{
			if((country == 0 )&&(coordinate==0))
			{
				strvertices+=''+txt.var[country][coordinate][0]+', '+txt.var[country][coordinate][1]+', 0.0';
				srtnormals+='0.0, 0.0, 0.0';
				srttxt+='0.0, 0.0';
			}
			else
			{
				strvertices+=','+txt.var[country][coordinate][0]+', '+txt.var[country][coordinate][1]+', 0.0';
				srtnormals+=',0.0, 1.0, 0.0';
				srttxt+=',0.0, 0.0';
			}
		}
	}
	strvertices += '],';
	srtnormals += '],';
	srttxt += ']}';
	strvertices += srtnormals+srttxt;
	$("#demo").html(strvertices);


}

function createMesh()
{
	var countries = [];       
	var verticaArray = [];
	var normalArray = [];
	var txtArray = [];
	

	for(var country=0;country<txt.var.length;country++)
	{
		for(coordinate=0;coordinate<txt.var[country].length;coordinate++)
		{

			verticeArray.push(txt.var[country][coordinate][0]);
			verticeArray.push(txt.var[country][coordinate][1]);
			verticeArray.push(0.0);
			
			normalArray.push(0.0);
			normalArray.push(0.0);
			normalArray.push(1.0);

			txtArray.push(0.0);
			txtArray.push(1.0);

		}
	}
	var vertices = {"vertices": verticeArray};                     //'var countries ={"meshId"   : "countries", "vertices" : [';
	var normals  = {"normals": normalArray};
	var txt      = {"textureCoordinates": txtArray};
 	var meshID   = {"meshId"  : "countries"};

	countries.push(meshID);
	countries.push(vertices);
	countries.push(normals);
	countries.push(txt);


}
