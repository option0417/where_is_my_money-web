var select_PaymentType;
var input_startDate;
var input_endDate;

function pageload() {
	document.getElementById("id_btn_show_all").addEventListener("click", showAll);
	document.getElementById("id_btn_show_by_type").addEventListener("click", showByType);
	document.getElementById("id_btn_show_by_date").addEventListener("click", showByDate);
	document.getElementById("id_btn_show_by_type_and_time").addEventListener("click", showPaymentRecord);

	setupSelectPaymentType();
	setupDatePicker();
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

function setupDatePicker() {
	input_startDate = document.getElementById("id_start_date");
	input_endDate = document.getElementById("id_end_date");

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

	input_startDate.defaultValue = yyyy + "-0" + mm + "-" + dd;
	input_endDate.defaultValue = yyyy + "-0" + mm + "-" + (dd + 1);
}

function showAll(event) {
	var url = TARGET_URL + "/" + SERVICE_RECORD;
	sendXhr("Get", url);
}

function showByType(event) {
	var queryString = "tp" + "=" + select_PaymentType.value;
	var url = TARGET_URL + "/" + SERVICE_RECORD + "/" + "?" + queryString;
	sendXhr("Get", url);
}

function showByDate(event) {
	var queryString = "st_date" + "=" + Date.parse(input_startDate.value) + "&" + "ed_date" + "=" + Date.parse(input_endDate.value);
	var url = TARGET_URL + "/" + SERVICE_RECORD + "/" + "?" + queryString;
	sendXhr("Get", url);
}

function showPaymentRecord(event) {
	var queryString = createQueryString();
	var url = TARGET_URL + "/" + SERVICE_RECORD;;

	if (queryString != null && queryString.length > 0) {
		url += "/" + "?" + queryString;
	}
	sendXhr("Get",  url);
}

function createQueryString() {
	var queryString = '';

	if (select_PaymentType.value != null) {
		queryString = "tp" + "=" + select_PaymentType.value;
		queryString += "&";
	}

	if (input_startDate.value != null && input_endDate.value) {
		queryString += "st_date" + "=" + Date.parse(input_startDate.value) + "&" + "ed_date" + "=" + Date.parse(input_endDate.value);
	}

	console.log("Q: " + queryString);
	return queryString;
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
	} else {
		alert("No record");
	}
}

function createContent(jsonObj) {
	var content = 
<<<<<<< HEAD
		'<tr>' +
    '<td style="display:none">' + jsonObj.payment_id + '</td>' + 
		'<td>' + jsonObj.payment_item + '</td>' +
		'<td>' + jsonObj.payment_type + '</td>' +
		'<td>' + jsonObj.payment_cost + '</td>' +
		'<td>' + jsonObj.payment_description + '</td>' +
		'<td>' + jsonObj.create_time + '</td>' +
		'<td>' + jsonObj.update_time + '</td>' +
		'</tr>';

	resultTable.getElementsByTagName('tbody')[0].innerHTML += content;
=======
		"<tr>" + 
		"<td hidden=true>" + jsonObj.payment_id + "</td>" +
		"<td>" + jsonObj.payment_item + "</td>" +
		"<td>" + PaymentType.getText(jsonObj.payment_type) + "</td>" +
		"<td>" + jsonObj.payment_cost + "</td>" +
		"<td>" + jsonObj.payment_description + "</td>" +
		"<td>" + jsonObj.payment_create_time + "</td>" +
		"<td>" + jsonObj.payment_yodate_time + "</td>" +
		"</tr>";
	return content;
}
>>>>>>> dev

function refreshPageContent(pageContent) {
	resultTable = document.getElementById("id_result_table");
	resultTable.getElementsByTagName("tbody")[0].innerHTML = pageContent;
	resultTable.hidden = false;
	resultTable.board = 1;
}
