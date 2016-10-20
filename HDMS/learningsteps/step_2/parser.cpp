#include <iostream>
#include <fstream>
#include <string>
#include <string.h>

using namespace std;

#define INFILE3  "pot4.asc"
#define OUTFILE3 "output.js"
#define OUTFILE "normal.js"

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
	FILE *outfile1;

	if( (outfile  = fopen( OUTFILE3 , "w" )) == NULL )
	{
         	cout<< "The output file was not opened\n"<<endl;
		 
	}


	if( (outfile1  = fopen( OUTFILE , "w" )) == NULL )
	{
         	cout<< "The output file was not opened\n"<<endl;
		 
	}
	

	
	fprintf(outfile,"var pot={ \"vertexPositions\" : [\n");
	
	fprintf(outfile1,"var pot1={ \"vertexNormals\" : [\n");

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

    	    fprintf(outfile,"%f, %f, %f,\n",(vertexList[0][0]), (vertexList[0][1]),(vertexList[0][2]) );
	    fprintf(outfile,"%f, %f, %f,\n",(vertexList[1][0]), (vertexList[1][1]),(vertexList[1][2]) );
	    fprintf(outfile,"%f, %f, %f,\n",(vertexList[2][0]), (vertexList[2][1]),(vertexList[2][2]) );

	    fprintf(outfile1,"%f, %f, %f,\n",(normalList[0][0]), (normalList[0][1]),(normalList[0][2]) );
	    fprintf(outfile1,"%f, %f, %f,\n",(normalList[1][0]), (normalList[1][1]),(normalList[1][2]) );
	    fprintf(outfile1,"%f, %f, %f,\n",(normalList[2][0]), (normalList[2][1]),(normalList[2][2]) );
	
	
	}
	
	
fclose(outfile);
fclose(infile);
	return 1;
}
