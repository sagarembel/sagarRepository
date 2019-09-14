<%@page import="java.util.List"%>
<%@page import="com.smt.hibernate.GoodReceive"%>
<%@page import="com.smt.helper.GoodReceiveHelper"%>
<% boolean isHome = false;%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"
	type="text/javascript"></script>
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.css">
<script src="/SMT/staticContent/js/jquery.min.js" type="text/javascript"></script>
<script src="/SMT/staticContent/y_js/modernizr.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/y_js/barcodeDetail.js"
	type="text/javascript"></script>
<script type="text/javascript">
</script>
<body class="vColor">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Barcode Management</h2>
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

		<form action="bsrcode" method="post" name="barcodeCopy"
			class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-2" align="center">
						<label class="control-label">Enter Barcode No :<sup
							style="color: red">*</sup></label>
					</div>
					<%
						 GoodReceiveHelper helper = new GoodReceiveHelper();
						    List mainCategoryList = helper.getAllMainBarcodeNo();
					    %>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input list="barcodeId_drop" id="barcodeId" class="form-control">
							<datalist id="barcodeId_drop">
								<%
												for(int i=0;i<mainCategoryList.size();i++){
													GoodReceive category = (GoodReceive)mainCategoryList.get(i);
											%>
								<option data-value="<%=category.getBarcodeNo()%>"
									value="<%=category.getBarcodeNo()%>">
									<%
												}
											%>
								
							</datalist>
						</div>
					</div>
					<div class="col-sm-offset-1 col-sm-1" align="center">
						<label class="control-label">Quantity :</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control  input-sm" id='quantity'
								name="quantity" placeholder="Quantity">
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" onclick="return printbarcode();" name="btn" id="btn" value="Print Barcode" style="width: 140px;"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
					<input type="reset" value="Cancel"
						class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
				</div>
			</div>
		</form>
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>
</html>