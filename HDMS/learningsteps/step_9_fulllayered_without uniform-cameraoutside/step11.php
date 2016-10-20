<?php
$LOD=$_GET['lod'];
$doc = new DOMDocument();
$doc->load('http://localhost/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/countries_world.xml');
//$doc->load('http://192.168.0.9/learningsteps/step_9_fulllayered_without%20uniform-cameraoutside/countries_world.xml');//mobile
$mainArray=[];
//echo $LOD;
my_xml_encode($doc);

echo '{"var":'.json_encode($mainArray).'}';

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
							//echo $c->nodeValue."<br>";
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
									/*$coords =[];									
									array_push($coords,9999,9999);
									array_push($tempArray,$coords);*/

									$coordinate = $cc->nodeValue;
									
									$pairs = explode(" ", $coordinate);
									
									$sparsity=$LOD;									
									
									foreach($pairs AS $p)
									{
										if($sparsity==0)
										{ 
											$x = explode (",",$p);
										
											$coords =[];
										
											array_push($coords,$x[0]*10,$x[1]*-10);
											array_push($tempArray,$coords);
											//echo "lat:".$coords[0]." - long:".$coords[1]."<br>";
											$sparsity=$LOD;
										}										
										else
										{
									
											$sparsity--;
										}
									}
									
									$coords =[];									
									array_push($coords,9999,9999);
									array_push($tempArray,$coords);
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
	
		

}



?>
