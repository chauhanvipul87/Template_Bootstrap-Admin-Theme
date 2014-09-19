function downloadSamplesPdf(actionElement){
	$("#action").val(actionElement);
	var form = document.getElementById('downloadSampleFrm');
	form.submit();
}

function getStatistics(){
	var $ajaxUrl = "getDashBoardDetails.do";
	var $ajaxResponseLayer = "resDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
}
function populateIepInfo(userTypeId){
	if(userTypeId ==undefined || userTypeId =='' || userTypeId =='0' ){
		alert('Please select valid type.');
	}else if(userTypeId == 5) {
		$.post( "populateIepInfo.do", { userTypeId: userTypeId}).done(function( data ) {
		    var resArr = data.trim().split(",");
		    if(resArr != null){
		    	 $('#scac').val(resArr[0]);
				 $('#usdot').val(resArr[1]);
				 $('#companyName').val(resArr[2]);
		    }
		    $('#companyName').attr('readonly', true);
		    $('#usdot').attr('readonly', true);
			$('#scac').attr('readonly', true);
			return false;
		});
	}else{
		 //clear data
		 $('#scac').val('');
		 $('#usdot').val('');
		 $('#companyName').val('');

		 $('#companyName').attr('readonly', false);
		 $('#usdot').attr('readonly', true);
		 $('#scac').attr('readonly', true);
	}
}
function showDefectByCategory(value){
	if(value =='BOESC'){
		$("#boescDefectDiv").show();
		$("#dvirDefectDiv").hide();
	}else{
		$("#dvirDefectDiv").show();
		$("#boescDefectDiv").hide();
	}
}
/* Bad Order Search Start....*/
function setupBadOrderSearchParamFrm(action){
	var $ajaxUrl = "setupBadOrderSearchParamFrm.do";
	var $ajaxResponseLayer = "mainDiv";
	var $arguments ="action="+action+"&"+$("#cacheSearchResult").serialize();
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
}

 function getListBadOrderSearch(){
	var $ajaxUrl = "listBadOrderSearch.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments =$("#searchParamFrm").serialize();
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
		
 }
 
 function searchBadOrdersData(){
		var $ajaxUrl = "listBadOrderSearch.do";
		var $ajaxResponseLayer = "responseDiv";
		var currentPage 	= $("#cpage").val();
		var record_option   = $("#record_option").val();
		if(currentPage ==undefined || currentPage ==''){
			currentPage =1;
		}
		if(record_option ==undefined || record_option ==''){
			record_option =10;
		}
		var $arguments ="current_page="+currentPage+"&record="+record_option+"&"+$("#searchParamFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
}

function openDialogForRepair(transId,transType){
	if(transId !=null && transId !=''){
		$("#boescTranId").val(transId);
		$("#transType").val(transType);
		$("#releasedBy").val('');
		$("#comments").val('');
		openDialogBox('dialogForRepairOrder');
	}
} 
function validateRepairOrderFrm(){
	var releasedBy   = $("#releasedBy").val();
	var comments	 = $("#comments").val();
	var repaired 	 = $('#repairCompleted').is(':checked');
	
	if(!repaired || releasedBy =='' || comments == ''){
		$("#search_errors").html('Please enter all the mandatory fields.');
		return false;
	}else{
		
		$("#search_errors").html('');
		closeDialogBox('dialogForRepairOrder');
		$('#content').scrollTo('fast', 'linear');
		var $ajaxUrl = "repairBadOrder.do";
		var $ajaxResponseLayer = "errorDiv";
		var $arguments = $("#boescReleaseVO").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
	} 
	
} 

function downloadExcelReport($ajaxUrl,gridFrmId,currentPageRecordsDownload){
	var form = document.getElementById(gridFrmId);
	if(currentPageRecordsDownload){
		
		//true if download current page records
		var currentPage 	= $("#cpage").val();   //this is the main current page: display in grid
		var record_option   = $("#record_option").val();  //this is the main records per page: display in grid
		if(currentPage ==undefined || currentPage ==''){
			currentPage =1;
		}
		if(record_option ==undefined || record_option ==''){
			record_option =10;
		}
		var genExcelCurrentPage 	= $("#genExcelCurrentPage").val(); //just to set because of download selected page records
		if(genExcelCurrentPage ==undefined || genExcelCurrentPage ==''){
			$( "<input type='hidden' value='"+currentPage+"' name='current_page' id='genExcelCurrentPage' />" ).appendTo( "#"+gridFrmId );
			$( "<input type='hidden' value='"+record_option+"' name='record' id='genExcelRecord' />" ).appendTo( "#"+gridFrmId );
			$( "<input type='hidden' value='downloadCurrentPageData' name='option' id='excelOption' />" ).appendTo( "#"+gridFrmId );
		}else{
			$("#genExcelCurrentPage").val(currentPage);
			$("#genExcelRecord").val(record_option);
			$("#excelOption").val('downloadCurrentPageData');
		}
	}else{
		$("#excelOption").val('');
	}
	document.getElementById(gridFrmId).action = $ajaxUrl;
	form.submit();
	
}

 /* Bad Order Search  End ....*/

/* FO- IEP Mapping Start....*/

function listFOIEPMappingDetails(stateCode){
	
	if(stateCode == undefined || stateCode == ''){
		alert('Please select valid option');
	}else{
		var $ajaxUrl = "listFoIepMappingDetails.do";
		var $ajaxResponseLayer = "responseDiv";
		var $arguments ="stateCode="+stateCode;
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	}
	return false;
}

function getSelectedFOMappingUsers(){
	var allCheckBoxVal = getAllCheckBoxValues();
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		$('#content').scrollTo('fast', 'linear');
		var $arguments ="ids="+checkedval+"&allValues="+allCheckBoxVal;
		var $ajaxUrl = "saveFoIepMappingDetails.do";
		var $ajaxResponseLayer = "errorDiv";
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}

/* FO- IEP Mapping End....*/

/* MRV- IEP Mapping Start....*/

function listMRVIEPMappingDetails(stateCode){
	if(stateCode == undefined || stateCode == ''){
		alert('Please select valid option');
	}else{
		var $ajaxUrl = "listMrvIepMappingDetails.do";
		var $ajaxResponseLayer = "responseDiv";
		var $arguments ="stateCode="+stateCode;
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	}
	return false;
}

function getSelectedMRVMappingUsers(){
	var allCheckBoxVal = getAllCheckBoxValues();
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		$('#content').scrollTo('fast', 'linear');
		var $arguments ="ids="+checkedval+"&allValues="+allCheckBoxVal;
		var $ajaxUrl = "saveMrvIepMappingDetails.do";
		var $ajaxResponseLayer = "errorDiv";
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}
/* MRV- IEP Mapping End....*/

/* FO- Location Mapping Start....*/

function listFoLocationFacilitiesDetails(stateCode){
	if(stateCode == undefined || stateCode == ''){
		alert('Please select valid option');
	}else{
		var $ajaxUrl = "listFoLocationFacilitiesDetails.do";
		var $ajaxResponseLayer = "responseDiv";
		var $arguments ="stateCode="+stateCode;
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	}
	return false;
}

function getSelectedFOLocationMapping(){
	
	var allCheckBoxVal = getAllCheckBoxValues();
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		$('#content').scrollTo('fast', 'linear');
		var $arguments ="ids="+checkedval+"&allValues="+allCheckBoxVal;
		var $ajaxUrl = "saveFoLocationMappingDetails.do";
		var $ajaxResponseLayer = "errorDiv";
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}


/*  FO- Location Mapping End....*/
/* MRV- Location Mapping Start....*/

function listMRVLocationFacilitiesDetails(stateCode){
	if(stateCode == undefined || stateCode == ''){
		alert('Please select valid option');
	}else{
		var $ajaxUrl = "listMrvLocationFacilitiesDetails.do";
		var $ajaxResponseLayer = "responseDiv";
		var $arguments ="stateCode="+stateCode;
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	}
	return false;
}

function getSelectedMRVLocationMapping(){
	
	var allCheckBoxVal = getAllCheckBoxValues();
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		$('#content').scrollTo('fast', 'linear');
		var $arguments ="ids="+checkedval+"&allValues="+allCheckBoxVal;
		var $ajaxUrl = "saveMrvLocationMappingDetails.do";
		var $ajaxResponseLayer = "errorDiv";
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}


/*  MRV- Location Mapping End....*/

/* Admin Section starts..... */
function getListAllUsers(){
	var $ajaxUrl = "listAllUsers.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments =$("#gridFrm").serialize();
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
}

function searchUserDetails(){
	
	var $ajaxUrl = "listAllUsers.do";
	var $ajaxResponseLayer = "responseDiv";
	var currentPage 	= $("#cpage").val();
	var record_option   = $("#record_option").val();
	if(currentPage ==undefined || currentPage ==''){
		currentPage =1;
	}
	if(record_option ==undefined || record_option ==''){
		record_option =10;
	}
	var $arguments ="current_page="+currentPage+"&record="+record_option+"&"+$("#gridFrm").serialize();
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
	
}
function loadJobDetails(value){
	
	var $ajaxUrl = "listJobDetailsByCategory.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="selectedCategory="+value;
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
}

function getMoreJobDetails(jobId,selectedCategory){
	var $ajaxUrl = "listJobStatistics.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="jobId="+jobId+"&selectedCategory="+selectedCategory;
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
}

/* Admin Section End..... */
/* Manage Opt Out of Defects End*/
function viewDefectDetails(val){
	if(val == ''){
		alert('Please select valid option.');
		return false;	
	}
	var $ajaxUrl = "viewDefectDetails.do";
	var $ajaxResponseLayer = "defectDetails";
	var $arguments ="atsId="+val;
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
}
function viewDefectDetailsInPopup(val){
	var $ajaxUrl = "viewDefectDetails.do";
	var $ajaxResponseLayer = "dialogDiv";
	var $arguments ="atsId="+val+"&action=popup";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	$('#dialog').dialog('open');
	return false;
}
function closeDefectPopup(){
	$('#dialog').dialog('close');
	
}
function getListOptOutOfDefects(){
	var $ajaxUrl = "listOptOutOfDefects.do";
	var $ajaxResponseLayer = "listOptOutDefects";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
}
function deleteDefect(val){
	var r = confirm("Are you sure want to delete this defect from list?");
	if(r==true){
		var $ajaxUrl = "deleteDefect.do";
		var $ajaxResponseLayer = "errorDiv";
		var $arguments ="atsId="+val;
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	}
	return false;
}

function saveDefect(val){
	var $ajaxUrl = "saveDefect.do";
	var $ajaxResponseLayer = "errorDiv";
	var $arguments ="atsId="+val;
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
}

/* Manage Opt Out of Defects End */

function checkValidOpt(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{		
		if(val=='Yes'){
			$("#"+divId).show();
		}else{
			$("#"+divId).hide();
		}
	}
}

function checkValidDVIR(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{				
		if(val=='Yes'){
			$("#"+divId).show();
		}else{		
			$("input[name='dvirVO.functionalAck']").prop( "checked", false );
			$("#"+divId).hide();			
			var receiveNotificationsVal = $("input[name='dvirVO.receiveDVIRTrans']:checked").val();
			if(receiveNotificationsVal =='Yes'){
				var notfnType = $('#dvirTransactionNotificationModeSelect').val();
				if(notfnType=='322' || notfnType=='XML'){
					var pushPull = $("input[name='dvirVO.receive997']:checked").val();
					$('#997DVIRFunctionalAcknowledgementDiv').show();
					if(pushPull!='undefined' && pushPull=='PUSH')
					{	
						$('#dvirTransactionReceiveInfoDiv').show();
					}else{
						$('#dvirTransactionReceiveInfoDiv').hide();
					}					
					$("#dvirTransactionNotificationModeEmailDiv").hide();
				}else if(notfnType =='EMAIL') {
					$("#dvirTransactionNotificationModeEmailDiv").show();
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
					$('#dvirTransactionReceiveInfoDiv').hide();
				}
			}
			else{
				$('#997DVIRFunctionalAcknowledgementDiv').hide();
				$('#dvirTransactionReceiveInfoDiv').hide();
			}		
		}
	}
}


function checkValidOptBOESC(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{		
		var functionalAck = $("input[name='bocVO.functionalAck']:checked").val();
		if(val=='Yes'){
			$("#"+divId).show();
			if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
			{
				$('#997FunctionalAcknowledgementReceiveMainDiv').show();
			}else{					
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
				}
		}else{		
			$("input[name='bocVO.functionalAck']").prop( "checked", false );
			$("#"+divId).hide();			
			var damageReceiveEventVal = $("input[name='bocVO.damageReceiveEvent']:checked").val();
			var receiveNotificationsVal = $("input[name='bocVO.receiveNotifications']:checked").val();

			if(damageReceiveEventVal =='Yes' || receiveNotificationsVal =='Yes'){
				var notfnType = $('#notificationModeSelect').val();
				if(notfnType=='322' || notfnType=='XML'){
					$("#322NotificationModeDiv").show();
					$('#997FunctionalAcknowledgementReceiveMainDiv').show();
					$("#322NotificationModeEmailDiv").hide();
				}else if(notfnType =='EMAIL') {
					$("#322NotificationModeDiv").show();
					$("#322NotificationModeEmailDiv").show();
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
				}
			}
			else{
				$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
			}
		}
	}
}

function checkValidateOpt(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		var damageReceiveEventVal = $("input[name='bocVO.damageReceiveEvent']:checked").val();
		var receiveNotificationsVal = $("input[name='bocVO.receiveNotifications']:checked").val();
		var functionalAck = $("input[name='bocVO.functionalAck']:checked").val();
		if(damageReceiveEventVal =='Yes' || receiveNotificationsVal =='Yes'){
			$("#"+divId).show();
			if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
			{
				$('#997FunctionalAcknowledgementReceiveMainDiv').show();
			}

			var notfnType = $('#notificationModeSelect').val();
			if(notfnType=='322' || notfnType=='XML'){
				$("#322NotificationModeDiv").show();
				$('#997FunctionalAcknowledgementReceiveMainDiv').show();
				$("#322NotificationModeEmailDiv").hide();
			}else if(notfnType =='EMAIL') {
				$("#322NotificationModeDiv").show();
				$("#322NotificationModeEmailDiv").show();
				$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
			}			
		}else{
			$("#"+divId).hide();
			$('#notificationModeSelect').val('');
			var functionalAck = $("input[name='bocVO.functionalAck']:checked").val();
			try
			{
				if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
				{
					$('#997FunctionalAcknowledgementReceiveMainDiv').show();
				}else{
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
				}
			}catch(e){
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
			}
		}
	}
}

