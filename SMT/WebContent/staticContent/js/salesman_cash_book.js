function getCashBankBook()
{
	var fDate = $('#fDate').val();
	var tDate = $('#tDate').val();
	var empId = $('#empId').val();
	var params = {};
	params["methodName"] = "getSalesmanCashBookReportBetTwoDates";
	params["fDate"] = fDate;
	params["tDate"] = tDate;
	params["empId"] = empId;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$(document).ready(function() {
			$('#example').DataTable( {
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
							'Rs'+' '+ parseFloat(pageTotal).toFixed(2));

					console.log( pageTotal);

					// Total over this page       
					pageTotal1 = api
					.column( 4 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );

					// Update footer
					$( api.column( 4 ).footer() ).html(
							'Rs'+' '+parseFloat(pageTotal1).toFixed(2));
					console.log( pageTotal1);
				},
				destroy: true,
				searching: false,
				columns: [
				          {"data": "empName", "width": "5%"},
				          {"data": "date" , "width": "5%"},
				          {"data": "personName" , "width": "5%"},
				          {"data": "credit", "width": "5%"},
				          {"data": "debit" , "width": "5%"}
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