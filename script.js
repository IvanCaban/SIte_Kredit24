/**********************MODAL-FORM*********************************/
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
/**************************MODAL-SEND-SMS**********************************************/
var modalSendSms = document.getElementById("modal-send-sms");
var getMoneyBtn = document.getElementById("get-money-btn");
var closeSendSms = document.getElementById("modal-send-sms-close");

getMoneyBtn.onclick = function(){
	modalSendSms.style.display = "block";
}

closeSendSms.onclick = function(){
	modalSendSms.style.display = "none";
}

/***********************************INPUT-RANGE*******************************************/
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

/*****************************SEND-SMS SLIDER*********************************************/
var sendSmsSwitcher = document.getElementsByClassName("b-modal-send-sms__switcher");
var sendSmsSlider = document.getElementById("b-modal-send-sms-slider");

for (var i = 0; i < sendSmsSwitcher.length; i++) {
	sendSmsSwitcher[i].onclick = switchSmsSlide;
}

function switchSmsSlide() {
	var index = Number(this.innerHTML);	
	sendSmsSlider.style.transform = "translateX(-"+index * 300+ "px)";
	replaceSwitcherActive(index, sendSmsSwitcher);
}
/*костиль какой то*/
window.onresize = function(event) {
	if(window.screen.width >= 769) {	
		sendSmsSlider.style.transform = "translateX(0px)";
		instructionsSlider.style.transform = "translateX(0px)";
		replaceSwitcherActive(0, sendSmsSwitcher);
		replaceSwitcherActive(0, instructionsSwitcher);
	}
}


/*****************************INSTRUCTIONS SLIDER*********************************************/
var instructionsSwitcher = document.getElementsByClassName("l-instructions__switcher");
var instructionsSlider = document.getElementById("instructions-slider");

for (var i = 0; i < instructionsSwitcher.length; i++) {
	instructionsSwitcher[i].onclick = switchInstructSlide;
}

function switchInstructSlide() {
	var index = Number(this.innerHTML);	
	instructionsSlider.style.transform = "translateX(-"+index * 320+ "px)";
	replaceSwitcherActive(index, instructionsSwitcher);
}
/****************************************************************************/
function replaceSwitcherActive(index, switchers) {
	for (var i = 0; i < switchers.length; i++) {
		switchers[i].classList.remove("switchers__switcher--active");
	}
	switchers[index].classList.add("switchers__switcher--active");
}