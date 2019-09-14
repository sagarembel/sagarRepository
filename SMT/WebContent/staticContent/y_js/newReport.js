var	sum = 0 ;
var sum2 = 0;
var sum3=0;
function getTotal()
{
	var grid = $("#list4");
	sum = grid.jqGrid('getCol','newTotalAmt',false,'sum');
	document.getElementById("resolution").value = sum;

	sum2 = grid.jqGrid('getCol','totalAmount',false,'sum')
	document.getElementById("resolution2").value = sum2; 

	sum3 = grid.jqGrid('getCol','quantity',false,'sum')
	document.getElementById("saleitem").value = sum3; 
}

function OfferHelper()
{
	var offerList="";
	this.getitemData = getitemData;

	this.getSaleReturnByDate=getSaleReturnByDate;
	this.getDayWiseSalesmanCommision=getDayWiseSalesmanCommision;
	this.getDayWiseSalesmanCommisionForEmps = getDayWiseSalesmanCommisionForEmps ;
	this.getShopWiseVatById=getShopWiseVatById;
	this.getSupplierWiseStockByTwoDate=getSupplierWiseStockByTwoDate;
	this.getCategoryWiseStock=getCategoryWiseStock;
	function getitemData(){ 
		var key = $('#key').val();
		var params = {};
		params["methodName"] = "getBarcodeDetailsById";
		params["key"] = key;

		var count=0;
		$("#list4").jqGrid("clearGridData");
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{	
			var jsonData = $.parseJSON(data);

			$("#list4").jqGrid({
				datatype: "local",

				colNames:['Barcode NO', 'category Name','supplierName','Item Name', 'BuyPrice', 'Sale Price','Discount','Avilable Stock'],
				colModel:[ 
				          {
				        	  name:'barcodeNo',
				          },
				          {
				        	  name:'categoryName',
				        	  width:220,
				          },
				          {
				        	  name: 'supplierName',
				        	  width:220,
				          },

				          {name:'itemName',
				          },
				          {
				        	  name:'buyPrice',
				          },

				          {	name:'salePrice',
				        	  editable: true
				          },
				          {
				        	  name:'discount',
				        	  editable: true
				          },

				          {
				        	  name:'avilableQuan',
				        	  editable:true
				          }

				          ],
				          footerrow: true,
				          userDataOnFooter: true,		
				          idPrefix : "a",
				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          width: 1100,
				          height: 300,
				          rowNum: 10,
				          pager: "#jqGridPager",
				          'cellEdit':true,


			});

			if(count==0 || count==null)
			{
				$("#list4").addRowData(0,jsonData.offer);
			}

			var value= $('#key').val('');

			$('#list4').navGrid('#jqGridPager',

					{ edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },

					{
						editCaption: "The Edit Dialog",
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfterEdit: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					},

					{
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					},

					{
						closeAfterdel:true,
						recreateForm: true,

						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					});

				})
				.error(function(jqXHR, textStatus, errorThrown){
					if(textStatus==="timeout") {
						$(loaderObj).hide();
						$(loaderObj).find('#errorDiv').show();
					}
				})
	}
}    

