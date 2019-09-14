function singleDatePurchase()
{
	var params= {};
	var fDate = $("#fDate").val();
	params["fDate"]= fDate;
	params["methodName"] = "singleDatePurchase";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
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
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
/*					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					/*pageTotal = api
					.column( 16 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 16 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 17 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 17 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 18 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 18 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 19 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 19 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 20 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 20 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					pageTotal = api
					.column( 21 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 21 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					*/

				},

				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				scrollY: '50vh',

				columns: [  
				          {"data": "serialnumber", "width": "5%" ,"defaultContent": ""},
				          {"data": "fetchDate", "width": "5%" , "defaultContent": ""},
				          {"data": "supplierName", "width": "5%" , "defaultContent": ""},
				          {"data": "billNo", "width": "5%" , "defaultContent": ""},
				          /*{data: "GstTinNo", "width": "5%", "defaultContent": ""},*/
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          /*{"data": "fivePercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "twelwePercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "eighteenPercentageGST" , "width": "5%", "defaultContent": ""},
				          {"data": "twentyEightPercentageGST", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTFivePercentage", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTTwelwePercentage" , "width": "5%", "defaultContent": ""},
				          {"data": "iGSTEighteenPercentage", "width": "5%", "defaultContent": ""},
				          {"data": "iGSTTwentyeightPercentage", "width": "5%", "defaultContent": ""},*/
				          /*{"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Purchase Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example').dataTable().fnAddData(mydata);
			});
}

function purchaseReportBetweenTwoDates()
{
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "purchaseReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example1').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example1').DataTable( {
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
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
					// Total over this page
					/*pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 16 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 16 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 17 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 17 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 18 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 18 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 19 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 19 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 20 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 20 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				scrollY: '50vh',
				
				columns: [  
				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				         /* {"data": "discountAmount" , "width": "5%", "defaultContent": ""},*/
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function()
			                    	 {
			                    		 return "Double Date Purchase Report";
			                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example1').dataTable().fnAddData(mydata);
			});
}

