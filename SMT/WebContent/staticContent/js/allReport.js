// For Current Stock
function currentStock() {
	var params = {};

	params["methodName"] = "getAllCurrentStock";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {

		$('#currStock').dataTable().fnClearTable();

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total = $('#currStock').DataTable({

				fnRowCallback : function(nRow, aData, iDisplayIndex) {
					$("th:first", nRow).html(iDisplayIndex + 1);
					return nRow;
				},

				"sPaginationType" : "full_numbers",
				destroy : true,
				searching : true,
				orderable : true,

				columns : [ {
					"data" : "barcode",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "catName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "subCatName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "itemName",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "size",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "rollSize",
					"width" : "5%",
					"defaultContent" : ""
				}, {
					"data" : "quantity",
					"width" : "5%",
					"defaultContent" : ""
				},
				/* {"data": "date", "width": "5%", "defaultContent": ""}, */
				],

				dom : 'Bfrtip',
				buttons : [ {
					extend : 'copyHtml5',
					footer : true
				}, {
					extend : 'excelHtml5',
					footer : true
				}, {
					extend : 'csvHtml5',
					footer : true
				}, {
					extend : 'pdfHtml5',
					footer : true,
					title : function() {
						return "Current Stock Report";
					},
					orientation : 'landscape',
					pageSize : 'LEGAL',
					titleAttr : 'PDF'
				} ]
			});
		});
		var mydata = catmap;
		$('#currStock').dataTable().fnAddData(mydata);
	});
}
// for all report

function allWayReport() {
	var params = {};

	params["methodName"] = "getAllStock";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#currStock1').dataTable().fnClearTable();

						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											// Setup - add a text input to each
											// footer cell
											$('#currStock1 thead th')
													.each(
															function() {
																var title = $(
																		this)
																		.text();
																$(this)
																		.html(
																				'<label>'
																						+ title
																						+ '</label><input type="text" size=15 placeholder="Search '
																						+ title
																						+ '" />');
															});

											var total = $('#currStock1')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"sPaginationType" : "full_numbers",
																destroy : true,
																searching : true,

																"columnDefs" : [
																		{
																			"orderable" : false,
																			"targets" : '_all'
																		},
																/*
																 * {
																 * "orderable":
																 * false,
																 * "targets": 1 }, {
																 * "orderable":
																 * false,
																 * "targets": 2 }, {
																 * "orderable":
																 * false,
																 * "targets": 3 }, {
																 * "orderable":
																 * false,
																 * "targets": 4 }, {
																 * "orderable":
																 * false,
																 * "targets": 5 },
																 */
																],

																columns : [
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "avQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "qtyInMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "size",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "color",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Current Stock Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ],

																"scrollY" : "200px",
																"scrollCollapse" : true,
																"paging" : false,

															});

											$('#currStock1').css('display', '');
											total.columns.adjust().draw();

											total
													.columns()
													.every(
															function() {
																var that = this;

																$(
																		'input',
																		this
																				.header())
																		.on(
																				'keyup change',
																				function() {
																					if (that
																							.search() !== this.value) {
																						that
																								.search(
																										this.value)
																								.draw();
																					}
																				});
															});
										});
						var mydata = catmap;
						$('#currStock1').dataTable().fnAddData(mydata);
					});
}

// Category Wise Current Stock

