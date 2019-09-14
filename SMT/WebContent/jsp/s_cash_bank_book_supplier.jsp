<%@page import="java.util.List"%>

<%@page import="com.smt.hibernate.SupplierDetail"%>
<%@page import="com.smt.dao.SupplierDetailDao"%>


<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<% boolean isHome=false;%>

<%@include file="y_commons/header1.jsp"%>

<script src="/SMT/staticContent/y_js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/y_js/cashbankbook.js"></script>
<link rel="stylesheet" href="/SMT/staticContent/y_css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.min.css">
<link rel="stylesheet" href="/SMT/staticContent/y_css/ui.jqgrid.css">
<script src="/SMT/staticContenty_/js/jquery.min.js"></script>
<script src="/SMT/staticContent/y_js/jquery.jqgrid.min.js"></script>


<body class="account_form_img">
	<div class="container-fluid">

		<div class="row header_margin_top">
			<div align="center">
				<h2 class="form-name style_heading">Cash Bank Book Supplier</h2>
			</div>
		</div>

		<div class="row">
			<div class="form-group" align="right">
				<div class="col-sm-offset-6 col-md-5 control-label">
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
			<div class="col-sm-offset-1 col-md-10">
				<hr style="border-top-color: #c1b1b1;">
			</div>
		</div>

		<form action="cashBankBook" name="cashboook" method="post"
			class="form-horizontal">
			<div class="row">

				<%
					SupplierDetailDao dao = new SupplierDetailDao();
					List supList = dao.getAllSupplier();
				%>
				<div class="form-group">
					<div class="col-sm-2 col-sm-offset-1" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Supplier:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input list="sup_drop" id="supplier"
								onchange="bill.getAllBills();" class="form-control">

							<datalist id="sup_drop">

								<%
									for (int i = 0; i < supList.size(); i++) {
										SupplierDetail supD = (SupplierDetail) supList.get(i);
								%>

								<option data-value="<%=supD.getSupplierId()%>"
									value="<%=supD.getSupplierName()%>">
									<%
										}
									%>
								
							</datalist>
						</div>
					</div>


					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Bill
							No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <select class="form-control" id='billNo12' name="billNo"
								onchange="billforde.getTotalAmtByBillsforde()">
								<option value="">Select Bill</option>
							</select>

						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group" align="center">
					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label" style="font-family: Times New Roman;">Credit:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input type="text" id="credit" name="credit"
								class="form-control" placeholder="credit"
								oninput="forOptionselect1()">
						</div>
					</div>

					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Debit:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input type="text" id="debit" name="debit" class="form-control"
								placeholder="debit" oninput="forOptionselects()">
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="form-group" align="center">
					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label" style="font-family: Times New Roman;">Total
							Amount:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input readonly="readonly" id="totalAmount" name="totalAmount"
								class="form-control" placeholder="Total Amount">
						</div>
					</div>


					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Reason:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input type="text" id="reason" name="reason"
								class="form-control" placeholder="Reason">
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="form-group" align="center">
					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label" style="font-family: Times New Roman;">Payment
							Type:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <select class="form-control" name="paymentType" id="paymentType"
								onchange="forOptionselect()">
								<option value="selected">Select Payment</option>
								<option value="online">online</option>
								<option value="cash">cash</option>
								<option value="check">cheque</option>
							</select>
						</div>
					</div>


					<div class="col-sm-2" align="center">
						<label class="control-label" style="font-family: Times New Roman;">Registration
							No:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon  glyphicon-hand-right"></i>
							</span> <input type="text" id="registrationNo" class="form-control"
								placeholder="Registraion No">
						</div>
					</div>
				</div>
			</div>


			<div class="row">
				<div class="form-group" align="center">
					<div class="col-sm-2 col-sm-offset-1">
						<label class="control-label" style="font-family: Times New Roman;">Person
							Name:</label>
					</div>
					<div class="col-sm-3">
						<div class="input-group">
							<span class="input-group-addon"> <i
								class="glyphicon glyphicon-user"></i>
							</span> <input type="text" id="personName" name="personName"
								class="form-control" placeholder="Person Name">
						</div>
					</div>
				</div>
			</div>


			<div class="row buttons_margin_top">
				<div align="center">
					<input type="button"
						class="btn btn-lg btn-success btn-md button_hw button_margin_right"
						name="btn" value="Save" onclick="cash()" /> <input type="button"
						class="btn btn-lg btn-danger btn-md button_hw button_margin_right"
						onclick="reset()" value="Cancel" />
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