function getCategoryWiseStock()
{
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,catId;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');

		}
	}
	var catId =catId;
	var params = {};
	params["methodName"] = "getCategoryWiseStock";
	params["catId"] = catId;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {
				dom: 'Bfrtip',
				buttons: [
				          'copy', 'csv', 'excel', 'pdf', 'print'
				          ],
				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },
				          "footerCallback": function ( row, data, start, end, display ) {
				        	  var api = this.api(), data;

				        	  // Remove the formatting to get integer data for summation
				        	  var intVal = function ( i ) {
				        		  return typeof i === 'string' ?
				        				  i.replace(/[\$,]/g, '')*1 :
				        					  typeof i === 'number' ?
				        							  i : 0;
				        	  };
				          },
				          destroy: true,
				          searching: true,				      
				          columns: [  
				                    {"data": "catName", "width": "5%"},
				                    {"data": "itemName", "width": "5%"},
				                    {"data": "quantity", "width": "5%"},
				                    {"data": "date", "width": "5%"},
				                    ]
			} );
		} );

		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function getSaleReturnByDate()
{
	var fDate = $('#fDate').val();
	var params = {};
	params["methodName"] = "getSaleReturnByDate";
	params["fDate"] = fDate;

	$("#list4").jqGrid("clearGridData");
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {

			var table =    $('#example').DataTable( {
				dom: 'Bfrtip',
				buttons: [
				          'copy', 'csv', 'excel', 'pdf', 'print'
				          ],
				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },
				          "footerCallback": function ( row, data, start, end, display ) {
				        	  var api = this.api(), data;

				        	  // Remove the formatting to get integer data for summation
				        	  var intVal = function ( i ) {
				        		  return typeof i === 'string' ?
				        				  i.replace(/[\$,]/g, '')*1 :
				        					  typeof i === 'number' ?
				        							  i : 0;
				        	  };
				        	  pageTotal = api
				        	  .column( 4 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );

				        	  // Update footer
				        	  $( api.column( 4 ).footer() ).html(
				        			  'Rs'+' '+ parseFloat(pageTotal).toFixed(2));

				        	  console.log( pageTotal);
				          },

				          destroy: true,
				          searching: true,			        
				          columns: [
				                    {"data": "customerBill", "width": "5%", "defaultContent": ""},
				                    {"data": "insertDate" , "width": "5%", "defaultContent": ""},
				                    {"data": "itemName" , "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
				                    {"data": "newTotalAmount" , "width": "5%", "defaultContent": ""}
				                    ]
			} );

			window.setTimeout(function(){ document.location.reload(true); }, 40000);

		} );

		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}



