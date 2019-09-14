function getPreGoodReceive()
{
	var params= {};
	params["methodName"] = "getPreGoodReceive";
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#preGood').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			var total =   $('#preGood').DataTable( {
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
				},

				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,
				columns: [
				          {"data": "suppName", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "voucherNo", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          {"data": "contactPerson", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "disPer", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "igst", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "ondate", "width": "5%", "defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Previous Goods Receive Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
			} );
		} );
		var mydata = catmap;
		$('#preGood').dataTable().fnAddData(mydata);
			}
	);
}