<%@page import="java.util.List"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>
<%@page import="com.smt.hibernate.SupplierDetail"%>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/supplier.js"></script>
<body class="master_form_img">
	<div class="container-fluid">
		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Edit Supplier</h2>
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
		<form action="supplier" name="supd1" method="post"
			class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<%
								SupplierDetailDao dao5 = new SupplierDetailDao();
								List supList = dao5.getAllMainSuppliers();
							%>
					<div class="col-sm-1" align="center">
						<label class="control-label">Supplier Name:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <select class="form-control" name="supplierName"
								id="supplierName" onchange="es.getSupp()">
								<option value="selected">Select Supplier</option>
								<%
						            		    for(int i=0;i<supList.size();i++){
							                	SupplierDetail supD=(SupplierDetail)supList.get(i);
								           	%>

								<option value="<%=supD.getSupplierId()%>"><%=supD.getSupplierName() %>
								</option>
								<%
						          		       }
						            		%>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Supplier Name:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon glyphicon-user"></i>
							</span> <input type="text" class="form-control" name="supplierName"
								id="supplierName" placeholder="Supplier Name" />
						</div>
					</div>
					<div class="col-sm-2 " align="center">
						<label class="control-label">Address:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="address"
								name="address" placeholder="Address" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">City</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="city" name="city"
								placeholder="City" />
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<label class="control-label">Pin Code:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="pin" name="pin" class="form-control"
								placeholder="Pin Code" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Contact Person:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id="contactPerson" name="contactPerson"
								class="form-control" placeholder="Contact Person" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">E-mail:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="email" name="email" class="form-control"
								placeholder="E-mail" />
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label">Mobile No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-phone"></i>
							</span> <input type="text" id="mobileno" name="mobileno"
								class="form-control" placeholder="Mobile No" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Pan Card No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="panNo" name="panNo" class="form-control"
								placeholder="Pan No" />
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" value="Submit" id="btn" onclick="editsuppli()"
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