function checkValidateOptDVIR(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		var receiveNotificationsVal = $("input[name='dvirVO.receiveDVIRTrans']:checked").val();
		var functionalAck = $("input[name='dvirVO.functionalAck']:checked").val();
		
		if(val == 'Yes' || receiveNotificationsVal =='Yes'){
			$("#"+divId).show();
			var notfnType = $('#dvirTransactionNotificationModeSelect').val();
			if(notfnType=='322' || notfnType=='XML'){
				$('#997DVIRFunctionalAcknowledgementDiv').show();
				$("#dvirTransactionNotificationModeEmailDiv").hide();
			}else if(notfnType =='EMAIL') {
				$("#dvirTransactionNotificationModeEmailDiv").show();
				if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
				{
					$('#997DVIRFunctionalAcknowledgementDiv').show();
				}else{
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
				}
			}		
		}else{
			$("#"+divId).hide();
			$('#dvirTransactionNotificationModeSelect').val('');
			var functionalAck = $("input[name='dvirVO.functionalAck']:checked").val();
			try
			{
				if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
				{
					$('#997DVIRFunctionalAcknowledgementDiv').show();
				}else{
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
					$('#dvirTransactionReceiveInfoDiv').hide();
				}
			}catch(e){
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
					$('#dvirTransactionReceiveInfoDiv').hide();
			}
		}
	}
}

