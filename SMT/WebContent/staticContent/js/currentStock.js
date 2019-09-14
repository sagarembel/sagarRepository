function currentStock()
{
	var params= {};

	params["methodName"] = "getAllCurrentStock";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		$('#currStock').dataTable().fnClearTable();
		
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		
		$(document).ready(function() {
			var total =   $('#currStock').DataTable({
			fnRowCallback : function(nRow, aData, iDisplayIndex)
			{		
				$("th:first", nRow).html(iDisplayIndex +1);
				return nRow;
			},
			  
					"columnDefs": [ {
				    "targets": 5,
				    "createdCell": function (td, cellData, rowData, row, col)
				    {
				      if(cellData < 10)
				      {
				    	$(td).css('color', 'red')
				        $(td).css('font-weight', '700')
				      }
				    }
				  } ],			
				
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
			            		 str = pageTotal.toFixed(2)
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
			            		 str = pageTotal.toFixed(2)
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
			            		 str = pageTotal.toFixed(2)
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
			            		 str = pageTotal.toFixed(2)
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
			            		 str = pageTotal.toFixed(2)
			            );
			            console.log( pageTotal);
/*			            
			         // Total over this page
			           /* pageTotal = api
			                .column( 10 )
			                .data()
			                .reduce( function (a, b) {
			                    return intVal(a) + intVal(b);
			                }, 0 );
			 
			         
			            // Update footer
			            $( api.column( 10 ).footer() ).html(
			            		 str = pageTotal.toFixed(2)
			            );
			            console.log( pageTotal);*/
			            
			        },

				"sPaginationType": "full_numbers",
				destroy: true,
				searching: true,
				orderable: true,

				columns: [
				          {"data": "catName", "width": "5%", "defaultContent": "",},
				          {"data": "subCatName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "barcode", "width": "5%", "defaultContent": ""},
				          {"data": "rollSize", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "returnquantity", "width": "5%", "defaultContent": ""},
				          {"data": "stockinmeter", "width": "5%", "defaultContent": ""},
				          {"data": "salePrice", "width": "5%", "defaultContent": ""},
				          {"data": "total", "width": "5%", "defaultContent": ""},
				          {"data": "Age", "width": "5%", "defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Current Stock Report";
				                    	 },
				                    	 orientation : 'landscape',
				                    	 pageSize : 'LEGAL',
				                    	 titleAttr : 'PDF' 
				                     } ]
				                    
			} );
		} );
		var mydata = catmap;
		$('#currStock').dataTable().fnAddData(mydata);
			}
	);
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
				},

				destroy: true,
				searching: true,			      
				columns: [  
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "date", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Category Wise Stock Report";
				                    	 },
				                    	 orientation : 'portrait',
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

function barcodewisestock(){
	var barcodeNo = $('#barcode').val();
	var params = {};
	params["barcodeNo"] = barcodeNo;
	params["methodName"] = "getBarcodeWiseStock";

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
				},

				destroy: true,
				searching: true,			      
				columns: [  
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "salePrice", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Barcode Stock Report";
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

function billwisestock()
{
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,Billno;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			Billno = list.options[i].getAttribute('data-value');
		}
	}
	var Billno =Billno;
	var params = {};
	params["methodName"] = "getBillNoWiseStock";
	params["Billno"] = Billno;

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
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "suppName", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "buyPrice", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Bill Wise Stock Report";
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

function getCategoryWiseItemName(){
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,category;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			category = list.options[i].getAttribute('data-value');
		}
	}
	$("#itemId").empty();
	$("#itemId").append($("<option></option>").attr("value","").text("Select Item Name"));
	var params= {};
	params["category"]= category;
	params["methodName"] = "getCategoryWiseItemName";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#itemId").append($("<option></option>").attr("value",v.productId).text(v.itemName+","+v.size)); 
				});
			})
}

function getCategoryWiseItemnameStock()
{
	var params = {};
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,catId,categoryName;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			catId = list.options[i].getAttribute('data-value');
			categoryName = list.options[i].getAttribute('value');
		}
	}
	
	var itemId =$("#itemId").val();
	var catId =catId;
	params["catId"] = catId;
	params["categoryName"] = categoryName;
	params["itemId"] = itemId;
	
	params["methodName"] = "getCategoryWiseItemnameStock";

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
				},
				destroy: true,
				searching: true,			      
				columns: [  
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "subCatName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "size", "width": "5%", "defaultContent": ""},
				          {"data": "qty2", "width": "5%", "defaultContent": ""},
				          {"data": "datediff", "width": "5%", "defaultContent": ""}, 
				          ],
				          dom : 'Bfrtip',
				          buttons : [ 
				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Category Wise Item Stock Report";
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

function billwisestockForEmp()
{
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,Billno;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			Billno = list.options[i].getAttribute('data-value');
		}
	}
	var Billno =Billno;
	var params = {};
	params["methodName"] = "getBillNoWiseStock";
	params["Billno"] = Billno;

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
				          {"data": "billNo", "width": "5%", "defaultContent": ""},
				          {"data": "suppName", "width": "5%", "defaultContent": ""},
				          {"data": "catName", "width": "5%", "defaultContent": ""},
				          {"data": "itemName", "width": "5%", "defaultContent": ""},
				          {"data": "quantity", "width": "5%", "defaultContent": ""},
				          {"data": "vat", "width": "5%", "defaultContent": ""},
				          {"data": "barcodeNo", "width": "5%", "defaultContent": ""},
				          ],

				          dom : 'Bfrtip',
				          buttons : [ 

				                     { extend: 'copyHtml5', footer: true },
				                     { extend: 'excelHtml5', footer: true },
				                     { extend: 'csvHtml5', footer: true },
				                     { extend : 'pdfHtml5', footer: true,
				                    	 title : function() {
				                    		 return "Bill Wise Stock Report";
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

