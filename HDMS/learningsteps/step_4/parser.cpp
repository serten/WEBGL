#include <iostream>
#include <fstream>
#include <string>
#include <string.h>

using namespace std;

#define INFILE3  "axis.asc"
#define OUTVERTEX "output.js"
#define OUTNORMAL "normal.js"
#define OUTUV "uv.js"

int main()
{
	float		vertexList[3][3];	/* vertex position coordinates */ 
	float		normalList[3][3];	/* vertex normals */ 
	float  		uvList[3][2];		/* vertex texture map indices */ 
	char		dummy[256]; 
	FILE *infile;
	if( (infile  = fopen( INFILE3 , "r" )) == NULL )
	{
         	cout<< "The input file was not opened\n"<<endl;
		 
	}

	FILE *outfile;
	int selection; //1-vertex,2-normal,3-uv
	cout<<"Make your selection :1-vertex, 2-normal, 3-uv"<<endl;
	cin>>selection;
	cout<<selection<<endl;
	if(selection == 1)
	{
		if( (outfile  = fopen( OUTVERTEX , "w" )) == NULL )
		{
		 	cout<< "The output file was not opened\n"<<endl;
			 
		}
		cout<< "output.js was created\n"<<endl;
		fprintf(outfile,"var pot={ \"vertexPositions\" : [\n");
	}
	else if(selection == 2)
	{
		if( (outfile  = fopen( OUTNORMAL , "w" )) == NULL )
		{
		 	cout<< "The output file was not opened\n"<<endl;
			 
		}
		cout<< "normal.js was created\n"<<endl;
		fprintf(outfile,"var pot1={ \"vertexNormals\" : [\n");

	}
	else if(selection == 3)
	{
		if( (outfile  = fopen( OUTUV , "w" )) == NULL )
		{
		 	cout<< "The output file was not opened\n"<<endl;
			 
		}
		cout<< "uv.js was created\n"<<endl;
		fprintf(outfile,"var pot2={ \"uv\" : [\n");

	}
	else{cout<<"ERROR in selection parameter"<<endl;}




	while( fscanf(infile, "%s", dummy) == 1)
	{ 	/* read in tri word */
	    fscanf(infile, "%f %f %f %f %f %f %f %f", 
		&(vertexList[0][0]), &(vertexList[0][1]),  
		&(vertexList[0][2]), 
		&(normalList[0][0]), &(normalList[0][1]), 	
		&(normalList[0][2]), 
		&(uvList[0][0]), &(uvList[0][1]) ); 
	    fscanf(infile, "%f %f %f %f %f %f %f %f", 
		&(vertexList[1][0]), &(vertexList[1][1]), 	
		&(vertexList[1][2]), 
		&(normalList[1][0]), &(normalList[1][1]), 	
		&(normalList[1][2]), 
		&(uvList[1][0]), &(uvList[1][1]) ); 
	    fscanf(infile, "%f %f %f %f %f %f %f %f", 
		&(vertexList[2][0]), &(vertexList[2][1]), 	
		&(vertexList[2][2]), 
		&(normalList[2][0]), &(normalList[2][1]), 	
		&(normalList[2][2]), 
		&(uvList[2][0]), &(uvList[2][1]) ); 
	    
		if(selection == 1)
		{
			fprintf(outfile,"%f, %f, %f,\n",(vertexList[0][0]), (vertexList[0][1]),(vertexList[0][2]) );
	    		fprintf(outfile,"%f, %f, %f,\n",(vertexList[1][0]), (vertexList[1][1]),(vertexList[1][2]) );
	    		fprintf(outfile,"%f, %f, %f,\n",(vertexList[2][0]), (vertexList[2][1]),(vertexList[2][2]) );
			
		}
		else if(selection == 2)
		{
			fprintf(outfile,"%f, %f, %f,\n",(normalList[0][0]), (normalList[0][1]),(normalList[0][2]) );
		        fprintf(outfile,"%f, %f, %f,\n",(normalList[1][0]), (normalList[1][1]),(normalList[1][2]) );
		        fprintf(outfile,"%f, %f, %f,\n",(normalList[2][0]), (normalList[2][1]),(normalList[2][2]) );

		}
		else if(selection == 3)
		{
			fprintf(outfile,"%f, %f,\n",(uvList[0][0]), (uvList[0][1]) );
	   		fprintf(outfile,"%f, %f,\n",(uvList[1][0]), (uvList[1][1]) );
			fprintf(outfile,"%f, %f,\n",(uvList[2][0]), (uvList[2][1]) );

		}
	
	}

	if(selection == 1)
	{		
		cout<< "output.js was finished\n"<<endl;
	}
	else if(selection == 2)
	{
		cout<< "normal.js was finished\n"<<endl;
	}
	else if(selection == 3)
	{		
		cout<< "uv.js was finished\n"<<endl;
		
	}	
	
	fclose(outfile);
	fclose(infile);
	return 1;
}