function checkValidFtpDetailsOpt(val,divId,redioBtnId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		
		var ftpType     = $("#boescFTPType").val();
		var ftpURI      = $("#boescFTPURI").val();
		var ftpUserName = $("#boescFTPUserName").val();
		var ftpPassword = $("#boescFTPPassword").val();
		var ftpRmtDir   = $("#boescFTPRmtDir").val();
		var ftpTransMode = $("input[name='bocVO.ftpTransMode']:checked").val();
		var ftpMode		 = $("input[name='bocVO.ftpMode']:checked").val();
		
		$("#"+divId).show();
		
		if(ftpType =='' || ftpURI =='' || ftpUserName =='' || ftpPassword =='' || ftpRmtDir == '' || ftpTransMode =='' 
			|| ftpMode == '' ){
			$('#'+redioBtnId).attr("disabled",true);
		}else{
			$('#'+redioBtnId).attr("disabled",false);
		}
	}
	
}

function checkDataLength(value){
	if(value.length == 0){
		$('#dvirSameAsBoesc').attr("disabled",true);
		$('#dverSameAsBoesc').attr("disabled",true);
	}else{
		$('#dvirSameAsBoesc').attr("disabled",false);
		$('#dverSameAsBoesc').attr("disabled",false);
	}
}


function checkValidOptReceive(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		if(val=='PUSH'){
			$("#"+divId).show();
		}else{
			$("#"+divId).hide();
			alert('You will get an Email notification from IANA about your SFTP account with credentials once your registered.');
		}
	}
	
}

