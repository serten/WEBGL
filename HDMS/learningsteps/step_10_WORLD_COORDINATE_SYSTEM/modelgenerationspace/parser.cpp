#include <iostream>
#include <fstream>
#include <stdio.h>
#include <string>
#include <math.h>
#include <string.h>

using namespace std;





using namespace std;

int charToInteger(char c);

void getNumbers(int *vertices, char *dummy);
void resetDummy(char *dummy);


string INFILE   ="ground.txt";
string OUTFILE  ="groundOUT.txt";

string INFILE2  ="groundOUT.txt";
string OUTFILE2 ="ground.js";
string OUTVERTEX="output.js";
string OUTNORMAL="normal.js";
string OUTUV    ="uv.js";

void firstFunction()
{
	FILE *infile;
	if( (infile  = fopen( INFILE.c_str() , "r" )) == NULL )
	{
   		cout<<"infile didnt opened"<<endl;      
	}

	FILE *outfile;
	if( (outfile  = fopen( OUTFILE.c_str() , "wb" )) == NULL )
	{
       		cout<<"outfile didnt opened"<<endl;
	}
	char dummy[256];
	
	
	float vertex_coord[10000][3];
	int coordindex=0;

	float vertex_norm[10000][3];
	int normindex=0;

	float vertex_text[10000][3];
	int textindex=0;
	
	int triangle[10000][3][3];
	int trindex=0;

	

	// read until reach "v" 
	while (1) 
	{ 	
		fscanf(infile, "%s", dummy);		
		string a=dummy;
		cout<<a<<endl;
		if(a == "v")
			break;		
	}
	
	// Begin to read vertex coordinates
	
	LOOP1:while (1) 
	{ 	
		fscanf(infile,"%f %f %f",
			&vertex_coord[coordindex][0],&vertex_coord[coordindex][1],&vertex_coord[coordindex][2]);
		
		coordindex++;
		
		fscanf(infile, "%s", dummy);
		string a=dummy;
		cout<<a<<endl;
		if(a == "vt")
			break;

	}

	LOOP2:while (1) 
	{ 	
		
		
		fscanf(infile,"%f %f %f",
			&vertex_text[textindex][0],&vertex_text[textindex][1],&vertex_text[textindex][2]);
		
		textindex++;
		fscanf(infile, "%s", dummy);
		string a=dummy;
		cout<<a<<endl;

		if(a == "vn")
			break;
		

	}

	LOOP3:while (1) 
	{ 	

		fscanf(infile,"%f %f %f",
			&vertex_norm[normindex][0],&vertex_norm[normindex][1],&vertex_norm[normindex][2]);
		
		normindex++;
		fscanf(infile, "%s", dummy);
		string a=dummy;
		cout<<a<<endl;

		if(a == "f")
			break;	

	}

	LOOP4:while (1) 
	{ 
		//resetDummy(dummy);
		int vertices[3];
		
		
		fscanf(infile, "%s", dummy);
		string b=dummy;
		getNumbers(vertices,dummy);
		cout<<vertices[0]<< "   " <<vertices[1]<<"   " <<vertices[2]<<endl;
		triangle[trindex][0][0]=vertices[0];//vertices
		triangle[trindex][0][1]=vertices[1];//textures
		triangle[trindex][0][2]=vertices[2];//normals

		fscanf(infile, "%s", dummy);
		b=dummy;
		getNumbers(vertices,dummy);
		cout<<vertices[0]<< "   " <<vertices[1]<<"   " <<vertices[2]<<endl;
		triangle[trindex][1][0]=vertices[0];//vertices
		triangle[trindex][1][1]=vertices[1];//textures
		triangle[trindex][1][2]=vertices[2];//normals

		fscanf(infile, "%s", dummy);
		b=dummy;
		getNumbers(vertices,dummy);
		cout<<vertices[0]<< "   " <<vertices[1]<<"   " <<vertices[2]<<endl;
		triangle[trindex][2][0]=vertices[0];//vertices
		triangle[trindex][2][1]=vertices[1];//textures
		triangle[trindex][2][2]=vertices[2];//normals

		trindex++;

		fscanf(infile, "%s", dummy);
		string a=dummy;
		cout<<a<<endl;
		if(a=="#")
			break;

		
		

	}


	for (int i=0;i<trindex;i++)
	{

		int a=1;


		fprintf(outfile,"triangle\n");
		fprintf(outfile,"%f	%f	%f	",vertex_coord[triangle[i][0][0]-1][0]/a,vertex_coord[triangle[i][0][0]-1][1]/a,vertex_coord[triangle[i][0][0]-1][2]/a);
		fprintf(outfile,"%f	%f	%f	",vertex_norm[triangle[i][0][2]-1][0],vertex_norm[triangle[i][0][2]-1][1],vertex_norm[triangle[i][0][2]-1][2]);
		fprintf(outfile,"%f	%f\n",vertex_text[triangle[i][0][1]-1][0],vertex_text[triangle[i][0][1]-1][1]);
	
		fprintf(outfile,"%f	%f	%f	",vertex_coord[triangle[i][1][0]-1][0]/a,vertex_coord[triangle[i][1][0]-1][1]/a,vertex_coord[triangle[i][1][0]-1][2]/a);
		fprintf(outfile,"%f	%f	%f	",vertex_norm[triangle[i][1][2]-1][0],vertex_norm[triangle[i][1][2]-1][1],vertex_norm[triangle[i][1][2]-1][2]);
		fprintf(outfile,"%f	%f\n",vertex_text[triangle[i][1][1]-1][0],vertex_text[triangle[i][1][1]-1][1]);

		fprintf(outfile,"%f	%f	%f	",vertex_coord[triangle[i][2][0]-1][0]/a,vertex_coord[triangle[i][2][0]-1][1]/a,vertex_coord[triangle[i][2][0]-1][2]/a);
		fprintf(outfile,"%f	%f	%f	",vertex_norm[triangle[i][2][2]-1][0],vertex_norm[triangle[i][2][2]-1][1],vertex_norm[triangle[i][2][2]-1][2]);
		fprintf(outfile,"%f	%f\n",vertex_text[triangle[i][2][1]-1][0],vertex_text[triangle[i][2][1]-1][1]);


	}


	if( fclose( infile ) )
      
		cout<<"filescloesed"<<endl;
	if( fclose( outfile ) )
		cout<<"filescloesed"<<endl;
      
	
}

