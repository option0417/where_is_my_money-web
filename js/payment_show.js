var btn_show_all;
var btn_show_by_type;
var btn_show_by_time;
var httpReq;

function pageload() {
	btn_show_all = document.getElementById("id_btn_show_all");
	btn_show_by_type = document.getElementById("id_btn_show_by_type");
	btn_show_by_time = document.getElementById("id_btn_show_by_time");
			
	btn_show_all.onclick = showAll;
  btn_show_by_type.addEventListener("click", showBtn);
}

window.onload = pageload;

function showBtn(event) {
	console.log(event);
	console.log(event.target);
	console.log(event.target.id);
}

function showAll(event) {
	console.log("Show all");

	httpReq = new XMLHttpRequest();
	httpReq.onreadystatechange = showResponseAll;
	httpReq.open("Get", "http://192.168.100.101:3000/record",  true);
	httpReq.send();
}

function showResponseAll() {
	if (httpReq.readyState === XMLHttpRequest.DONE) {
		if (httpReq.status === 200) {
			console.log(httpReq.response);

			var jsonResp = JSON.parse(httpReq.responseText);
			cleanPage();

			for (var idx = 0; idx < jsonResp.length; idx++) {
				var jsonObj = jsonResp[idx];
				console.log(jsonObj);
				setPageContent(jsonObj);
			}
		} else {
			alert('There was a problem with the request.');
		}
	}
}

function cleanPage() {
	resultTable = document.getElementById('id_result_table');
	resultTable.getElementsByTagName('tbody')[0].innerHTML ='';
}

function setPageContent(jsonObj) {
	resultTable = document.getElementById('id_result_table');
	console.log(resultTable);
	var content = 
		'<tr>' + 
		'<td>' + jsonObj.item_name + '</td>' +
		'<td>' + jsonObj.payment_type + '</td>' +
		'<td>' + jsonObj.item_price + '</td>' +
		'<td>' + jsonObj.amount + '</td>' +
		'<td>' + jsonObj.payment_cost + '</td>' +
		'</tr>';

	resultTable.getElementsByTagName('tbody')[0].innerHTML += content;

	resultTable.hidden = false;
	resultTable.board = 1;
}
