var	sum = 0 ;
var sum2 = 0;
var sum3=0;
var tstr ;
var tstr1 ;
var tstr2 ;
function getTotal()
{
	var grid = $("#jqGrid");
	sum = grid.jqGrid('getCol','netAmount',false,'sum');
	document.getElementById("resolution").value = sum;

	sum2 = grid.jqGrid('getCol','totalAmount',false,'sum')
	document.getElementById("resolution2").value = sum2; 

	sum3 = grid.jqGrid('getCol','quantity',false,'sum')
	document.getElementById("saleitem").value = sum3; 
}

function saleHelper()
{
	var offerList="";
	this.getSaleDetailsBetweenTwoDates = getSaleDetailsBetweenTwoDates;
	this.getDayClosingBetweenTwoDates = getDayClosingBetweenTwoDates;
	this.fillItemList = fillItemList;

	function fillItemList()
	{
		var startDate = $("#fDate").val();
		var endDate = $("#tDate").val();
		var OrderId = $("#OrderId").val();
		var discount = $("#discount").val();
		var soldDate = $("#soldDate").val();
		var quantity=$("#quantity").val();
		var SalePrice=$("#SalePrice").val();
		var totalAmount=$("#totalAmount").val();
		var tax=$("#tax").val();
	}

	function getDayClosingBetweenTwoDates(){

		var params= {};
		var startDate = $("#fisDate").val();
		var endDate = $("#endDate").val();
		params["fisDate"]= startDate;
		params["endDate"]= endDate;
		params["methodName"] = "getDayCloseBetweenTwoDates";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				$('#example').DataTable( {
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
						.column( 1 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 1 ).footer() ).html(
								//  'Rs'+' '+pageTotal.toFixed(2),
								tstr = pageTotal.toFixed(2)
						);
						console.log( pageTotal);

						// Total over this page       
						pageTotal1 = api
						.column( 2 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 2 ).footer() ).html(
								//'Rs'+' '+pageTotal1.toFixed(2)
								tstr1 =pageTotal1.toFixed(2)

						);
						console.log( pageTotal1);

						pageTotal2 = api
						.column( 3 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 3 ).footer() ).html(
								//  'Rs'+' '+pageTotal2.toFixed(2)
								tstr2 = pageTotal2.toFixed(2)
						);
						console.log( pageTotal2);
					},
					destroy: true,
					searching: false,
					columns: [
					          {"data": "customerBill", "width": "5%"},
					          {"data": "cash" , "width": "5%"},
					          {"data": "card" , "width": "5%"},
					          {"data": "newTotalAmt", "width": "5%"},
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

	function getSaleDetailsBetweenTwoDates()
	{
		var params= {};
		var startDate = $("#fisDate").val();
		var endDate = $("#endDate").val();
		params["fisDate"]= startDate;
		params["endDate"]= endDate;
		params["methodName"] = "getSaleReportBetweenTwoDates";
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				$('#example').DataTable( {
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

								'Rs'+' '+parseFloat(pageTotal).toFixed(2)

						);
						console.log( pageTotal);


						pageTotal = api
						.column( 4 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 4 ).footer() ).html(

								'Rs'+' '+parseFloat(pageTotal).toFixed(2)

						);
						console.log( pageTotal);

						pageTotal = api
						.column( 5 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 5 ).footer() ).html(

								'Rs'+' '+parseFloat(pageTotal).toFixed(2)

						);
						console.log( pageTotal);
					},
					destroy: true,
					searching: false,
					columns: [
					          {"data": "soldDate", "width": "5%"},
					          {"data": "quantity" , "width": "5%"},
					          {"data": "customerBill", "width": "5%"},
					          {"data": "cashAmt", "width": "5%"},
					          {"data": "cardAmt", "width": "5%"},
					          {"data": "totalAmount" , "width": "5%"},
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
}

