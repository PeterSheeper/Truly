const meterFontSliderId = '#FntSzSld';
const meterFontInputId = '#FntSzIn';
const owlCheckBoxId = '#OwlChckBox';
const alertCheckBoxId = '#AlrtChckBox';

function restoreOptions() {
  function setFontSize(fontSize) {
	document.querySelector(meterFontSliderId).value = fontSize.addOnFontSize;
	document.querySelector(meterFontInputId).value = fontSize.addOnFontSize;
  }
  
  function setOwlVisibilityCheckBox(check){
	  document.querySelector(owlCheckBoxId).checked = check.owlVisible;
  }
  
  function setAlertCheckBox(check){
	  document.querySelector(alertCheckBoxId).checked = check.alertEnabled;
  }

  chrome.storage.sync.get("addOnFontSize", setFontSize);
  chrome.storage.sync.get("owlVisible", setOwlVisibilityCheckBox);
  chrome.storage.sync.get("alertEnabled", setAlertCheckBox);
}

function pointsFontSizeSliderChanged(){
	document.querySelector(meterFontInputId).value = this.value;
	chrome.storage.sync.set({
    addOnFontSize: this.value
  });
}

function pointsFontSizeInputChanged(){
	document.querySelector(meterFontSliderId).value = this.value
	chrome.storage.sync.set({
    addOnFontSize: this.value
  });
}

function owlVisibilityCheckChanged(){
	chrome.storage.sync.set({
	owlVisible: this.checked
  });
}

function alertEnabledCheckChanged(){
	chrome.storage.sync.set({
	alertEnabled: this.checked
  });
}

function initEventListeners(){
	document.querySelector(meterFontSliderId).addEventListener('input', pointsFontSizeSliderChanged);
	document.querySelector(meterFontInputId).addEventListener('input', pointsFontSizeInputChanged);
	document.querySelector(owlCheckBoxId).addEventListener('input', owlVisibilityCheckChanged);
	document.querySelector(alertCheckBoxId).addEventListener('input', alertEnabledCheckChanged);
	
	restoreOptions();
}

document.addEventListener("DOMContentLoaded", initEventListeners);