//CA Purchase Report Two Date
function caReportBetweenTwoDates(){
	var fisDate1 = $("#fisDate1").val();
	var endDate1 = $("#endDate1").val();
	var params = {};
	params["fisDate1"] = fisDate1;
	params["endDate1"] = endDate1;
	params["methodName"] = "caReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#careport').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#careport').DataTable( {

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
				          {"data": "srno", "width": "5%","defaultContent": ""},
				          {"data": "catName", "width": "5%","defaultContent": ""},
				          {"data": "itemName", "width": "5%","defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%","defaultContent": ""},
				          {"data": "quantity", "width": "5%","defaultContent": ""},
				          {"data": "vat", "width": "5%","defaultContent": ""},
				          {"data": "igst", "width": "5%","defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date CA Purchase Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );

		var mydata = catmap;
		$('#careport').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function singleDateSale(){

	var params= {};
	var fDate = $("#fDate").val();
	params["fDate"]= fDate;
	params["methodName"] = "singleDateSale";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
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
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 8 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);

				},
				destroy: true,
				searching: false,

				columns: [  
				          {"data": "billNo", "width": "5%"},
				          {"data": "carNo", "width": "5%"},
				          {"data": "barcodeNo", "width": "5%"},
				          {"data": "itemName", "width": "5%"},
				          {"data": "categoryName", "width": "5%"},
				          {"data": "salePrice", "width": "5%"},
				          {"data": "ownerName", "width": "5%"},
				          {"data": "contactNo", "width": "5%"},
				          {"data": "totalAmt", "width": "5%"},
				          {"data": "discount", "width": "5%"},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Single Date Sale Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
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

function getSaleDetailsBetweenTwoDates(){
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "getSaleDetailsBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example1').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example1').DataTable( {

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
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 8 ).footer() ).html(

							parseFloat(pageTotal).toFixed(2)

					);
					console.log( pageTotal);
				},

				destroy: true,
				searching: false,

				columns: [  
				          {"data": "billNo", "width": "5%"},
				          {"data": "carNo", "width": "5%"},
				          {"data": "barcodeNo", "width": "5%"},
				          {"data": "itemName", "width": "5%"},
				          {"data": "categoryName", "width": "5%"},
				          {"data": "salePrice", "width": "5%"},
				          {"data": "ownerName", "width": "5%"},
				          {"data": "contactNo", "width": "5%"},
				          {"data": "totalAmt", "width": "5%"},
				          {"data": "discount", "width": "5%"},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Sale Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example1').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function dayCloseReport(){

	var params= {};
	params["methodName"] = "dayCloseReport";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#dayClose').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#dayClose').DataTable( {

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

					// Total over this page
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

				},
				destroy: true,
				searching: false,

				columns: [  
				          {"data": "srNo", "width": "5%","defaultContent": ""},
				          {"data": "billNo", "width": "5%","defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%","defaultContent": ""},
				          {"data": "itemName", "width": "5%","defaultContent": ""},
				          {"data": "categoryName", "width": "5%","defaultContent": ""},
				          {"data": "salePrice", "width": "5%","defaultContent": ""},
				          {"data": "quantity", "width": "5%","defaultContent": ""},
				          {"data": "totalAmt", "width": "5%","defaultContent": ""},
				          {"data": "discount", "width": "5%","defaultContent": ""},
				          ],
				          dom: 'Bfrtip',
				          buttons: [
				                    'copy', 'csv', 'excel', 'pdf', 'print'
				                    ]

			} );
		} );
		var mydata = catmap;
		$('#dayClose').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function CategoryWiseSale(){

	var params= {};
	var catName= $('#catId').val();
	params["catName"]= catName;
	params["methodName"] = "CategoryWiseSaleReport";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example3').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example3').DataTable( {

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

				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 8 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );

				        	  // Update footer
				        	  $( api.column( 8 ).footer() ).html(

				        			  parseFloat(pageTotal).toFixed(2)

				        	  );
				        	  console.log( pageTotal);

				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	  console.log( pageTotal);
				          },
				          destroy: true,
				          searching: false,
				          columns: [  
				                    {"data": "billNo", "width": "5%"},
				                    {"data": "carNo", "width": "5%"},
				                    {"data": "barcodeNo", "width": "5%"},
				                    {"data": "itemName", "width": "5%"},
				                    {"data": "categoryName", "width": "5%"},
				                    {"data": "salePrice", "width": "5%"},
				                    {"data": "ownerName", "width": "5%"},
				                    {"data": "contactNo", "width": "5%"},
				                    {"data": "totalAmt", "width": "5%"},
				                    {"data": "discount", "width": "5%"},
				                    ]
			} );
		} );
		var mydata = catmap;
		$('#example3').dataTable().fnAddData(mydata);
			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function gstsaleReportBetweenTwoDates()
{
	var params= {};
	var fisDate = $("#firstDate").val();
	var endDate = $("#secondDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "gstSaleReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example4').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example4').DataTable( {

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
					.column( 5 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 5 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);

					// Total over this page
					pageTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 6 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 7 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					/*pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 15 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 15 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/

					// Total over this page
/*					pageTotal = api
					.column( 12 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 12 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);

					// Total over this page
					pageTotal = api
					.column( 13 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 13 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);
					
					// Total over this page
					pageTotal = api
					.column( 14 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 14 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					console.log( pageTotal);*/

				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,

				columns: [  

				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "totalTaxAmount" , "width": "5%", "defaultContent": ""},
				          {"data": "discountAmt" , "width": "5%", "defaultContent": ""},
				          {"data": "netAmount" , "width": "5%", "defaultContent": ""}

				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "GST wise Sale Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			});
}

function BarcodeWiseReport(){
	var params= {};
	var catName= $('#barcodeId').val();
	params["catName"]= catName;
	params["methodName"] = "BarcodeWiseReport";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example5').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example5').DataTable( {

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

				        	  // Total over this page
				        	  pageTotal = api
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	  console.log( pageTotal);
				          },
				          destroy: true,
				          searching: false,
				          columns: [  
				                    {"data": "date", "width": "5%"},
				                    {"data": "itemName", "width": "5%"},
				                    {"data": "categoryName", "width": "5%"},
				                    {"data": "hsnsacNo", "width": "5%"},
				                    {"data": "quantity", "width": "5%"},
				                    {"data": "buyPrice", "width": "5%"},
				                    {"data": "salePrice", "width": "5%"},
				                    {"data": "vat", "width": "5%"},
				                    {"data": "igst", "width": "5%"},
				                    {"data": "total", "width": "5%"},
				                    ]
			} );
		} );

		var mydata = catmap;
		$('#example5').dataTable().fnAddData(mydata);

			}).error(function(jqXHR, textStatus, errorThrown){
				if(textStatus==="timeout") {
					$(loaderObj).hide();
					$(loaderObj).find('#errorDiv').show();
				}
			});
}

function purchaseReportBetweenTwoDatesNonGst()
{
	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;

	params["methodName"] = "purchaseReportBetweenTwoDatesNonGst";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		$('#example1').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example1').DataTable( {

				dom: 'Bfrtip',
				buttons: [
				          'copy', {
				        	  extend : 'csv',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
				          },{
				        	  extend : 'excel',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
				          } , {
				        	  extend : 'pdfHtml5',
				        	  title : function() {
				        		  return "NON GST Purchase Report";
				        	  },
				        	  orientation : 'landscape',
				        	  pageSize : 'LEGAL',
				        	  text : '<i class="fa fa-file-pdf-o"> PDF</i>',
				        	  titleAttr : 'PDF',
				        	  footer:true
				          },{
				        	  extend : 'print',
				        	  footer:true,
				        	  title :"NON GST Purchase Report",
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
				        	  .column( 9 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 9 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 10 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 10 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				        	// Total over this page
				        	  pageTotal = api
				        	  .column( 11 )
				        	  .data()
				        	  .reduce( function (a, b) {
				        		  return intVal(a) + intVal(b);
				        	  }, 0 );
				        	  // Update footer
				        	  $( api.column( 11 ).footer() ).html(
				        			  parseFloat(pageTotal).toFixed(2)
				        	  );
				          },

				          "sPaginationType": "full_numbers",
				          destroy: true,
				          searching: true,
				          orderable: true,

				          columns: [  
				                    {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				                    {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				                    {"data": "supplierName", "width": "5%", "defaultContent": ""},
				                    {"data": "billNo", "width": "5%", "defaultContent": ""},
				                    {"data": "GstTinNo", "width": "5%", "defaultContent": ""},
				                    {"data": "itemName", "width": "5%", "defaultContent": ""},
				                    {"data": "hsnsacno", "width": "5%", "defaultContent": ""},
				                    {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
				                    {"data": "rollSize", "width": "5%", "defaultContent": ""},
				                    {"data": "QuantityMeter", "width": "5%", "defaultContent": ""},
				                    {"data": "disPer", "width": "5%", "defaultContent": ""},
				                    {"data": "discountAmount", "width": "5%", "defaultContent": ""},
				                    {"data": "total", "width": "5%", "defaultContent": ""},
				                    ]
			} );
		} );
		var mydata = catmap;
		$('#example1').dataTable().fnAddData(mydata);
			});
}