function getCategoryWiseStock() {
	var input = document.getElementById('catId123'), list = document
			.getElementById('catId_drop123'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}
	var params = {};
	params["methodName"] = "getCategoryWiseStock";
	params["catId"] = catId;

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#catWiseStock').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);

						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#catWiseStock')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Stock Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#catWiseStock').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}
// Barcode Wise Current Stock
function barcodewisestock() {

	var barcodeNo = $('#barcode').val();
	var userType = $("#userType").val();
	var userName = $("#userName").val();
	
	var params = {};
	params["barcodeNo"] = barcodeNo;
	params["userType"] = userType;
	params["userName"] = userName;
	params["methodName"] = "stockBarcodeWise";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodeWiseCurrentStock').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#barcodeWiseCurrentStock')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{"data":
																		"buyPrice",
																		"width":
																		"5%",
																		"defaultContent":
																		""},
																		 
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcose Wise Stock Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#barcodeWiseCurrentStock').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Single Date Sale
function singleDateSaleReport() {
	var params = {};
	var fisDate = $("#fDate1").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["fisDate"] = fisDate;
	params["methodName"] = "singleDateSale";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleSingleDate').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleSingleDate')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{	"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt", 
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "grossamt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleSingleDate').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Two Date Sale
function twoDateSaleReport() {
	var params = {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "getSaleDetailsBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTwoDate').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleTwoDate')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data":"perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleTwoDate').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Two Date And Bill NO
function twoDateAndBillNo()
{
	var params = {};
	var fisDate = $("#startDate1").val();
	var endDate = $("#lastDate1").val();
	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "getSaleDetailsBetweenTwoDatesBillNo";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTwoDateBillNo').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleTwoDateBillNo')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Sale Report Bill No Wise'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Sale Report Bill No Wise";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleTwoDateBillNo').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// gst retun report for sale

function gstReturn() {
	var params = {};
	var fisDate = $("#startDategst").val();
	var endDate = $("#lastDategst").val();
	
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val(); 

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "gstReturn";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDateGstReturn').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#twoDateGstReturn')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 2
																	pageTotal = api
																			.column(
																					1)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							1)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "gstpersent",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "tValue",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of sale'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of sale";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#twoDateGstReturn').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// gst return report for purchase

function purchasegstReturn() {
	var params = {};
	var fisDate = $("#startDatepgst").val();
	var endDate = $("#lastDatepgst").val();
	params["fisDate"] = fisDate;
	params["endDate"] = endDate;

	params["methodName"] = "purchasegstReturn";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDateGstReturnPurchase').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#twoDateGstReturnPurchase')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 6
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 7
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "gstpersent",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "tValue",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "sgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalIgst",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of purchase'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of purchase";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#twoDateGstReturnPurchase').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// Two Date wise and user wise report
function twoDate_UserSaleReport()
{
	var params = {};
	var fisDate = $("#startDate").val();
	var endDate = $("#lastDate").val();
	var utypes = $("#utype").val();	
	
	var userType = $("#userType").val();
	var userName = $("#userName").val();

	$("#userName123 option:selected").each(function() {
		selectedVal = $(this).text();
	});

	var splitText = selectedVal.split(",");

	var name = splitText[0];
	var id = splitText[1];

	params["fisDate"] = fisDate;
	params["endDate"] = endDate;
	params["userId"] = id;
	params["utypes"] = utypes;
	
	params["userType"] = userType;
	params["userName"] = userName;

	params["methodName"] = "getSaleDetailsBetweenTwoDates_users";

			$.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleTwoDate_userWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleTwoDate_userWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// over this
																	// page
																	pageTotal = api.column(12).data().reduce(
																		function(a,b)
																		{
																			return intVal(a) + intVal(b);
																		},
																		0);

																	// Update
																	// footer
																	$(api.column(12).footer()).html(str = pageTotal.toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																/*
																 * "scrollY":
																 * "400px",
																 * "scrollCollapse":
																 * true,
																 * "paging":
																 * false,
																 */
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true,
																			title : 'User Wise Sale Reports'
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'User Wise Sale Reports'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true,
																			title : 'User Wise Sale Reports'
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : 'User Wise Sale Reports'
																			/*
																			 * title :
																			 * function() {
																			 * return
																			 * "User
																			 * Wise
																			 * Sale
																			 * Reports"; }
																			 */,
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleTwoDate_userWise').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Category Wise Sale
function categorySaleWise() {
	var params = {};

	var input = document.getElementById('catId'), list = document
			.getElementById('catId_drop'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["catId"] = catId;
	params["methodName"] = "CategoryWiseSaleReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleCategoryWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleCategoryWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	/*
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 8 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 8
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(13).data().reduce(
																					function(a,b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data": "perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "afterDisTaxAmt",
																		    "width": "5%",
																		    "defaultContent": ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleCategoryWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


/********************   PRODUCT WISE SALE REPORT   ***********************/

function productSaleWise()
{
	var params = {};

	var input = document.getElementById('productIdTinv'), list = document
			.getElementById('productId_dropTinv'), i, productId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			productId = list.options[i].getAttribute('data-value');

		}
	}

	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;
	params["productId"] = productId;
	params["methodName"] = "productWiseSaleReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#saleProductWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#saleProductWise')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};																

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grBuyPriceExTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data":"perProductDisPer",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		
																		{
																			"data": "afterDisTaxAmt",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#saleProductWise').dataTable().fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


// Single Date Customer Sale Report
function vehicleSingleDate() {

	var params = {};
	var fDate = $("#vsDate").val();
	params["fDate"] = fDate;
	params["methodName"] = "vehicleSingleDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#vehicleSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#vehicleSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#vehicleSingleDateReport').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

// Between Two Date Customer Sale Report
function vehicleTwoDate() {

	var params = {};
	var fDate = $("#fisDate4").val();
	var eDate = $("#endDate4").val();

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "vehicleTwoDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#vehicleTwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#vehicleTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(
																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2));
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#vehicleTwoDateReport').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Category Wise Customer Sale Report
function categorySaleWiseCustomer() {

	var input = document.getElementById('catId12'), list = document
			.getElementById('catId_drop12'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["catId"] = catId;
	params["methodName"] = "categorySaleWiseCustomer";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#categorySaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#categorySaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#categorySaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Bill No Wise Customer Sale Report
function billnowiseVehiclesell() {

	var input = document.getElementById('BillNocust'), list = document
			.getElementById('seedBillNocust'), i, BillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			BillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["BillNocust"] = BillNocust;
	params["methodName"] = "billnowiseVehiclesell";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseVehicle').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseVehicle')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billnowiseVehicle').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Customer Sale Report
function barcodenowiseVehiclesell() {

	var barcodeVehicle = $("#barcodeVehicle").val();
	var params = {};
	params["barcodeVehicle"] = barcodeVehicle;
	params["methodName"] = "barcodewiseVehicleSale";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseVehicle').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodewiseVehicle')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "carNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ownerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Customer Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#barcodewiseVehicle').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Single Date Miscellaneos Sale Report
function miscellaneousSingleDate() {
	var params = {};
	var fDate = $("#msDate").val();

	params["fDate"] = fDate;

	params["methodName"] = "miscellaneousSingleDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#miscellaneousSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Miscellaneos Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousSingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Credit Sale Return Sale Report

function CSRSingleDate() {
	var params = {};
	var fDate = $("#crdDate").val();

	params["fDate"] = fDate;

	params["methodName"] = "CSRSingleDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR1SingleDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#CSR1SingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Datewise Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR1SingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Two Date Miscellaneos Sale Report
function miscellaneousTwoDate() {
	var params = {};
	var fDate = $("#msfisDate").val();
	var eDate = $("#msendDate").val();

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "miscellaneousTwoDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousTwoDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#miscellaneousTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Miscellaneos Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousTwoDateReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// credit customer Two Date sale return Report

function CSRTwoDate()
{
	var params = {};
	var fDate = $("#csrfisDate").val();
	var eDate = $("#csrendDate").val();

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "CCSRTwoDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR2TwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#CSR2TwoDateReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$("th:first", nRow).html(iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display)
																		{
																			var api = this.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(5)
																			.data()
																			.reduce(function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																		0);

																	// Update
																	// footer
																	$(api.column(5).footer()).html(parseFloat(pageTotal).toFixed(2)
																			);
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(6).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(6).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(7).data().reduce(
																					function(a,b)
																					{
																						return intVal(a) + intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(7).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api.column(8).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(8).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(9).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(9).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(10).data().reduce(function(a,b)
																	{
																		return intVal(a) + intVal(b);
																	},0);

																	// Update
																	// footer
																	$(api.column(10).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);
																	
																	},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "gst",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data": "spWithoutTax",
																			"width": "5%",
																			"defaultContent": "",
																			//"class":"hidden"
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data": "taxAmount",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																	],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Date Range Credit Customer Sale Return Reports";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR2TwoDateReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Category Wise Miscellaneos Sale Report
function miscellaneousSaleWiseCustomer() {
	var input = document.getElementById('mscatId'), list = document
			.getElementById('mscatId_drop'), i, mscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			mscatId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["mscatId"] = mscatId;
	params["methodName"] = "miscellaneousSaleWiseCustomer";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#miscellaneousSaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$(
													'#miscellaneousSaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Miscellaneos Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#miscellaneousSaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Category Wise credit customer Sale return Report
function CSRSaleWiseCustomer() {
	var input = document.getElementById('csrcatId'), list = document
			.getElementById('csrcatId_drop'), i, csrcatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csrcatId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["mscatId"] = csrcatId;
	params["methodName"] = "CCSRSaleWiseCustomer";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#CSR3SaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#CSR3SaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Credit Customer Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#CSR3SaleWiseCustomerReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Bill No Wise Miscellaneos Sale Report
function billnowiseMiscellaneoussell() {
	var input = document.getElementById('msBillNocust'), list = document
			.getElementById('msBillNocust_id'), i, msBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			msBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["msBillNocust"] = msBillNocust;
	params["methodName"] = "billnowiseMiscellaneoussell";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseMiscellaneous').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseMiscellaneous')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Miscellaneos Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#billnowiseMiscellaneous').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Bill No Wise Credit customer Sale return Report
function billnowiseCCSR()
{
	var input = document.getElementById('csrBillNocust'), list = document
			.getElementById('csrBillNocust_id'), i, csrBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csrBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["msBillNocust"] = csrBillNocust;
	params["methodName"] = "billnowiseCCSR";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseCCSR').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseCCSR')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Credit Customer Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#billnowiseCCSR').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Miscellaneos Sale Report
function barcodenowiseMiscellaneoussell() {

	var params = {};
	var barcodeMiscellaneous = $("#barcodeMiscellaneous").val();

	params["barcodeMiscellaneous"] = barcodeMiscellaneous;

	params["methodName"] = "barcodenowiseMiscellaneoussell";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseMiscellaneous').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodewiseMiscellaneous')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Miscellaneos Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#barcodewiseMiscellaneous').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Barcode No Wise Credit customer Sale Return Report
function barcodenowiseCSR() {
	var params = {};
	var barcodeMiscellaneous = $("#barcodecsr").val();

	params["barcodeMiscellaneous"] = barcodeMiscellaneous;

	params["methodName"] = "barcodenowiseCCSR";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseCCSR').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodewiseCCSR')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					5)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							5)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 11 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 11
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 12 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 12
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ReturnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleReturnDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Credit Customer Sale Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]

															});
										});

						var mydata = catmap;
						$('#barcodewiseCCSR').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Single Date Credit Sale Report
function creditSingleDate() {
	var params = {};
	var fDate = $("#csDate").val();

	params["fDate"] = fDate;

	params["methodName"] = "creditSingleDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSingleDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#creditSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																/*
																 * {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSingleDateReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Two Date Credit Sale Report
function creditTwoDate() {
	var params = {};
	var fDate = $("#csfisDate").val();
	var eDate = $("#csendDate").val();

	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "creditTwoDate";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditTwoDateReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#creditTwoDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditTwoDateReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Category Wise Credit Sale Report
function creditSaleWiseCustomer() {
	var input = document.getElementById('cscatId'), list = document
			.getElementById('cscatId_drop'), i, cscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			cscatId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["cscatId"] = cscatId;

	params["methodName"] = "creditSaleWiseCustomer";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSaleWiseCustomerReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#creditSaleWiseCustomerReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(10).footer()).html(parseFloat(pageTotal).toFixed(2));
																	console.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSaleWiseCustomerReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}








//PRODUCT Wise Credit Sale Report
function prtoductWiserCreditCustomerSaleReport()
{
	var input = document.getElementById('csproductId'), list = document.getElementById('csproductId_drop'), i, cscatId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csProductId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["csProductId"] = csProductId;

	params["methodName"] = "creditProductWiseSaleController";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#creditSaleProductWiseReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function()
						{ 
							$('#creditSaleProductWiseReport').DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#creditSaleProductWiseReport').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


















// Bill No Wise Credit Sale Report
function billnowiseCreditsell() {
	var input = document.getElementById('csBillNocust'), list = document
			.getElementById('csBillNocust_id'), i, csBillNocust;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			csBillNocust = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["csBillNocust"] = csBillNocust;

	params["methodName"] = "billnowiseCreditsell";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billnowiseCredit').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billnowiseCredit')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billnowiseCredit').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});

}

// Barcode No Wise Credit Sale Report
function barcodenowiseCredit() {
	var barcodeCredit = $("#barcodeCredit").val();

	var params = {};
	params["barcodeCredit"] = barcodeCredit;

	params["methodName"] = "barcodenowiseCredit";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodewiseCredit').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodewiseCredit')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					7)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							7)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					9)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							9)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					11)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							11)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			
																			
																			// over this
																	// page
																	pageTotal = api
																			.column(
																					13)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							13)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																			

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "firstName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "categoryName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "gst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "spWithoutTax",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "perProductDisPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "afterDisTaxAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalperItem",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Credit Sale Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#barcodewiseCredit').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report Supplier Wise
function supplierAllPurchase()
{
	var input = document.getElementById('supplier7'), list = document
			.getElementById('sup_drop7'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["supplier"] = supplier;

	params["methodName"] = "supplierAllPurchase";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierNameWiseTable1').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierNameWiseTable1')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	
																	//COLUMN TOTAL 

																	pageTotal = api
																			.column(
																					16)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);
																	// Update
																	// footer
																	$(
																			api
																					.column(
																							16)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	
																	//COLUMN TOTAL
																	pageTotal = api
																	.column(
																			19)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);
															// Update
															// footer
															$(
																	api
																			.column(
																					19)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)
																	);
																	console
																			.log(pageTotal);
																					 
																	//COLUMN TOTAL
																	pageTotal = api
																	.column(
																			20)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);
															// Update
															// footer
															$(
																	api
																			.column(
																					20)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2));
															console
																	.log(pageTotal);
															
															
															
																	 },

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "style",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data": "rollSize",
																			"width": "5%",
																			"defaultContent": ""
																		},
																		{
																			"data": "QuantityMeter",
																			"width": "5%",
																			"defaultContent": ""
																		},																		 
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "Discount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Supplier Wise Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierNameWiseTable1').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function getAllBills() {
	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplier = supplier;
	$("#billNo").empty();
	$("#billNo").append(
			$("<option></option>").attr("value", "").text("Select bill"));

	var params = {};
	params["supplier"] = supplier;
	params["methodName"] = "getAllBillBySuppliers";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#billNo").append(
					$("<option></option>").attr("value", i).text(v.billNo));
		});
	})
}

