function pagination(currentPage ,$ajaxUrl,$ajaxResponseLayer,formId){
	if(formId ==''){
		//means no filter required.
		$arguments ="current_page="+currentPage+"&record="+$("#record_option").val();
	}else{
		$arguments ="current_page="+currentPage+"&record="+$("#record_option").val()+"&"+$("#"+formId).serialize();
	}
	
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
}
function reLoadForm(req_action,req_method){
	var form = document.createElement("form");
    form.method = req_method;
    form.action = req_action;   
    document.body.appendChild(form);
    form.submit();
}

function sendRequest($ajaxUrl,$arguments,$timeStamp,$ajaxResponseLayer){
	
	var $currentTime = new Date();
	var $timeStamp = $currentTime.getHours() + $currentTime.getMinutes()
	+ $currentTime.getSeconds() + $currentTime.getMilliseconds()
	+ $currentTime.getDay() + $currentTime.getMonth()
	+ $currentTime.getFullYear() + Math.random();
	
	 $.ajax({
		url : $ajaxUrl + "?" + $arguments + "&stamp=" + $timeStamp,
		cache : false,
		beforeSend : function() {
			/* call method before send request to server  */
			showProgressBar();
		},
		complete : function($response, $status) {
			/* hide progress bar once we get response */
			hideProgressBar();
			if ($status != "error" && $status != "timeout") {
				/* for set response in div */
				if($ajaxResponseLayer !="")  
			    {	
//					alert('$ajaxUrl ::'+$ajaxUrl);
					//return checkAuthentication($response);
					//alert($response.responseText.trim());
					if($response.responseText.search("alert-error")>-1){
						//alert('in if ::');
						$("#errorDiv").html($response.responseText.trim());
						processAfterResponse($ajaxUrl,$arguments,$timeStamp,$ajaxResponseLayer,$response.responseText);
						return false;
					}
					if($ajaxUrl == 'puturl.html'){
							//code here
					}
//					alert('res:'+$response.responseText);
					$("#"+$ajaxResponseLayer).html($response.responseText);
					processAfterResponse($ajaxUrl,$arguments,$timeStamp,$ajaxResponseLayer,$response.responseText);
				}
				
			}
		},
		error : function($obj) {
			/* call when error occurs */
			hideProgressBar();
			alert("Something went wrong while processing your request."+$obj.responseText);
		}
	});  
}


function processAfterResponse($ajaxUrl,$arguments,$timeStamp,$ajaxResponseLayer,$response){
	
	if($ajaxUrl =='repairBadOrder.do'){
		if($response.search("alert-success")>-1){
			searchBadOrdersData();
		}
	}
	if($ajaxUrl =='mrvRepairBadOrder.do'){
		if($response.search("alert-success")>-1){
			searchMRVBadOrdersData();
		}
	}
	if($ajaxUrl =='saveDefect.do' || $ajaxUrl =='deleteDefect.do' ){
		if($response.search("alert-success")>-1){
			getListOptOutOfDefects();
		}
	}
	
}

function processForm(delay){
	setTimeout( function() { showOrderIndexPage(); }, delay );
}

function requestHandler(delay)
{
    setTimeout( function() { reloadForm(); }, delay );
}

function requestHandler1(delay)
{
    setTimeout( function() { reloadEditform(); }, delay );
}



function closeDialogBox(dialogId){
	$("#"+dialogId).dialog( "close" );
}

function openDialogBox(dialogId){
	$("#"+dialogId).dialog( "open" );
}

function showProgressBar() {
		document.getElementById('ajax_loader').style.display = 'block';
}

function hideProgressBar() {
	 document.getElementById('ajax_loader').style.display = 'none';
}

var hideError = function closer() {
	$.modal.close();
	  //alert("Done!"); 
};



function removeClass(id){
	  $("#"+id+"Div").removeClass("error");
	  $("#"+id+"Div-help").html("");
}

function showMessage(){
	var options = $.parseJSON($("#emsg").attr('data-noty-options'));
	noty(options);
}

function IsEmail(email) {
	  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
}

function profileUnderVerification(){
	
   	var textMsg ='{"text":"Your profile is under administrator verification","layout":"bottomLeft","type":"warning"}';  
	var options = $.parseJSON(textMsg);
	noty(options);	
	return false;
}

function displayWarningMessage(msg){
	 if(msg== undefined || msg ==''){
		msg= "Please select all the mandatory fields indicated as (*).";  
	 }
	 var textMsg ='{"text":"'+msg+'","layout":"bottomLeft","type":"warning"}';  
	 var options = $.parseJSON(textMsg);
	 noty(options);
}

function displayErrorMessage(msg){
	 if(msg== undefined || msg ==''){
		msg= "Please select all the mandatory fields indicated as (*).";  
	 }
	 var textMsg ='{"text":"'+msg+'","layout":"bottomLeft","type":"error"}';  
	 var options = $.parseJSON(textMsg);
	 noty(options);
}
function onlyIntegerNumber(evt){
  var e = evt; // for trans-browser compatibility
  var charCode = e.which || e.keyCode;
  if(charCode == 9){
  	 return true;
  }
  if((charCode >=35 && charCode <38) || charCode ==39 || e.which ==0){
  	 //humanMsg.displayMsg("Please enter only digit (0-9)");
	 alert("Please enter only digit (0-9)");
  	 //alert("Please enter only digit (0-9)");
  	return false;
  }
  
  if ((charCode > 31) && (charCode < 48 || charCode > 57) ){
  	   	//humanMsg.displayMsg("Please enter only digit (0-9)");
	  		alert("Please enter only digit (0-9)");
 	       //alert('Please enter only digit (0-9)');
 	       return false;
 	 }else{
	   return true;
   }
}

function isNumberKey(evt)
{
	var e = evt; // for trans-browser compatibility
    var charCode = e.which || e.keyCode;
    
    if(charCode == 46 || charCode == 9){
    	return true;
    }
    if((charCode >=35 && charCode <38) || charCode ==39 || e.which ==0){
    	//humanMsg.displayMsg("Allow only numeric characters (0-9 or .)");
    	alert("Allow only numeric characters (0-9 or .)");
   	 return false;
    }
    if ((charCode > 31) && (charCode < 48 || charCode > 57) ){
    	 	alert("Allow only numeric characters (0-9 or .)");
   	       return false;
   	 }else{
	   return true;
     }
}
if(typeof String.prototype.trim !== 'function') {
	  String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, ''); 
	  };
}
jQuery.fn.extend({
	  scrollTo : function(speed, easing) {
	    return this.each(function() {
	      var targetOffset = $(this).offset().top -180;
	      $('html,body').animate({scrollTop: targetOffset}, speed, easing);
	    });
	  }
	});		