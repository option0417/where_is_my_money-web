var elementItemPrice;
var elementAmount;
var elementPaymentCost;
var elementPaymentDescription;

function pageload() {
  var e1 = document.getElementById("id_payment_type");
  console.log(e1);
  console.log(e1.options);
  console.log(e1.selectedIndex);

	elementPaymentCost = document.getElementById("payment_cost");
	elementPaymentDescription = document.getElementById("payment_cost");

	elementTotalCost.value = 0;
}
window.onload = pageload;

function caculateTotalCost() {
	elementTotalCost.value = elementItemPrice.value * elementAmount.value;
}
