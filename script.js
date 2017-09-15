var OpenCloseModalForms =  function(){
	var btnOpenModal = document.getElementsByClassName("btn-open-modal");
	for(var i = 0, btnLength = btnOpenModal.length; i < btnLength; i++){
		btnOpenModal[i].addEventListener('click', function(){openModal(this.dataset.form.toString());});
	}
	var btnCloseModal = document.getElementsByClassName("btn-close-modal");
	for(var i = 0, btnLength = btnCloseModal.length; i < btnLength; i++){
		btnCloseModal[i].addEventListener('click', function(){closeModal(this.dataset.form.toString());});
	}

	window.addEventListener('click', function(event){openModalByTarget(event.target)});

	var modalFroms = document.getElementsByClassName("modal-form");
	function openModalByTarget(target){
		for(var i = 0, modalLength = modalFroms.length; i < modalLength; i++){
			if(modalFroms[i] == target)
				target.classList.remove("modal-form--animate");
				setTimeout(function(){target.classList.remove("modal-form--active");}, 500);

		}		
	}
	function openModal(id){
		var tempElem = document.getElementById(id);
		tempElem.classList.add("modal-form--active");
		tempElem.classList.add("modal-form--animate");
	}
	function closeModal(id){
		var tempElem = document.getElementById(id);
		tempElem.classList.remove("modal-form--animate");
		setTimeout(function(){tempElem.classList.remove("modal-form--active");}, 500);

	}
}
OpenCloseModalForms();

/***********************************INPUT-RANGE*******************************************/
var InputRanges = function(){
	var selectedMoney = document.getElementById("selected-money");
	var rangeMoney = document.getElementById("range-money");
	var lineMoney = document.getElementById("line-money");
	var distansMoney = rangeMoney.max - rangeMoney.min;
	
	var selectedDays = document.getElementById("selected-days");
	var rangeDays = document.getElementById("range-days");
	var lineDays = document.getElementById("line-days");
	var distansDays = rangeDays.max - rangeDays.min;
	
	var isLineProgressNeed = CheakIsLineProgressNeed();

	
	
	rangeMoney.addEventListener('input', function(){
		selectedMoney.value = transfotmToReadAbleFormat(rangeMoney.value);
		isLineProgressNeed&&(lineMoney.style.width = ((rangeMoney.value -rangeMoney.min) * 100 / distansMoney) + "%");
	})
	rangeDays.addEventListener('input', function(){
		selectedDays.innerHTML = rangeDays.value;
		isLineProgressNeed&&(lineDays.style.width = ((rangeDays.value -rangeDays.min) * 100 / distansDays) + "%");
	})

	function CheakIsLineProgressNeed(){
		//ПЕРЕДЕЛАТЬ navigator.userAgentnavigator['webkitTemporaryStorage']
		if(!(/Firefox/.test(navigator.userAgent) || /Edge/.test(navigator.userAgent))){
			var progressLines = document.getElementsByClassName("range-progress-line");
			for (var i = 0; i < progressLines.length; i++) {
				progressLines[i].style.display = "block";
			}
			return true;
		}
		return false;
	} 
}
InputRanges();

/******************************INPUT-FOR-RANGE************************************************/
var InputMoney = function(){
	var selectedMoney = document.getElementById("selected-money");
	var permitionForMoneyInput = false;	
	var rangeMoney = document.getElementById("range-money");
	var lineMoney = document.getElementById("line-money");
	var distansMoney = rangeMoney.max - rangeMoney.min;
	
	selectedMoney.onkeydown = function(event){
		if(event.key == 'Enter'){
			FinishInput();
		}
		if(permitionForMoneyInput && givePemitionOnInput(event.key)){
			return true;
		}
		return false;
	};
	selectedMoney.onpaste = function(){
		return false;
	}
	function givePemitionOnInput(key) {
		if((key >= '0' && key <= '9' ) || (key == 'ArrowRight' || key == 'ArrowLeft' || key == 'Backspace')){
			return true;
		}
		return false;
	}
	selectedMoney.addEventListener('blur', FinishInput);


	function FinishInput(){
		permitionForMoneyInput = false;
		penForMoneyInput.style.display = "inline-block";
		selectedMoney.classList.remove("m-pick-amount__selected-money--active");

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

	var penForMoneyInput = document.getElementById("pen-money");
	penForMoneyInput.addEventListener('click',function(){
		permitionForMoneyInput = true;
		penForMoneyInput.style.display = "none";
		selectedMoney.classList.add("m-pick-amount__selected-money--active");
		selectedMoney.focus();
	});
} 
InputMoney();

/*****************************SEND-SMS SLIDER*********************************************/
var SendSmsSlider = function(){
	var sendSmsSwitcher = document.getElementsByClassName("b-modal-send-sms__switcher");
	var sendSmsSlider = document.getElementById("b-modal-send-sms-slider");
	
	for (var i = 0, sliderLen = sendSmsSwitcher.length; i < sliderLen; i++) {
		sendSmsSwitcher[i].addEventListener('click', switchSmsSlide);
	}
	function switchSmsSlide() {
		var index = Number(this.dataset.index);
		sendSmsSlider.style.webkitTransform = "translateX(-"+index * 300+ "px)";
		sendSmsSlider.style.transform = "translateX(-"+index * 300+ "px)";
		replaceSwitcherActive(index, sendSmsSwitcher);
	}
	window.addEventListener('resize', function(){
		if(document.documentElement.clientWidth >= 769){
			sendSmsSlider.style.webkitTransform = "translateX(0px)";
			sendSmsSlider.style.transform = "translateX(0px)";
			replaceSwitcherActive(0, sendSmsSwitcher);
		}
	})
}
SendSmsSlider();
/*****************************INSTRUCTIONS SLIDER*********************************************/
var InstrustionSlider = function(){
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
		instructionsSlider.style.webkitTransform = "translateX(-"+sliderCounter* 320+ "px)";
		instructionsSlider.style.transform = "translateX(-"+sliderCounter* 320+ "px)";
		replaceSwitcherActive(counter, instructionsSwitcher);
	}
	
	function switchInstructSlide() {
		var index = Number(this.dataset.index);
		instructionsSlider.style.webkitTransform ="translateX(-"+index * 320+ "px)";
		instructionsSlider.style.transform = "translateX(-"+index * 320+ "px)";
		replaceSwitcherActive(index, instructionsSwitcher);
	}
	window.addEventListener('resize', function(){
		if(document.documentElement.clientWidth >= 769){
			instructionsSlider.style.webkitTransform = "translateX(0px)";
			instructionsSlider.style.transform = "translateX(0px)";
			replaceSwitcherActive(0, instructionsSwitcher);
		}
	})
}
InstrustionSlider();
/**************************QUESTIONS ANSWERS************************************/
var QuestionsAnswers = function(){
	var question = document.getElementsByClassName("b-question__label");
	var answer = document.getElementsByClassName("b-question__answer");

	for(var i = 0, len = question.length; i < len; i++){
		question[i].addEventListener('click', openCloseAnswer.bind(i));
	}
	function openCloseAnswer(){	
		if(answer[this].classList.contains("b-question__answer--open")){
			answer[this].style.height = "0";
			answer[this].classList.remove("b-question__answer--open");
		} else {
			answer[this].style.height = answer[this].scrollHeight + "px";
			answer[this].classList.add("b-question__answer--open");
		}
	}
}
QuestionsAnswers();
/**************************OTHERS FUNC*****************************************/
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
