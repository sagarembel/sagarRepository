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

function reset1()
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
		//alert("get Data from DataBase****"+first);
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
	/*document.getElementById("discount1").value = "";*/
	
	var value = document.getElementById("key").value;
	var carNo = $('#carNo').val();
	//getEmpName();
	//var vikas = first;
	
	//alert("before Grid----"+vikas);
	
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
					    grossDisTotal = +grossDisTotal + +disAmt
		        	}
		        	
					document.getElementById("totalAmount").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);
					document.getElementById("grossTotal").value = grossTotal.toFixed(2);//Math.round(totalWithoutTax);
					document.getElementById("discount").value = grossDisTotal.toFixed(2);//Math.round(totalWithoutTax);
				}
				
				return total;
			}
			
			getEmpName();
			var empname = first;
			
			//alert("in grid++++"+empname);
			
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
				
				//if (prodName == jsonData.offer.itemName && com == jsonData.offer.categoryName && bar == jsonData.offer.barcodeNo && subCat == jsonData.offer.subCategoryName)
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

				colNames:['pk_temp_id','item_id','Barcode<br>NO','Category<br>Name','Category<br>Id','Sub<br>Category<br>Name', 'Sub<br>Category<br>ID',
						'Item<br>Name','Product<br>Id','HSN/SAC', 'Quantity', 'Size', 'Good Receive Quantity', 'SalePrice<br>Per<br>Unit','SalePrice<br>Without<br>Tax',
							'GST<br>%','IGST%', 'tax<br>Amount', 'Tax Amt<br>After<br>Discnt', 'Discount<br>%','Dis<br>Amt', 'IGST%', 'Total<br>Amt',
							'Employee<br>Name','ROll Size', 'forTotal'],
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
				          {	name:'hsnSacNo',
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
				        	  //editable: true,
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
				        	  width:100,
				        	  sortable: false,				        	  
				          },
				          {	  
				        	  name:'vat',
				        	  width:80,
				        	  sortable: false,
				        	  editable: true
				          },
				          {	
				        	  name:'igst',
				        	  width:80,
				        	  sortable: false,
				        	 // editable: true,
				        	  hidden:true,
				          },
				          {	  name:'taxAmount',
				        	  width:150,
				        	  sortable: false,
				        	  //hidden: true,
				          },				          
				          {	  
				        	  name:'taxAmountAfterDis',
				        	  width:150,
				        	  sortable: false,
				          },				          
				          {	
				        	  name:'disPerForBill',
				        	  width:80,
				        	  sortable: false,
				        	  editable: true,
				          },				          
				          {	
				        	  name:'disAmount',
				        	  width:80,
				        	  sortable: false,
				        	  editable: true
				          },				          
				          {	
				        	  name:'igst',
				        	  width:80,
				        	  //editable: true,
				        	  sortable: false,
				        	  hidden:true,
				          },				          
				          {	
				        	  name:'total',
				        	  width:150,
				        	  sortable: false,
				        	  //formatter: sumFmatter
				          },
				         /* {
				        	   name:  "employeeName1",
				        	       width:250,
					        	  align:'center',
	                              editable:true,
	                              
	                              edittype: 'select',
				        	   editoptions: {
				        		ladies  //value: "1:Pratiksha Shendage;2:Tabbu Sayyad;3:Meenakshi Chauhan;4:Gosiya Shaikh;5:Afreen Mulani;6:yogesh durgude;7:Akshay Gaikwad;8:Swati Sapkal"
				        		   value: "1:haridas gophane;2:Dinesh Navsare;3:Ujjwala Devart;4:sagar kharat;5:Anjali Lalbhige;6:nitesh dhumal;7:VICKY MANE"  
				        	   }
				           }*/
				          {	name:'employeeName1',//this is for take drop down in grid
				        	  width:250,
				        	  align:'center',
				        	  sortable: false,
                              editable:true,
                              edittype: 'select', 
                              editoptions: { value:empname}
				          },
				          { 
				        	   name:  "rollSize",
				        	   hidden:true,
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
				          width: 1250,
				          shrinkToFit: true,
				          hoverrows: true,
				          rownumbers: true,
				          rowNum: 10,
				          
				          'cellEdit':true,
				          			          			          
				          afterSaveCell: function ()
				          {  
				        	  document.getElementById("discount").value = "";
				        	  /*document.getElementById("discount1").value = "";*/
				        	  
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
				        	  
				        	  //alert("sPWithoutTax ====> "+sPWithoutTax);
				        	  
				        	  var goodReceiveQuantity = rowData['goodReceiveQuantity'];
				        	  var rSizeForStock = rowData['rollSize'];
				        	  var sMeter = goodReceiveQuantity*rSizeForStock;
				        	  
				        	  /*if(sPWithoutTax > 0 && sPWithoutTax <= 1000)
				        	  {
				        		  gst = 5;
				        	  }
				        	  else if(sPWithoutTax > 1000)
				        	  {
				        		  gst = 12;
				        	  }*/
				        	  
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
				        		  if(Number(quantity) > Number(goodReceiveQuantity))
					        	  {
				        			  var setQty = 1;
					        		  alert("Available Stock ="+goodReceiveQuantity);
					        		  $("#list4").jqGrid("setCell", rowId, "quantity", setQty);
					        		  quantity=setQty;
					        	  }
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
				        	 // $("#list4").jqGrid("setCell", rowId, "total", roundOfftota);	
				        	 
				        	  var checkDisPer = /^[0-9]+\.?[0-9]*$/;
				        	  if(disPer.match(checkDisPer) )
				        	  {
				        		  if(Number(disPer) >= 100)
					        	  {
					        		  var setZero = 0;
					        		  myAlert("Discount Percentage Must Be Less Than 100");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  totalCalC();
						        	  totalDisC();
					        		  return false;
					        	  }
				        	  }
				        	  else
				        	  {
				        		  var setZero = 0;
				        		  
				        		  if(disPer == "" || disAmount == "" || disPer == " " || disAmount == " ")
				        		  {				        			 
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
					        		  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "total", salePrice);
						        	  totalCalC();
						        	  totalDisC();
						        	  return false;
					        	  }
				        		  else
				        		  {
					        		  myAlert("Pleaee Enter Valid Discount value");
					        		  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
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
						        		  
						        		  /*if(Number(disPer) > 0)
					        			  {
						        			  disAmt = (spwTax*(disPer/100));
						        			  if((sPWithoutTax - disAmt) > 0 && (sPWithoutTax - disAmt) <= 1000)
						        			  {
						        				  
						        			  }
					        			  }*/
						        		  
						        		  if(spwTax > 0 && spwTax <= 1000)
							        	  {
							        		  gst = 5;
							        		  var newTaxAmt = (salePrice - (salePrice/(1+(gst/100)))).toFixed(2);
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt);
							        	  }
							        	  else if(spwTax > 1000)
							        	  {
							        		  gst = 12;
							        		  var newTaxAmt = (salePrice - (salePrice/(1+(gst/100)))).toFixed(2);
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "taxAmount", newTaxAmt);
							        	  }						        		  
						        		  
						        	if(Number(disPer) > 0)
						        	{
						        		var disA = 0;
						        		$("#list4").jqGrid("setCell", rowId, "disAmount", disA);	
						        		
										disAmt = (spwTax*(disPer/100));
					        			  if((salePrice - disAmt) > 0 && (salePrice - disAmt) <= 1000)
					        			  {
					        				  gst = 5;
							        		  var newTaxAmt = (salePrice - (salePrice/(1+(gst/100)))).toFixed(2);
							        		  var newSpWTax = (salePrice/(1+(gst/100))).toFixed(2);
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSpWTax);
					        			  }
					        			  else if((salePrice - disAmt) > 1000)
					        			  {
					        				  gst = 12;
							        		  var newTaxAmt = (salePrice - (salePrice/(1+(gst/100)))).toFixed(2);
							        		  var newSpWTax = (salePrice/(1+(gst/100))).toFixed(2);
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", newSpWTax);
					        			  }
						        		
						        		  if(Number(gst) > 0)
						        		  {  
						        			  alert("GST ==> "+gst);						        			  
						        			  finalSP = spwTax - disAmt;
						        			  newTaxAmt = (((finalSP*quantity)*gst)/100);
						        			  var oneProTax = (((finalSP)*gst)/100);
						        			  newFinalSP = finalSP + oneProTax;
						        			  tota = newFinalSP * quantity;
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
						        			  alert("GST ==> "+gst);
						        			  var setZero = 0;
						        			  spwTax = salePrice - 0;
						        			  
						        			  if(spwTax > 0 && spwTax <= 1000)
								        	  {
								        		  gst = 5;
								        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
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
						        	else if(disAmount > 0)
						        	{
						        		var disP = 0;
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
							        		  else if(Number(disAmount) > 0)
							        		  {
							        			  alert("GST ==> "+gst);
							        			  var finalTotal = 0;
							        			  var disAmt = disAmount;
							        			  var setDisPer = ((disAmount/sPWithoutTax)*100);
							        			  //disPer = setDisPer;
							        			  //var spwtAfterDis = sPWithoutTax - disAmount;
							        			  var setTaxAmtAftDis = 0;
							        			  if(Number(gst) > 0)
							        			  {
							        				  var salepWTax123 = (salePrice/(1+(gst/100)));
							        				  var spwtAfterDis = salepWTax123 - disAmt;
							        				  setTaxAmtAftDis = (spwtAfterDis*(gst/100));
							        				  finalTotal = +spwtAfterDis + +setTaxAmtAftDis;
							        			  }
							        			  else
							        			  {
							        				  setTaxAmtAftDis = 0;
							        			  }				        			  
							        			  $("#list4").jqGrid("setCell", rowId, "disPerForBill", setDisPer.toFixed(2));
							        			  $("#list4").jqGrid("setCell", rowId, "disAmountembel", disAmt);
							        			  $("#list4").jqGrid("setCell", rowId, "total", finalTotal.toFixed(2));
									        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setTaxAmtAftDis.toFixed(2));				        			  
							        		  }
							        		  else if(Number(disPer) > 0)
									        	{
									        		var disA = 0;
									        		$("#list4").jqGrid("setCell", rowId, "disAmount", disA);						        		
									        		
									        		  if(Number(gst) > 0)
									        		  {  
									        			  disAmt = (spwTax*(disPer/100));
									        			  finalSP = spwTax - disAmt;
									        			  newTaxAmt = (((finalSP*quantity)*gst)/100);
									        			  var oneProTax = (((finalSP)*gst)/100);
									        			  newFinalSP = finalSP + oneProTax;
									        			  tota = newFinalSP * quantity;
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
									        			  var setZero = 0;
									        			  spwTax = salePrice - 0;
									        			  
									        			  if(spwTax > 0 && spwTax <= 1000)
											        	  {
											        		  gst = 5;
											        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
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
						        	
						        	  else
						        	  {
						        		  var setZero = 0; 
						        		  
						        		  if(salePrice > 0 && salePrice <= 1000)
							        	  {
							        		  gst = 5;							        		  
							        		  var taxAmt = (salePrice - (salePrice/(1+(gst/100))));
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "taxAmount", taxAmt.toFixed(2));
							        	  }
							        	  else if(salePrice > 1000)
							        	  {
							        		  gst = 12;
							        		  var taxAmt = (salePrice - (salePrice/(1+(gst/100))));
							        		  $("#list4").jqGrid("setCell", rowId, "vat", gst);
							        		  $("#list4").jqGrid("setCell", rowId, "taxAmount", taxAmt.toFixed(2));
							        	  }		
						        		  
						        		  
							        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
							        	  $("#list4").jqGrid("setCell", rowId, "total", tota.toFixed(2));
							        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
						        	  }
						          }
					        	  else
				        		  {
					        		  var setZero = 0;
					        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "total", setZero);
						        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
					        		  return false;
				        		  }
						      }				        	  
				        	 else
				        	 {
				        		 var setZero = 0;
				        		  alert("Pleae Enter Valid Sale Price");
				        		  $("#list4").jqGrid("setCell", rowId, "salePrice", setZero);
				        		  $("#list4").jqGrid("setCell", rowId, "sPWithoutTax", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "disAmount", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "total", setZero);
					        	  $("#list4").jqGrid("setCell", rowId, "taxAmountAfterDis", setZero);
				        		  return false;
				        	 }			        	
				        		  
				        	 totalCalC();
				        	 totalDisC();
				        	  
				        	 function totalCalC()
					        {	
				        	  var Total = 0;
				        	  var totAmtWithTax = 0;
				        	  var count = jQuery("#list4").jqGrid('getGridParam', 'records');
				        	  var allRowsInGrid1 = $('#list4').getGridParam('data');
				        	  var AllRows=JSON.stringify(allRowsInGrid1);
				        	  
				        	  for (var k = 0; k < count; k++)
				        	  {
				        		  var Total1 = allRowsInGrid1[k].total;

				        		  if(Total1 != undefined){
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
							$('#list4').trigger('reloadGrid');
							
							rowDelete = 0;
							
							  totalCalC();
				        	  totalDisC();
				        	  
				        	  var totalQty = document.getElementById("totalQuantity").value; //$("totalQuantity").val;
				        	  document.getElementById("totalQuantity").value = +totalQty-1;
				        	  
				        	function totalCalC()
					        {	
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

function resotherbill()
{
	var mobileno = $('#mobileNo').val();
	var key = $('#key').val();
	var monoPattern = /^\d{10}$/;
	var monoPatternRes = monoPattern.test(mobileno);
	
	/*if (document.custord.employee1.value == "") {
		alert("Select Employee Name.");
		return false;
	}*/
	/*if (document.custord.creditCustomer1.value == "") {
		alert("Please Enter Customer Name.");
		return false;
	}*/
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
	} else {
		alert("Please Enter mobile number !");
	}*/

}

function resOtherBill()
{
	/*document.getElementById("btnSubmit").disabled = true;*/
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
		
		//rollSize
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
		
	}
	
	var billNo=$('#billNo').val();
	var totalAmount=$('#totalAmount').val();
	var discount=$('#discount').val();
	if(discount == ""){
		discount = 0;
	}
	var grossTotal=$('#grossTotal').val();
	/*var employee1 = $('#employee1').val();*/
	var creditCustomer1 = $('#creditCustomer1').val();
	var mobileNo = $('#mobileNo').val();
	var paymentMode = $('#paymentMode').val();
	var chequeNum = $('#chequeNum').val();
	var nameOnCheck = $('#nameOnCheck').val();
	var bankName = $('#bankName').val();
	var cardNum = $('#cardNum').val();
	var accNum = $('#accNum').val();
	var newBill = $('#newBill').val();
	
	params["billNo"] = billNo;
	params["count"] = count;
	params["totalAmount"] = totalAmount;
	params["discount"] = discount;
	params["grossTotal"] = grossTotal;
	/*params["employee1"] = employee1;*/
	params["creditCustomer1"] = creditCustomer1;
	params["mobileNo"] = mobileNo;
	params ["paymentMode"] = paymentMode;
	params ["chequeNum"] = chequeNum;
	params ["nameOnCheck"] = nameOnCheck;
	params ["bankName"] = bankName;
	params ["cardNum"] = cardNum;
	params ["accNum"] = accNum;
	params["methodName"] = "registerOtherBill";

	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	{	
		myAlert("Bill Added Successfully");
		
		if(newBill == "newBill")
		{
			//alert(data); 
			//window.open("Other_Bill_PDF.jsp");
			window.open("Other_Bill_PDF_GHATALWAR.jsp");
			window.close();
		}
		else	
		{
			//alert(data);
			//window.open("Other_Bill_PDF.jsp");
			window.open("Other_Bill_PDF_GHATALWAR.jsp");
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