int charToInteger(char c){
	if (c=='1')
		return 1;
	
	if (c=='2')
		return 2;

	if (c=='3')
		return 3;

	if (c=='4')
		return 4;

	if (c=='5')
		return 5;

	if (c=='6')
		return 6;

	if (c=='7')
		return 7;

	if (c=='8')
		return 8;

	if (c=='9')
		return 9;

	if (c=='0')
		return 0;
}

void getNumbers(int *vertices,char *dummy){

	
	int index=0;
	
	
	for(int x=0;x<3;x++)
	{
		int holder[5];
		holder[0]=0;
		holder[1]=0;
		holder[2]=0;
		holder[3]=0;
		holder[4]=0;
		int d[5];
		d[0]=1;
		d[1]=10;
		d[2]=100;
		d[3]=1000;
		d[4]=10000;
		int i=0;
		while((dummy[index]!='/')&&(dummy[index]!=0))
		{
			if(i==0)
				holder[0]=charToInteger(dummy[index]);
			if(i==1)
			{
				holder[1]=holder[0];
				holder[0]=charToInteger(dummy[index]);
			}
			if(i==2)
			{
				holder[2]=holder[1];
				holder[1]=holder[0];
				holder[0]=charToInteger(dummy[index]);
			}
			if(i==3)
			{
				holder[3]=holder[2];
				holder[2]=holder[1];
				holder[1]=holder[0];
				holder[0]=charToInteger(dummy[index]);
			}
			if(i==4)
			{
				holder[4]=holder[3];
				holder[3]=holder[2];
				holder[2]=holder[1];
				holder[1]=holder[0];
				holder[0]=charToInteger(dummy[index]);
			}
			index++;	
			i++;
		}
		index++;
		
		vertices[x]=0;
		//cout<<"index:"<<index<<endl;
		for(int j=0;j<i+1;j++)
		{
			vertices[x]+=holder[j]*d[j];
		}
		//cout<<"vertices["<<x<<"]:" << vertices[x]<<endl;
	}
	//cout<<"size of dummy:"<<sizeof(&dummy)<<endl;
}

