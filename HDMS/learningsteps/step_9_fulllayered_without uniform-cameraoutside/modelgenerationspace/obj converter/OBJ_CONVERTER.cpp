// OBJ_CONVERTER.cpp : Defines the entry point for the console application.
//
#include <iostream>
#include <stdio.h>
#include <iostream>
#include <string.h>
#include <string>
#include <math.h>

using namespace std;

#define INFILE  "world.txt"
#define OUTFILE "worldOUT.txt"

using namespace std;

int charToInteger(char c);

void getNumbers(int *vertices, char *dummy);
void resetDummy(char *dummy);

int main()
{
	FILE *infile;
	if( (infile  = fopen( INFILE , "r" )) == NULL )
	{
   		cout<<"infile didnt opened"<<endl;      
	}

	FILE *outfile;
	if( (outfile  = fopen( OUTFILE , "wb" )) == NULL )
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
      

	if( fclose( outfile ) )
      
	return 0;
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


