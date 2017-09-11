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
	selectedMoney.value = transfotmToReadAbleFormat(rangeMoney.value);
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
/******************************INPUT-FOR-RANGE************************************************/
var permitionForMoneyInput = false;
var penForMoneyInput = document.getElementById("pen-money");

selectedMoney.onkeydown = function(event){
	if(event.key == 'Enter'){
		selectedMoney.onblur();
	}
	if(permitionForMoneyInput && givePemitionOnInput(event.key)){
		return true;
	}

	return false;
}
function givePemitionOnInput(key) {
	if((key >= '0' && key <= '9' ) || (key == 'ArrowRight' || key == 'ArrowLeft' || key == 'Backspace'))
	{
		return true;
	}
	return false;
}
selectedMoney.onblur = function(){
	permitionForMoneyInput = false;
	penForMoneyInput.style.display = "inline-block";
	selectedMoney.classList.remove("m-pick-amount__selected-money--active");

/**********************Временно наверное***********************/
	var max = Number(rangeMoney.max);
	var min = Number(rangeMoney.min);
	var cur = transformFromReadAbleFormatToInt(selectedMoney.value);

	if(cur > max){
		rangeMoney.value = rangeMoney.max;
		selectedMoney.value = transfotmToReadAbleFormat(rangeMoney.max);
		lineMoney.style.width = "100%";
	} else if(cur < min){
		rangeMoney.value = rangeMoney.min;
		selectedMoney.value = transfotmToReadAbleFormat(rangeMoney.min);
		lineMoney.style.width = "0%";
	} else {
		rangeMoney.value = transformFromReadAbleFormatToInt(selectedMoney.value);
		selectedMoney.value = transfotmToReadAbleFormat(selectedMoney.value.replace(/ /g, ""));
		lineMoney.style.width = ((rangeMoney.value - rangeMoney.min) * 100 / distansMoney) + "%";
	}
}
penForMoneyInput.onclick = function(){
	permitionForMoneyInput = true;
	penForMoneyInput.style.display = "none";
	selectedMoney.classList.add("m-pick-amount__selected-money--active");
	selectedMoney.focus();
}
/*****************************SEND-SMS SLIDER*********************************************/
var sendSmsSwitcher = document.getElementsByClassName("b-modal-send-sms__switcher");
var sendSmsSlider = document.getElementById("b-modal-send-sms-slider");

for (var i = 0; i < sendSmsSwitcher.length; i++) {
	sendSmsSwitcher[i].onclick = switchSmsSlide;
}

function switchSmsSlide() {
	var index = Number(this.dataset.index);	
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

/*второй костиль*/
if(navigator['webkitTemporaryStorage']){
	var progressLines = document.getElementsByClassName("range-progress-line");
	for (var i = 0; i < progressLines.length; i++) {
		progressLines[i].style.display = "block";
	}
}


/*****************************INSTRUCTIONS SLIDER*********************************************/
var instructionsSwitcher = document.getElementsByClassName("l-instructions__switcher");
var instructionsSlider = document.getElementById("instructions-slider");
var prevBtn = document.getElementById("prev-btn");
var nextBtn = document.getElementById("next-btn");
var sliderCounter = 0;

for (var i = 0; i < instructionsSwitcher.length; i++) {
	instructionsSwitcher[i].onclick = switchInstructSlide;
}

prevBtn.onclick = function() {
	if(--sliderCounter < 0){
		sliderCounter = 2;		
	}
	switchInstructSlideByBtn(sliderCounter);
}

nextBtn.onclick = function(){
	if(++sliderCounter > 2){
		sliderCounter = 0;
	}
	switchInstructSlideByBtn(sliderCounter);
}
function switchInstructSlideByBtn(counter){
	instructionsSlider.style.transform = "translateX(-"+sliderCounter* 320+ "px)";
	replaceSwitcherActive(counter, instructionsSwitcher);
}

function switchInstructSlide() {
	var index = Number(this.dataset.index);	
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

function transfotmToReadAbleFormat(str) {
	return str[0] + ' ' + str[1]+str[2]+str[3] + ' ' + str[4]+str[5]+str[6];
}

function transformFromReadAbleFormatToInt(str) {
	var temp = "";
	for (var i = 0; i < str.length; i++) {
		if(str[i] != " ")
			temp += str[i];
	}
	return Number(temp);
}