function checkNotificationModeSelection(val){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		if(val=='322' || val=='XML'){
			$("#322NotificationModeDiv").show();
			$('#997FunctionalAcknowledgementReceiveMainDiv').show();
			$("#322NotificationModeEmailDiv").hide();
		}else if(val =='EMAIL') {
			$("#322NotificationModeDiv").show();
			$("#322NotificationModeEmailDiv").show();			
			try
			{
				var functionalAck = $("input[name='bocVO.functionalAck']:checked").val();
				if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
				{
					$('#997FunctionalAcknowledgementReceiveMainDiv').show();
					$('#997FunctionalAcknowledgementReceiveDiv').show();
				}else{
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
					$('#997FunctionalAcknowledgementReceiveDiv').hide();
				}
			}catch(e){
					$('#997FunctionalAcknowledgementReceiveMainDiv').hide();
					$('#997FunctionalAcknowledgementReceiveDiv').hide();
			}
		}else{
			$("#322NotificationModeDiv").hide();
			$('#997FunctionalAcknowledgementReceiveMainDiv').show();
			$("#322NotificationModeEmailDiv").hide();
		}		
	}
}

function checkDVIRTransactionModeSelection(val){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{		
		var receive997 = $("#dvirVO.receive9971").val();
		if(val=='322' || val=='XML'){
			$('#997DVIRFunctionalAcknowledgementDiv').show();
			$("#dvirTransactionNotificationModeEmailDiv").hide();
			if(receive997!='undefined' && receive997=='PUSH')
			{
				$("#dvirTransactionReceiveInfoDiv").show();
			}
		}else if(val =='EMAIL') {
			$("#dvirTransactionNotificationModeEmailDiv").show();
			try
			{
				var functionalAck = $("input[name='dvirVO.functionalAck']:checked").val();								
				if(functionalAck!='undefined' && (functionalAck=='Yes' || functionalAck=='No'))
				{
					$('#997DVIRFunctionalAcknowledgementDiv').show();
					if(receive997!='undefined' && receive997=='PUSH')
						{
							$("#dvirTransactionReceiveInfoDiv").show();
						}
				}else{
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
				}
			}catch(e){
					$('#997DVIRFunctionalAcknowledgementDiv').hide();
			}
		}else{
			$('#997DVIRFunctionalAcknowledgementDiv').hide();
			$("#dvirTransactionReceiveInfoDiv").hide();
			$("#dvirTransactionNotificationModeEmailDiv").hide();
		}
	}	
}
function checkDverNotificationModeSelection(val){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		if(val=='322' || val=='XML' ){
			$("#dverNotificationsReceiveDiv").show();
			$("#dverNotificationsReceiveEmailDiv").hide();
		}else if(val =='EMAIL'){
			$("#dverNotificationsReceiveEmailDiv").show();
			$("#dverNotificationsReceiveDiv").hide();
		}else{
			$("#dverNotificationsReceiveDiv").hide();
			$("#dverNotificationsReceiveEmailDiv").hide();
		}
		
	}
}
function supplyPortNumber(val, id){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		if(val =='FTP'){
			$("#"+id).val(21);
		}else{
			$("#"+id).val(22);
		}
	}
}