// get all user name on user type
// USED FOR 2 REPORTS 
function getAlluser()
{
	var utype = $("#utype").val();
	
	$("#userName123").empty();
	$("#userName123").append($("<option></option>").attr("value", "").text("Select User Name"));
	
	var params = {};
	params["utype"] = utype;
	params["methodName"] = "getAllUserName";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v)
		{
			$("#userName123").append($("<option></option>").attr("value", i).text(v.userName + "," + v.pkUserId));
		});
	})
}

// Purchase Report Supplier Bill No Wise
function supplierBillWisePurchaseReport()
{
	var input = document.getElementById('supplier'), list = document
			.getElementById('sup_drop'), i, supplier;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');

		}
	}
	var billNo = $("#billNo").val();
	var params = {};
	params["supplier"] = supplier;
	params["billNo"] = billNo;

	params["methodName"] = "supplierBillWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierBillWiseData').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierBillWiseData')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	
																	// Total
																	// over this
																	// page
																	
																	pageTotal = api
																	.column(15)
																	.data()
																	.reduce(function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(api.column(15).footer())
																	.html(
																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console.log(pageTotal);


																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(18)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(18)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "txPerexpence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "finalExpenses",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierBillWiseData').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}







/********************************  VOUCHER NUMBER WISE PURCHASE REPORT **********************/


function VoucherNoWisePurchaseReport()
{
	var input = document.getElementById('voucherDrop'), list = document
			.getElementById('voucherNo_drop'), i, voucherNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			voucherNo = list.options[i].getAttribute('data-value');

		}
	}
	var params = {};
	params["voucherNo"] = voucherNo;

	params["methodName"] = "voucherNoWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#voucherNoWiseData').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#voucherNoWiseData')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(14).footer())
																			.html(parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console.log(pageTotal);
																	
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(17).footer())
																			.html(parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api.column(19).data().reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(19).footer()).html(parseFloat(pageTotal).toFixed(2)
																			);
																	console.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : "",
																			"hidden" : "true",
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "txPerexpence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "finalExpenses",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Bill No Wise Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#voucherNoWiseData').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

} 



