function getDayWiseSalesmanCommision(){

	var fDate = $('#fDate').val();
	var empId = $('#empId').val();
	var params = {};
	params["methodName"] = "getDayWiseSalesmanCommision";
	params["fDate"] = fDate;
	params["empId"] = empId;
	$("#list4").jqGrid("clearGridData");

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(catmap,function(i,v)
				{
			var OrderId = v.orderId;
			var customerBill = v.customerBill;
			var soldDate = v.soldDate;
			var quantity=v.quantity;
			var SalePrice=v.SalePrice;
			var totalAmount=v.totalAmount;
			var tax=v.tax;

			$("#list4").jqGrid({
				datatype: "local",
				height: 250,
				width: '100%',
				search:true,
				multiselect: true,
				multiboxonly: true,  

				colNames:['EmpId','Employee Name','Sold Date','Commision'],
				colModel:[ 
				          {
				        	  name:'empId',
				          },
				          {
				        	  name:'empName',
				          },
				          {
				        	  name: 'insertDate',  
				          },
				          {name:'commision',

				          },
				          ],
				          viewrecords: true,
				          width: 1000,
				          height: 200,
				          rowNum: 10,
				          loadonce:true,
				          stringResult:true,
				          pager: "#jqGridPager",
				          'cellEdit':true,
				          footerrow:true,
				          loadComplete : function(){
				        	  var $grid = $("#jqGrid");
				        	  var colSum = $grid.jqGrid('getCol','netAmount',false,'sum');
				        	  $grid.jqGrid('footerData','set',{netAmount : colSum});

				        	  var colSum = $grid.jqGrid('getCol','totalAmount',false,'sum');
				        	  $grid.jqGrid('footerData','set',{totalAmount : colSum});
				          }  
			});

			$("#list4").jqGrid("navGrid", "#jqGridPager", {add: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {edit: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {del: false});
			var mydata = catmap;
			for(var i=0;i<mydata.length;i++){
				$("#list4").addRowData(i,mydata[i]);
			}

				});
		$('#list4').jqGrid('navGrid', '#jqGridPager', 
				{}, // default settings for edit
				{}, // default settings for add
				{}, // delete
				{
					closeOnEscape: true, closeAfterSearch: true, ignoreCase: true, multipleSearch: false, multipleGroup: false, showQuery: false,
					sopt: ['cn', 'eq', 'ne'],
					defaultSearch: 'cn'
				}).navButtonAdd('#jqGridPager', {
					caption: "Export to Excel",
					id:'ExportToExcel',
					buttonicon: "ui-icon-disk",
					onClickButton : function(e)
					{
						exportData(e, '#list4');
					},

					buttonicon: 'ui-icon-print',
					position: "last"
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function getDayWiseSalesmanCommisionForEmps(){

	var fDate = $('#fDate').val();
	var eDate = $('#eDate').val();
	var empId = $('#empId').val();
	var params = {};
	params["methodName"] = "getDayWiseSalesmanCommisionForEmp";
	params["fDate"] = fDate;
	params["eDate"] = eDate;
	params["empId"] = empId;
	$("#list4").jqGrid("clearGridData");
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(catmap,function(i,v)
				{
			$("#list4").jqGrid({
				datatype: "local",
				height: 250,
				width: '100%',
				search:true,
				multiselect: true,
				multiboxonly: true,  

				colNames:['EmpId','Employee Name','Sold Date','Salary','Commision%','TotalAmt' , 'CommisionAMt' , 'CommisionAMtBYPRoduct' ,"TotalPaid"],
				colModel:[ 
				          {
				        	  name:'empId',
				          },
				          {
				        	  name:'empName',
				          },
				          {
				        	  name: 'insertDate',  
				          },

				          {
				        	  name:'salary'  
				          },

				          {name:'commisionforemp',

				          },
				          {
				        	  name:'totalAmt'	,
				          },
				          {
				        	  name :'commisionAmount'
				          },
				          {
				        	  name:'commision' 
				          },
				          {
				        	  name :'total',
				        	  formatter:sumFmatter,
				          }
				          ],
				          viewrecords: true,
				          width: 1000,
				          height: 200,
				          rowNum: 10,
				          loadonce:true,
				          stringResult:true,
				          pager: "#jqGridPager",
				          'cellEdit':true,
				          footerrow:true,
				          loadComplete : function(){
				        	  var $grid = $("#jqGrid");
				        	  var colSum = $grid.jqGrid('getCol','netAmount',false,'sum');
				        	  $grid.jqGrid('footerData','set',{netAmount : colSum});

				        	  var colSum = $grid.jqGrid('getCol','totalAmount',false,'sum');
				        	  $grid.jqGrid('footerData','set',{totalAmount : colSum});
				          }  
			});

			$("#list4").jqGrid("navGrid", "#jqGridPager", {add: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {edit: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {del: false});
			var mydata = catmap;
			for(var i=0;i<mydata.length;i++){
				$("#list4").addRowData(i,mydata[i]);

			}

				});
		$('#list4').jqGrid('navGrid', '#jqGridPager', 
				{}, // default settings for edit
				{}, // default settings for add
				{}, // delete
				{
					closeOnEscape: true, closeAfterSearch: true, ignoreCase: true, multipleSearch: false, multipleGroup: false, showQuery: false,
					sopt: ['cn', 'eq', 'ne'],
					defaultSearch: 'cn'
				}).navButtonAdd('#jqGridPager', {
					caption: "Export to Excel",
					id:'ExportToExcel',
					buttonicon: "ui-icon-disk",
					onClickButton : function(e)
					{
						exportData(e, '#list4');
					},

					buttonicon: 'ui-icon-print',
					position: "last"
				});
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function sumFmatter (cellvalue, options, rowObject)
{
	var tot= (options.rowData.commisionAmount + options.rowData.salary + options.rowData.commision);
	return tot ;
}
var offer = new OfferHelper();

function exportData(e, id){

	var gridid 		= jQuery(id).getDataIDs(); // Get all the ids in array
	var label 		= jQuery(id).getRowData(gridid[0]); // Get First row to get the labels

	var selRowIds 	= jQuery("#list4").jqGrid('getGridParam','selarrrow');

	var obj 		= new Object();
	obj.count		= selRowIds.length;

	if(obj.count) {

		obj.items		= new Array();

		for(elem in selRowIds) {
			obj.items.push(jQuery(id).getRowData( selRowIds[elem] ));
		}

		var json = JSON.stringify(obj);

		JSONToCSVConvertor(json, "csv", 1);
	}
}




function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {     

	//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	var CSV = '';    
	//This condition will generate the Label/Header
	if (ShowLabel) {
		var row = "";

		//This loop will extract the label from 1st index of on array
		for (var index in arrData.items[0]) {
			//Now convert each value to string and comma-seprated
			row += index + ',';
		}
		row = row.slice(0, -1);
		//append Label row with line break
		CSV += row + '\r\n';
	}

	//1st loop is to extract each row
	for (var i = 0; i < arrData.items.length; i++) {
		var row = "";
		//2nd loop will extract each column and convert it in string comma-seprated
		for (var index in arrData.items[i]) {
			row += '"' + arrData.items[i][index].replace(/(<([^>]+)>)/ig, '') + '",';
		}
		row.slice(0, row.length - 1);
		//add a line break after each row
		CSV += row + '\r\n';
	}

	if (CSV == '') {        
		alert("Invalid data");
		return;
	}   

	/*
	 * 
	 * FORCE DOWNLOAD
	 * 
	 */


	//this trick will generate a temp "a" tag
	var link = document.createElement("a");    
	link.id="lnkDwnldLnk";

	//this part will append the anchor tag and remove it after automatic click
	document.body.appendChild(link);

	var csv = CSV;  
	blob = new Blob([csv], { type: 'text/csv' }); 

	var myURL = window.URL || window.webkitURL;

	var csvUrl = myURL.createObjectURL(blob);
	var filename = 'UserExport.csv';
	jQuery("#lnkDwnldLnk")
	.attr({
		'download': filename,
		'href': csvUrl
	}); 

	jQuery('#lnkDwnldLnk')[0].click();    
	document.body.removeChild(link);

}

function valSupplierWiseStockBetweenTwoDate()
{
	var supplierName = $('#key').val();
	var fDate = $('#fDate').val();
	var eDate = $('#eDate').val();

	var input = document.getElementById('key'), 
	list = document.getElementById('fkSupplierId_drop'), i, suppId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');
		}
	}

	if(supplierName != null && supplierName != "" && supplierName != " "){
		if(suppId != null){
			if(fDate != null && fDate != "" && fDate != " "){
				if(eDate != null && eDate != "" && eDate != " "){
					getSupplierWiseStockBetweenTwoDate();
				}
				else{
					alert("Please select End Date !");
				}
			}
			else{
				alert("Please select Start Date !");
			}
		}
		else{
			alert("Invalid Supplier Name ! Please select Supplier Name from avaliable list");
		}
	}
	else{
		alert("Please select supplier name first !");
	}

}

function getSupplierWiseStockBetweenTwoDate(){

	var supplierName = $('#key').val();
	var fDate = $('#fDate').val();
	var eDate = $('#eDate').val();

	var input = document.getElementById('key'), 
	list = document.getElementById('fkSupplierId_drop'), i, suppId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');
		}
	}

	var params = {};

	params["supplierName"] = supplierName;
	params["suppId"] = suppId;
	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "getSupWiseStockBetTwoDays";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {
				dom: 'Bfrtip',
				buttons: [
					{ extend: 'copyHtml5', footer: true },
					 { extend: 'excelHtml5', footer: true },
					 { extend: 'csvHtml5', footer: true },
					 { extend : 'pdfHtml5', footer: true,
			                title : function() {
			                    return "Supplier wise Stock";
			                },
			                orientation : 'landscape',
			                pageSize : 'LEGAL',
			                titleAttr : 'PDF' 
			                	}
				          ],

				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },

				          "footerCallback": function ( row, data, start, end, display ) {
				        	  var api = this.api(), data;

				        	  // Remove the formatting to get integer data for summation
				        	  var intVal = function ( i ) {
				        		  return typeof i === 'string' ?
				        				  i.replace(/[\$,]/g, '')*1 :
				        					  typeof i === 'number' ?
				        							  i : 0;
				        	  };

				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 3 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 3 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);


				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 4 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 4 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 5 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 5 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 6 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 6 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 7 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 7 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	  pageTotal = api
				        	  .column( 8 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 8 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	  pageTotal = api
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				          },
				          destroy: true,
				          searching: true,			      
				          columns: [  
				                   /* {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				                    {"data": "itemName", "width": "5%", "defaultContent": ""},
				                    {"data": "catName", "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
				                    {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				                    {"data": "vat", "width": "5%", "defaultContent": ""}*/
				        	  
				        	  
				        	  	{"data": "barcodeNo", "width": "5%", "defaultContent": ""},
			                    {"data": "catName", "width": "5%", "defaultContent": ""},
			                    {"data": "itemName", "width": "5%", "defaultContent": ""},
			                    {"data": "oringnalQuantity", "width": "5%", "defaultContent": ""},
			                    {"data": "soldQuantity", "width": "5%", "defaultContent": ""},				                    
			                    {"data": "quantity", "width": "5%", "defaultContent": ""},
			                    {"data": "buyPrice", "width": "5%", "defaultContent": ""},
			                    {"data": "totalBuyPrice", "width": "5%", "defaultContent": ""},
			                    {"data": "salePrice", "width": "5%", "defaultContent": ""},
			                    {"data": "totalSalePrice", "width": "5%", "defaultContent": ""},
			                    {"data": "vat", "width": "5%", "defaultContent": ""}
				        	  
				        	  
				                    ]
			} );
		} );

		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}