var sale = new saleHelper();
function test1() {
	var a =  tstr.replace(/\B(?=(\d{3})+\b)/g, ",")
	$("#c").text("Rs"+a);
	var b =  tstr1.replace(/\B(?=(\d{3})+\b)/g, ",")

	$("#d").text("Rs"+b);
	var c =  tstr2.replace(/\B(?=(\d{3})+\b)/g, ",")

	$("#e").text("Rs"+c);
}

/* Code For Getting Yearly report */

function saleHelperForYear()
{
	var offerList="";
	this.getSaleDetailsBetweenTwoYear = getSaleDetailsBetweenTwoYear;
	this.fillItemList = fillItemList;

	function getSaleDetailsBetweenTwoYear()
	{
		var params= {};
		var startDate = $("#fisDate").val();
		var endDate = $("#endDate").val();

		params["fisDate"]= startDate;
		params["endDate"]= endDate;
		params["methodName"] = "getSaleDetailsBYYear";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				$('#example').DataTable( {
					destroy: true,
					searching: false,
					columns: [
					          {"data": "customerBill", "width": "5%"},
					          {"data": "soldDate" , "width": "5%"},
					          {"data": "SalePrice" , "width": "5%"},
					          {"data": "quantity", "width": "5%"},
					          {"data": "totalAmount" , "width": "5%"},
					          {"data": "netAmount" , "width": "5%"}
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
}

var saleforyear = new saleHelperForYear();
var str ;
var str1 ;
function saleHelperForSingleDate()
{
	var offerList="";
	this.saleHelperForsingleDate = saleHelperForsingleDate;
	this.fillItemList = fillItemList;
	var grid = jQuery("#jqGrid");
	grid.trigger("reloadGrid");
	function fillItemList()
	{
		var fDate = $("#fDate").val();

		var customerBill = $("#customerBill").val();
		var discount = $("#discount").val();
		var soldDate = $("#soldDate").val();
		var quantity=$("#quantity").val();
		var SalePrice=$("#SalePrice").val();
		var totalAmount=$("#totalAmount").val();
		var tax=$("#tax").val();
	}

	function saleHelperForsingleDate()
	{
		var params= {};
		var fDate = $("#fDate").val();
		params["fDate"]= fDate;
		params["methodName"] = "getSaleDetailsBYSingalDate";

		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			$('#example').dataTable().fnClearTable();
			var jsonData = $.parseJSON(data);
			var catmap = jsonData.list;
			$(document).ready(function() {
				var total =   $('#example').DataTable( {

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
						pageTotal1 = api
						.column( 5 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );

						// Update footer
						$( api.column( 5 ).footer() ).html(
								// 'Rs'+' '+pageTotal1.toFixed(2),

								str1 = pageTotal1.toFixed(0)
						);
						console.log( pageTotal1);
					},
					destroy: true,
					searching: false,
					columns: [
					          {"data": "customerBill", "width": "5%"},
					          {"data": "soldDate" , "width": "5%"},
					          {"data": "SalePrice" , "width": "5%"},
					          {"data": "quantity", "width": "5%"},
					          {"data": "totalAmount" , "width": "5%"},
					          {"data": "netAmount" , "width": "5%"}
					          ],
				} );
			} );
			var mydata = catmap;
			$('#example').dataTable().fnAddData(mydata);
				}
		);
	}
}
function test() {
	var a =  str.replace(/\B(?=(\d{3})+\b)/g, ",")
	$("#a").text("Rs"+ " "+a);
	var b =  str1.replace(/\B(?=(\d{3})+\b)/g, ",")

	$("#b").text("Rs"+ " "+b);
}

var saleforDate = new saleHelperForSingleDate();


function exportData(e, id){

	var gridid 		= jQuery(id).getDataIDs(); // Get all the ids in array

	var label 		= jQuery(id).getRowData(gridid[0]); // Get First row to get the labels

	var selRowIds 	= jQuery("#jqGrid").jqGrid('getGridParam','selarrrow');

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