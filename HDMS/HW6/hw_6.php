<!DOCTYPE HTML>
<html>
    <head>
        <style type="text/css">
            
            #querywindow
            {
                background-color: #EDEDED;
                text-align:  center;                
                margin:auto;
                margin-top: 10px;
                width: 400px;
                border-style:solid;
                border-color: gray;
                border-width: thin;
            
                font-family: serif;     
                font-size:12px;
            
                
            }
            h2,h4
            {
                padding:2px; 
                margin:0px;
            }
            #result #error
            {
                width: 500px;
                text-align: center;                
                background-color:#EDEDED;
            }
            table
            {
                margin:auto;
                margin-top:10px;   
            }
            #querywindow th,#querywindow td
            {
                vertical-align: top;   
                text-align: left;
            }
            
            #result
            {
                font-family: sans-serif;     
                font-size:12px;
            }
            
            #result table
            {
                border-style:solid;
                border-color: gray;
                border-width: thin;
                border-spacing: 0px;
                
            }
            #result td
            {
                text-align:left;
                padding-bottom: 3px;
                padding-top: 3px;
            }
             #result th
            {
                text-align:left;
                background-color:#EDEDED;
                padding-bottom: 3px;
                padding-top: 3px;
            }
            .quote
            {
                width: 250px;
            }
            #quoteTable td
            {
                text-align:center;
            }
            
            img
            {
                width: 10px;
                height: 10px;
                
            }
            

            
            
        </style>
        <script type="text/javascript">
            function reset_Values()
            {
                document.getElementById("formInput").value="";
                document.getElementById("result").innerHTML="";
                
            }
        </script>   
    </head>
<body> 

    
<?php
// define variables and set to empty values

$lookUp = $quote = $inputValue = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["lookUp"])) {
       
    } 
    else 
    {
        $lookUp = $_POST["lookUp"];
    }
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
   
    if (empty($_GET["quote"])) {
        
    } 
    else 
    {
        $quote = $_GET["quote"];
    }
    
    
    if (empty($_GET["inputValue"])) {
        
    } 
    else 
    {
        $inputValue = $_GET["inputValue"];
    }
}
?>
    
<div id="querywindow">
    
    <h2><i>Stock Search</i></h2>
    <hr style="margin:0px 5px 0px 5px">    
    <table>
        <tr>        
            <td>
                Company Name or Symbol:&nbsp;
            </td>
            <td>
                <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"> 
                    <input oninput ="this.setCustomValidity('');" oninvalid="this.setCustomValidity('Please Enter Company Name or Symbol')" id="formInput" type="text" name="lookUp" value="<?php echo $lookUp;?><?php echo $inputValue;?>" required><br>
                    <input type="submit" name="submit" value="Submit" style="margin-top:5px;">
                    <input type="button" value="clear" onclick="reset_Values()">
                </form>            
            </td>       
        </tr>   
    </table>
    
    <p><a href="http://www.markit.com/product/markit-on-demand">Powered by Markit on Demand</a></p>
    <br>
        

    
</div>    
    
    
<div id="result">
<?php 
    
    if($lookUp!="")
    {
        $url = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/xml?input=".$lookUp;        
        if($root = simplexml_load_file($url))
        {             
            echo "<table border=\"1\"><tr><th>Name</th><th>Symbol</th><th>Exchange</th><th>Details</th></tr>";
            foreach ($root as $child)
            {
                echo "<tr><td>".$child->Name."</td><td>".$child->Symbol."</td><td>".$child->Exchange."</td><td>";
                
                echo "<a href=".htmlspecialchars($_SERVER["PHP_SELF"])."?inputValue=".$lookUp."&quote=".$child->Symbol.">More Info</a></td></tr>";
            }
            echo "</table>";
            
        }
        else
        {            
            echo "<table><tr><td id=\"error\">No Records has been found</td></tr></table>";
        }
        
    }

    
?>
    
<?php
if ($quote != ""){
    
    $urlquote = file_get_contents("http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=".$quote);
    $jsonfile = json_decode($urlquote);
    if($jsonfile ->Status=="SUCCESS")
    {
        echo "<table id=\"quoteTable\" border=\"1\" >";
        echo "<tr><th class=\"quote\">Name</th><td class=\"quote\">".$jsonfile -> Name."</td></tr>";
        echo "<tr><th>Symbol</th><td>".$jsonfile -> Symbol."</td></tr>";
        echo "<tr><th>Last Price</th><td>".round($jsonfile -> LastPrice,2)."</td></tr>";
        echo "<tr><th>Change</th><td>".round($jsonfile -> Change,2)."&nbsp;<img src=";
        
        if($jsonfile -> Change<0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
        }
        else if($jsonfile -> Change>0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
        } 
        echo "></td></tr>";
        
        echo "<tr><th>Change Percent</th><td>".round($jsonfile -> ChangePercent,2)."%&nbsp;<img src=";
        
        if($jsonfile -> ChangePercent<0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
        }
        else if($jsonfile -> ChangePercent>0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
        } 
        echo "></td></tr>";

        date_default_timezone_set('Pacific');
        
        if (($timestamp = strtotime($jsonfile -> Timestamp)) === false) 
        {
            echo "<tr><th>Timestamp</th><td>Timestamp is in wrong format</td></tr>";
        } 
        else 
        {
            echo "<tr><th>Timestamp</th><td>" . date('Y-m-d h:i A', $timestamp)."</td></tr>";
        }
        
        $capacityText="";
        $capacity = $jsonfile -> MarketCap/1000000000;
        
        if ($capacity<0.05)
        {
            $capacity = $capacity*1000;  
            $capaictyText=round($capacity,2)."&nbspM";
        }
        else
        {
            $capaictyText=round($capacity,2)."&nbspB";
        }
        
        
        
        echo "<tr><th>Market Cap</th><td>".$capaictyText."</td></tr>";
        echo "<tr><th>Volume</th><td>".number_format($jsonfile -> Volume)."</td></tr>";
        $cytd = round($jsonfile -> LastPrice-$jsonfile -> ChangeYTD,2);
        echo "<tr><th>Change YTD</th><td>(".$cytd.")&nbsp<img src=";
        if($cytd<0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
        }
        else if($cytd>0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
        } 
        echo "></td></tr>";
        
        
        
        echo "<tr><th>Change Percent YTD</th><td>".round($jsonfile -> ChangePercentYTD,2)."&nbsp<img src=";
        if($jsonfile -> ChangePercentYTD<0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Red_Arrow_Down.png";
        }
        else if($jsonfile -> ChangePercentYTD>0)
        {
            echo "http://cs-server.usc.edu:45678/hw/hw6/images/Green_Arrow_Up.png";
        } 
        echo "></td></tr>";
        
        
        
        
        echo "<tr><th>High</th><td>".$jsonfile -> High."</td></tr>";
        echo "<tr><th>Low</th><td>".$jsonfile -> Low."</td></tr>";
        echo "<tr><th>Open</th><td>".$jsonfile -> Open."</td></tr>";
        echo "</table>"; 
        
    }
    else
    {            
        echo "<table><tr><td id=\"error\">There is no stock information available</td></tr></table>";
    }
    
    
    
}
?>

    
</div>    
    
    
</body>
</html>