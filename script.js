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
/******************************************************************************/

var selectedMoney = document.getElementById("selected-money");
var rangeMoney = document.getElementById("range-money");

rangeMoney.oninput = function() {
	var tempStr = rangeMoney.value.toString();
	selectedMoney.innerHTML = tempStr[0] + " " +tempStr[1]+tempStr[2]+tempStr[3] + " " +tempStr[4]+tempStr[5]+tempStr[6];
}

var selectedDays = document.getElementById("selected-days");
var rangeDays = document.getElementById("range-days");

rangeDays.oninput = function(){
	selectedDays.innerHTML = rangeDays.value;
}