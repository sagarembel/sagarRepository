<html>
<head>
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<script src="/SMT/staticContent/js/itemstock.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<title>Insert title here</title>
</head>
<div class="container">
	<h2 align="center">Current Stock</h2>
</div>

<div id="date">
	<label id="demo"></label>
	<script>
		   var date = new Date();
		   document.getElementById("demo").innerHTML = date.toDateString();;
		</script>
</div>

<body>
	<input class="btn btn-success" type="button" value="Graph"
		onclick="stock.getAllCurrent();">

	<div id="container"
		style="min-width: 310px; height: 400px; margin: 0 auto"></div>


</body>
</html>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>