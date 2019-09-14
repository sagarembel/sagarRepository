<%@page import="java.util.List"%>
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
				<h2 class="form-name style_heading">Supplier Details</h2>
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
		<form action="supplier" name="supd" method="post"
			class="form-horizontal">
			<div class="row">
				<div class="form-group">
					<div class="col-sm-1" align="center">
						<label class="control-label">Supplier Name:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control" name="supplierName"
								id="supplierName" placeholder="Supplier Name" />
						</div>
					</div>
					<div class="col-sm-2" align="center">
						<label class="control-label">Party Type:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <select id="partyType" name="partyType" class="form-control">
								<option value="selected">--Select Party Type--</option>
								<option value="VAT Party">VAT Party</option>
								<option value="Retail Party">Retail Party</option>
								<option value="Out of state party">CST</option>
								<option value="N.A.">N.A.</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">Brand</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="brand" name="brand"
								placeholder="Brand" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">Address:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="address"
								name="address" placeholder="Address" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">City</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="city" name="city"
								placeholder="City" />
						</div>
					</div>

				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">State:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input class="form-control" type="text" id="state" name="state"
								placeholder="State" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">Pin Code:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="pin" name="pin" class="form-control"
								placeholder="Pin Code" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Contact Person:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="contactPerson" name="contactPerson"
								class="form-control" placeholder="Contact Person" />
						</div>
					</div>

				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">DOB:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="date" id="birthday" name="birthday"
								class="form-control" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">Anniversary:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<input type="date" id="anniversary" name="anniversary"
								class="form-control" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">E-mail:</label>
					</div>
					<div class="col-sm-2">
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
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">TIN No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="tinNo" name="tinNo" class="form-control"
								placeholder="TIN No" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">CST No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="cstNo" name="cstNo" class="form-control"
								placeholder="CST No" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Credit Limit:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="creditLimit" name="creditLimit"
								class="form-control" placeholder="Credit Limit" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">Discount:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="discount" name="discount"
								class="form-control" placeholder="Discount" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">Product Type:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <select id="productType" name="productType" class="form-control">
								<option value="selected">Select Product Type</option>
								<option value="VAT Party">sdf</option>
								<option value="Retail Party">sdfd</option>
								<option value="Out of state party">sdfsd</option>
								<option value="N.A.">N.A.</option>
							</select>
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">PAN NO:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="panNo" name="panNo" class="form-control"
								placeholder="PAN NO" />
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">Mobile No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" class="form-control" name="mobileno"
								id="mobileno" placeholder="Mobile Number" />
						</div>
					</div>
				</div>
			</div>

			<!-----------------------------------------------Bank Details------------------------------------------->

			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
			<div class="row">
				<div class="col-sm-offset-1 col-md-10">
					<div align="left" style="color: #72459a;">
						<h3 class="form-name">
							<u>Bank Details</u>
						</h3>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">Bank name:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="bankName" name="bankName"
								class="form-control" placeholder="Bank Name" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">Account No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="accountNo" name="accountNo"
								class="form-control" placeholder="Account No" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Branch Name:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="branchName" name="branchName"
								class="form-control" placeholder="Branch Name" />
						</div>
					</div>

				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<div class="col-sm-1 col-sm-offset-1" align="center">
						<label class="control-label">IFSC:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="ifscCode" name="ifscCode"
								class="form-control" placeholder="IFSC" />
						</div>
					</div>

					<div class="col-sm-1" align="center">
						<label class="control-label">MICR No:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <input type="text" id="micrNo" name="micrNo"
								class="form-control" placeholder="MICR No" />
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label">Payment Type:</label>
					</div>
					<div class="col-sm-2">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-hand-right"></i>
							</span> <select id="paymentType" name="paymentType" class="form-control">
								<option value="selected">--Payment Type--</option>
								<option value="rtgs">RTGS</option>
								<option value="neft">NEFT</option>
								<option value="online">ONLINE</option>
								<option value="cash">CASH</option>
								<option value="cash">Credit</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button" value="save" id="btn"
						onclick="supplierDetails()"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right" />
					<input type="reset" value="Cancel"
						class="btn btn-lg btn-danger btn-md button_hw button_margin_right" />
					<input type="button" value="Edit Supplier Bill "
						onclick="window.location.href='http://localhost:8080/SMT/jsp/y_SupplierEdit.jsp'"
						class="btn btn-lg btn-primary btn-md button_hw button_margin_right" />
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