function checkTransactionReceiveInfo(val,divId){
	if(val == undefined || val ==''){
		alert('Please select valid option.');
		return false;
	}else{
		if(val=='PULL'){
			$("#"+divId).hide();
		}else{
			$("#"+divId).show();
		}
	}	
}

function getListSecondaryUsers(){
	var $ajaxUrl = "listSecondaryUsers.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
 }
function validateFileType(userType){
	var file= $("#file").val();
	if(file ==''){
		alert('Please select file!');
		return false;
	}
	var file_ext = file.substring(file.indexOf(".")+1,file.length);
	if(file_ext =='xls' || file_ext =='xlsx' ){
		if(userType =='ADMIN' ){
			var iepSelect= $("#iepSelect").val();
			if(iepSelect ==undefined || iepSelect ==''){
				alert('Please select valid IEP option');
				return false;
			}
		}
		return true;
	}else{
		alert('Please provide valid file type. (Allowed File Types : xls or xlsx ');
	}
	return false;
}
function checkSelectedOption(val){
	if(val == undefined || val == '0'){
		alert('Please select valid option.');
		return false;
	}else{
		if(val =='XML' || val =='322'){
			$("#outboundDetailsDiv").show();
			$("#emailInfoDiv").hide();
		}else{
			$("#outboundDetailsDiv").hide();
			$("#emailInfoDiv").show();
		}
	}
}
function validateConfigurationData(){
	
	var badOrder322EDI  = $("input[name='bocVO.badOrder322EDI']:checked").val();
	var dvir322EDI	    = $("input[name='dvirVO.dvir322EDI']:checked").val();
	var recDVERNofy 	= $("input[name='dverVO.receiveDVERNofitication']:checked").val();
	if(badOrder322EDI =='No' && dvir322EDI =='No' && recDVERNofy=='No'){
		alert('Please select atleast one option to proceed further.');
		return false;
	}else{
		return true;
	}
}

function openAccordionPanel(selector,panelNo){
	$( "#"+selector ).accordion( "option", "active", panelNo);
}

