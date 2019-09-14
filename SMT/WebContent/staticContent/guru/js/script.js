/*********PODetails*************/
function deleteRow(row)
{
    var i=row.parentNode.parentNode.rowIndex;
    document.getElementById('POITable').deleteRow(i);
}

function insRow()
{
    console.log( 'hi');
    var x=document.getElementById('POITable');
    var new_row = x.rows[1].cloneNode(true);
    var len = x.rows.length;
    new_row.cells[0].innerHTML = len;
    
    var inp1 = new_row.cells[1].getElementsByTagName('input')[0];
    inp1.id += len;
    inp1.value = '';
    var inp2 = new_row.cells[2].getElementsByTagName('input')[0];
    inp2.id += len;
    inp2.value = '';
	 var inp3 = new_row.cells[3].getElementsByTagName('input')[0];
    inp3.id += len;
    inp3.value = '';
	 var inp4 = new_row.cells[4].getElementsByTagName('input')[0];
    inp4.id += len;
    inp4.value = '';

	 var inp5 = new_row.cells[5].getElementsByTagName('input')[0];
    inp5.id += len;
    inp5.value = '';

	 var inp6 = new_row.cells[6].getElementsByTagName('input')[0];
    inp6.id += len;
    inp6.value = '';

	 var inp7 = new_row.cells[7].getElementsByTagName('input')[0];
    inp7.id += len;
    inp7.value = '';

	 var inp8 = new_row.cells[8].getElementsByTagName('input')[0];
    inp8.id += len;
    inp8.value = '';

	 var inp9 = new_row.cells[9].getElementsByTagName('input')[0];
    inp9.id += len;
    inp9.value = '';

	 var inp10 = new_row.cells[10].getElementsByTagName('input')[0];
    inp10.id += len;
    inp10.value = '';

	 var inp11 = new_row.cells[11].getElementsByTagName('input')[0];
    inp11.id += len;
    inp11.value = '';

	 var inp12 = new_row.cells[12].getElementsByTagName('input')[0];
    inp12.id += len;
    inp12.value = '';

	 var inp13 = new_row.cells[13].getElementsByTagName('input')[0];
    inp13.id += len;
    inp13.value = '';

	 var inp14 = new_row.cells[14].getElementsByTagName('input')[0];
    inp14.id += len;
    inp14.value = '';

	 var inp15 = new_row.cells[15].getElementsByTagName('input')[0];
    inp15.id += len;
    inp15.value = '';
    x.appendChild( new_row );
}


function registerUs(){
	var suppliername= $('#supName').val();
	var typeofpo=$('#typeofpo').val();
	var itemName=$('#itemN').val();
	alert.itemName;
	var model = $('#model').val();
	var address = $('#address').val();
	var color = $('#color').val();
	var size=$('#si').val();
	var Quantity=$('#qty').val();
	var unitPrice=$('#unit').val();
	var totalAmount=$('#totalA').val();
	var discount=$('#diss').val();
	var isDiscount=$('#isd').val();
	var tax=$('#tax').val();
	var netTotal=$('#netT').val();
	var contactPerson=$('#cPerson').val();
	var payType=$('#payT').val();
	var vatNumber=$('#vat').val();
	var netAmount=$('#inWords').val();
	var requestParams = {"supName":suppliername,"unitP":unitPrice,"typeofpo":typeofpo,"itemN":itemName,"model":model,"address":address,"color":color,"size":size,"qty":Quantity,"totalA":totalAmount,"diss":discount,"isd":isDiscount,"tax":tax,"netT":netTotal,"cPerson":contactPerson,"payT":payType,"vat":vatNumber,"inWords":netAmount};
	$.post('<%=contextPath%>/po',requestParams,
	function(data)
   	{
		$("#result").html(data+"You are Registered successfully");
		alert("You are Registered Successfully");
   	}).error(function(jqXHR, textStatus, errorThrown){
   		alert("ERROR IN AJAX");
   	});
}
/*********PODetails*************/