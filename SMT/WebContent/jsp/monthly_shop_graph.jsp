<html>
<head>
<%
	boolean isHome = false;
%>
<%@include file="commons/header.jsp"%>

<script src="/SMT/staticContent/js/graph.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/highcharts.js"></script>
<script src="/SMT/staticContent/js/exporting.js"></script>


</head>
<div class="container">
	<h2 align="center">Monthly Shop Sale Graph</h2>
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
		onclick="stock.shopmonth();">

	<div id="container"
		style="min-width: 310px; height: 400px; margin: 0 auto"></div>


</body>
</html>

<%@include file="commons/shortcut.jsp"%>

<%@include file="commons/footer.jsp"%>