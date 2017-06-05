var eItemPrice;
var eAmount;
var eTotalCost;

var formData;
var eBtnSubmit;
var eFormPaymeny;

function pageload() {
  var e1 = document.getElementById("id_item_type");
  console.log(e1);
  console.log(e1.options);
  console.log(e1.selectedIndex);

	eItemPrice = document.getElementById("id_item_price");
	eAmount = document.getElementById("id_amount");
	eTotalCost = document.getElementById("id_total_cost");

	eAmount.value = 1;
	eTotalCost.value = 0;

	eBtnSubmit = document.getElementById("id_btn_submit");
	//eBtnSubmit.onclick = checkPayment;

	eFormPayment = document.getElementById("id_form_payment"); 
	eFormPayment.addEventListener('submit', submitPayment,  false);
}

window.onload = pageload;

function caculateTotalCost() {
	eTotalCost.value = eItemPrice.value * eAmount.value;
}

function checkPayment() {
	alert('check payment');
}

function submitPayment(event) {
	alert('submit payment1');

	event.preventDefault();
	var formJson = convertFormDataToJson(eFormPayment);
	console.log(formJson);
	
	var httpReq = new XMLHttpRequest();
	httpReq.open("post", "http://192.168.100.101:3000/record", true);
	httpReq.setRequestHeader("Content-type",  "application/json");
	httpReq.send(formJson);

	alert('submit payment2');
}

function convertFormDataToJson(eForm) {
	console.log(eForm);
	console.log(eForm.length);

	var json = "{";
	for (var idx = 0; idx < eForm.length; idx++) {
		console.log("Name: " + eForm[idx].name);
		console.log("Value: " + eForm[idx].value);
		console.log("-----");
		if (eForm[idx].name.length > 0) {
			json += "\"" + eForm[idx].name + "\"" + ":" + "\"" + eForm[idx].value + "\"";
			json += ","
		}
	}

	json = json.substring(0,  json.length - 1) + "}";
	return json;
}
