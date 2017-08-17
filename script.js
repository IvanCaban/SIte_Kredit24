var modalForm = document.getElementById("modal-form");
var logBtn = document.getElementById("log-btn");
var closeForm = document.getElementById("modal-form-close");

logBtn.onclick = function(){
	modalForm.style.display = "block";
}

closeForm.onclick = function() {
	modalForm.style.display = "none";
}

window.onclick = function(event) {
	if(event.target == modalForm){
		modalForm.style.display = "none";
	}
	if(event.target == modalSendSms){
		modalSendSms.style.display = "none";
	}
}
/******************************************************************************/
var modalSendSms = document.getElementById("modal-send-sms");
var getMoneyBtn = document.getElementById("get-money-btn");
var closeSendSms = document.getElementById("modal-send-sms-close");

getMoneyBtn.onclick = function(){
	modalSendSms.style.display = "block";
}

closeSendSms.onclick = function(){
	modalSendSms.style.display = "none";
}

/*window.onclick = function(event) {
	if(event.target == modalSendSms){
		modalSendSms.style.display = "none";
	}
}*/
/******************************************************************************/
var selectedMoney = document.getElementById("selected-money");
var rangeMoney = document.getElementById("range-money");
var lineMoney = document.getElementById("line-money");
var distansMoney = rangeMoney.max - rangeMoney.min;

rangeMoney.oninput = function() {
	var tempStr = rangeMoney.value.toString();
	selectedMoney.innerHTML = tempStr[0] + " " +tempStr[1]+tempStr[2]+tempStr[3] + " " +tempStr[4]+tempStr[5]+tempStr[6];
	lineMoney.style.width = ((rangeMoney.value -rangeMoney.min) * 100 / distansMoney) + "%";
}

var selectedDays = document.getElementById("selected-days");
var rangeDays = document.getElementById("range-days");
var lineDays = document.getElementById("line-days");
var distansDays = rangeDays.max - rangeDays.min;

rangeDays.oninput = function(){
	selectedDays.innerHTML = rangeDays.value;
	lineDays.style.width = ((rangeDays.value -rangeDays.min) * 100 / distansDays) + "%";
}