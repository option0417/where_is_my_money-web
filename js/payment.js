function pageload() {
  var e1 = document.getElementById('id_item_type');
  console.log(e1);
  console.log(e1.options);
  console.log(e1.selectedIndex);
}
window.onload = pageload;