function checkModeOfTransfer(val){
	if(val =='' || val == undefined){
		alert('Please select Valid Mode Of Transfer');
	}else{
		if(val =="PULL"){
			$("#outboundDetailsDiv").hide();
		}else{
			$("#outboundDetailsDiv").show();
		}
	}
}
function checkOptDefectOption(frmID){
	var checker = document.getElementById(frmID);
	// when unchecked or checked, run the function
	checker.onclick = function(){
		if(this.checked){
			openListDefectsDialog();
		} else {
			$('#dialog').dialog('close');
		}
	};
	openListDefectsDialog();
	return false;
}
function openListDefectsDialog(){
	$( "#dialog" ).dialog( "open" );
	
}
function displayIframe() {
	$( "#dialog" ).dialog( "open" );
	var $ajaxUrl = "forgotpwd.do";
	var $ajaxResponseLayer = "dialog";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;


}

/* POC for download excel file. start*/
function showUserList(){
	var $ajaxUrl = "listUserDetails.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
	 
}
function filterUserSerach(){
	var $ajaxUrl = "listUserDetails.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments =$("#gridFrm").serialize();
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
}
function downloadSelected($ajaxUrl){
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		var f = document.createElement("form");
		f.setAttribute('method',"post");
		f.setAttribute('action',$ajaxUrl);
		f.setAttribute("target", "_self");
		
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("name", "option");
		hiddenField.setAttribute("value","downloadSelected" );
		hiddenField.setAttribute("type", "hidden");
		
		var args = document.createElement("input");
		args.setAttribute("name", "ids");
		args.setAttribute("value",checkedval );
		args.setAttribute("type", "hidden");
		
		f.appendChild(hiddenField);
		f.appendChild(args);
		document.body.appendChild(f);
		f.submit();
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
}


/* POC for download excel file. end */


function getListMRVLocationMappingDetails(){
	var $ajaxUrl = "getListMRVLocationMappingDetails.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;

 }
 

 
 function getListFOLocationMappingDetails(){
	var $ajaxUrl = "getListFOLocationMappingDetails.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;
	 
 }
 
 
 function getSearchBadOrderEventDetails(){
	var $ajaxUrl = "getSearchBadOrderEventDetails.do";
	var $ajaxResponseLayer = "responseDiv";
	var $arguments ="";
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
 }


function saveSelectedMRVLocations(){
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		var $arguments ="ids="+checkedval;
		alert($arguments);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
}

function saveSelectedFOLocations(){
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		var $arguments ="ids="+checkedval;
		alert($arguments);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
}
function getCheckBoxStatus(){
	var val = [];
	var checkedval="";
	$('input[name=chkbox]').each(function(i)
	{
				val[i] = $(this).val();
				if(this.checked == true)
				{
						checkedval= checkedval  + "," + $(this).val();
				}
	});
	return checkedval;
}

function getAllCheckBoxValues(){
	var allValues="";
	$('input[name=chkbox]').each(function(i)
	{
				allValues = allValues+","+ $(this).val();
	});
	return allValues;
}

function getSelectedUsers(){
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		var $arguments ="ids="+checkedval;
		alert($arguments);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}
function getSelectedBadOrderToRepair(){
	var checkedval= getCheckBoxStatus();
	if(checkedval!="")
	{ 
		var $arguments ="ids="+checkedval;
		alert($arguments);
		return false;
	}
	else
	{	
		alert("Please select at least 1 record to proceed.");
		return false;
	} 
	
}

 function doAjaxFormSubmit() {
	var regEmail = $('#regEmail').val();
	var scac 	 = $('#scac').val();
	var usdot    = $('#usdot').val();
	var userType = $('#userType').val();
	if (userType ==undefined || userType == 0) {
		alert('Please select valid User Type.');
		return false;
	}
   
   $.ajax({
        type: "POST",
        url:"forgotpwd.do",
        data:{'regEmail' : regEmail, 'scac' : scac, 'usdot' : usdot, 'userType' : userType},                      
        success: function(response){
        // we have the response
           if(response == 'success') {
             $('#errorLbl').html('Password sent to your register Email Address');
            } else {
             $('#errorLbl').html(response);                      
           }
        },
        error: function(e){
         alert('Error: ' + e);
        }
   });
 }
 
