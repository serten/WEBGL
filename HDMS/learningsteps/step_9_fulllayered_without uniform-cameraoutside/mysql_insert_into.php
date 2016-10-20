<?php
$LOD=$_GET['lod'];
$doc = new DOMDocument();
$doc->load('http://localhost/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/countries_world.xml');
//$doc->load('http://192.168.0.9/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/countries_world.xml');//mobile
$mainArray=[];
//echo $LOD;
my_xml_encode($doc);

//echo '{"var":'.json_encode($mainArray).'}';

function my_xml_encode($file)
{
	
	$x = $file->documentElement;
	foreach ($x->childNodes AS $item) {
		if($item->nodeName == "Document")
		{
			foreach ($item->childNodes AS $i)
			{
				if($i->nodeName == "Placemark")
				{
					$name;
					foreach($i->childNodes AS $c)
					{
						if($c->nodeName == "name")
						{
							$name=$c->nodeValue;
							//array_push($tempArray,$c->nodeValue);
							//echo "INSERT INTO COUNTRIES ( COUNTRYNAME, COUNTRYCOORDINATES)VALUES ('".$c->nodeValue."',ST_GeomFromText('POLYGON((";
						}
						if($c->nodeName == "MultiGeometry")
						{
							encode_coordinates($c,$name);
							//echo "<hr>";
						}
					}
				}
			}
		}

	}

}

function encode_coordinates($file,$name)
{
	global $mainArray,$LOD;
	$tempArray=[];
	$count=0;
	//$countryArray=[];
	//$nameArray=array($name=>'country');
	//array_push($countryArray,$nameArray);
	
	foreach ($file->childNodes AS $item) 
	{
		if($item->nodeName == "Polygon")
		{
			foreach ($item->childNodes AS $i)
			{
				if($i->nodeName == "outerBoundaryIs")
				{
					foreach($i->childNodes AS $c)
					{
						if($c->nodeName == "LinearRing")
						{	
							
							foreach($c->childNodes AS $cc)
							{
								if($cc->nodeName == "coordinates")
								{
									echo "INSERT INTO COUNTRIES ( COUNTRYNAME, COUNTRYCOORDINATES)VALUES ('".$name.$count."',ST_GeomFromText('POLYGON((";
									/*$coords =[];									
									array_push($coords,9999,9999);
									array_push($tempArray,$coords);*/

									$coordinate = $cc->nodeValue;
									
									$pairs = explode(" ", $coordinate);
									
									$sparsity=$LOD;									
									
									$firstpair=true;
									foreach($pairs AS $p)
									{
										if($sparsity==0)
										{ 
											$x = explode (",",$p);
										
											$coords =[];
										
											array_push($coords,$x[1],$x[0]);   //[0]--> long   [1]-->lat
											array_push($tempArray,$coords);
											if($firstpair)
											{
												echo $coords[0]." ".$coords[1];
												$firstpair=false;
											}
											else
											{
												echo ", ".$coords[0]." ".$coords[1];
												
											}
																		
											$sparsity=$LOD;
										}										
										else
										{
									
											$sparsity--;
										}
									}
									echo "))', 4326));";
									$count++;
									//$coords =[];									
									//array_push($coords,9999,9999);
									//array_push($tempArray,$coords);
									//echo "lat:".$coords[0]." - long:".$coords[1]."<br>";
									
								}
						
							}
						}
						
						
					}
				}
			}
			array_push($mainArray,$tempArray);
			$tempArray=[];

		}
		

	}
	//$coordsArray = array($name=>$tempArray);
	//array_push($countryArray,$coordsArray);
	//$country= array("country"=>$countryArray);
	
	
	//echo "lat:".$coords[0]." - long:".$coords[1]."<br>";
	//echo '{"var":'.json_encode($countryArray).'}';
	
	//echo "))', 4326))";

}



?>
