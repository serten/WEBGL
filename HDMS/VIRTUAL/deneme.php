<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>DOM sample</title>
<style type=text/css>
.smp {
PADDING-RIGHT: 0.2em; PADDING-LEFT: 0.2em; PADDING-BOTTOM: 0.2em; WIDTH:
200px;
20
PADDING-TOP: 0.2em; POSITION: absolute; height: 100px}
#t1 {FONT-WEIGHT:700; FONT-SIZE: 2em; color: blue;
 FONT-FAMILY: sans-serif; BACKGROUND-COLOR: orange}
#t2{FONT-WEIGHT:700; FONT-SIZE: 2em; LEFT: 120px;
 color: yellow; FONT-FAMILY: sans-serif; top: 200px; BACKGROUND-COLOR:
green}
#t3{FONT-WEIGHT:700; FONT-SIZE: 2em;
 color: yellow; FONT-FAMILY: sans-serif; BACKGROUND-COLOR: #6699cc}
</style>
<script language="Javascript" type="text/javascript">
function notSupported( ) {alert('your browser is not supported');}
function setInnerHTML(nm, value) {
if (nm == '') return;
var
element=document.getElementById?document.getElementById(nm):(document.all?document.all(nm):null)
if (element) {
 if(element.innerHTML) {
 element.innerHTML=value;
 }
 else notSupported( ); }
else NotSupported( ); }
</script>
</head><body>
<h2>HTMLElement:innerHTML</h2>
<form>
value: <input size=40 value="Hello world" name=t><br>
set to
<select name="sel" id="sel"
onChange="setInnerHTML(this.options[this.selectedIndex].value,
form.t.value);">
<option value="" selected>--Select the element
<OPTION value="t1">Division Element
<OPTION value="t2">Paragraph Element
<OPTION value="t3">Form Element</OPTION>
</select></form>
<p id=t2>Paragraph</p>
<form id=t3 name=t3>
Form<input type=button value=button>
</form>
<div class=smp id=t1>Division</DIV><table height=100 width=250>
<tr><td></td></tr></tbody></table>
</div></body></html>
