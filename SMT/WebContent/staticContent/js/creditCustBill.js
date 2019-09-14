function myAlert(msg)
{
	var dialog = bootbox.dialog({
		//title: "Embel Technologies Says :",
	   /* message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',*/
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });
	   setTimeout(function()
	  {
		dialog.modal('hide');
	   }, 1500);
}

function reset2()
{
	document.itemdel.reset();
}
//this function for set value to EmployeeName to Grid Drop Down
var first;
function getEmpName()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		//alert(first);
		var catmap = jsonData.list;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});

}

function getitemData1()
{
	var rowDelete = 0;
	
	document.getElementById("discount").value = "";
/*	document.getElementById("discount1").value = "";*/
	
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	
	getEmpName();
	var vikas = first;
	//alert(vikas);
	
	var params= {};

	params["key"]=value;
	params["methodName"] ="fetchCust1";
	document.getElementById('key').value = null;
	var count=0;
	var newrow;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithoutTax = document.getElementById("totalAmount").value;
	var totalWithTax = 0;
	var tot = 0;

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		getEmpName();
		var vikas = first;
		//alert(vikas);
		
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "20")
		{
			alert("STOCK NOT AVAILABLE FOR "+value+" !!!");
			return true;
		}
		$.each(jsonData,function(i,v)
		{
			count = jQuery("#list4").jqGrid('getGridParam', 'records');
			var totalQty = count;
			var rowdata =$("#list4").jqGrid('getGridParam','data');
			var ids = jQuery("#list4").jqGrid('getDataIDs');

			function sumFmatter(cellvalue, options, rowObject)
			{		
				
				var totalWithoutTax = document.getElementById("totalAmount").value;
				var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list4').getGridParam('data');
				var rowId =$("#list4").jqGrid('getGridParam','selrow');
				//var rowData = jQuery("#list4").getRowData(rowId);
				var AllRows=JSON.stringify(allRowsInGrid1);
				//var grossTotal = 0;
									
				var total = 0;				
				
				var tota = 0;
				var vatAmt = 0;
				var disAmt = 0;
				var finalSP = 0;
				var newTaxAmt = 0;
				var newSalePrice = 0;
				var newFinalSP = 0;
				var disPer = 0;
				var gst = 0;
				var salePrice = 0;
				var quantity = 0;				
				var grossTotal = 0;
				var grossDisTotal = 0;
				var disAmt = 0;
				
				if(rowDelete > 0)
				{
					for (var a = 0; a <= count-1; a++)
					{							
						if(a == count)
						{break;}
						else
						{
							if(a == count)
							{break;}
							
							total = allRowsInGrid1[a].total;
			        		grossTotal = +grossTotal + +total;	
			        							 
						}
					}
					
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);	
				}
				
				if(+rowDelete == 0)
				{
		        	for (var a = 0; a <= count; a++)
					{   
				        total = allRowsInGrid1[a].total;
				        grossTotal = +grossTotal + +total;
				        
				        disAmt = allRowsInGrid1[a].disAmount;
				        grossDisTotal = +grossDisTotal + +disAmt;
		        	}
		        	
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);
					document.getElementById("discount").value = grossDisTotal.toFixed(2);//Math.round(totalWithoutTax);
				}
				
				return total;
			}

			var prodName,com,bar,subCat,size1,rollSize;
			var sameRowCount = 1;
			for (var j = 0; j < count; j++) 
			{	
				prodName = rowdata[j].itemName;
				com = rowdata[j].categoryName;
				bar = rowdata[j].barcodeNo;
				subCat = rowdata[j].subCategoryName;
				availQty = rowdata[j].goodReceiveQuantity;
				size = rowdata[j].size1;
				rollSize = rowdata[j].rollSize;
				var rowId = ids[j];
				var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				//if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && bar == jsonData.offer.barcodeNo && subCat == jsonData.offer.subCategoryName)
				if (bar == jsonData.offer.barcodeNo)
				{
					sameRowCount++;
					
					if (size == "meter"
						|| size == "Meter"
						|| size == "METER"
						|| size == "MTR"
						|| size == "mtr"
						|| size == "Mtr")
						{
							availQty=availQty*rollSize;
						}
					
					if(sameRowCount > availQty)
					{
						alert("Available Quantity for "+(j+1)+"=>"+prodName+"=>"+bar+"=>"+availQty);
						newrow = false;
						return false;
					}else
					{	
						newrow = true;
					}					
				}
				else
				{
					newrow = true;
				}
			}
			
			if(newrow == true)
			{
				document.getElementById("totalQtyCredit").value = totalQty+1;
				$("#list4").addRowData(count,jsonData.offer);				
			}
			$("#list4").jqGrid({
				datatype: "local",
				colNames:['pk_temp_id', 'item_id', 'Barcode<br>NO', 'Category','Category<br>Id','Sub<br>tegory', 'Sub<br>Category<br>ID', 'Product', 'Product<br>Id', 
						  'Style','HSN/SAC', 'ROll<br>Size', 'Quantity', 'Size', 'Good Receive Quantity', 'S.P./Unit',	'S.P.<br>W/O<br>Tax', 'Dis<br>%', 'Dis<br>Amt', 
						  'S.P.<br>After<br>Dis', 'GST<br>%', 'Tax<br>Amt', 'Tax Amt<br>After<br>Discnt', 'IGST%', 'Total<br>Amt', 'Employee<br>Name', 'forTotal'],
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
				        	  sortable: false,
				        	  width:70,				    	
				          },
				          
				          {	
				        	  name:'categoryName',
				        	  width:170,
				        	  sortable: false,
				          },
				          
				          {	
				        	  name:'fkCategoryId',
				        	  width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'subCategoryName',
				        	  width:170,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkSubCatId',
				        	  width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'itemName',
				        	  width:170,
				        	  sortable: false,
				          },
				          {	
				        	  name:'fkProductId',
				        	  width:40,
				        	  hidden:true,
				          },
				          {	
				        	  name:'style',
				        	  width:100,
				        	  sortable: false,
				          },
				          {	
				        	  name:'hsnSacNo',
				        	  width:100,
				        	  sortable: false,
				          },
				          { 
				        	   name:  "rollSize",
				        	   sortable: false,
				        	   width:70,
				        	   hidden:true,
				          },
				          {	
				        	  name:'quantity',
				        	  width:70,
				        	  sortable: false,
				        	  editable: true
				          },				          
				          {	
				        	  name:'size1',
				        	  width:80,
				        	  sortable: false,
				          },				          
				          {
				        	  name:'goodReceiveQuantity',
				        	  hidden:true,
				          },				          
				          {	
				        	  name:'salePrice',
				        	  width:100,
				        	  sortable: false,
				        	  editable: true
				          },				          
				          {	
				        	  name:'sPWithoutTax',
				        	  width:120,
				        	  sortable: false,
				          },
				          {	
				        	  name:'disPerForBill',
				        	  width:70,
				        	  sortable: false,
				        	  editable: true,
				        	//  editoptions:{Value:'0'}
				          },				          
				          {	
				        	  name:'disAmount',
				        	  width:105,
				        	  sortable: false,
				        	  //editable: true
				          },
				          {	
				        	  name:'spAfterDis',
				        	  width:115,
				        	  sortable: false,
				        	  //editable: true
				        	 // hidden:true,
				          },
				          {	
				        	  name:'vat',
				        	  width:80,
				        	  sortable: false,
				        	 // editable: true
				          },				          
				          {	  
				        	  name:'taxAmount',
				        	  width:110,
				        	  sortable: false,
				        	 // hidden:true,
				          },
				          {	  
				        	  name:'taxAmountAfterDis',
				        	  width:140,
				        	  sortable: false,
				        	  //formatter: taxCalculation,
				          },
				          {	
				        	  name:'igst',
				        	  width:80,
				        	 // editable: true,
				        	  sortable: false,
				        	  hidden:true,
				          },
				          {	name:'total',
				        	  width:140,
				        	  sortable: false,
				        	  //formatter: sumFmatter
				          },
				          {	
				        	  name:'EmpName',//this is for take drop down in grid
				        	  width:250,
				        	  align:'center',
                              editable:true,
                              sortable: false,
                              edittype: 'select', 
                              editoptions: { value: vikas}
				          },
				          { 
				        	  name:  "forTotal",
				        	  sortable: false,
				        	  hidden:true,
				        	  formatter: sumFmatter,
				          },				           
				          ],
				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          width: 1300,
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          'cellEdit':true,
				          afterSaveCell: function ()
				          {
				        	  document.getElementById("discount").value = "";
				        	 /* document.getElementById("discount1").value = "";*/
				        	  
				        	  var rowId =$("#list4").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#list4").getRowData(rowId);
				        	  var quantity = rowData['quantity'];
				        	  var salePrice = rowData['salePrice'];
				        	  var gst = rowData['vat'];
				        	  var size1 = rowData['size1'];
				        	  var goodReceiveQuantity = rowData['goodReceiveQuantity'];
				        	  var rollSize = rowData['rollSize'];
				        	  var taxAmount = rowData['taxAmount'];
				        	  var sPWithoutTax = rowData['sPWithoutTax'];
				        	  var disPer = rowData['disPerForBill'];
				        	  var disAmount = rowData['disAmount'];
				        	  var taxAmountAfterDis = rowData['taxAmountAfterDis'];
				        	  var total = rowData['total'];

				        	  //alert("GRID VALUE ==============> "+taxAmount);
				        	  var tota = 0;
				        	  var vatAmt = 0;
				        	  var totAmt = 0;
				        	  var totSPWtax = 0
				        	  var disAmt = 0;
				        	  var finalSP = 0;
				        	  var spWDis = 0;
				        	  var newTaxAmt = 0;
				        	  var newSalePrice = 0;
				        	  var newFinalSP = 0;
				        	  var finalSalePrice = salePrice;
				        	  var finalSpWithoutTax = sPWithoutTax;
				        	  var roundOffvatAmt = 0;
				        	  
				        	  if (size1 == "meter"
				      			|| size1 == "Meter"
				      			|| size1 == "METER"
				      			|| size1 == "MTR"
				      			|| size1 == "mtr"
				      			|| size1 == "Mtr")
				      			{
				        		  var fabricQty = goodReceiveQuantity * rollSize;
				        		  if(Number(quantity) > Number(fabricQty))
					        	  {  
				        			  var setQty = 1;
					        		  alert("Available Stock = "+fabricQty+" meter");
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;					        	  }
				      			}
				        	  else
				      			{ 
				        		  quantity = 1;
				        		  var setQty = 1;
					        	 /* if(Number(quantity) > Number(goodReceiveQuantity))
					        	  {
					        		  var setQty = 1;
					        		  alert("Available Stock = "+goodReceiveQuantity);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;	
					        	  }*/
				        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
				      			}
				      
				        	  tota = quantity * salePrice;
				        	  totAmt = quantity * salePrice;
				        	  roundOfftota = tota.toFixed(2);
				        	  
				        	  if(gst != "0")
				        	  {
				        		  vatAmt =  (tota - (tota/(1+(gst/100))));
				        		  totAmt = +tota + +vatAmt;
				        		  roundOffvatAmt = vatAmt.toFixed(2);
				        	  }
				        	  
				        	  $("#list4").jqGrid("setCell", rowId, "taxAmount", roundOffvatAmt);
				        	  //$("#list4").jqGrid("setCell", rowId, "total", roundOfftota);
				        	  
				        	  var checkDisPer = /^[0-9]+\.?[0-9]*$/;
				        	  if(disPer.match(checkDisPer))
				        	  {
				        		  if(Number(disPer) >= 100)
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Percentage Must Be Less Than 100");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
					        		  return false;
					        	  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  
				        		  if(disPer == "")
					        	  {
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  }
				        		  else
				        		  {
					        		  myAlert("Pleaee Enter Valid Discount value");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
				        		  }
				        	  }		
				        	  
				        	  var checkSp = /^[0-9]+\.?[0-9]*$/;
				        	  if(salePrice.match(checkSp))
						      {
					        	  if(Number(salePrice) > 0)
				        		  {
					        		  spwTax = (salePrice/(1+(gst/100)));
					        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax.toFixed(2));				        	  
				        	  
					        		 // rangeGst(salePrice);
					        		  
					        		  if(Number(disPer) > 0)
						        	  {
						        		  if(Number(gst) > 0)
						        		  {  
						        			  disAmt = (spwTax*(disPer/100));
						        			  finalSP = spwTax - disAmt;
						        			  
						        			 // rangeGst(finalSP);
						        			  
						        			  newTaxAmt = (((finalSP*quantity)*gst)/100);				        			  
						        			  var oneProTax = (((finalSP)*gst)/100);
						        			  newFinalSP = finalSP + oneProTax;				        			  
						        			  tota = newFinalSP * quantity;
						        			  disAmt = disAmt * quantity;
						        			  vatAmt = vatAmt * quantity;
						        			  
								        	  //$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
								        	  totalCalC();
								        	  totalDisC();	
						        		  }
						        		  else if(Number(gst) == 0)
						        		  {
						        			  var setZero = 0;
						        			  spwTax = salePrice - 0;
						        			  disAmt = (spwTax*(disPer/100));
						        			  finalSP = spwTax - disAmt;
						        			  newTaxAmt = (((finalSP*quantity)*gst)/100);
						        			  var oneProTax = (((finalSP)*gst)/100);
						        			  newFinalSP = finalSP + oneProTax;
						        			  tota = newFinalSP * quantity;
						        			  disAmt = disAmt * quantity;
						        			  vatAmt = vatAmt * quantity;		
						        			  
						        			 // $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
								        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2));
								        	  totalCalC();
								        	  totalDisC();
						        		  }
						        	  }				        	  
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2));
					        	  $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
				        	  }
				        	  
			        		  }
				        	  else
			        		  {
				        		  var setZero = 0;
				        		  myAlert("Sale Price Must Be Greater Than 0");
				        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2));
					        	  $("#list4").jqGrid("setCell", rowId, "total", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
				        		  return false;
			        		  }
					      }				        	  
			        	 else
			        	 {
			        		 var setZero = 0;
			        		  myAlert("Pleae Enter Valid Sale Price");
			        		  $("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
			        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
				        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
				        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", finalSP.toFixed(2));
				        	  $("#list4").jqGrid("setCell", rowId, "total", setZero);
				        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
			        		  return false;
			        	 }
				        	  
				        	  totalCalC();
				        	  totalDisC();
				        	  
				        	  /*else if(disPer == '0')
				        	  {
				        		  var setZero = 0;
				        		  
			        			  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", salePrice);
					        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "total", salePrice);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  totalCalC();
					        	  totalDisC();
				        	  }		*/		        	  
				        	  
				        	 function totalCalC()
				        	 {				        	  
				        		 //TOTAL AMOUNT
					        	  var Total = 0;
					        	  var totAmtWithax = 0;
					        	  var updatedGt = 0;
					        	  var totAmtWithTax = 0;
					        	  var totCreditAmt = document.getElementById("totalCreditAmt").value;					        	  
					        	  
					        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
					        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
					        	  var AllRows=JSON.stringify(allRowsInGrid1);
					        	  for (var k = 0; k < count; k++)
					        	  {
					        		  var Total1 = allRowsInGrid1[k].total;
	
					        		  if(Total1 != undefined)
					        		  {
					        			  Total = +Total + +Total1;
					        		  }
					        	  }
					        	  for (var j = 0; j < count; j++)
					        	  {
					        		  var Total2 = allRowsInGrid1[j].taxAmount;
					        		  var Total3 = allRowsInGrid1[j].total;
					        		  if(Total2 != undefined)
					        		  {
					        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
					        		  }
					        	  }
					        	  
					        	  if(+totCreditAmt > 0)
					        	  {
					        		  updatedGt = +Total - +totCreditAmt;
					        		  
					        		  if(updatedGt < 0)
					        		  {
					        			  alert("Please check Total Credit Amount");
					        			  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
							        	  document.getElementById("grossTotal").value = updatedGt.toFixed(2);//Math.round(Total);
					        		  }
					        	  }
					        	  else
				        		  {
					        		  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
						        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);					        		  
				        		  }
					        	  
					        	  /*
					        	  	document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
					        	  	document.getElementById("grossTotal").value = updatedGt.toFixed(2);//Math.round(Total);
					        	  */
					        	  var totAmount = Total.toFixed(2);//Math.round(Total);
				        	  }				        	  
				        	 
				        	 function totalDisC()
				        	 {
					        	  //TOTAL DISCOUNT AMOUNT
					        	  var TotalDisAmt = 0;
					        	  var TotalSPAmt = 0;
					        	  var disPer = 0;
					        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
					        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
					        	  var AllRows=JSON.stringify(allRowsInGrid1);
					        	  for (var l = 0; l < count; l++)
					        	  {
					        		  var TotalDisAmt1 = allRowsInGrid1[l].disAmount;
					        		  var TotalSPAmt1 = allRowsInGrid1[l].sPWithoutTax;
					        		  
					        		  if(TotalSPAmt1 != undefined)
					        		  {
					        			  TotalSPAmt = (+TotalSPAmt + +TotalSPAmt1).toFixed(2);
					        		  }
					        		  if(TotalDisAmt1 != undefined)
					        		  {
					        			  TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
					        			  disPer = ((TotalDisAmt/TotalSPAmt)*100).toFixed(2);
					        		  }						        	 
					        	  }
					        	  /*document.getElementById("discount1").value = disPer;*/
					        	  document.getElementById("discount").value = TotalDisAmt;
				        	 }
				        	 
				        	 function rangeGst(checkPrice)
				        	 {
				        		 if(+checkPrice > 0 && +checkPrice <= 1000)
			        			  {
			        				  gst = 5;
			        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
			        			  }
			        			  else if(+checkPrice > 1000)
			        			  {
			        				  gst = 12;
			        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
			        			  }
			        			  else
			        			  {
			        				  gst = 0;
			        				  $("#list4").jqGrid("setCell", rowId, "vat", gst);
			        			  }
				        	 }
				          },
				          
				          
				          gridComplete: function()
				          {
			            	 var totalAmount = document.getElementById("totalAmount").value;
			            	 var totCreditAmt = document.getElementById("totalCreditAmt").value;
			            	 if(totCreditAmt == "")
			            	 {
			            		 document.getElementById("grossTotal").value = totalAmount;
			            	 }
			            	 else if(+totCreditAmt > 0)
			            	 {
			            		 var gtUpdated = +totalAmount - +totCreditAmt;
			            		 
					        	 if(+gtUpdated < 0)
					        	 {
					        		myAlert("Total Amount Is Less Than Total Credit Amount");
					        		document.getElementById("grossTotal").value = gtUpdated;
					        	 }
					        	 else
					        	 {
					        		 document.getElementById("grossTotal").value = gtUpdated;
					        	 }
			            	 }
			            	 
			            	 document.getElementById("grossTotal").value = totalAmount;
			            	 
				          },
				          
				          
				          
				          
				          pager: "#jqGridPager",
			});
			if(count==0 || count==null)
			{
				$("#list4").addRowData(0,jsonData.offer);
				document.getElementById("totalQtyCredit").value = 1;
			}
			$('#list4').navGrid('#jqGridPager',

					{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },

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
						afterSubmit: function()
						{
							$('#list4').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},
					
					{
						afterComplete: function()
						{
							rowDelete++;							
							document.getElementById("discount").value = "";							
							$('#list4').trigger( 'reloadGrid' );
							rowDelete = 0;
							
							 totalCalC();
				        	 totalDisC();
				        	 
				        	 function totalCalC()
				        	 {				        	  
				        		 //TOTAL AMOUNT
					        	  var Total = 0;
					        	  var totAmtWithTax = 0;
					        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
					        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
					        	  var AllRows=JSON.stringify(allRowsInGrid1);
					        	  for (var k = 0; k < count; k++)
					        	  {
					        		  var Total1 = allRowsInGrid1[k].total;
	
					        		  if(Total1 != undefined)
					        		  {
					        			  Total = +Total + +Total1;
					        		  }
					        	  }
					        	  for (var j = 0; j < count; j++)
					        	  {
					        		  var Total2 = allRowsInGrid1[j].taxAmount;
					        		  var Total3 = allRowsInGrid1[j].total;
					        		  if(Total2 != undefined)
					        		  {
					        			  totAmtWithTax = +totAmtWithTax + +Total2 + +Total3;
					        		  }
					        	  }
					        	  
					        	  document.getElementById("totalAmount").value = Total.toFixed(2);//Math.round(Total);
					        	  document.getElementById("grossTotal").value = Total.toFixed(2);//Math.round(Total);
					        	  var totAmount = Total.toFixed(2);//Math.round(Total);
				        	  }				   
				        	 
				        	 function totalDisC()
				        	 {
					        	  //TOTAL DISCOUNT AMOUNT
					        	  var TotalDisAmt = 0;
					        	  var TotalSPAmt = 0;
					        	  var disPer = 0;
					        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
					        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
					        	  var AllRows=JSON.stringify(allRowsInGrid1);
					        	  for (var l = 0; l < count; l++)
					        	  {
					        		  var TotalDisAmt1 = allRowsInGrid1[l].disAmount;
					        		  var TotalSPAmt1 = allRowsInGrid1[l].sPWithoutTax;
					        		  
					        		  if(TotalSPAmt1 != undefined)
					        		  {
					        			  TotalSPAmt = (+TotalSPAmt + +TotalSPAmt1).toFixed(2);
					        		  }
					        		  if(TotalDisAmt1 != undefined)
					        		  {
					        			  TotalDisAmt = (+TotalDisAmt + +TotalDisAmt1).toFixed(2);
					        			  disPer = ((TotalDisAmt/TotalSPAmt)*100).toFixed(2);
					        		  }						        	 
					        	  }
					        	  /*document.getElementById("discount1").value = disPer;*/
					        	  document.getElementById("discount").value = TotalDisAmt;
				        	 }
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}


function getSrCreditAmountForCredit()
{ 
	 var grossTot= document.getElementById("grossTotal").value;
	 if(grossTot == null || grossTot == "" || grossTot == undefined || grossTot == " " || grossTot === 0)
	 {
		 myAlert("Please Enter Barcode Number");
		 document.getElementById("key").focus();
		 document.getElementById("srTransactionId").value = "";
		 return false;
	 }
	 
	 var creditCustomer = $("#creditCustomer").val();
	 if(creditCustomer == null || creditCustomer == undefined || creditCustomer == "" || creditCustomer == " ")
	 {
		 alert("Please Select Customer Name");
		 document.getElementById("srTransactionId").value = "";
		 document.getElementById("creditCustomer").focus();
		 return false;
	 }
	 else
	 {	 
		var input = document.getElementById('creditCustomer'), 
		list = document.getElementById('cust_drop'), 
		i,fkRootCustId;
		for (i = 0; i < list.options.length; ++i)
		{
			if (list.options[i].value === input.value)
			{
				fkRootCustId = list.options[i].getAttribute('data-value');
			}
		}
	 }
	 
	 if(fkRootCustId == null || fkRootCustId == "" || fkRootCustId == undefined || fkRootCustId == " ")
	 {
		 alert("Please Select Registered Customer");
		 document.getElementById("srTransactionId").value = "";
		 document.getElementById("creditCustomer").focus();
		 return false;
	 }
	
	var srTransactionId = document.getElementById("srTransactionId").value;
	var params= {};

	params["srTransactionId"]=srTransactionId;
	params["fkRootCustId"] = fkRootCustId;
	params["methodName"] ="getSrCreditAmountController";
	document.getElementById("srTransactionId").value = "";

	var count=0;
	var newrow = false;
	var rowId;
	var vatAmt = 0;
	var totAmt = 0;
	var totalWithTax = 0;
	var tot = 0;
	var afterDelete;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;
		if(result <= "20")
		{
			alert("Invalid Transaction ID "+srTransactionId+" !!!");
			document.getElementById("srTransactionId").focus();
			return true;
		}		
		
		$.each(jsonData,function(i,v)
		{
			count = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#srCreditAmtGrid").jqGrid('getGridParam','data');
			var ids = jQuery("#srCreditAmtGrid").jqGrid('getDataIDs');
			
			/*
			 * if(count > 0) {
			 * $("#srCreditAmtGrid").addRowData(count,jsonData.offer); }
			 */
			for (var j = 0; j < count; j++) 
			{
				var tId = rowdata[j].transactionId;
				if(srTransactionId == tId)
				{
					 myAlert("Duplicate Transaction ID");
					 return false;
				}
				else
				{
					newrow = true;
				}
			}
			if(newrow == true)
			{
				$("#srCreditAmtGrid").addRowData(count,jsonData.offer);
			}
			
			$("#srCreditAmtGrid").jqGrid({
				
				datatype: "local",

				colNames:[	'pkId',
							'Transaction ID',
							'Amount',
							],
				colModel:[ 
				          {
				        	  name:'pkBillId',
				        	  width:25,
				        	  hidden:true,
				          },    
				          {
				        	  name:'transactionId',
				        	  width:50,
				        	  // hidden:true,
				          },
				          {
				        	  name:'returnTotal',
				        	  width:100,
				        	  sortable: false,				        	  
				          },
				          ],

				          sortorder : 'desc',
				          loadonce: false,
				          viewrecords: true,
				          /*width: 170,
				          height: 100,*/
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          
				          'cellEdit':true,
				          			          			          
				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount").value = "";
				        	  /*
								 * document.getElementById("discount1").value =
								 * "";
								 */
				        	  
				        	  var rowId =$("#srCreditAmtGrid").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#srCreditAmtGrid").getRowData(rowId);
				        	  var pkBillId = rowData['pkBillId'];
				        	  var transactionId = rowData['transactionId'];
				        	  var returnTotal = rowData['returnTotal'];				        	  
				        	},				        	
				        	
				        	gridComplete: function()
				            {
				        		var parseTotal=  $(this).jqGrid('getCol', 'returnTotal', false, 'sum');				            	 
				            	document.getElementById("totalCreditAmt").value = parseTotal.toFixed(2);
					        	var totalAmount = document.getElementById("totalAmount").value;
					         	var gtUpdate = +totalAmount - +parseTotal;
					         	
					         	if(gtUpdate > 0)
					        	{
					        		document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
					        	}
					        	else
					        	{	
					        		myAlert("Total Amount Is Less Than Total Credit Amount");
					        		document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
					        	}				            	 
				             },
				        	
				          pager: "#srJqGridPager",
			});
			if(count==0 || count==null)
			{
				$("#srCreditAmtGrid").addRowData(0,jsonData.offer);
			}
			$('#srCreditAmtGrid').navGrid('#srJqGridPager',

				{ del: true, edit: false, add: false,  search: false, refresh: false, view: false, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#srCreditAmtGrid').trigger('reloadGrid');
						},
						closeAfterdel:true,
						recreateForm: true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						closeAfterEdit: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},
					{
						afterSubmit: function()
						{
							$('#srCreditAmtGrid').trigger('reloadGrid');
						},
						closeAfterAdd: true,
						recreateForm: true,
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					},
					{
						afterComplete: function()
						{	
							$('#srCreditAmtGrid').trigger('reloadGrid');
							
							totalCalC();
				        	  
				        	function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var totaAmount = document.getElementById("totalAmount").value;
				        	  var discount = document.getElementById("discount").value;
				        	  var totalCreditAmt = document.getElementById("totalCreditAmt").value;
				        	  
				        	  document.getElementById("totalCreditAmt").value = Total.toFixed(2);
				        	  if(totalCreditAmt == "")
				        	  {
				        		  totalCreditAmt = 0;
				        	  }
				        	  
				        	  var totCAmt = 0;
				        	  var count = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#srCreditAmtGrid').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  for (var l = 0; l < count; l++)
				        	  {
				        		  creditAmt = allRowsInGrid1[l].returnTotal;
				        		  totCAmt = (+totCAmt + +creditAmt);				        		  
				        	  }
				        	  
				        	  document.getElementById("totalCreditAmt").value = totCAmt;
				        	  var updateGt = (+totaAmount - +totCAmt).toFixed(2);
				        	  if(updateGt < 0)
				        	  {
				        		  myAlert("Total Amount Is Less Than Total Credit Amount");
				        		  document.getElementById("grossTotal").value = gtUpdate;
				        	 }
				        	 else
				        	 {
				        		 document.getElementById("grossTotal").value = updateGt;
				        	 }
					        }
						},
						closeAfterdel:true,
						checkOnUpdate : true,
						checkOnSubmit : true,
						recreateForm: true,
						reloadAftersubmit:true,	
						errorTextFormat: function (data)
						{
							return 'Error: ' + data.responseText
						}
					});
				});
			})
}