// Purchase Report Category Wise
function categoryWisePurchaseReport()
{
	var input = document.getElementById('catId45'), list = document
			.getElementById('catId_drop45'), i, catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}

	var params = {};
	params["catId"] = catId;

	params["methodName"] = "categoryWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierCategoryWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierCategoryWise')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							19)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierCategoryWise').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report BarCode No Wise
function barcodeWisePurchaseReport() {
	var barcodeNoOurchase = $("#barcodeNoOurchase").val();
	var params = {};
	params["barcodeNoOurchase"] = barcodeNoOurchase;

	params["methodName"] = "barcodeWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#barcodeWisePurchaseReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#barcodeWisePurchaseReport')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																					
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	
																	
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					19)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							19)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Barcode No Wise Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#barcodeWisePurchaseReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

// Purchase Report Single Date
function singleDatePurchase45() {
	var purDate = $("#purDate").val();

	var params = {};
	params["purDate"] = purDate;

	params["methodName"] = "singleDatePurchase45";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#singleDatePurchase50').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document).ready(function() {
											$('#singleDatePurchase50')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};															

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(15)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(api.column(15)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page																	
																	pageTotal = api
																			.column(
																					18)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							18)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	pageTotal = api
																	.column(
																			20)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(api.column(20).footer())
																	.html(parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
																	.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns :[
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "txPerexpence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "finalExpenses",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Single Date Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#singleDatePurchase50').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Purchase Report Two Date
function twoDatePurchase45() {
	var pFisDate = $("#pFisDate").val();
	var pEndDate = $("#pEndDate").val();

	var params = {};
	params["pFisDate"] = pFisDate;
	params["pEndDate"] = pEndDate;

	params["methodName"] = "twoDatePurchase45";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#twoDatePurchase50').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#twoDatePurchase50')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					15)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							15)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	pageTotal = api
																			.column(
																					18)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							18)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					20)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							20)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);																	

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},{
																			"data" : "contactPerson",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "expence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "txPerexpence",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 * {"data":
																		 * "finalExpenses",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "grossTotal",
																			"width" : "5%",
																			"defaultContent" : ""
																		},

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Double Date Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#twoDatePurchase50').dataTable().fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

