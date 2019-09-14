function getCashBankBook()
{
	var fDate = $('#fDate').val();
	var tDate = $('#tDate').val();
	var params = {};
	params["methodName"] = "getCashBookReportBetTwoDates";
	params["fDate"] = fDate;
	params["tDate"] = tDate;

	$("#list4").jqGrid("clearGridData");

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {
				destroy: true,
				searching: false,
				columns: [
				          {"data": "supplierName", "width": "5%"},
				          {"data": "total" , "width": "5%"},
				          {"data": "billNo" , "width": "5%"},
				          {"data": "personName", "width": "5%"},
				          {"data": "credit" , "width": "5%"},
				          {"data": "debit" , "width": "5%"},
				          {"data": "balance" , "width": "5%"},
				          {"data": "date" , "width": "5%"}
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

function getCashBankBookOnDate()
{
	var fDate = $('#fDate').val();
	var params = {};
	params["methodName"] = "getCashBookReportOnDate";
	params["fDate"] = fDate;

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

			function formatURL(cellValue, options, rowdata, action) {
				return  options.rowId ;
			}

			function ExportDataToExcel(tableCtrl) {
				//  Export the data from our jqGrid into a "real" Excel 2007 file
				ExportJQGridDataToExcel("#list4", "CustomerOrders.xlsx");
			}

			$("#list4").jqGrid({
				datatype: "local",
				height: 250,
				width: '100%',

				search:true,
				multiselect: true,
				multiboxonly: true,  

				colNames:["SupplierName","Total Amount","BillNo","PersonName","credit", "debit","balance","date"],
				colModel:[ 
				          {
				        	  name:"supplierName",
				          },

				          { 	
				        	  name: "total",
				          },
				          { 	
				        	  name: "billNo",
				          },
				          {
				        	  name: "personName",
				          },	

				          {
				        	  name:  "credit",
				          },

				          {
				        	  name: "debit",
				          },

				          {
				        	  name: "balance",
				          },

				          {
				        	  name:'date',
				          }
				          ],
				          viewrecords: true,
				          width: 1000,
				          height: 200,
				          rowNum: 10,
				          loadonce:true,
				          stringResult:true,
				          pager: "#jqGridPager"
			});

			$("#list4").jqGrid("navGrid", "#jqGridPager", {add: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {edit: false});
			$("#list4").jqGrid("navGrid", "#jqGridPager", {del: false});

				});
		var mydata = catmap;
		for(var j=0;j<mydata.length;j++){
			$("#list4").addRowData(j,mydata[j]);

		}

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