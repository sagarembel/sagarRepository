function singleDateCashBook(){
	var params= {};
	var fDate = $("#fDate").val();
	params["fDate"]= fDate;

	params["methodName"] = "singleDateCashBook";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
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
				                    {"data": "payToId", "width": "5%"},
				                    {"data": "toPayNameId", "width": "5%"},
				                    {"data": "paymentTypeId", "width": "5%"},
				                    {"data": "paymebtById", "width": "5%"},
				                    {"data": "paymentAmountId", "width": "5%"},
				                    {"data": "paymentReasonId", "width": "5%"},
				                    {"data": "paymentDate1", "width": "5%"}
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

function cashBookReportBetweenTwoDates(){

	var params= {};
	var fisDate = $("#fisDate").val();
	var endDate = $("#endDate").val();

	params["fisDate"]= fisDate;
	params["endDate"]= endDate;

	params["methodName"] = "cashBookReportBetweenTwoDates";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example1').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example1').DataTable( {

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
				                    {"data": "payToId", "width": "5%"},
				                    {"data": "toPayNameId", "width": "5%"},
				                    {"data": "paymentTypeId", "width": "5%"},
				                    {"data": "paymebtById", "width": "5%"},
				                    {"data": "paymentAmountId", "width": "5%"},
				                    {"data": "paymentReasonId", "width": "5%"},
				                    {"data": "paymentDate1", "width": "5%"}
				                    ]
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