// Single Date Miscellaneos Sale Report
function purchaseReturnSingleDate() {
	var params = {};
	var pRDate = $("#pRDate").val();

	params["pRDate"] = pRDate;

	params["methodName"] = "purchaseReturnSingleDate";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#purchaseReturnSingleDateReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#purchaseReturnSingleDateReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 * 
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */

																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Purchase Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#purchaseReturnSingleDateReport').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});

}

function purchaseReturnTwoDate() {
	var params = {};
	var pRFisDate = $("#pRFisDate").val();
	var pREndDate = $("#pREndDate").val();

	params["pRFisDate"] = pRFisDate;
	params["pREndDate"] = pREndDate;

	params["methodName"] = "purchaseReturnRangeWise";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#purchaseReturnRangeReport').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#purchaseReturnRangeReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Purchase Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#purchaseReturnRangeReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function purchaseReturnBillNoWise() {
	var params = {};
	var supplierpR = $("#supplierpR").val();
	var pRBillNo = $("#pRBillNo").val();

	var input = document.getElementById('supplierpR'), list = document
			.getElementById('sup_drop2'), i, suppId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');

		}
	}

	params["suppId"] = suppId;
	params["supplierpR"] = supplierpR;
	params["pRBillNo"] = pRBillNo;
	params["methodName"] = "purchaseReturnBillNoWise";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#billNoWisePurRetReport').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#billNoWisePurRetReport')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 5 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 5
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					6)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							6)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 7 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 7
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 * 
																	 */

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					8)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							8)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					10)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							10)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					12)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							12)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	/*
																	 * // Total
																	 * over this
																	 * page
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 13 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 13
																	 * ).footer()
																	 * ).html(
																	 * 
																	 * parseFloat(pageTotal).toFixed(2)
																	 *  );
																	 * console.log(
																	 * pageTotal);
																	 */
																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "ondate",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnQuantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "rollSize",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "disPer",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "returnAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																/*
																 * {"data":
																 * "totalperItem",
																 * "width":
																 * "5%","defaultContent":
																 * "","class":"hidden"},
																 * {"data":
																 * "gst",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "taxAmount",
																 * "width":
																 * "5%","defaultContent":
																 * ""}, {"data":
																 * "totalAmt",
																 * "width":
																 * "5%","defaultContent":
																 * ""},
																 */
																],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Purchase Return Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#billNoWisePurRetReport').dataTable().fnAddData(
								mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function getAllBillsforPurchaseReturn() {
	var input = document.getElementById('supplierpR'), list = document
			.getElementById('sup_drop2'), i, supplier;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
		}
	}

	var supplier = supplier;

	$("#pRBillNo").empty();
	$("#pRBillNo").append(
			$("<option></option>").attr("value", "").text("Select bill"));

	var params = {};
	params["supplier"] = supplier;
	params["methodName"] = "getAllBillBySuppliers";

	$.post('/SMT/jsp/utility/controller.jsp', params, function(data) {
		var jsonData = $.parseJSON(data);
		$.each(jsonData, function(i, v) {
			$("#pRBillNo").append(
					$("<option></option>").attr("value", i).text(v.billNo));
		});
	})
}

