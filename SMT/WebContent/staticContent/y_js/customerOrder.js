var pk_temp_id;
function getitemData(){ 
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	if(carNo == ""){
		alert("Select Car First !!!");
	}
	else{
		var params= {};
		params["methodName"] ="fetchCust";
		params["key"]=value;
		params["carNo"]=carNo;
		document.getElementById('key').value = null;
		var count=0;
		$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
				{
			var result = data.length;

			if(result <= "20"){
				alert("Stock NOT AVAILABLE !!!");
				return true;
			}	
			getitemDataByCarNo();
				})
	}
}

function getitemDataByCarNo(){ 
	var carNo = $('#carNo').val();
	var params= {};

	params["carNo"]=carNo;
	params["methodName"] ="getItemDetailByCarNo";
	var count=0;
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		var jsonData = $.parseJSON(data);

		$("#list4").jqGrid("clearGridData", true).trigger("reloadGrid");
		$.each(jsonData,function(i,v)
				{
			$("#list4").jqGrid({
				datatype: "local",
				colNames:['pk_temp_id','item_id','BarcodeNO','CategoryName','ItemName','HSN/SAC', 'Quantity', 'UnitPrice','GST%','IGST%','Tax Amt','Total'],
				colModel:[ 
				          {
				        	  name:'pk_temp_id',
				        	  hidden:true,
				          },    
				          {
				        	  name:'item_id',
				        	  hidden:true,
				          },

				          {
				        	  name:'barcodeNo',
				        	  width:70,				    	

				          },
				          {	name:'categoryName',
				        	  width:120,

				          },

				          {	name:'itemName',
				        	  width:120,

				          },
				          {	name:'hsnSacNo',
				        	  width:100,
				          },

				          {	name:'quantity',
				        	  width:70,
				        	  editable: true
				          },

				          {	name:'salePrice',
				        	  width:100,
				        	  editable: true
				          },
				          {	name:'vat',
				        	  hidden:true,
				          },
				          {	name:'igst',
				        	  hidden:true,
				          },
				          {	name:'taxAmount',
				        	  hidden:true,
				          },

				          {	name:'total',
				        	  width:150,
				        	  formatter: 'number',
				          },

				          ],


				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          width: 900,
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          'cellEdit':true,
				          afterSaveCell: function () {
				        	  var rowId =$("#list4").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#list4").getRowData(rowId);
				        	  var quantity = rowData['quantity'];
				        	  var salePrice = rowData['salePrice'];
				        	  var gst = rowData['vat'];
				        	  var igst = rowData['igst'];
				        	  var tota = 0;
				        	  var vatAmt = 0;
				        	  var totAmt = 0;
				        	  tota = quantity * salePrice;
				        	  totAmt = quantity * salePrice;

				        	  if(gst != "0"){
				        		  vatAmt =  ((tota*gst)/100);
				        		  totAmt = +tota + +vatAmt;
				        	  }
				        	  if(igst != "0"){
				        		  vatAmt =  ((tota*igst)/100);
				        		  totAmt = +tota + +vatAmt;
				        	  }
				        	  $("#list4").jqGrid("setCell", rowId, "taxAmount", vatAmt);
				        	  $("#list4").jqGrid("setCell", rowId, "total", tota);
				        	  var Total = 0;
				        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  for (var k = 0; k < count; k++) {
				        		  var Total1 = allRowsInGrid1[k].total;
				        		  if(Total1 != undefined){
				        			  Total = +Total + +Total1;
				        		  }
				        	  }
				        	  document.getElementById("totalAmount").value = Math.round(Total);
				        	  var totAmount = Math.round(Total);
				        	  var dis = document.getElementById("discount").value;
				        	  if(dis != "0"){
				        		  document.getElementById("grossTotal").value = totAmount;
				        	  }
				        	  else{
				        		  document.getElementById("grossTotal").value = (+totAmount - +dis);
				        	  }
				          },

				          pager: "#jqGridPager",

			});

			$("#list4").addRowData(i+1,jsonData[i]);

			$('#list4').navGrid('#jqGridPager',

					{ edit: true, add: false, del: true, search: true, refresh: true, view: true, position: "left", cloneToTop: false },

					{
						editCaption: "The Edit Dialog",

						afterSubmit: function() {
							$('#list4').trigger( 'reloadGrid' );
						},

						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfterEdit: true,

						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					},

					{
						afterSubmit: function() {
							$('#list4').trigger( 'reloadGrid' );
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					},

					{
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						afterSubmit: function () {


							var rowId =$("#list4").jqGrid('getGridParam','selrow');  
							var rowData = jQuery("#list4").getRowData(rowId);
							pk_temp_id = rowData['pk_temp_id'];
							shree(pk_temp_id);
						},

						reloadAftersubmit:true,	
						errorTextFormat: function (data) {
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}

function shree(pk_temp_id){

	var params= {};

	params["pk_temp_id"] = pk_temp_id;
	params["methodName"] = "deleteItem";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		$(this).trigger('reloadGrid');
			}
	)
}


function resBill() {
	document.getElementById("btnSubmit").disabled = true; 
	var params= {};
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++) {

		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		params["pk_temp_id"+i] = pk_temp_id;

		var item_id = allRowsInGrid1[i].item_id;
		params["item_id"+i] = item_id;


		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;

		var quantity = allRowsInGrid1[i].quantity;
		params["quantity"+i] = quantity;

		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;

		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		var salePrice = allRowsInGrid1[i].salePrice;
		params["salePrice"+i] = salePrice;

		var total = allRowsInGrid1[i].total;
		params["total"+i] = total;

		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;

		var vat = allRowsInGrid1[i].vat;
		params["vat"+i] = vat;

		var igst = allRowsInGrid1[i].igst;
		params["igst"+i] = igst;

		var taxAmount = allRowsInGrid1[i].taxAmount;
		params["taxAmount"+i] = taxAmount;

	}

	var contactNo = $('#contactNo').val();
	var ownerName=$('#ownerName').val();
	var carNo=$('#carNo').val();
	var totalAmount=$('#totalAmount').val();
	var discount=$('#discount').val();
	if(discount == ""){
		discount = 0;
	}
	var laberCharges=$('#laberCharges').val();
	if(laberCharges == ""){
		laberCharges = 0;
	}
	var grossTotal=$('#grossTotal').val();
	var carID=$('#carID').val();

	params["contactNo"] = contactNo;
	params["ownerName"] = ownerName;
	params["count"] = count;
	params["carNo"] = carNo;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["laberCharges"] = laberCharges;
	params["grossTotal"] = grossTotal;
	params["carID"] = carID;
	params["methodName"] = "registerBill";

	$.post('/SMT/jsp/utility/controller.jsp', params,
			function(data) {
		alert(data);
		window.open("Car_bill_PDF.jsp");
		location.reload(true);

	}).error(function(jqXHR, textStatus, errorThrown) {
		if (textStatus === "timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});



}
function shreedon(){
	window.open("Car_bill_PDF.jsp"); 
	alert("dfhsdahd");
}
