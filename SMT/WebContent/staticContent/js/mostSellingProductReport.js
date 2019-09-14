function getCategoryWiseItemName(){
	var input = document.getElementById('catId'),
	list = document.getElementById('catId_drop'),
	i,category;

	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			category = list.options[i].getAttribute('data-value');
		}
	}
	$("#itemName").empty();
	$("#itemName").append($("<option></option>").attr("value","").text("Select Item Name"));
	var params= {};
	params["category"]= category;
	params["methodName"] = "getCategoryWiseItemName";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;
		$.each(jsonData,function(i,v)
				{
			$("#itemName").append($("<option></option>").attr("value",v.itemName).text(v.itemName)); 
				});
			})
}

function getMostSellingProduct()
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
	var catId =catId;
	params["catId"] = catId;
	params["categoryName"] = categoryName;
	params["methodName"] = "getMostSellingProduct";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$('#example').dataTable().fnClearTable();
		var jsonData = $.parseJSON(data);
		var catmap = jsonData.list;

		$(document).ready(function() {
			$('#example').DataTable( {
				dom: 'Bfrtip',
				buttons: [
				          'copy',
				          {
				        	  extend : 'csv',
				        	  footer:true,
				        	  title :"Most Selling Product",
				          },{
				        	  extend : 'excel',
				        	  footer:true,
				        	  title :"Most Selling Product",
				          } , {
				        	  extend : 'pdfHtml5',
				        	  title : function() {
				        		  return "Most Selling Product";
				        	  },
				        	  orientation : 'landscape',
				        	  pageSize : 'A4',
				        	  text : '<i class="fa fa-file-pdf-o"> PDF</i>',
				        	  titleAttr : 'PDF',
				        	  footer:true
				          }, {
				        	  extend : 'print',
				        	  footer:true,
				        	  title :"Most Selling Product",
				          },
				      
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
				                    {"data": "categoryName", "width": "5%", "defaultContent": ""},
				                    {"data": "itemName", "width": "5%", "defaultContent": ""},
				                    {"data": "totalCount", "width": "5%", "defaultContent": ""},
				                    {"data": "quantity", "width": "5%", "defaultContent": ""},
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