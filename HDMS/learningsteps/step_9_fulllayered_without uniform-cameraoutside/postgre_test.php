<?php

//echo phpinfo();
ini_set('display_errors', 1);
control();


function control()
{
	$conn = pg_connect("host=127.0.0.1 port=5432 dbname=postgres user=postgres password=postgres");
	if (!$conn) {
	  echo "An error occurred.\n";
	  exit;
	}
	else
	{
		echo "ok";
	}

	$result = pg_query($conn, "SELECT COUNTRYID,COUNTRYNAME, ST_AsGeoJSON(COUNTRYCOORDINATES) FROM COUNTRIES");
	
	if (!$result) {
	  echo "An error occurred.\n";
	  exit;
	}

	echo "<table border=\"1\">";

	while ($row = pg_fetch_row($result)) {
	  //the name $row would be better if was $column from understanding point of view
	echo "<tr>";
	  foreach ($row as &$rr)
	  {
	
		if($rr[0]==="{")
		{	
			
				$decodedText = html_entity_decode($rr);
				$r = json_decode($decodedText, true);
				echo "<td>";
				foreach ($r["coordinates"][0] as $coord)
				{
					echo "LAT:".$coord[0]."- LONG:".$coord[1]." / ";	
					
				}
				echo "</td>";	
				
			
				
		}	
		else 
		{
			echo "<td>".$rr."</td> ";
			
		}
	  }
	  
	 echo "</tr>";
	}

   echo "</table>";
}	
?>	
