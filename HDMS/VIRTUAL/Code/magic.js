function magic(json){

	//hash
	var h = {};
	
	var vertices = new Array();
	var texturecoords = new Array();
	var normals = new Array();
	var faces = new Array();
	
	var len = json.faces.length;
	var i = 0;
	var findex = 0;
	while(i < len){
		//indexs
		var iv = json.faces[i];
		var it = json.faces[i+1];
		var ino = json.faces[i+2];

		//hash key
		var key = iv+"/"+it+"/"+ino;

		if(key in h){
			faces.push(h[key]);
		}
		else{


			vertices.push(json.vertices[(iv-1)*3]);
			vertices.push(json.vertices[(iv-1)*3+1]);
			vertices.push(json.vertices[(iv-1)*3+2]);

			texturecoords.push(json.texturecoords[(it-1)*2]);
			texturecoords.push(json.texturecoords[(it-1)*2+1]);

			normals.push(json.normals[(ino-1)*3]);
			normals.push(json.normals[(ino-1)*3+1]);
			normals.push(json.normals[(ino-1)*3+2]);	

			//faces.push(i/3);
			faces.push(findex);
			h[key] = findex;
			
			findex++;

		}

		//
		i = i+3;
	}

	//return
	var ret = {};
	ret['vertices'] = vertices;
	ret['texturecoords'] = texturecoords;
	ret['normals'] = normals;
	ret['faces'] = faces;

	return ret;
}