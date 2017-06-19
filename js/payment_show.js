var btn_show_all;
var btn_show_by_type;
var btn_show_by_time;
var select_PaymentType;
var httpReq;

function pageload() {
	btn_show_all = document.getElementById("id_btn_show_all");
	btn_show_by_type = document.getElementById("id_btn_show_by_type");
	btn_show_by_time = document.getElementById("id_btn_show_by_time");
			
	btn_show_all.onclick = showAll;
  btn_show_by_type.addEventListener("click", showByType);
	setupSelectPaymentType();
}
window.onload = pageload;

function setupSelectPaymentType() {
	select_PaymentType = document.getElementById("id_select_type");

	for (var pKey in PaymentType) {
		if (typeof PaymentType[pKey] !== "function") {	
		  var eOption = document.createElement("option");
		  eOption.text = pKey;
		  eOption.value = PaymentType[pKey]; 
		  select_PaymentType.add(eOption);
		}
	}

	select_PaymentType.hidden = false;
}

function showAll(event) {
	var queryString = "tp" + "=" + select_PaymentType.value;
	var url = TARGET_URL + "/" + SERVICE_RECORD;
	sendXhr("Get", url);
}

function showByType(event) {
	var queryString = "tp" + "=" + select_PaymentType.value;
	var url = TARGET_URL + "/" + SERVICE_RECORD + "/" + "?" + queryString;
	sendXhr("Get", url);
}

function sendXhr(method, url) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
			  var respJson = JSON.parse(xhr.responseText);
				setupResultTable(respJson);
		  } else {
			  alert("There was a problem with the request.");
		  }
		}
	}
	xhr.send();
}

function setupResultTable(respJson) {
	var appendContent ='';
	for (var idx = 0; idx < respJson.length; idx++) {
	  var jsonObj = respJson[idx];
		appendContent += createContent(jsonObj);
	}

	if (appendContent.length > 0) {
		refreshPageContent(appendContent);
	}
}

function createContent(jsonObj) {
	var content = 
		"<tr>" + 
		"<td>" + jsonObj.item_name + "</td>" +
		"<td>" + PaymentType.getText(jsonObj.payment_type) + "</td>" +
		"<td>" + jsonObj.item_price + "</td>" +
		"<td>" + jsonObj.amount + "</td>" +
		"<td>" + jsonObj.payment_cost + "</td>" +
		"</tr>";
	return content;
}

function refreshPageContent(pageContent) {
	resultTable = document.getElementById("id_result_table");
	resultTable.getElementsByTagName("tbody")[0].innerHTML = pageContent;
	resultTable.hidden = false;
	resultTable.board = 1;
}