void resetDummy(char *dummy)
{

	for(int i=0;i<256;i++)
	{
		dummy[i]='Q';		
	}
	cout<<dummy<<endl;


}



int main()
{

	string s;
	cout<<"enter file name"<<endl;
	cin>>s;
	INFILE   =s+".txt";
	OUTFILE  =s+"OUT.txt";
	INFILE2  =s+"OUT.txt";
	OUTFILE2 =s+".js";

	firstFunction();

	cout<<"firstFunction was completed"<<endl;
	float		vertexList[3][3];	/* vertex position coordinates */ 
	float		normalList[3][3];	/* vertex normals */ 
	float  		uvList[3][2];		/* vertex texture map indices */ 
	char		dummy[256]; 
	

	FILE *outfile;

	if( (outfile  = fopen( OUTFILE2.c_str() , "w" )) == NULL )
	{
         	cout<< "The output file was not opened\n"<<endl;
		 
	}

	for (int selection=1;selection<4;selection++)
	{

		FILE *infile;
		if( (infile  = fopen( INFILE2.c_str() , "r" )) == NULL )
		{
		 	cout<< "The input file was not opened\n"<<endl;
			 
		}
		
	
		if(selection == 1)
		{
			cout<< "vertice was created\n"<<endl;
			fprintf(outfile,"var %s ={ \n\"meshId\"   : \"%s\",\n \"vertices\" : [\n",s.c_str(),s.c_str());
			
		}
		else if(selection == 2)
		{
			cout<< "normal was created\n"<<endl;
			fprintf(outfile,"],\n\n\"normals\" : [\n");
		}
		else if(selection == 3)
		{
			cout<< "uv was created\n"<<endl;
			fprintf(outfile,"],\n\n\"textureCoordinates\" : [\n");

		}
		
		bool firstItem=true;

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
				if(firstItem)
				{
					fprintf(outfile,"%f, %f, %f\n",(vertexList[0][0]), (vertexList[0][1]),(vertexList[0][2]) );
					firstItem=false;
				}
				else
					fprintf(outfile,",%f, %f, %f\n",(vertexList[0][0]), (vertexList[0][1]),(vertexList[0][2]) );

		    		fprintf(outfile,",%f, %f, %f\n",(vertexList[1][0]), (vertexList[1][1]),(vertexList[1][2]) );
		    		fprintf(outfile,",%f, %f, %f\n",(vertexList[2][0]), (vertexList[2][1]),(vertexList[2][2]) );
			
			}
			else if(selection == 2)
			{
				if(firstItem)
				{
					fprintf(outfile,"%f, %f, %f\n",(normalList[0][0]), (normalList[0][1]),(normalList[0][2]) );
					firstItem=false;
				}
				else
					fprintf(outfile,",%f, %f, %f\n",(normalList[0][0]), (normalList[0][1]),(normalList[0][2]) );

				fprintf(outfile,",%f, %f, %f\n",(normalList[1][0]), (normalList[1][1]),(normalList[1][2]) );
				fprintf(outfile,",%f, %f, %f\n",(normalList[2][0]), (normalList[2][1]),(normalList[2][2]) );

			}
			else if(selection == 3)
			{
				if(firstItem)
				{
					fprintf(outfile,"%f, %f\n",(uvList[0][0]), (uvList[0][1]) );
					firstItem=false;
				}
				else
					fprintf(outfile,",%f, %f\n",(uvList[0][0]), (uvList[0][1]) );

				fprintf(outfile,",%f, %f\n",(uvList[1][0]), (uvList[1][1]) );
				fprintf(outfile,",%f, %f\n",(uvList[2][0]), (uvList[2][1]) );

			}
	
		}

		if(selection == 1)
		{		
			cout<< "vertice was finished\n"<<endl;
		}
		else if(selection == 2)
		{
			cout<< "normal was finished\n"<<endl;
		}
		else if(selection == 3)
		{		
			cout<< "uv was finished\n"<<endl;
		
		}
		fclose(infile);	
	}
	fprintf(outfile,"]}");
	fclose(outfile);
	return 1;
}