function getCustomers()
{
	alert("GET CUSTOMER JS");
	$("#creditCustomer").append($("<option></option>").attr("value","").text("Select Customer"));
	var params= {};
	params["methodName"] = "getAllCustomers";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
		{
			$("#creditCustomer").append($("<option></option>").attr("value",i).text(v.firstName)); 
		});
	})
}

function regcreditcustomerbill()
{
	if(document.custord.creditCustomer.value == "")
	{
		myAlert("Select Customer Name.");
		return false;
	}	
	regCreditCustomerBill123();
}

function regCreditCustomerBill123()
{
	document.custord.btnSubmit.disabled = true; 
	var params= {};
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	if(Number(count) < 1)
	{
		myAlert("Please Enter Barcode");
		document.custord.btnSubmit.disabled=false;
		return false;
	}
	
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		params["pk_temp_id"+i] = pk_temp_id;

		var item_id = allRowsInGrid1[i].item_id;
		params["item_id"+i] = item_id;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;
		
		var style = allRowsInGrid1[i].style;
		params["style"+i] = style;

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
		
		var EmpName = allRowsInGrid1[i].EmpName;
		if( EmpName == null || EmpName == undefined || EmpName == "" || EmpName == " ")
		{
			var saleEmpId = 0;
			var saleEmpName = null
			params["saleEmpId"+i] = saleEmpId;
			params["saleEmpName"+i] = saleEmpName;
		}
		else
		{
			var res = EmpName.split(" ");
			
			var saleEmpId = res[0];
			params["saleEmpId"+i] = saleEmpId;
			
			var saleEmpName = res[1]+" "+res[2];
			params["saleEmpName"+i] = saleEmpName;
		}
		
		var size1 = allRowsInGrid1[i].size1;
		params["size1"+i] = size1;
		
		//rollSize
		var rollSize = allRowsInGrid1[i].rollSize;
		params["rollSize"+i] = rollSize;
		
		var goodReceiveQuantity = allRowsInGrid1[i].goodReceiveQuantity
		params["goodReceiveQuantity"+i] = goodReceiveQuantity;
		
  	    var perProductdisPer = allRowsInGrid1[i].disPerForBill;
		params["perProductdisPer"+i] = perProductdisPer;
		
		var perProductdisAmount = allRowsInGrid1[i].disAmount;
		params["perProductdisAmount"+i] = perProductdisAmount;
		
		var taxAmountAfterDis = allRowsInGrid1[i].taxAmountAfterDis;
		params["taxAmountAfterDis"+i] = taxAmountAfterDis;	
		
		var sPWithoutTax = allRowsInGrid1[i].sPWithoutTax;
		params["sPWithoutTax" + i] = sPWithoutTax;	
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;	
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;	
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;			
	}	
	
	var count1 = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records');
	if(count1 == "0" || count1 == null || count1 == undefined || count1 == "")
	{
		count1 = 0;
	}
	else
	{		
		var allRowsInGrid = $('#srCreditAmtGrid').getGridParam('data');
		var AllRows=JSON.stringify(allRowsInGrid);
		for (var j = 0; j < count1; j++)
		{
			var pkBillId = allRowsInGrid[j].pkBillId;
			params["pkBillId"+j] = pkBillId;
			
			var transactionId = allRowsInGrid[j].transactionId;
			params["transactionId"+j] = transactionId;
			
			var returnTotal = allRowsInGrid[j].returnTotal;
			params["returnTotal"+j] = returnTotal;
		}
	}	
	
	var billNo=$('#billNo').val();
	var input = document.getElementById('creditCustomer'),
	list = document.getElementById('cust_drop'),
	i,fkRootCustId,gstTinNo;
	for (i = 0; i < list.options.length; ++i) {
		if (list.options[i].value === input.value) {
			fkRootCustId = list.options[i].getAttribute('data-value');
			gstTinNo = list.options[i].getAttribute('myvalue');
		}
	}
	var input1 = document.getElementById('creditCustomer').value;
	var totalAmount=$('#totalAmount').val();
	var discount=$('#discount').val();
	
	if(discount == "")
	{
		discount = 0;
	}

	var grossTotal=$('#grossTotal').val();
	var paidAmt=$('#paidAmt').val();
	if(paidAmt == "" || paidAmt == "0" || paidAmt == null || paidAmt == undefined)
	{
		paidAmt = 0;
	}
	else
	{
		var matchPaidAmt = /^[0-9]+\.?[0-9]*$/;
		if(paidAmt.match(matchPaidAmt))
		{
			if(Number(paidAmt) > Number(grossTotal))
			{
				myAlert("Net Paid Amount must be Less Than Gross Total");
				document.custord.btnSubmit.disabled=false;
				return false;
			}
		}
		else
		{
			myAlert("Please Enter Valid net Paid Amount");
			document.custord.btnSubmit.disabled=false;
			return false;
		}
	}
	
	var paymentMode = $('#creditPaymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	
	var totalCreditAmt = $('#totalCreditAmt').val();
	if(totalCreditAmt == "" || totalCreditAmt == null || totalCreditAmt == " " || totalCreditAmt == undefined)
	{
		totalCreditAmt = 0;
	}else{}
	
	cashCard_cashAmount = $('#cashCard_cashAmount').val();
	if(cashCard_cashAmount == "" || cashCard_cashAmount == null || cashCard_cashAmount == " " || cashCard_cashAmount == undefined)
	{
		cashCard_cashAmount = 0;
	}else{}
	
	cashCard_cardAmount = $('#cashCard_cardAmount').val();
	if(cashCard_cardAmount == "" || cashCard_cardAmount == null || cashCard_cardAmount == " " || cashCard_cardAmount == undefined)
	{
		cashCard_cardAmount = 0;
	}else{}
	
	var cashAmount = "";	
	var cardAmount = "";

	if(paymentMode == "cashAndCard")
	{
		if(cashCard_cashAmount == undefined || cashCard_cashAmount == null || cashCard_cashAmount == "" || cashCard_cashAmount == " ")
		{
			myAlert("Please Enter Cash Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCashAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cashAmount.match(checkCashAmt))
			{
				params["cashCard_cashAmount"] = cashCard_cashAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		if(cashCard_cardAmount == undefined || cashCard_cardAmount == null || cashCard_cardAmount == "" || cashCard_cardAmount == " ")
		{
			myAlert("Please Enter Card Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else
		{
			var checkCardAmt = /^[0-9]+\.?[0-9]*$/;
			if(cashCard_cardAmount.match(checkCardAmt))
			{
				params["cashCard_cardAmount"] = cashCard_cardAmount;
			}
			else
			{
				myAlert("Please Enter Valid Cash Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		}
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) != +paidAmt)
		{
			myAlert("Cash Amount + Card Amount Must be Equals to Net Paid Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else{}
		/*
			if((+cashCard_cashAmount + +cashCard_cardAmount) < +grossTotal)
			{
				myAlert("Cash Amount + Card Amount is Less Than Total Amount");
				document.custord.btnSubmit.disabled = false;
				return false;
			}
		*/
	}
	else if(paymentMode == "cash")
	{	
		cashAmount = +paidAmt		 
	}
	else if(paymentMode == "card")
	{
		cardAmount = +paidAmt;		 
	}
	
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	if(+totalCreditAmt > 0)
	{
		if((+totalAmount - +totalCreditAmt) == +grossTotal)
		{}
		else if((+totalAmount - +totalCreditAmt) > +grossTotal)
		{
			myAlert("Please Check Total Credit Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
			
	if((+totalCreditAmt + (+cashCard_cashAmount + +cashCard_cardAmount)) > +totalAmount)
	{	
		alert("Plase Check All Payment Amounts\nIt Is Greater Than Total Amount");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	else{}
	
	params["billNo"] = billNo;
	params["input1"] = input1;
	params["fkRootCustId"] = fkRootCustId;
	params["gstTinNo"] = gstTinNo;
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = grossTotal;
	params["paidAmt"] = paidAmt;	
	params ["paymentMode"] = paymentMode;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params["userType"] = userType;
	params["userName"] = userName;
	params["count1"] = count1;	
	params["totalCreditAmt"] = totalCreditAmt;
	params["cashAmount"] = cashAmount;
	params["cardAmount"] = cardAmount;
	
	params["methodName"] = "regCreditCustomerBill";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{  
		alert(data);
		//window.open("CreditCustomerBillPDF_GHANTALWAR.jsp");
		window.open("creditCustBillingPDF.jsp");
		location.reload(true);
	}
	).error(function(jqXHR, textStatus, errorThrown)
			{
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}