function gstIgstReturnAmt() {

}

function paymentModeWiseReport()
{
	var params = {};
	var pmDate = $("#pmDate").val();
	var pmDate22 = $("#pmDate22").val();
	var paymentMode = $("#paymentMode").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["pmDate"] = pmDate;
	params["pmDate22"] = pmDate22;
	params["paymentMode"] = paymentMode;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["methodName"] = "paymentModeWiseReport";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSaleReturnAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of sale'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of sale";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTable').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

/*
function paymentModeWiseReportForCC()
{
	var params = {};
	var pmDate = $("#pmDate").val();
	var pmDate22 = $("#pmDate22").val();
	var paymentMode = $("#paymentMode").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["pmDate"] = pmDate;
	params["pmDate22"] = pmDate22;
	params["paymentMode"] = paymentMode;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["methodName"] = "paymentModeWiseReport";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSaleReturnAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of sale'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of sale";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTable').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

*/


function paymentModeRangeWiseReport() {
	var params = {};
	var startDateRP = $("#startDateRP").val();
	var endDateRP = $("#endDateRP").val();

	params["startDateRP"] = startDateRP;
	params["endDateRP"] = endDateRP;

	params["methodName"] = "paymentModeRangeWiseReport";

	$
			.post(
					'/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeRangeWiseReportTable').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$(
													'#paymentModeRangeWiseReportTable')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};
																	/*
																	 * // Total
																	 * columan 3
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 2 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 2
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 *  // Total
																	 * columan 4
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 3 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 3
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal); //
																	 * Total
																	 * columan 5
																	 * pageTotal =
																	 * api
																	 * .column(
																	 * 4 )
																	 * .data()
																	 * .reduce(
																	 * function
																	 * (a, b) {
																	 * return
																	 * intVal(a) +
																	 * intVal(b); },
																	 * 0 );
																	 * 
																	 *  //
																	 * Update
																	 * footer $(
																	 * api.column(
																	 * 4
																	 * ).footer()
																	 * ).html(
																	 * str =
																	 * pageTotal.toFixed(2) );
																	 * console.log(
																	 * pageTotal);
																	 */
																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "totalCashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalCashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																dom : 'Bfrtip',
																buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Cash And Card Amount'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Cash And Card Amount";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeRangeWiseReportTable').dataTable()
								.fnAddData(mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
	
}