function showForgotPasswordFrm(val){
	if(val == undefined || val == 0){
		alert('Please select valid User Type.');
	}else{
		if(val == 1 || val ==5){
	 		 $("#extraFieldsDiv").show();
	 	 }else{
	 		 $("#extraFieldsDiv").hide();
	 	 }
	}
	$("#regEmail").val('');
	$("#scac").val('');
	$("#usdot").val('');
}  
          
 
function myFormat(textbox,e,filter) 
 {
   var key;
   var maxLength = filter.length;
   if(window.event || !e.which) key = e.keyCode; // for IE, same as window.event.keyCode
   else if(e) key = e.which; // netscape
   else return true;
   if(key == 8 || key == 0 || key == 9 ||  key == 13 ) // let user to enter: backspace, enter, tab 
   return true;
   if(key >= 48 && key <= 57){ //ignore rest
     if (textbox.value.length >= maxLength ) return false; //ignore char more than max limit
     for(var r=0;r <= maxLength;r++)
       if(filter.charAt(r) != "#")
         if (textbox.value.length == r)
           textbox.value = textbox.value + filter.charAt(r);
     return true;
   }
   return false;
 }
 
  /**
  * http://javascript.internet.com
  */
  function checkEmail(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
           if (IPArray[i] > 255) {
              return false;
           }
        }
        return true;
    }
    var domainArray=domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat=new RegExp(atom,"g");
    var domArr=domain.match(atomPat);
    var len=domArr.length;
    if ((domArr[domArr.length-1].length < 2) ||
        (domArr[domArr.length-1].length > 3)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;
  }

