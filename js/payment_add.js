var eItemPrice;
var eAmount;
var eTotalCost;

var formData;
var eBtnSubmit;
var eFormPaymeny;

// Initial input element and setup event-listener
function pageload() {
	eItemPrice = document.getElementById("id_item_price");
	eAmount = document.getElementById("id_amount");
	eTotalCost = document.getElementById("id_total_cost");
	eFormPayment = document.getElementById("id_form_payment"); 

	eItemPrice.onchange = caculateTotalCost;
	eAmount.onchange = caculateTotalCost;
	eTotalCost.onfocus = caculateTotalCost;
	eFormPayment.onsubmit = submitPayment;
}

window.onload = pageload;

function caculateTotalCost() {
	eTotalCost.value = eItemPrice.value * eAmount.value;
}

function submitPayment(event) {
	event.preventDefault();
	var formJson = convertFormDataToJson(eFormPayment);
	console.log(formJson);
	
	var httpReq = new XMLHttpRequest();
	httpReq.open("post", "http://192.168.100.101:3000/record", true);
	httpReq.setRequestHeader("Content-type",  "application/json");
	httpReq.send(formJson);
}

function convertFormDataToJson(eForm) {
	console.log(eForm);
	console.log(eForm.length);

	var json = "{";
	for (var idx = 0; idx < eForm.length; idx++) {
		if (eForm[idx].name.length > 0) {
			json += "\"" + eForm[idx].name + "\"" + ":" + "\"" + eForm[idx].value + "\"";
			json += ","
		}
	}

	json = json.substring(0,  json.length - 1) + "}";
	return json;
}
