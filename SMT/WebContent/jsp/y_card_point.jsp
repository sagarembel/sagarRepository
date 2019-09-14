
<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/y_js/cardpoint.js"></script>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/css/ui.jqgrid.min.css">
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.13.3/js/jquery.jqgrid.min.js"></script>

<body class="cs_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">
					<b>Card Point</b>
				</h2>
			</div>

		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
					<div id="date">
						<label id="demo"></label>
						<script>
							   var date = new Date();
							   document.getElementById("demo").innerHTML = date.toDateString();
							</script>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="card1" method="post" name="card" class="form-horizontal">

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">For Amount:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> Rs. </span> <input type="text"
								name="amount" id="amount" class="form-control" value="100"
								autofocus onmouseover="card1()" placeholder="100 -Rs">
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<label class="control-label">Points:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-star"></i>
							</span> <input type="text" name="points" id="points"
								class="form-control" placeholder="Enter Points">
						</div>
					</div>

				</div>
			</div>

			<div class="row" style="">
				<div align="center">
					<input type="button" name="btn" onclick="cardpoints()" value="Save"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
				</div>
			</div>
		</form>

		<div class="row">
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="card2" method="post" name="card2"
			class="form-horizontal">
			<p>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">For How Much:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-circle-arrow-up"></i>
							</span> <input type="text" name="howamount" id="howamount"
								class="form-control" placeholder="Enter Points">
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<label class="control-label">Discount Amount:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> Rs. </span> <input type="text"
								name="disamount" id="disamount" class="form-control"
								placeholder="Enter Discount Amount">
						</div>
					</div>

				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" name="btn1" onclick="cardpoints1()"
						value="Save"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
				</div>
			</div>

		</form>

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