function valSupplierWiseStockBetweenTwoDateForEmp()
{
	var supplierName = $('#key').val();
	var fDate = $('#fDate').val();
	var eDate = $('#eDate').val();

	var input = document.getElementById('key'), 
	list = document.getElementById('fkSupplierId_drop'), i, suppId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');
		}
	}

	if(supplierName != null && supplierName != "" && supplierName != " "){
		if(suppId != null){
			if(fDate != null && fDate != "" && fDate != " "){
				if(eDate != null && eDate != "" && eDate != " "){
					getSupplierWiseStockBetweenTwoDateForEmp();
				}
				else{
					alert("Please select End Date !");
				}
			}
			else{
				alert("Please select Start Date !");
			}
		}
		else{
			alert("Invalid Supplier Name ! Please select Supplier Name from avaliable list");
		}
	}
	else{
		alert("Please select supplier name first !");
	}
}

function getSupplierWiseStockBetweenTwoDateForEmp(){

	var supplierName = $('#key').val();
	var fDate = $('#fDate').val();
	var eDate = $('#eDate').val();

	var input = document.getElementById('key'), 
	list = document.getElementById('fkSupplierId_drop'), i, suppId;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			suppId = list.options[i].getAttribute('data-value');
		}
	}

	var params = {};

	params["supplierName"] = supplierName;
	params["suppId"] = suppId;
	params["fDate"] = fDate;
	params["eDate"] = eDate;

	params["methodName"] = "getSupWiseStockBetTwoDays";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {
				dom: 'Bfrtip',
				buttons: [
					{ extend: 'copyHtml5', footer: true },
					 { extend: 'excelHtml5', footer: true },
					 { extend: 'csvHtml5', footer: true },
					 { extend : 'pdfHtml5', footer: true,
			                title : function() {
			                    return "Supplier wise Stock";
			                },
			                orientation : 'landscape',
			                pageSize : 'LEGAL',
			                titleAttr : 'PDF' 
			                	}
				          ],

				          fnRowCallback : function(nRow, aData, iDisplayIndex){
				        	  $("th:first", nRow).html(iDisplayIndex +1);
				        	  return nRow;
				          },

				          "footerCallback": function ( row, data, start, end, display ) {
				        	  var api = this.api(), data;

				        	  // Remove the formatting to get integer data for summation
				        	  var intVal = function ( i ) {
				        		  return typeof i === 'string' ?
				        				  i.replace(/[\$,]/g, '')*1 :
				        					  typeof i === 'number' ?
				        							  i : 0;
				        	  };

				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 3 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 3 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);


				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 4 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 4 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 5 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 5 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 6 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 6 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 7 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 7 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
/*				        	  pageTotal = api
				        	  .column( 8 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 8 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
				        	  
				        	  pageTotal = api
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );


				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  //  'Rs'+' '+pageTotal.toFixed(2)
				        			  str = pageTotal.toFixed(0)
				        	  );
				        	  console.log( pageTotal);
*/
				          },
				          destroy: true,
				          searching: true,			      
				          columns: [  
				                   /* {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				                    {"data": "itemName", "width": "5%", "defaultContent": ""},
				                    {"data": "catName", "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
				                    {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				                    {"data": "vat", "width": "5%", "defaultContent": ""}*/
				        	  
				        	  
				        	  	{"data": "barcodeNo", "width": "5%", "defaultContent": ""},
			                    {"data": "catName", "width": "5%", "defaultContent": ""},
			                    {"data": "itemName", "width": "5%", "defaultContent": ""},
			                    {"data": "oringnalQuantity", "width": "5%", "defaultContent": ""},
			                    {"data": "soldQuantity", "width": "5%", "defaultContent": ""},				                    
			                    {"data": "quantity", "width": "5%", "defaultContent": ""},
			                    {"data": "salePrice", "width": "5%", "defaultContent": ""},
			                    {"data": "totalSalePrice", "width": "5%", "defaultContent": ""},
			                    {"data": "vat", "width": "5%", "defaultContent": ""}
				        	  
				        	  
				                    ]
			} );
		} );

		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();

				}
			});
}
