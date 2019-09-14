<% boolean isHome=false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/shree/jquery.dataTables.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/dataTables.buttons.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.flash.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/jszip.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/pdfmake.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/vfs_fonts.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.html5.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/shree/buttons.print.min.js"
	type="text/javascript"></script>
<link href="/SMT/staticContent/y_css/jquery.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all" />
<link href="/SMT/staticContent/y_css/buttons.dataTables.min.css"
	rel="stylesheet" type="text/css" media="all">
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<script>
	     $(document).ready(function(){
	    	 getAllMAinSupp();
	}); 
	</script>
<script type="text/javascript">
  			function Back()
  			{
  				window.location = "s_supplier_detail.jsp" ;
  			}
  		</script>

<body id="dt_example" class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Supplier List</h2>
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
		<div class="row" align="center">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-condensed cf"
					id="suppName" class="display"
					style="border: 2px solid black; border-collapse: collapse;">
					<thead>
						<tr>
							<th>Sr No</th>
							<th>Supplier Name</th>
							<th>Address</th>
							<th>City</th>
							<th>Mobile No</th>
							<th>Contact Person</th>
							<th>Email</th>
							<th>GSTTIN/UIN No</th>
							<th>Pin Code</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>

		<div class="wrapper" align="center">
			<input type="button" value="Back" id="listBtn"
				class="btn btn-primary" onclick="Back()" />
		</div>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>
