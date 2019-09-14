<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_css/adi.css"></script>
<link href="/SMT/jsp/purchase_report.jsp" rel="stylesheet" />
<body class="report_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Purchase Report</h2>
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
		<form action="purchaseReport" method="post" class="form-horizontal">
			<div align="right">
				<strong>From:</strong> <input type="date" name="date" /> <strong>To:</strong>
				<input type="date" name="date" /> <input class="btn btn-success"
					type="submit" value="Search">
			</div>

			<div class="rTable">
				<br> <br>
				<div class="rTableRow">
					<div class="rTableHead col-md-1">
						<strong>Excepted Date</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Order No</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Order Date</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Supplier Name</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Item Name</strong>
					</div>
					<div class="rTableHead col-md-2">
						<strong>Contact Person Name</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Quantity</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Rate</strong>
					</div>
					<div class="rTableHead col-md-1">
						<strong>Net Amount</strong>
					</div>
				</div>
				<br> <br> <br> <br>

				<div class="rTableRow">
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-2">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
					<div class="rTableCell col-md-1">
						<input type="text" class="form-control">
					</div>
				</div>

				<div class="rTableRow">
					<div class="col-md-10 col-lg-10 col-sm-10 col-xs-12"></div>
					<div class="rTableLabel col-md-1">
						<br> <br> <strong>Total</strong>
					</div>
					<br> <br>
					<div class="rTableCell col-md-1">
						<br> <br> <input type="text" class="form-control" /> <br>
						<br>
					</div>
				</div>
			</div>

			<br> <br>
			<div class="wrapper" align="center">
				<input type="button" value="Print"
					class="btn btn-lg btn-primary btn-md" /> <input type="button"
					value="Graph Format" class="btn btn-lg btn-info btn-md" />
			</div>
			<br> <br>
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