function creditNoteReportBetweenTwoDates(){

	var input = document.getElementById('supplier7'),
	list = document.getElementById('sup_drop7'),
	i,supplier,supplier1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
			supplier1 = list.options[i].getAttribute('value');
		}
	}
	var fkSupplierId = supplier;

	var params= {};

	var fisDate = $("#firstDate").val();
	var endDate = $("#secondDate").val();

	params["fkSupplierId"]= fkSupplierId;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;


	params["methodName"] = "creditNoteReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		$('#example4').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example4').DataTable( {
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
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,

				columns: [  
				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "grossTotal", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true , title: 'Credit Note'},
				                     { extend: 'excelHtml5', footer: true , title: 'Credit Note' },
				                     { extend: 'csvHtml5', footer: true ,title: 'Credit Note'},
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Credit Note";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			});
}

function debitNoteReportBetweenTwoDates(){

	var input = document.getElementById('creditCustomer5'),
	list = document.getElementById('cust_drop5'),
	i,supplier,supplier1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
			supplier1 = list.options[i].getAttribute('value');
		}
	}
	var fkSupplierId = supplier1;
	var params= {};
	var paymentMode = $('#paymentMode').val();

	params["fkSupplierId"]= fkSupplierId;
	params ["paymentMode"] = paymentMode;
	params["methodName"] = "debitNoteReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		$('#example4').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example4').DataTable( {
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
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				columns: [  

				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "type", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "grossTotal", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true ,title: 'Debit Note' },
				                     { extend: 'excelHtml5', footer: true ,title: 'Debit Note' },
				                     { extend: 'csvHtml5', footer: true ,title: 'Debit Note'},
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Debit Note";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			});
}


function debitNoteReportBetweenTwoDates1(){

	var params= {};

	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	
	params["methodName"] = "debitNoteReportBetweenTwoDates1";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		$('#example5').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example5').DataTable( {
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
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				columns: [  

				          {"data": "serialnumber", "width": "5%", "defaultContent": ""},
				          {"data": "fetchDate", "width": "5%", "defaultContent": ""},
				          {"data": "supplierName", "width": "5%", "defaultContent": ""},
				          {"data": "type", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "grossTotal", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Double Date Purchase Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example5').dataTable().fnAddData(mydata);
			});
}

function employeeNameWiseAndBetweenTwoDates()
{
	var input = document.getElementById('supplier7'),
	list = document.getElementById('sup_drop7'),
	i,supplier,supplier1;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			supplier = list.options[i].getAttribute('data-value');
			supplier1 = list.options[i].getAttribute('value');
		}
	}
	var fkSupplierId = supplier1;
	var empId = supplier;
	var fisDate = $("#firstDate").val();
	var endDate = $("#secondDate").val();
	var params= {};
	params["fkSupplierId"]= fkSupplierId;
	params["empId"]= empId;
	params["fisDate"]= fisDate;
	params["endDate"]= endDate;
	params["methodName"] = "employeeNameWiseAndBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{

		$('#example4').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example4').DataTable( {
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
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 8 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					// Total over this page
					pageTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 9 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					
					// Total over this page
					/*pageTotal = api
					.column( 10 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 10 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);
					
					// Total over this page
					pageTotal = api
					.column( 11 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					// Update footer
					$( api.column( 11 ).footer() ).html(
							parseFloat(pageTotal).toFixed(2)
					);*/
				},
				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,

				columns: [  
				          {"data": "srNo", "width": "5%", "defaultContent": ""},
				          {"data": "saleDate", "width": "5%", "defaultContent": ""},
				          {"data": "employeeName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          {"data": "categoryName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "salePrice", "width": "5%", "defaultContent": ""},
				          {"data": "totalperItem", "width": "5%", "defaultContent": ""},
				         /* {"data": "discount", "width": "5%", "defaultContent": ""},
				          {"data": "grossamt", "width": "5%", "defaultContent": ""},*/
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Employee Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#example4').dataTable().fnAddData(mydata);
			});
}