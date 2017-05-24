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

	httpReq.onreadystatechange = showResponse;
	httpReq.open("Get", "http://192.168.100.101:3000/record",  true);
	httpReq.send();


}

function showResponse() {
	if (httpReq.readyState === XMLHttpRequest.DONE) {
		if (httpReq.status === 200) {
			alert(httpReq.responseText);
		} else {
			alert('There was a problem with the request.');
		}
	}
}