function strProperCase(str) 
  {
  	var elem = document.getElementById(str).value;
  	document.getElementById(str).value = elem.toLowerCase().replace(/^(.)|\s(.)/g, 
  	function($1) { return $1.toUpperCase(); });
  } 

  function strProperCaseTitle(str) 
  {
  	var elem = document.getElementById(str).value;
  	var myRegExp = /CEO|Ceo|ceo|VP|Vp|vp|AVP|Avp|avp|CFO|Cfo|cfo|AVC|Avc|avc/;
  	if(elem.search(myRegExp)!=-1)
  	{
  		document.getElementById(str).value=elem.toUpperCase();			
  	}
  	else
  	{
  		return strProperCase(str);
  	}
  }

  function strProperCaseComp(str) 
  {
  	strProperCase(str);
  	var elem = document.getElementById(str).value;
  	var myRegExp = /Llc/;
  	if(elem.search(myRegExp)!=-1)
  	{
  		document.getElementById(str).value = elem.replace('Llc','LLC');
  	}
  	else
  	{
  		return strProperCase(str);
  	}
  }

  function strProperCaseSuffix(str) 
  {
  	strProperCase(str);
  	var elem = document.getElementById(str).value;
  	var myRegExp = /iii/;
  	var myRegExp1 = /ii/;
  	var myRegExp2 = /Iii/;
  	var myRegExp3 = /Ii/;
  	if(elem.search(myRegExp)!=-1)
  	{
  		document.getElementById(str).value = elem.replace('iii','III');
  	}
  	else if(elem.search(myRegExp1)!=-1)
  	{
  		document.getElementById(str).value = elem.replace('ii','II');
  	}
  	else if(elem.search(myRegExp2)!=-1)
  	{
  		document.getElementById(str).value = elem.replace('Iii','III');
  	}
  	else if(elem.search(myRegExp3)!=-1)
  	{
  		document.getElementById(str).value = elem.replace('Ii','II');
  	}
  	else
  	{
  		return strProperCase(str);
  	}
  }

  function pobox(txt,str)
  {
      str = str.replace('Po ','PO ');
      str = str.replace('PO ','PO ');
      str = str.replace('P.o.','P.O.');
      str = str.replace('P.o','P.O');
      str = str.replace('Rr ','RR');
      str = str.replace('R.r.','R.R.');
      str = str.replace('R.r','R.R');
      str = str.replace('N.w','N.W');
      str = str.replace('N.w.','N.W.');
      str = str.replace('Nw ','NW');
      str = str.replace('N.e','N.E');
      str = str.replace('N.e.','N.E.');
      str = str.replace('Ne ','NE');
      str = str.replace('S.e','S.E');
      str = str.replace('S.e.','S.E.');
      str = str.replace('Se ','SE');
      str = str.replace('S.w ','S.W');
      str = str.replace('S.w.','S.W.');
      str = str.replace('Sw ','SW');
      txt.value=str;
  }


  function strProperCaseAddr(str) 
  {
  	var elem = document.getElementById(str).value;
  	var myRegExp = /PO|P.O.|P.O|RR|R.R.|R.R|NE|N.E|N.E.|NW|N.W|N.W.|SE|S.E|S.E.|SW|S.W|S.W./;
  	if(elem.search(myRegExp)!=-1)
  	{
  		
  	}
  	else
  	{
  		return strProperCase(str);
  	}
  }

  function strTrim(str) 
  {
  	var elem = document.getElementById(str).value;
  	document.getElementById(str).value = elem.replace(/^\s+|\s+$/g, '');
  }

  function Lower(str) 
  {
  	str.value=(str.value).toLowerCase();
  }

  function toUpper(targetObj)
  {
  	var valText = targetObj.value;
  	targetObj.value = valText.toUpperCase();
  	
  } 
 
  function utfNonEnglishChars(str) 
	{
		var string = document.getElementById(str).value;
		string = string.replace(/\r\n/g,"\n");
		for (var n = 0; n < string.length; n++) 
		{				
			var c = string.charCodeAt(n);
			if((c > 127) && (c < 2048)) 
			{
				alert("Please remove non-english/accented character");
				document.getElementById(str).focus();
				return false;
			}
		}
	}
	
	function utfNonEnglishCharsCity(str) 
	{
		var string = document.getElementById(str).value;
		string = string.replace(/\r\n/g,"\n");
		for (var n = 0; n < string.length; n++) 
		{				
			var c = string.charCodeAt(n);
			if((c > 127) && (c < 2048)) 
			{
				alert("Please remove non-english/accented character");
				return false;
			}
		}
	}
	
	function truncateLeadingZero(textbox){
		var dotValue = textbox.value;
		var newDot = dotValue.replace(/\b0+/g, '');
		textbox.value = newDot;
	}
	
	function valid_phone(textbx)
	{
		var ph_no=textbx.value;
		var regexObj = /^\(?([0-9]{3})[\(\)]{0,2}?[-. ]?([0-9]{3})[-. ]?([0-9]{4})?[-. ]?\s?( Ext: \d{1,5})?$/;
		if (regexObj.test(ph_no)) {
			var formattedPhoneNumber = ph_no.replace(regexObj, "($1)$2-$3$4");
			textbx.value=formattedPhoneNumber;
	        return true;
	    } else {
	    	if(ph_no != ""){
	        	alert("Invalid Phone Number");
	    	}
	    }
	}
	
	function valid_fax(textbx)
	{
		var ph_no=textbx.value;
		var regexObj = /^\(?([0-9]{3})[\(\)]{0,2}?[-. ]?([0-9]{3})[-. ]?([0-9]{4})?[-. ]?\s?( Ext: \d{1,5})?$/;
		if (regexObj.test(ph_no)) {
			var formattedPhoneNumber = ph_no.replace(regexObj, "($1)$2-$3$4");
			textbx.value=formattedPhoneNumber;
	        return true;
	    } else {
	    	if(ph_no != ""){
	    		alert("Invalid Fax Number");
	    	}
	    }
	}
	
	function doEmailVerification() {
		  var email = $('#email').val();
		  //validate email value first:
		  var isEmail = checkEmail(email);
		  if(!isEmail) {
		    $('#emailError').html("Invalid email address.");
		    return false;
			} else {
			  $('#emailError').html("");
			  return true;
			}
	}
	
function loadReportCriteria($ajaxUrl,action,$ajaxResponseLayer){
	$("#tabs-1").html('');
	$("#tabs-2").html('');
	$("#tabs-3").html('');
	var $arguments ="action="+action;
	sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
	return false;	
}	
function getListBadOrdersReceivedStatsDetails(){
	if(validateFields()){
		var $ajaxUrl = "getListBadOrdersReceivedStatsDetails.do";
		var $ajaxResponseLayer = "badOrdersReceivedRes";
		var $arguments =$("#gridFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;	
	}
	
}

function getListBadOrdersReceivedStatsByIEP(){
	if(validateFields()){
		var $ajaxUrl = "getListBadOrdersReceivedStatsByIEP.do";
		var $ajaxResponseLayer = "badOrdersReceivedRes";
		var $arguments =$("#gridFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;	
	}
}

function getListStatesStatsDetails(){
	if(validateFields()){
		var $ajaxUrl = "getListStatesStatsDetails.do";
		var $ajaxResponseLayer = "stateStatsRes";
		var $arguments =$("#gridFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;	
	}
}

function getListDefectDetails(){
	if(validateFields()){
		var $ajaxUrl = "getListDefectDetails.do";
		var $ajaxResponseLayer = "defectsRes";
		var $arguments =$("#gridFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;	
	}
}

function getListDefectDetailsByIEP(){
	if(validateFields()){
		var $ajaxUrl = "getListDefectDetailsByIEP.do";
		var $ajaxResponseLayer = "defectsRes";
		var $arguments =$("#gridFrm").serialize();
		sendRequest($ajaxUrl, $arguments, "",$ajaxResponseLayer);
		return false;	
	}
	
}


