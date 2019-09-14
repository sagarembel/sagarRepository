<%
	boolean isHome = false;
%>
<%@include file="y_commons/header1.jsp"%>
<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/selectjj.js"></script>
<script type="text/javascript" src="/SMT/staticContent/js/buttom.js"></script>
<script src="/SMT/staticContent/js/jquery.min.js"></script>
<script src="/SMT/staticContent/js/jquery.jqgrid.min.js"></script>
<script src="/SMT/staticContent/js/jquery.dataTables.js"
	type="text/javascript"></script>
<script type="text/javascript" src="/SMT/staticContent/js/jqueryUi.js"></script>
<link href="/SMT/staticContent/css/dataTa.css" rel="stylesheet"
	type="text/css" media="all" />
<link href="/SMT/staticContent/css/dataTables.jqueryui.min.css"
	rel="stylesheet" type="text/css" media="all">
<link href="/SMT/staticContent/css/select.css" rel="stylesheet"
	type="text/css" media="all">
<link href="/SMT/staticContent/css/button.css" rel="stylesheet"
	type="text/css" media="all">
<link rel="stylesheet" href="/SMT/staticContent/css/jquery-ui.min.css">
<link rel="stylesheet" href="/SMT/staticContent/css/ui.jqgrid.min.css">
<link href="/SMT/staticContent/css/jquery.dataTables.tableTools.css"
	rel="stylesheet" type="text/css" media="all" />
<script src="/SMT/staticContent/js/jquery.dataTables.tableTools.min.js"
	type="text/javascript"></script>
<script src="/SMT/staticContent/js/cashbankbook.js"></script>

<body class="vColor"
	onload="getYesterdarTotalAmount(); getTodayCreditDebitReport(); getTodayCreditDebitReport1(); getTodaySaleTotalAmount1(); getTodayPurchaseTotalAmount(); getTodaySaleReturnTotalAmount(); getTodayPurchaseReturnTotalAmount(); getTodayCreditTotalAmount(); getTodayCreditReturnTotalAmount(); getTodayExpdCreditAmount(); getTodayExpdDebitAmount();getTodayCashAmount();getTodayCardAmount();getTodayChequeAmount();getTodayNEFTAmount();">
	<div class="container col-sm-offset-1" style="float: left">
		<div class="row">
			<div align="center" style="margin-top: 75px">
				<h2 class="form-name style_heading">Day Closure Report</h2>
			</div>
			<div class="row">
				<div class="col-md-10">
					<hr style="border-top-color: #c1b1b1;">
				</div>
			</div>
		</div>
		<div class="table-responsive" hidden="true">
			<div class="col-md-5">
				<table id="example1" class="display	">
					<thead>
						<tr>
							<th>Name</th>
							<th>Credit</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>

			<div class="col-md-5">
				<table id="example2" class="display	">
					<thead>
						<tr>
							<th>Name</th>
							<th>Debit</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>

		<div class="row form-group" style="margin-top: 25px;" hidden="true">

			<!-- <label class="col-md-2 col-md-offset-1 control-label" for="village">Yesterday
				Amount:<sup>*</sup>
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="glyphicon glyphicon-map-marker"></i>
					</span> <input type="text" readonly="readonly" name="yesAmt" id="yesAmt"
						placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div> -->

			<label class="col-md-2 control-label" for="village">
				Credit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creAmt" id="creAmt"
						placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="dupsaletotal" name="dupsaletotal"
						class="form-control input-md" type="hidden">
				</div>
			</div>
			
			<label class="col-md-2 control-label" for="village">
				Debit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="debAmt" id="debAmt"
						placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="dupsaletotal1" name="dupsaletotal1"
						class="form-control input-md" type="hidden">
				</div>
			</div>
			
		</div>

		<div class="row form-group" style="margin-top: 25px;">
			<label class="col-md-2 control-label col-sm-offset-1" for="village">
				Sale Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="totsaleAmt"
						id="totsaleAmt" placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
			
			<label class="col-md-2 control-label col-sm-offset-1" for="village">
				Sale Return Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="saleReturnAmt"
						id="saleReturnAmt" placeholder="Sale Return Amount"
						class="form-control input-md ac_district" value="0"> <input
						readonly="readonly" id="saleReturnAmt" name="saleReturnAmt"
						class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 25px;">
			<label class="col-md-2 control-label col-sm-offset-1" for="todayCashAmount">
				Cash Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayCashAmount"
						id="todayCashAmount" class="form-control input-md ac_district" value="0">
				</div>
			</div>
			
			<label class="col-md-2 control-label col-sm-offset-1" for="todayCardAmount">
				Card Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayCardAmount"
						id="todayCardAmount" class="form-control input-md ac_district" value="0"> <input
						readonly="readonly"	class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 25px;" hidden="true">
			<label class="col-md-2 control-label" for="todayChequeAmount">
				Cheque Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayChequeAmount"
						id="todayChequeAmount" placeholder="Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
			
			<label class="col-md- control-label" for="todayNeftAmount">
				NEFT Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="todayNeftAmount"
						id="todayNeftAmount" class="form-control input-md ac_district" value="0">
						<input readonly="readonly" id="saleReturnAmt" name="saleReturnAmt"
						class="form-control input-md" type="hidden">
				</div>
			</div>
		</div>
		
		<!-- CREDIT CUSTOMER DAY CLOSURE -->
				<div class="row form-group" style="margin-top: 25px;" hidden="true">

			<label class="col-md-2 control-label" for="village">
				Credit Sale Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creditSaleAmount" id="creditSaleAmount"
						placeholder="YesterDay Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
			
			<label class="col-md-2 control-label" for="village">
				Credit Return Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="creditReturnAmount"
						id="creditReturnAmount" placeholder="Purchase Return Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
			
		</div>
<!--
 		<div class="row form-group" style="margin-top: 25px;">


			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Purchase Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span>
					 <input type="text" readonly="readonly" name="totpurchaseAmt"
						id="totpurchaseAmt" placeholder="Purchase Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Purchase Return Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="purchaseReturnAmt"
						id="purchaseReturnAmt" placeholder="Purchase Return Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
		</div>
		
		<div class="row form-group" style="margin-top: 25px;">

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Expenditure Credit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span>
					 <input type="text" readonly="readonly" name="exCreditAmount"
						id="exCreditAmount" placeholder="Expenditure Credit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>

			<label class="col-md-2 col-md-offset-1 control-label" for="village">
				Expenditure Debit Amount:
			</label>
			<div class="col-md-2">
				<div class="input-group">
					<span class="input-group-addon"> <i
						class="fa fa-inr"></i>
					</span> <input type="text" readonly="readonly" name="exDebitAmount"
						id="exDebitAmount" placeholder="Expenditure Debit Amount"
						class="form-control input-md ac_district" value="0">
				</div>
			</div>
		</div>
-->
		<div class="row footer_margin_top" align="center">
			<%@include file="y_commons/footer.jsp"%>
		</div>
	</div>
</body>