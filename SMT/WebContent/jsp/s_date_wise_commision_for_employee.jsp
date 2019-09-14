
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/y_js/newReport.js"></script>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<script src="/SMT/staticContent/y_js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>


<body class="account_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Between Two Days Employee
					Commission</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-8 col-md-4 control-label">
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
			<div class="col-md-12">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>


		<form action="goodsReturn" method="post" class="form-horizontal">

			<div class="row">

				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Start Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-calendar"></i>
							</span> <input type="date" id="fDate" class="form-control">
						</div>
					</div>


					<div class="col-sm-2" align="center">
						<label class="control-label">End Date:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-calendar"></i>
							</span> <input type="date" id="eDate" class="form-control">
						</div>
					</div>
				</div>
			</div>


			<div class="row">

				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Enter Employee Id:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="empId" class="form-control">
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right"
						name="btn" value="Search" onclick="supllierPayment()" />
				</div>
			</div>


			<div class="row">
				<div class="col-sm-10 col-sm-offset-1">
					<div class="table-responsive">
						<table id="list4"></table>
						<div id="list4"></div>
					</div>
				</div>
			</div>

		</form>

		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>

	</div>
</body>
</html>
