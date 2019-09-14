function card1(){
	
	document.card.amount.disabled = true;
}



function cardpoints(){
	
	
	var amount= $('#amount').val();
	var points = $('#points').val();
	
	
	
	var forpoint = points/amount;
		
	var params= {};
	
	params ["amount"] = amount;
	params ["points"] = points;
	params ["forpoint"] = forpoint;
	
	
	
	params["methodName"] = "regCardPoint1";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{   
				alert(data);
				
				
			    }
	    	).error(function(jqXHR, textStatus, errorThrown){
	    		if(textStatus==="timeout") {
	    			$(loaderObj).hide();
	    			$(loaderObj).find('#errorDiv').show();
	    		}
	    	});
	
}

function cardpoints1(){
	
	
	var amount= $('#howamount').val();
	var points = $('#disamount').val();
	
	
	var params= {};
	
	params ["howamount"] = amount;
	params ["disamount"] = points;
	
	
	
	
	params["methodName"] = "regCardPoint2";
	
	$.post('/SMT/jsp/utility/controller.jsp',params,function(data)
	    	{   
				alert(data);
				
				
			    }
	    	).error(function(jqXHR, textStatus, errorThrown){
	    		if(textStatus==="timeout") {
	    			$(loaderObj).hide();
	    			$(loaderObj).find('#errorDiv').show();
	    		}
	    	});
	
}