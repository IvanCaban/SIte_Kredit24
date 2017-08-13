var modal = document.getElementById("modal");
var logBtn = document.getElementById("log-btn");
var close = document.getElementById("modal-close");

logBtn.onclick = function(){
	modal.style.display = "block";
}

close.onclick = function() {
	modal.style.display = "none";
}

window.onclick = function(event) {
	if(event.target == modal){
		modal.style.display = "none";
	}
}