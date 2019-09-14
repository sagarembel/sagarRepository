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
	var salePrice= $('#salePrice').val();
	var itemDetail= $('#itemDetail').val();
	var discount= $('#discount').val();
	var quantity = $('#quantity').val();
	var shop_id = $('#shop_id').val();
	var shopName = $('#shopName').val();
	var itemName = $('#itemName').val();
	var size = $('#size').val();
	var inpu = document.offd.size.value;

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

				document.getElementById("size").value = v.size;
				$("#size").append($("<option></option>").attr("value",i).text(v.size)); 
				var size = v.size;
					});
				}); 
	}	
}

function getItemDetailUsingSize(){
	var input = document.getElementById('item_id').value;

	var inpu = document.offd.size.value;
	itemId = inpu;

	itemparams["itemId"]= itemId;

	itemparams["methodName"] = "getItemByUseItemNameSize";
	$.post('/SMT/jsp/utility/controller.jsp',itemparams,
			function(data)
			{ 
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{
			document.getElementById("shopName").value = v.shopName;
			document.getElementById("salePrice").value = v.newsalePrice;
			document.getElementById("itemName").value = v.itemName;
			document.getElementById("newbuyPrice").value = v.newbuyPrice;
			var itemName =  v.itemName;
			var  color =  v.color;  
			var buyPrice =v.newbuyPrice;
			var salePrice=v.newsalePrice;
				});
			}); 
}

function getItemDetailUsingSaveSize(){
	var input = document.getElementById('item_id').value;
	var inpu = document.offd.size.value;
	itemparams={};
	itemId = inpu;
	itemparams["itemId"]= itemId;

	itemparams["methodName"] = "getItemDetailUsingSaveSize";

	$.post('/SMT/jsp/utility/controller.jsp',itemparams,function(data)
			{ 
		var jsonData = $.parseJSON(data);
		$.each(jsonData,function(i,v)
				{

				});
			}); 
}


var itemby = new getItem();