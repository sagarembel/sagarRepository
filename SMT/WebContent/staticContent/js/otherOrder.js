function myAlert(msg)
{
	var dialog = bootbox.dialog({
		// title: "Embel Technologies Says :",
	   /*
		 * message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'<img
		 * src="/Shop/staticContent/images/s1.jpg" height="50" width="50"/></p>',
		 */
	    message: '<p class="text-center">'+msg.fontcolor("red").fontsize(5)+'</p>',
	    closeButton: false
	   });
	
	   setTimeout(function()
	  {
		dialog.modal('hide');
	   }, 1500);
}

function reset1()
{
	document.itemdel.reset();
}
// this function for set value to EmployeeName to Grid Drop Down
var first;
function getEmpName()
{
	var params= {};
	
	params["methodName"] = "getEmpNameforGrid";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)	
	{  
		var jsonData = $.parseJSON(data);
		first = jsonData;
		// alert("get Data from DataBase****"+first);
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
	/* document.getElementById("discount1").value = ""; */
	
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	// getEmpName();
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
	var afterDelete;
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		var jsonData = $.parseJSON(data);
		var result = data.length;

		if(result <= "20")
		{
			alert("STOCK NOT AVAILABLE FOR "+value+" !!!");
			document.getElementById("key").focus();
			return true;
		}

		$.each(jsonData,function(i,v)
		{
			count = jQuery("#list4").jqGrid('getGridParam', 'records'); 
			var rowdata =$("#list4").jqGrid('getGridParam','data');
			var ids = jQuery("#list4").jqGrid('getDataIDs');
			
			function sumFmatter (cellvalue, options, rowObject)
			{						
				var totalWithoutTax = document.getElementById("totalAmount").value;
				var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				var allRowsInGrid1 = $('#list4').getGridParam('data');
				var rowId =$("#list4").jqGrid('getGridParam','selrow');
				// var rowData = jQuery("#list4").getRowData(rowId);
				var AllRows=JSON.stringify(allRowsInGrid1);
				// var grossTotal = 0;
									
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
					
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				if(+rowDelete == 0)
				{
		        	for (var a = 0; a <= count; a++)
					{
						total = allRowsInGrid1[a].total;
		        		grossTotal = +grossTotal + +total;
		        		
		        		disAmt = allRowsInGrid1[a].disAmount;
					    grossDisTotal = +grossDisTotal + +disAmt
		        	}
		        	
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);// Math.round(totalWithoutTax);
					document.getElementById("discount").value = grossDisTotal.toFixed(2);// Math.round(totalWithoutTax);
				}
				
				return total;
			}
			
			getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;
			
			getEmpName();
			var empname = first;
			
			// alert("in grid++++"+empname);
			
			var prodName,com,bar,subCat,size,rollSize;
			var sameRowCount = 1;
			for (var j = 0; j < count; j++) 
			{
				var totalQty = count;
				prodName = rowdata[j].itemName;
				com = rowdata[j].categoryName;
				bar = rowdata[j].barcodeNo;
				subCat = rowdata[j].subCategoryName;
				availQty = rowdata[j].goodReceiveQuantity;
				size = rowdata[j].size1;
				rollSize = rowdata[j].rollSize;
				var rowId = ids[j];
				var rowData = jQuery('#list4').jqGrid ('getRowData', rowId);
				
				// if (prodName == jsonData.offer.itemName && com ==
				// jsonData.offer.categoryName && bar ==
				// jsonData.offer.barcodeNo && subCat ==
				// jsonData.offer.subCategoryName)
				if(bar == jsonData.offer.barcodeNo)
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
					
					if(Number(sameRowCount) > Number(availQty))
					{					
						alert("Available Stock for "+(j+1)+"=>"+bar+"=>"+prodName+"=> "+availQty);
						newrow = false;
						return false;
					}
					else
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
				document.getElementById("totalQuantity").value = totalQty+1;
				$("#list4").addRowData(count,jsonData.offer);			
			}			
			
			$("#list4").jqGrid({
				
				datatype: "local",

				colNames:[	'pk_temp_id',
							'item_id',
							'Barcode<br>NO',
							'Category',
							'fkCategoryId',
							'Sub<br>Category',
							'fkSubCatId',
							'Product',
							'fkProductId',
							'Roll Size',
							'Style',
							'HSN/SAC',
							'Qty',
							'Size',
							'Good Receive Quantity',
							'S.P./Unit',
							'S.P.<br>W/O<br>Tax',
							'Dis<br>%',
							'Dis<br>Amt',
							'S.P.<br>After<br>Dis',
							'GST<br>%',
							'IGST%',
							'Tax<br>Amt',
							'Tax Amt<br>Aft<br>Dis',
							'Total<br>Amt',
							'Employee<br>Name',
							'forTotal'
							],
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
				        	  sortable: false,
				        	  
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
				        	  name:  "rollSize",
				        	  hidden:true,
				          },
				          {	
				        	  name:'style',
				        	  width:100,				        	  
				          },				          
				          {	
				        	  name:'hsnSacNo',
				        	  width:100,
				        	  sortable: false,
				          },
				          {	
				        	  name:'quantity',
				        	  width:70,
				        	  editable: true,
				        	  sortable: false,				        	  
				          },
				          {	  
				        	  id:'size1',
				        	  name:'size1',
				        	  width:80,
				        	  // editable: true,
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
				        	  //hidden:true
				          },
				          {	
				        	  name:'disPerForBill',
				        	  width:80,
				        	  sortable: false,
				        	  editable: true,
				        	  //hidden:true
				          },
				          {	
				        	  name:'disAmount',
				        	  width:105,
				        	  sortable: false,
				        	  //editable: true,
				          },
				          {	
				        	  name:'spAfterDis',
				        	  width:120,
				        	  sortable: false,
				        	  //hidden:true,
				        	  // editable: true
				          },
				          {	  
				        	  name:'vat',
				        	  width:80,
				        	  sortable: false,
				        	  // editable: true
				          },
				          {	
				        	  name:'igst',
				        	  width:80,
				        	  sortable: false,
				        	  // editable: true,
				        	  hidden:true,
				          },
				          /*{	
				        	  name:'igst',
				        	  width:80,
				        	  // editable: true,
				        	  sortable: false,
				        	  hidden:true,
				          },	*/
				          {	  name:'taxAmount',
				        	  width:105,
				        	  sortable: false,
				        	  // hidden: true,
				          },				          
				          {	  
				        	  name:'taxAmountAfterDis',
				        	  width:110,
				        	  sortable: false,
				          },		          
				          {	
				        	  name:'total',
				        	  width:140,
				        	  sortable: false,
				        	  // formatter: sumFmatter
				          },
				         /*
							 * { name: "employeeName1", width:250,
							 * align:'center', editable:true,
							 * 
							 * edittype: 'select', editoptions: { ladies
							 * //value: "1:Pratiksha Shendage;2:Tabbu
							 * Sayyad;3:Meenakshi Chauhan;4:Gosiya
							 * Shaikh;5:Afreen Mulani;6:yogesh durgude;7:Akshay
							 * Gaikwad;8:Swati Sapkal" value: "1:haridas
							 * gophane;2:Dinesh Navsare;3:Ujjwala Devart;4:sagar
							 * kharat;5:Anjali Lalbhige;6:nitesh dhumal;7:VICKY
							 * MANE" } }
							 */
				          {	
				        	  name:'employeeName1',// this is for take drop // down in grid
				        	  width:250,
				        	  align:'center',
				        	  sortable: false,
                              editable:true,
                              edittype: 'select', 
                              editoptions: { value:empname}
				          },
				          { 
				        	   name:  "forTotal",
				        	   sortable: false,
				        	   formatter: sumFmatter,
				        	   hidden:true,
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
				        	  /*
								 * document.getElementById("discount1").value =
								 * "";
							  */				        	  
				        	  var rowId =$("#list4").jqGrid('getGridParam','selrow');  
				        	  var rowData = jQuery("#list4").getRowData(rowId);
				        	  var quantity = rowData['quantity'];
				        	  var salePrice = rowData['salePrice'];
				        	  var gst = rowData['vat'];
				        	  var barcodeNo = rowData['barcodeNo'];
				        	  var size1 = rowData['size1'];
				        	  var sPWithoutTax = rowData['sPWithoutTax'];
				        	  var disPer = rowData['disPerForBill'];
				        	  var disAmount = rowData['disAmount'];
				        	  var taxAmountAfterDis = rowData['taxAmountAfterDis'];
				        	  var total = rowData['total'];				        	  
				        	  var tota = 0;
				        	  var vatAmt = 0;
				        	  var totAmt = 0;
				        	  var roundOfftota = 0;
				        	  var roundOffvatAmt = 0;
				        	  var totSPWtax = 0
				        	  var disAmt = 0;
				        	  var finalSP = 0;
				        	  var spWDis = 0;
				        	  var newTaxAmt = 0;
				        	  var newSalePrice = 0;
				        	  var newFinalSP = 0;
				        	  var finalSalePrice = salePrice;
				        	  var finalSpWithoutTax = sPWithoutTax;	
				        	  
				        	  // alert("sPWithoutTax ====> "+sPWithoutTax);
				        	  
				        	  var goodReceiveQuantity = rowData['goodReceiveQuantity'];
				        	  var rSizeForStock = rowData['rollSize'];
				        	  var sMeter = goodReceiveQuantity*rSizeForStock;
				        	  
				        	  if(rSizeForStock!="0")
				        	  {
					        	  if(Number(quantity) > Number(sMeter))
					        	  {
					        		  var setQty = 1;
					        		  alert("Available Stock ="+sMeter);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }
				        	  }
				        	  else
			        		  {
				        		  quantity = 1;
				        		  var setQty = 1;
/*				        		  if(Number(quantity) > Number(goodReceiveQuantity))
					        	  {
					        		  alert("Available Stock ="+goodReceiveQuantity);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }*/
				        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
				        	  }
				        	  tota = quantity * salePrice;
				        	  totAmt = quantity * salePrice;
				        	   
				        	  if(gst != "0")
				        	  {
				        		  vatAmt =  (tota - (tota/(1+(gst/100))));
				        		  totAmt = +tota + +vatAmt;
				        		  roundOffvatAmt = vatAmt.toFixed(2);
				        	  }
				        	  
				        	  $("#list4").jqGrid("setCell", rowId, "taxAmount", roundOffvatAmt);
				        	 // $("#list4").jqGrid("setCell", rowId, "total",
								// roundOfftota);
				        	 
				        	  
/*				        	  var checkDisAmt = /^[0-9]+\.?[0-9]*$/;
				        	  if(disAmount.match(checkDisAmt))
				        	  {
				        		  if(Number(disAmount) >= Number(sPWithoutTax))
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
					        	  }
				        		  if(Number(disAmount) == 0)
				        		  {
				        			  var setZero = 0;
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
						        	  totalCalC();
						        	  totalDisC();						        	  
				        		  }
				        		  else
				        		  {
				        			  var setDisPer = ((disAmount/sPWithoutTax)*100);
				        			  // disPer = setDisPer;
				        			  var spwtAfterDis = sPWithoutTax - disAmount;
				        			  var setTaxAmtAftDis = 0;
				        			  if(Number(gst) > 0)
				        			  {
				        				  setTaxAmtAftDis = (spwtAfterDis - (spwtAfterDis/(1+(gst/100))));
				        				  
				        			  }
				        			  else
				        			  {  
				        				  setTaxAmtAftDis = 0;
				        			  }				        			  
				        			  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setDisPer.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setTaxAmtAftDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", spwtAfterDis.toFixed(2));
						        	  $("#list4").jqGrid("setCell", rowId, "total", spwtAfterDis.toFixed(2));
				        		  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  alert("Please Enter valid Discount Amount");
				        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
				        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "spAfterDis", sPWithoutTax);
					        	  $("#list4").jqGrid("setCell", rowId, "total", sPWithoutTax);
				        		  return false;
				        	  }
*/				        	  				        	 

							 var checkDisPer = /^[0-9]+\.?[0-9]*$/;
							 if(disPer.match(checkDisPer) || disPer != "" || disPer!= null)
							 { 
								 var setZero = "0"; 
								 if(Number(disPer) >= 100)
								 {
									 var disP;
									 disAmount = 0;
									 myAlert("Discount Percentage Must Be Less Than 100");
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
									 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
									 totalCalC(); 
									 totalDisC(); 
									 return false; 
								 }
								 else if(disPer == "0")
								 { 
									 var disP = 0;
								 disAmount = 0; $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
								 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
								 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
								 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
								 $("#list4").jqGrid("setCell", rowId, "total", salePrice);
								 }
							}
							else
							{ 
								var setZero = 0;
								var disP = 0;
								if(disPer == "" || disPer == "0")
								{
									 $("#list4").jqGrid("setCell", rowId, "disPerForBill", disP)
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
									 $("#list4").jqGrid("setCell", rowId, "total", salePrice); totalCalC();
									 totalDisC(); return false;
								}
							}
							 				        	  
							
							 var checkSp = /^[0-9]+\.?[0-9]*$/;
							 if(salePrice.match(checkSp))
							 {
								 if(Number(salePrice) > 0)
								 { 
									 spwTax = (salePrice/(1+(gst/100)));
									 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", spwTax.toFixed(2));
									 
									// rangeGst(salePriceembel);
									 
									 	if(Number(disPer) > 0)
									 	{ 
									 		if(Number(gst) > 0)
									 		{ 
									 			disAmt = (spwTax*(disPer/100)); 
									 			finalSP = spwTax - disAmt; 
									 			
									 			// rangeGst(finalSP);
									 			
									 			newTaxAmt = (((finalSP*quantity)*gst)/100);
									 			var oneProTax = (((finalSP)*gst)/100); 
									 			newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity;
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
/*									 	else if(disAmount > 0)
									 	{
									 		var disP = " "; 
									 		$("#list4").jqGrid("setCell", rowId, "disPerForBill", disP);
							 
											 var checkDisAmt = /^[0-9]+\.?[0-9]*$/; 
											 if(disAmount.match(checkDisAmt))
											 {
												 if(Number(disAmount) >= Number(sPWithoutTax))
												 {
													 var setZero = 0;
													 myAlert("Discount Amount Must Be Less Than Sale Price Withount Tax");
													 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC(); 
													 return false;
												 }
												 if(Number(disAmount) == 0 || disAmount == "" || disAmount == undefined || disAmount == null)
												 {
													 var setZero = 0; 
													 $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
													 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
													 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
													 totalCalC();
													 totalDisC();
											  }
												 else if(Number(disPer) > 0)
												 {
													 var disA = 0; $("#list4").jqGrid("setCell",rowId, "disAmount", disA);											 
													 if(Number(gst) > 0) 
													 { 
														 disAmt = (spwTax*(disPer/100));
														 finalSP = spwTax - disAmt;
														 newTaxAmt = (((finalSP*quantity)*gst)/100);
														 var oneProTax = (((finalSP)*gst)/100); 
														 newFinalSP = finalSP + oneProTax; tota = newFinalSP * quantity; 
														 disAmt = disAmt * quantity; 
														 vatAmt = vatAmt * quantity;
											 
											 //$("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newFinalSP.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "disAmount", disAmt.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
														 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
														 totalCalC(); 
														 totalDisC();
													}
													else if(Number(gst) == 0)
													{
														var setZero = 0; spwTax = salePrice - 0;											 
														if(spwTax > 0 && spwTax <= 1000)
														{
															gst = 5; $("#list4").jqGrid("setCell", rowId, "vat", gst);
														} 
														else if(spwTax > 1000) 
														{
															gst = 12;
															$("#list4").jqGrid("setCell", rowId, "vat", gst);
														}
											 
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
											 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2)); 
											 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", newTaxAmt.toFixed(2)); 
											 totalCalC(); 
											 totalDisC(); 
											 }
													 }
												 }
											 }
*/									 	else 
									 	{
									 		 var setZero = 0; 
									 		 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
											 $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
											 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
											 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
											 }
									 	}
								 else
								 {
									 var setZero = 0; $("#list4").jqGrid("setCell", rowId, "sPWithoutTax",
									 setZero); $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
									 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
									 $("#list4").jqGrid("setCell", rowId, "total", setZero);
									 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
									 false;
									 }
								 }
											 
											
								 else { var setZero = 0; alert("Pleae Enter Valid Sale Price");
								 $("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
								 $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
								 $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
								 $("#list4").jqGrid("setCell", rowId, "spAfterDis", setZero);
								 $("#list4").jqGrid("setCell", rowId, "total", setZero);
								 $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero); return
								 false;
								 
								 }
				 				        	  
				        	 totalCalC();
				        	 totalDisC();
				        	  
				        	 function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var totCreditAmt = document.getElementById("totalCreditAmt").value;
				        	  if(totCreditAmt == "")
				        	  {
				        		  totCreditAmt = 0;
				        	  }else{}				        	  
				        	  var grossTotal = document.getElementById("grossTotal").value;
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
				        	  
				        	  document.getElementById("totalAmount").value = Total.toFixed(2);// Math.round(Total);
				        	  var updateGT = (+Total - +totCreditAmt).toFixed(2);
				        	  var totAmt  = document.getElementById("totalAmount").value;
				        	  
				        	  document.getElementById("grossTotal").value = updateGT;
				        	  var totAmount = Total.toFixed(2);// Math.round(Total);
					        }
				        	  
				        	function totalDisC()
					        {
					        	  // TOTAL DISCOUNT AMOUNT
					        	  var TotalDisAmt = 0;
					        	  var TotalSPAmt = 0;
					        	  var disPer = 0;
					        	  var totCreditAmt = document.getElementById("totalCreditAmt").value;
					        	  var totalAmount = document.getElementById("totalAmount").value;
					        	  if(totCreditAmt == "")
					        	  {
					        		  totCreditAmt = 0
					        	  }else{}
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
					        	  var updateGT = (+totalAmount - +totCreditAmt).toFixed(2);
					        	 
					        	  document.getElementById("grossTotal").value = updateGT;
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
			            	 else if(totCreditAmt > 0)
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
				          },
				          
				          
				          pager: "#jqGridPager",
			});
			if(count==0 || count==null)
			{
				$("#list4").addRowData(0,jsonData.offer);
				document.getElementById("totalQuantity").value = 1;
			}
			$('#list4').navGrid('#jqGridPager',

				{ edit: true, add: false, del: true, search: true, refresh: false, view: true, position: "left", cloneToTop: false },
					{
						editCaption: "The Edit Dialog",
						afterSubmit: function()
						{
							$('#list4').trigger( 'reloadGrid' );
						},
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
							document.getElementById("totalQuantity").value = (+document.getElementById("totalQuantity").value - +1);
							$('#list4').trigger('reloadGrid');
							
							rowDelete = 0;
							
							totalCalC();
				        	totalDisC();
				        	  
				        function totalCalC()
					    {	
			        	  var Total = 0;
			        	  var totAmtWithTax = 0;
			        	  var totalCreditAmt = document.getElementById("totalCreditAmt").value;
			        	  if(totalCreditAmt == "")
			        	  {
			        		  totalCreditAmt = 0;
			        	  }
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
			        	  document.getElementById("totalAmount").value = Total.toFixed(2);// Math.round(Total);
			        	  var gtUpdate = (+Total - +totalCreditAmt).toFixed(2);
			        	  if(+gtUpdate < 0)
			        	  {
			        		  alert("Total Credit Amount is Greater Than Total Bill Amount");
			        		  document.getElementById("grossTotal").value = gtUpdate;
			        	  }
			        	  else
			        	  {
				        	  document.getElementById("grossTotal").value = gtUpdate;		        		  
			        	  }

			        	  var totAmount = Total.toFixed(2);// Math.round(Total);
					    }
				        	  
			        	function totalDisC()
				        {
			        	  // TOTAL DISCOUNT AMOUNT
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
			        	  /*
							 * document.getElementById("discount1").value =
							 * disPer;
							 */
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

function getSrCreditAmount()
{ 
	 var grossTot= document.getElementById("grossTotal").value;
	 if(grossTot == null || grossTot == "" || grossTot == undefined || grossTot == " " || grossTot === 0)
	 {
		 myAlert("Please Enter Barcode Number");
		 document.getElementById("srTransactionId").value = "";
		 return false;
	 }
	
	var srTransactionId = document.getElementById("srTransactionId").value;
	var params= {};

	params["srTransactionId"]=srTransactionId;
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
				        	  if(updateGt > 0)
				        	  {
				        		  document.getElementById("grossTotal").value = updateGt.toFixed(2);
				        	 }
				        	 else
				        	 {
				        		  myAlert("Total Amount Is Less Than Total Credit Amount");
				        		  document.getElementById("grossTotal").value = gtUpdate.toFixed(2);
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

function resotherbill()
{	
	var mobileno = $('#mobileNo').val();
	var key = $('#key').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	
	/*
	 * if (document.custord.employee1.value == "") { alert("Select Employee
	 * Name."); return false; }
	 */
	/*
	 * if (document.custord.creditCustomer1.value == "") { alert("Please Enter
	 * Customer Name."); return false; }
	 */
	if(mobileno == null || mobileno == "" || mobileno == " ")
	{
		resOtherBill();
	}
	else
	{
		if(monoPatternRes)
		{
			resOtherBill();
		}
		else
		{
			alert("Enter Valid 10 Digit Moible Number");
		}
	}
		/*
		 * } else { alert("Please Enter mobile number !"); }
		 */

}

function resOtherBill()
{	
	/* document.getElementById("btnSubmit").disabled = true; */
	document.custord.btnSubmit.disabled = true;
	var params= {};
	
	var count = jQuery("#list4").jqGrid('getGridParam', 'records');
	if(count == "0" || count == null || count == undefined || count == "")
	{
		myAlert("Please Enter Barcode");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	var allRowsInGrid1 = $('#list4').getGridParam('data');
	var AllRows=JSON.stringify(allRowsInGrid1);
	for (var i = 0; i < count; i++)
	{
		var barcodeNo = allRowsInGrid1[i].barcodeNo;
		params["barcodeNo"+i] = barcodeNo;
				
		var pk_temp_id = allRowsInGrid1[i].pk_temp_id;
		params["pk_temp_id"+i] = pk_temp_id;

		var item_id = allRowsInGrid1[i].item_id;
		params["item_id"+i] = item_id;

		var categoryName = allRowsInGrid1[i].categoryName;
		params["categoryName"+i] = categoryName;

		var itemName = allRowsInGrid1[i].itemName;
		params["itemName"+i] = itemName;

		var hsnSacNo = allRowsInGrid1[i].hsnSacNo;
		params["hsnSacNo"+i] = hsnSacNo;

		var quantity = allRowsInGrid1[i].quantity;
		params["quantity"+i] = quantity;

		var salePrice = allRowsInGrid1[i].salePrice;
		params["salePrice"+i] = salePrice;

		var vat = allRowsInGrid1[i].vat;
		params["vat"+i] = vat;

		var igst = allRowsInGrid1[i].igst;
		params["igst"+i] = igst;

		var taxAmount = allRowsInGrid1[i].taxAmount;
		params["taxAmount"+i] = taxAmount;

		var total = allRowsInGrid1[i].total;
		params["total"+i] = total;

		var employeeName1 = allRowsInGrid1[i].employeeName1;
		if( employeeName1 == null || employeeName1 == undefined || employeeName1 == "" || employeeName1 == " ")
		{
			var saleEmpId = 0;
			var saleEmpName = null
			params["saleEmpId"+i] = saleEmpId;
			params["saleEmpName"+i] = saleEmpName;
		}
		else
		{			
			var res = employeeName1.split(" ");			
			var saleEmpId = res[0];
			params["saleEmpId"+i] = saleEmpId;
			var saleEmpName = res[1]+" "+res[2];
			params["saleEmpName"+i] = saleEmpName;
		}
		
		// rollSize
		var rollSize = allRowsInGrid1[i].rollSize;
		params["rollSize"+i] = rollSize;
		
		var goodReceiveQuantity = allRowsInGrid1[i].goodReceiveQuantity
		params["goodReceiveQuantity"+i] = goodReceiveQuantity;
		
		if(rollSize != "0")
		{
			var sMeter = goodReceiveQuantity*rollSize;
			if(Number(quantity) > Number(sMeter))
      	  	{
      		  	alert("Available Stock ="+sMeter);
      		  	document.custord.btnSubmit.disabled = false;
      		  	return false;
      	  	}
		}
		else
		{
   		  if(Number(quantity) > Number(goodReceiveQuantity))
       	  {
       		  alert("Available Stock ="+goodReceiveQuantity);
       		  document.custord.btnSubmit.disabled = false;
       		  return false;
       	  }
   	  	}
		
		var perProductdisPer = allRowsInGrid1[i].disPerForBill;
		params["perProductdisPer" + i] = perProductdisPer;
		
		var perProductdisAmount = allRowsInGrid1[i].disAmount;
		params["perProductdisAmount"+i] = perProductdisAmount;
		
		var taxAmountAfterDis = allRowsInGrid1[i].taxAmountAfterDis;
		params["taxAmountAfterDis"+i] = taxAmountAfterDis;	
		
		var size1 = allRowsInGrid1[i].size1;
		params["size1" + i] = size1;	
		
		var size1 = allRowsInGrid1[i].size1;
		params["size1" + i] = size1;
		
		var sPWithoutTax = allRowsInGrid1[i].sPWithoutTax;
		params["sPWithoutTax" + i] = sPWithoutTax;	
		
		var fkProductId = allRowsInGrid1[i].fkProductId;
		params["fkProductId" + i] = fkProductId;	
		
		var fkSubCatId = allRowsInGrid1[i].fkSubCatId;
		params["fkSubCatId" + i] = fkSubCatId;	
		
		var fkCategoryId = allRowsInGrid1[i].fkCategoryId;
		params["fkCategoryId" + i] = fkCategoryId;	
		
		var style = allRowsInGrid1[i].style;
		params["style" + i] = style;	
	}
	
	
	var count1 = jQuery("#srCreditAmtGrid").jqGrid('getGridParam', 'records');
	if(count1 == "0" || count1 == null || count1 == undefined || count1 == "")
	{
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
	var totalAmount=$('#totalAmount').val();
	var discount=$('#discount').val();
	if(discount == "")
	{
		discount = 0;
	}
	var grossTotal=$('#grossTotal').val();
	if(grossTotal < 0)
	{
		alert("Please Check Gross Total");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	
	/* var employee1 = $('#employee1').val(); */
	var creditCustomer1 = $('#creditCustomer1').val();
	var mobileNo = $('#mobileNo').val();
	var paymentMode = $('#paymentMode').val();		
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var totalCreditAmt = $('#totalCreditAmt').val();
	var cashCard_cashAmount = "";
	var cashCard_cardAmount = "";
	var cashAmount = "";
	var cardAmount = "";
	
	if(paymentMode == "cashAndCard")
	{
		cashCard_cashAmount = $('#cashCard_cashAmount').val();
		cashCard_cardAmount = $('#cashCard_cardAmount').val();
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
		
		if((+cashCard_cashAmount + +cashCard_cardAmount) > +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Greater Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
		else if((+cashCard_cashAmount + +cashCard_cardAmount) < +grossTotal)
		{
			myAlert("Cash Amount + Card Amount is Less Than Total Amount");
			document.custord.btnSubmit.disabled = false;
			return false;
		}
	}
	else if(paymentMode == "cash")
	{
		if(+totalCreditAmt > 0)
		{
			cashAmount = +totalAmount - +totalCreditAmt;
		}			 
	}
	else if(paymentMode == "card")
	{
		if(+totalCreditAmt > 0)
		{
			cardAmount = +totalAmount - +totalCreditAmt;
		}			 
	}
	
	var newBill = $('#newBill').val();
	var userType = $('#userType').val();
	var userName = $('#userName').val();
	
	if((+totalAmount - +totalCreditAmt) == +grossTotal)
	{}
	else
	{
		myAlert("Please Check Total Credit Amount");
		document.custord.btnSubmit.disabled = false;
		return false;
	}
	
	
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = totalAmount;
	//params["grossTotal"] = grossTotal;
	/* params["employee1"] = employee1; */
	params["creditCustomer1"] = creditCustomer1;
	params["mobileNo"] = mobileNo;
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
	params["methodName"] = "registerOtherBill";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		myAlert("Bill Added Successfully");
		
		if(newBill == "newBill")
		{
			// alert(data);
			// window.open("Other_Bill_PDF.jsp");
			// window.open("Other_Bill_PDF_GHATALWAR.jsp");
			window.open("pehenavaOtherBillPDF.jsp");
			location.reload(true);
			window.close();
		}
		else	
		{
			//alert(data);
			// window.open("Other_Bill_PDF.jsp");
			// window.open("Other_Bill_PDF_GHATALWAR.jsp");
			window.open("pehenavaOtherBillPDF.jsp");
			location.reload(true);
		}
		
	}).error(function(jqXHR, textStatus, errorThrown)
	{
		if(textStatus==="timeout")
		{
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});
}