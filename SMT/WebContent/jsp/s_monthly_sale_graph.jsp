
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/js/graph.js"></script>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/highcharts.js"></script>
<script src="/SMT/staticContent/js/exporting.js"></script>

<body id="dt_example" class="report_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Monthly Sale Graph</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							var date = new Date();
							document.getElementById("demo").innerHTML = date
									.toDateString();
						</script>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<div class="row">
			<input class="btn btn-success" type="button" value="Graph"
				onclick="stock.month();">
		</div>

		<div class="row">
			<div id="container"
				style="min-width: 310px; height: 400px; margin: 0 auto"></div>
		</div>
		<div class="row margin_shortcut">
			<div class="col-sm-12">
				<%@include file="y_commons/shortcut.jsp"%>
			</div>
		</div>

		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>

	</div>
</body>
</html>