//Purchase Report Category Wise
function productWisePurchaseReport()
{
	var input = document.getElementById('prodIdDrop'), 
	list = document.getElementById('productId_drop'), i, productId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			productId = list.options[i].getAttribute('data-value');
		}
	}
	
	var params = {};
	params["productId"] = productId;
	params["methodName"] = "productWisePurchaseReport";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#supplierProductWise').dataTable().fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;

						$(document)
								.ready(
										function() {
											$('#supplierProductWise')
													.DataTable(
															{

																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},

																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;

																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(14)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							14)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);

																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																			.column(
																					17)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							17)
																					.footer())
																			.html(

																					parseFloat(
																							pageTotal)
																							.toFixed(
																									2)

																			);
																	console
																			.log(pageTotal);
																	
																	// Total
																	// over this
																	// page
																	pageTotal = api
																	.column(
																			19)
																	.data()
																	.reduce(
																			function(
																					a,
																					b) {
																				return intVal(a)
																						+ intVal(b);
																			},
																			0);

															// Update
															// footer
															$(
																	api
																			.column(
																					19)
																			.footer())
																	.html(

																			parseFloat(
																					pageTotal)
																					.toFixed(
																							2)

																	);
															console
																	.log(pageTotal);

																},

																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "srno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "date",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "voucherNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "supplierName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "catName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "subCatName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},																		
																		{
																			"data" : "itemName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "hsnsacno",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "quantity",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "rollSize",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "QuantityMeter",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "buyPrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "Discount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "discountAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "vat",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "igst",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "taxAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "salePrice",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "total",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		/*
																		 * {"data":
																		 * "extraDiscount",
																		 * "width":
																		 * "5%","defaultContent":
																		 * ""},
																		 */
																		{
																			"data" : "barcodeNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],

																dom : 'Bfrtip',
																buttons : [

																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Category Wise Supplier Purchase Report";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});

						var mydata = catmap;
						$('#supplierProductWise').dataTable()
								.fnAddData(mydata);

					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}


function paymentModeWiseReportForCC()
{
	var params = {};
	var startDateForCC = $("#startDateForCC").val();
	var endDateForCC = $("#endDateForCC").val();
	var paymentModeForCC = $("#paymentModeForCC").val();
	var userTypeRole = $("#userType").val();
	var userName = $("#userName").val();

	params["startDateForCC"] = startDateForCC;
	params["endDateForCC"] = endDateForCC;
	params["paymentModeForCC"] = paymentModeForCC;
	params["userTypeRole"] = userTypeRole;
	params["userName"] = userName;

	params["methodName"] = "paymentModeWiseReportForCreditCust";

	$.post('/SMT/jsp/utility/controller.jsp',
					params,
					function(data) {
						$('#paymentModeWiseReportTableForCC').dataTable()
								.fnClearTable();
						var jsonData = $.parseJSON(data);
						var catmap = jsonData.list;
						$(document)
								.ready(
										function() {
											$('#paymentModeWiseReportTableForCC')
													.DataTable(
															{
																fnRowCallback : function(
																		nRow,
																		aData,
																		iDisplayIndex) {
																	$(
																			"th:first",
																			nRow)
																			.html(
																					iDisplayIndex + 1);
																	return nRow;
																},
																"footerCallback" : function(
																		row,
																		data,
																		start,
																		end,
																		display) {
																	var api = this
																			.api(), data;
																	// Remove
																	// the
																	// formatting
																	// to get
																	// integer
																	// data for
																	// summation
																	var intVal = function(
																			i) {
																		return typeof i === 'string' ? i
																				.replace(
																						/[\$,]/g,
																						'') * 1
																				: typeof i === 'number' ? i
																						: 0;
																	};

																	// Total
																	// columan 3
																	pageTotal = api
																			.column(
																					2)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							2)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);

																	// Total
																	// columan 4
																	pageTotal = api
																			.column(
																					3)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							3)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	// Total
																	// columan 5
																	pageTotal = api
																			.column(
																					4)
																			.data()
																			.reduce(
																					function(
																							a,
																							b) {
																						return intVal(a)
																								+ intVal(b);
																					},
																					0);

																	// Update
																	// footer
																	$(
																			api
																					.column(
																							4)
																					.footer())
																			.html(
																					str = pageTotal
																							.toFixed(2));
																	console
																			.log(pageTotal);
																	
																	
																	
																	
															pageTotal = api.column(5).data().reduce(function(a,b)
															{
																return intVal(a) + intVal(b);
															},
															0);

															// Update
															// footer
															$(api.column(5).footer()).html(str = pageTotal.toFixed(2));
															console.log(pageTotal);

																},
																destroy : true,
																searching : true,
																columns : [
																		{
																			"data" : "billNo",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "CustomerName",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cashAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "cashAndCard_cardAmount",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "totalSaleReturnAmt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "grossamt",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "paymentMode",
																			"width" : "5%",
																			"defaultContent" : ""
																		},
																		{
																			"data" : "saleDate",
																			"width" : "5%",
																			"defaultContent" : ""
																		}, ],
																
																		dom : 'Bfrtip',
																		buttons : [
																		{
																			extend : 'copyHtml5',
																			footer : true
																		},
																		{
																			extend : 'excelHtml5',
																			footer : true,
																			title : 'Gst Return Report of sale'
																		},
																		{
																			extend : 'csvHtml5',
																			footer : true
																		},
																		{
																			extend : 'pdfHtml5',
																			footer : true,
																			title : function() {
																				return "Gst Return Report of sale";
																			},
																			orientation : 'landscape',
																			pageSize : 'LEGAL',
																			titleAttr : 'PDF'
																		} ]
															});
										});
						var mydata = catmap;
						$('#paymentModeWiseReportTableForCC').dataTable().fnAddData(
								mydata);
					}).error(function(jqXHR, textStatus, errorThrown) {
				if (textStatus === "timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

