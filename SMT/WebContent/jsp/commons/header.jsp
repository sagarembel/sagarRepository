<%@page import="com.smt.hibernate.UserDetail"%>
<%@page import="org.hibernate.Session"%>
<%@page import="com.smt.utility.HibernateUtility"%>
<%@page contentType="text/html"%>
<%@page pageEncoding="UTF-8"%>
<script src="/SMT/staticContent/js/logout.js"></script>
<link href="/SMT/staticContent/y_css/bgChange.css"
	rel="stylesheet">
<%
	String type1 = "";
	String name1 = "";
	if (session != null) {
		if (session.getAttribute("user") != null) {
			name1 = (String) session.getAttribute("user");
			HibernateUtility hbu1 = HibernateUtility.getInstance();
			Session session2 = hbu1.getHibernateSession();
			org.hibernate.Query query1 = session2
					.createQuery("from UserDetail where userName =:usr");
			query1.setParameter("usr", name1);
			UserDetail userDetail1 = (UserDetail) query1.uniqueResult();
			type1 = userDetail1.getTypeId();
		} else {
			response.sendRedirect("/SMT/jsp/login.jsp");
			out.println("Please Login ");
		}
	} else {
		response.sendRedirect("/SMT/jsp/login.jsp");
		out.println("Please Login ");
	}
%>

<%
	String contextPath = request.getContextPath();
%>
<%
	String path = "";
	if (isHome)
		path = "jsp\\";
%>
<html>
<head>
<link rel="stylesheet" href="/SMT/staticContent/css/bootstrap.min.css">
<title>Embel Technology</title>
<link rel="stylesheet" href="/SMT/staticContent/css/bootstrap.min.css">
<%
	if (isHome) {
%>
<link rel="stylesheet" href="staticContent/css/style.css" />
<%
	} else {
%>
<link rel="stylesheet" href="../staticContent/css/style.css" />
<%
	}
%>
<script src="/SMT/staticContent/js/bootstrap.min.js"></script>
<!-- <script type="text/javascript" src="/SMT/staticContent/js/bootbox.min.js"></script>	 -->
<%
	if (isHome) {
%>
<link rel="stylesheet" href="staticContent/css/style.css" />
<%
	} else {
%>
<link rel="stylesheet" href="../staticContent/css/style.css" />
<%
	}
