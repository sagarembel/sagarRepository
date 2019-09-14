function offerDetails() {
	if(document.offd.item_id.value == "")
	{
		alert("Please Select Item Name.");
		return false;
	}	
	if(document.offd.salePrice.value == "")
	{
		alert("Enter Sell Price.");
		return false;
	}
	var letterNumber = /^[0-9]+([.][0-9]+)?$/;
	if(document.offd.salePrice.value.match(letterNumber))
	{
		if(document.offd.commision.value == "")
		{
			alert("Enter Comission Amount.");
			return false;
		}
		var letterNumber = /^[0-9]+([.][0-9]+)?$/;
		if(document.offd.commision.value.match(letterNumber))
		{
			if(document.offd.discount.value == "")
			{
				alert("Enter Discount Amount.");
				return false;
			}
			var letterNumber = /^[0-9]+([.][0-9]+)?$/;
			if(document.offd.discount.value.match(letterNumber))
			{

				if(document.offd.buyPrice.value == "")
				{
					alert("Enter Buy Price.");
					return false;
				}
				var letterNumber = /^[0-9]+([.][0-9]+)?$/;
				if(document.offd.buyPrice.value.match(letterNumber))
				{
					offerdel();
				}
				else
				{
					alert("Enter Numbers Only.");
					return false;
				}

			}	
			else
			{
				alert("Enter Numbers Only.");
				return false;
			}	
		}
		else
		{
			alert("Enter Numbers Only.");
			return false;
		}	
	}
	else
	{
		alert("Enter Numbers Only.");
		return false;
	}	


}		






function offerdel(){

	document.offd.btn.disabled = true;

	var newbuyPrice= $('#newbuyPrice').val();

	var commision= $('#commision').val();
//	var fk_item_id= $('#size').val();
	var salePrice= $('#salePrice').val();
	var itemDetail= $('#itemDetail').val();

	var discount= $('#discount').val();
	var quantity = $('#quantity').val();
	var shop_id = $('#shop_id').val();
	var shopName = $('#shopName').val();
	var itemName = $('#itemName').val();
	var size = $('#size').val();

	var inpu = document.offd.size.value;

	/* var input = document.getElementById('item_id'),
	        list = document.getElementById('itemId_drop'),
	        i,item_id;
	    for (i = 0; i < list.options.length; ++i) {
	        if (list.options[i].value === input.value) {
	        	item_id = list.options[i].getAttribute('data-value');
	        }
	    }*/


	var params= {};


	params ["newbuyPrice"] = newbuyPrice;
	params ["commision"] = commision;
	params ["fk_item_id"] = inpu;
	params ["salePrice"] = salePrice;
	params ["itemDetail"] = itemDetail;
	params ["discount"] = discount;
	params ["item_id"] = inpu;
	params ["quantity"] = quantity;
	params ["shop_id"] = shop_id;
	params ["shopName"] = shopName;
	params ["itemName"] = itemName;
	params ["size"] = size;
	params["methodName"] = "regOfferDetail";


	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
			{
		alert(data);
		if(document.offd) 
		{
			document.offd.reset();
		}
		document.offd.btn.disabled = false;
			}
	).error(function(jqXHR, textStatus, errorThrown){
		if(textStatus==="timeout") {
			$(loaderObj).hide();
			$(loaderObj).find('#errorDiv').show();
		}
	});






}


function getItem()
{

	var itemList = "";
	this.getItemList = getItemList;
	this.getItemDetailUsingSize=getItemDetailUsingSize;
	this.getItemDetailUsingSaveSize=getItemDetailUsingSaveSize;
	function getItemList(data)
	{

		var input = document.getElementById('item_id').value;

		/* var   list = document.getElementById('itemId_drop');
		   var  i,item_id;
		    for (i =1 ; i < list.options.length; i++) {
		        if (list.options[i].value == input.value) {

		        	item_id = list.options[i].getAttribute('data-value');
		        	break ;

		        }

		    }*/

		itemparams={};
		itemId = input;
		itemparams["itemId"]= itemId;
		$("#size").append($("<option></option>").attr("value","").text());
		itemparams["methodName"] = "getItemDetailsforOffer";
		$.post('/SMT/jsp/utility/controller.jsp',itemparams,
				function(data)
				{ 
			var jsonData = $.parseJSON(data);


			$.each(jsonData,function(i,v)
					{

				/*document.getElementById("newbuyPrice").value = v.newbuyPrice;*/
				document.getElementById("size").value = v.size;
				/*document.getElementById("shopName").value = v.shopName;
					document.getElementById("salePrice").value = v.newsalePrice;
					document.getElementById("itemName").value = v.itemName;*/


				$("#size").append($("<option></option>").attr("value",i).text(v.size)); 
				/*var itemName =  v.itemName;
					var  color =  v.color;  
					var buyPrice =v.newbuyPrice;*/
				var size = v.size;


					});
				}); 

	}	
}

function getItemDetailUsingSize(){



	var input = document.getElementById('item_id').value;

	var inpu = document.offd.size.value;
	/* var   list = document.getElementById('itemId_drop');
			   var  i,item_id;
			    for (i =1 ; i < list.options.length; i++) {
			        if (list.options[i].value == input.value) {

			        	item_id = list.options[i].getAttribute('data-value');
			        	break ;

			        }

			    }*/

	itemparams={};
	itemId = inpu;

	itemparams["itemId"]= itemId;

	/*$("#size").append($("<option></option>").attr("value","").text());*/
	itemparams["methodName"] = "getItemByUseItemNameSize";
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,
			function(data)
			{ 
		var jsonData = $.parseJSON(data);


		$.each(jsonData,function(i,v)
				{

			/**/
			//document.getElementById("size").value = v.size;
			document.getElementById("shopName").value = v.shopName;
			document.getElementById("salePrice").value = v.newsalePrice;
			document.getElementById("itemName").value = v.itemName;
			document.getElementById("newbuyPrice").value = v.newbuyPrice;

			//$("#size").append($("<option></option>").attr("value",i).text(v.size)); 
			var itemName =  v.itemName;
			var  color =  v.color;  
			var buyPrice =v.newbuyPrice;
			var salePrice=v.newsalePrice;
			//var size = v.size;


				});
			}); 

}

function getItemDetailUsingSaveSize(){



	var input = document.getElementById('item_id').value;

	var inpu = document.offd.size.value;

	itemparams={};
	itemId = inpu;

	itemparams["itemId"]= itemId;

	/*$("#size").append($("<option></option>").attr("value","").text());*/
	itemparams["methodName"] = "getItemDetailUsingSaveSize";

	$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data)
			{ 
		var jsonData = $.parseJSON(data);


		$.each(jsonData,function(i,v)
				{

			/**/
			//document.getElementById("size").value = v.size;
			/*document.getElementById("shopName").value = v.shopName;
						document.getElementById("salePrice").value = v.newsalePrice;
						document.getElementById("itemName").value = v.itemName;
						document.getElementById("newbuyPrice").value = v.newbuyPrice;

						//$("#size").append($("<option></option>").attr("value",i).text(v.size)); 
						var itemName =  v.itemName;
						var  color =  v.color;  
						var buyPrice =v.newbuyPrice;
						var salePrice=v.newsalePrice;*/
			//var size = v.size;


				});
			}); 

}


var itemby = new getItem();