var elementItemPrice;
var elementAmount;
var elementTotalCost;

function pageload() {
  var e1 = document.getElementById("id_item_type");
  console.log(e1);
  console.log(e1.options);
  console.log(e1.selectedIndex);

	elementItemPrice = document.getElementById("id_item_price");
	elementAmount = document.getElementById("id_amount");
	elementTotalCost = document.getElementById("id_total_cost");

	elementItemPrice.value = 0;
	elementAmount.value = 1;
	elementTotalCost.value = 0;
}
window.onload = pageload;

function caculateTotalCost() {
	elementTotalCost.value = elementItemPrice.value * elementAmount.value;
}