%>
</head>
<style>
.width{
width: 250px;
}
</style>
<body>
	<div class="row navbar navbar-fixed-top navbar navbar-inverse "
		id="navbar" role="navigation">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/SMT/jsp/index.jsp" accesskey="m">Home</a>
			<ul class="nav navbar-nav">
				<%
					if (type1.equals("salesman") || type1.equals("admin")) {
				%>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Master <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Category</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>category.jsp">Add Main Category</a></li>
								<li><a href="<%=path%>subcategory.jsp">Add Sub Category</a></li>
								<li><a href="<%=path%>category_list.jsp">Category List</a></li>
								<li><a href="<%=path%>dynamicDemo.jsp">Dynamic List</a></li>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Add Products</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>product_detail.jsp" accesskey="p">Product
										Details</a></li>
								<li><a href="<%=path%>item_list.jsp">Item List</a></li>
								<li><a href="<%=path%>offer_creation.jsp" accesskey="o">Special
										Offer</a></li>
								<li><a href="<%=path%>shop.jsp">Add Shop</a></li>
							</ul></li>
						<%
							}
						%>
						<%
							if (type1.equals("salesman") || type1.equals("admin")
									|| type1.equals("account")) {
						%>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Supplier</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>supplier_detail.jsp" accesskey="s">Supplier
										Details</a></li>
								<li><a href="<%=path%>supplier_list.jsp" accesskey="l">Supplier
										List</a></li>
								<li><a href="<%=path%>SupplierEdit.jsp" accesskey="l">Edit
										Supplier</a></li>
								<li><a href="<%=path%>broker.jsp">Broker Details</a></li>
								<li><a href="<%=path%>broker_list.jsp">Broker List</a></li>
							</ul></li>
						<%
							}
						%>
						<%
							if (type1.equals("salesman") || type1.equals("admin")) {
						%>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Stock Movement</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>authority_slip.jsp">Authority
										Slip</a></li>
								<li><a href="<%=path%>authority_slip_shop_to_godown.jsp">Authority
										Slip Shop To Godown </a></li>
								<li><a href="<%=path%>fast_moving_item.jsp">Fast Moving
										Item</a></li>
							</ul></li>
					</ul></li>
				<%
					}
				%>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Billing <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<%
							if (type1.equals("account") || type1.equals("admin")) {
						%>
						<li><a href="<%=path%>customer_bill1.jsp" accesskey="c">Customer
								Bill</a></li>
						<li><a href="<%=path%>customer_bill_history.jsp"
							accesskey="c">All Bill Details</a></li>
						<li><a href="<%=path%>customer_detailsCredit.jsp">Add
								Credit Customer Details</a></li>
						<li><a href="<%=path%>sale_return.jsp">Sale Return</a></li>
						<%
							}
						%>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Purchase <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<%
							if (type1.equals("salesman") || type1.equals("admin")) {
						%>
						<li><a href="<%=path%>po_details.jsp">Purchase Order</a></li>
						<li><a href="<%=path%>po_received.jsp" accesskey="g">PO
								Goods Received</a></li>
						<li><a href="<%=path%>grnList.jsp">PO Goods Received List</a></li>
						<%-- <li><a href="<%=path%>preGrnReg.jsp">Previous Goods
								Received</a></li> --%>
						<li><a href="<%=path%>purchase_return.jsp">Purchase
								Return</a></li>
						<li><a href="<%=path%>parcel_entry.jsp">Parcel Entry</a></li>
						<%
							}
						%>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">HR <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Employee</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")
											|| type1.equals("salesman")) {
								%>
								<li class="kopie"><a href="#">Employee</a></li>
								<li><a href="<%=path%>employee_details.jsp" accesskey="x">Employee
										Details</a></li>
								<li><a href="<%=path%>employee_list.jsp" accesskey="a">Employee
										List</a></li>
								<li><a href="<%=path%>employee_attendance.jsp">Employee
										Attendance</a></li>
								<li><a href="<%=path%>employeeAttendance.jsp">Employee
										Attendance 1</a></li>
							</ul></li>
						<li><a href="<%=path%>leave.jsp">Leave </a></li>
						<%
							}
						%>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Account <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="<%=path%>supplierAccountDetails.jsp">Supplier
								Accont Details</a></li>
						<li><a href="<%=path%>accounts.jsp">Add Other Account</a></li>

						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Cash Book</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")) {
								%>
								<li><a href="<%=path%>cash_bank_book_supplier.jsp">Cash
										Book Supplier</a></li>
								<li><a href="<%=path%>cash_bank_book_salesman.jsp">Cash
										Book Salesman</a></li>
								<li><a href="<%=path%>cash_bank_book_credit_customer.jsp">Cash
										Book Credit Customer</a></li>
								<li><a href="<%=path%>cash_bank_book_other.jsp">Cash
										Book Other</a></li>
								<%
									}
								%>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Credit Account
								Report</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")) {
								%>
								<li><a href="<%=path%>other_cash_bank_between_twodates.jsp">Other
										Account Detail Report Beetween Two Days</a></li>
								<li><a href="<%=path%>oheraccountdetails.jsp">Other
										Account Report</a></li>
								<li><a href="<%=path%>customer_credit_account_details.jsp">Credit
										Customer Payment Report</a></li>
								<li><a href="<%=path%>supplier_wise_report.jsp">Bill
										Wise Account Details</a></li>
								<%
									}
								%>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Supplier
								Account Report</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")) {
								%>
								<li><a href="<%=path%>supplier_account_list.jsp">Supplier
										Account List</a></li>
								<li><a href="<%=path%>cashbankbookreport.jsp">Supplier
										Account Report Between Two Date</a></li>
								<li><a href="<%=path%>other_cash_bank_between_twodates.jsp">Other
										Account Detail Report Beetween Two Days</a></li>
								<%
									}
								%>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Employee
								Account Report</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")) {
								%>
								<li><a href="<%=path%>employee_account_details.jsp">Employee
										Account Details</a></li>
								<li><a
									href="<%=path%>salesman_cash_bank_between_twodates.jsp">Employee
										Account Detail Report</a></li>
								<%
									}
								%>
							</ul></li>
						<%
							if (type1.equals("admin") || type1.equals("account")) {
						%>
						<li><a href="<%=path%>tax.jsp">Tax</a></li>
						<%
							}
						%>
					</ul></li>
				<%
					if (type1.equals("admin") || type1.equals("account")
							|| type1.equals("salesman")) {
				%>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Stock <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="<%=path%>current_stock.jsp">Current Stock </a></li>
						<li><a href="<%=path%>CategoryWiseStock.jsp">CategoryWise
								Stock</a></li>
						<li><a href="<%=path%>supplierWiseStock.jsp">SupplierWise
								Stock</a></li>
						<li><a href="<%=path%>shopWiseStock.jsp">Shop Wise Stock</a></li>
						<li><a href="<%=path%>age_wise_stock.jsp">Age Wise Stock</a></li>
						<li><a href="<%=path%>item_in_shop.jsp">Item In Shop</a></li>
						<li><a href="<%=path%>item_in_godown.jsp">Item In Godown</a></li>
						<%
							}
						%>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Reports <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Sale Graph
								Report</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin") || type1.equals("account")) {
								%>
								<li><a href="<%=path%>daily_sale_graph.jsp" accesskey="d">Daily
										Sale Graph </a></li>
								<li><a href="<%=path%>week_sale_graph.jsp">Weekly Sale
										Graph </a></li>
								<li><a href="<%=path%>monthly_sale_graph.jsp">Monthly
										Sale Graph </a></li>
								<li><a href="<%=path%>daily_shop_graph.jsp">Daily Shop
										Sale Graph </a></li>
								<li><a href="<%=path%>weekly_shop_graph.jsp">Weekly
										Shop Sale Graph </a></li>
								<li><a href="<%=path%>monthly_shop_graph.jsp">Monthly
										Shop Sale Graph </a></li>
								<li><a href="<%=path%>yearly_shop_graph.jsp">Yearly
										Shop Sale Graph </a></li>
								<li><a href="<%=path%>due_date.jsp">Payment Due Date </a></li>
								<%
									}
								%>
							</ul></li>

						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Sale Report</a>
							<ul class="dropdown-menu">
								<%
									if (type1.equals("admin")) {
								%>
								<li class="dropdown dropdown-submenu"><a href="#"
									class="dropdown-toggle" data-toggle="dropdown">Shop Related
										Reports</a>
									<ul class="dropdown-menu">
										<li><a href="<%=path%>shop_wise_sale.jsp">Shop Wise
												Sale</a></li>
										<li><a href="<%=path%>shopWiseSaleByTwoDate.jsp">Shop
												Sale Between Two Date</a></li>
									</ul></li>
								<li class="dropdown dropdown-submenu"><a href="#"
									class="dropdown-toggle" data-toggle="dropdown">All Sale
										Reports</a>
									<ul class="dropdown-menu">
										<li><a href="<%=path%>day_wise_sale.jsp">Total Sale
												Report</a></li>
										<li><a
											href="<%=path%>sale_report_between_single_dates.jsp">Date
												Wise Sale Report</a></li>
										<li><a href="<%=path%>categorywise_sale_report.jsp">Category
												Wise Sale Report</a></li>
										<li><a href="<%=path%>subcategorywise_sale_report.jsp">Sub-Category
												Wise Sale Report</a></li>
										<li><a href="<%=path%>itemwise_sale_report.jsp">Product
												Sale Report</a></li>
										<li><a href="<%=path%>supplierwise_sale_report.jsp">Supplier
												Wise Sale Report</a></li>
										<li><a href="<%=path%>itemPerformanceBeetweenTwoDays.jsp">Item
												Wise Performance Between Two Dates</a></li>
										<li><a href="<%=path%>day_closing_payment_datewise.jsp">Day
												Closing Payment Datewise</a></li>
										<li><a href="<%=path%>date_wise_sale_report.jsp">Sale
												Report BetWeen Two Days </a></li>
										<li><a href="<%=path%>salereturndaywise.jsp">Sale
												Return Report Using Single Date</a></li>
									</ul></li>
								<%
									}
								%>
								<%
									if (type1.equals("admin") || type1.equals("account")
											|| type1.equals("salesman")) {
								%>
								<%
									}
								%>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Purchase
								Report</a>
							<ul class="dropdown-menu">
								<li><a
									href="<%=path%>purchase_report_between_two_dates.jsp">Purchase
										Report Between Two Days </a></li>
								<li><a href="<%=path%>purchase_report_by_shop.jsp">Purchase
										Report By Shop </a></li>
								<li><a href="<%=path%>purchase_report_yearly.jsp">Purchase
										Report Yearly </a></li>
								<li><a href="<%=path%>purchase_report_supplier_wise.jsp">Purchase
										Report Supplier Wise </a></li>
								<li><a href="<%=path%>itemwise_purchase_report.jsp">Item
										Wise Purchase Report</a></li>
								<li><a href="<%=path%>supplierwise_purchase_report.jsp">Supplier
										Wise Purchase Report</a></li>
								<li><a href="<%=path%>purchase_report.jsp">Purchase
										Report</a></li>
								<li><a href="<%=path%>categorywise_purchase_report.jsp">Category
										Wise Purchase Report</a></li>
								<li><a href="<%=path%>subcategorywise_purchase_report.jsp">Sub-Category
										Wise Purchase Report</a></li>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Commission
								Report</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>date_wise_commision_for_employee.jsp">Date
										Wise Commission For Employee</a></li>
								<li><a href="<%=path%>day_wise_salesman_commision.jsp">Day
										Wise Employee Commision</a></li>
							</ul></li>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">VAT Report</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>shop1vat.jsp">Shop1 vat</a></li>
								<li><a href="<%=path%>shop2vat.jsp">Shop2 vat</a></li>
								<li><a href="<%=path%>shop3vat.jsp">Shop3 vat</a></li>
								<li><a href="<%=path%>shopWiseVat.jsp">Shop Wise Vat</a></li>
							</ul></li>
						<li><a href="<%=path%>barcode_detail.jsp">Barcode Detail</a></li>
						<li><a href="<%=path%>day_closing_payments.jsp">Day
								Closing Payments</a></li>
						<li><a href="<%=path%>get_all_return_bills.jsp">All
								Return Bills </a></li>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">CS Desk <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<%
							if (type1.equals("admin") || type1.equals("account")
									|| type1.equals("salesman")) {
						%>
						<li class="dropdown dropdown-submenu"><a href="#"
							class="dropdown-toggle" data-toggle="dropdown">Temporary</a>
							<ul class="dropdown-menu">
								<li><a href="<%=path%>temporary_stock.jsp">Temporary
										Stock</a></li>
								<li><a href="<%=path%>temporary_stock_return.jsp">Temporary
										Stock Return</a></li>
								<li><a href="<%=path%>temporaryStockReport.jsp">Temporary
										Stock Details</a></li>
							</ul></li>
						<li><a href="<%=path%>customer_feedback.jsp">Customer
								Feedback</a></li>
						<li><a href="<%=path%>customer_feedback_list.jsp">Customer
								Feedback List</a></li>
						<li><a href="<%=path%>loyalty_program.jsp">Loyalty
								Program</a></li>
						<li><a href="<%=path%>loyalty_program_list.jsp">Loyalty
								Program List</a></li>
						<li><a href="<%=path%>card_point.jsp">Card Point</a></li>
						<li><a href="<%=path%>visitor.jsp">Visitor</a></li>
						<li><a href="<%=path%>visitor_list.jsp">Visitor List</a></li>
					</ul></li>
				<li class="dropdown"><a href="#" class="dropdown-toggle"
					data-toggle="dropdown">Notification <b class="caret"></b></a>
					<ul class="dropdown-menu">
						<li><a href="<%=path%>birthday.jsp">Birthday</a></li>
						<li><a href="<%=path%>anniversary.jsp">Anniversary</a></li>
						<%
				}
				%>
					</ul></li>
				<%
                  if(type1.equals("admin")){
                %>
				<a class="navbar-brand" href="/SMT/jsp/create_user.jsp">Create
					User</a>
				<%
				}
				%>
				<%
                  if(type1.equals("admin") || type1.equals("account") ||type1.equals("salesman")){
                %>
				<a class="navbar-brand" onclick="Logout()">Logout</a>
				<%
				}
				%>
			</ul>
		</div>
	</div>