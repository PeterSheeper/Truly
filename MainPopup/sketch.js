const fontSizeStorageId = 'addOnFontSize';
const owlVisiblityStorageId = 'owlVisible';
const alertStorageId = 'alertEnabled';

const defaultFontSize = '20'
const redTreshold = 60
const grayTreshold = 30

function preload(){
  setFontSize();
  setOwlVisibility();
}

function setup() {
  noCanvas();
  updateScore();
}

function draw(){
}

function changeViewByPoints(points){
	var root = document.documentElement;
	var owl = document.getElementById("owl");
	var sign = document.getElementById("sign");

	var howSetIcon = false;
	if (points >= redTreshold) {
		root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--redBorder'));
		root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--redBackground'));
		owl.setAttribute("src", "assets/negative.gif");
		sign.setAttribute("src", "assets/negative.png");
		sign.setAttribute("title", "potential fake news");
		howSetIcon = true;
	} else if (points < grayTreshold) {
		root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greenBorder'));
		root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greenBackground'));
		owl.setAttribute("src", "assets/positive.gif");
		sign.setAttribute("src", "assets/positive.png");
		sign.setAttribute("title", "verified");
	} else{
		root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greyBorder'));
		root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greyBackground'));
		owl.setAttribute("src", "assets/neutral.gif");
		sign.setAttribute("src", "assets/neutral.png");
		sign.setAttribute("title", "not defined");
	}
	chrome.runtime.sendMessage({
      action: 'updateIcon',
      value: howSetIcon
    });
}

function setFontSize(){
	function onGot(item) {
	  let size = defaultFontSize;
	  if (item.addOnFontSize) {
		size = item.addOnFontSize;
	  }
	  document.querySelector('#points').style.fontSize = size + 'px';
	}

	chrome.storage.sync.get('addOnFontSize', onGot);
}

function setOwlVisibility(){
	function onGot(item) {
	  let displayOwl = 'block';
	  if (item.owlVisible != null) {
		if(item.owlVisible === false)
			displayOwl = 'none'
	  }
	  document.querySelector('#owl').style.display = displayOwl;
	}

	chrome.storage.sync.get('owlVisible', onGot);
}

function setAlertEnabled(){
	function onGot(item) {
	  let alertEn = true;
	  if (item.alertEnabled != null) {
		if(item.alertEnabled === false)
			alertEn = false;
	  }
	  // Alert.enabled = alertEn
	}

	chrome.storage.sync.get('alertEnabled', onGot);
}

function updateScore() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id,
	  {msg: "getPoints"},
	  function(response) {
		if(response?.msg === "updatePoints"){
		  let display = document.getElementById('points');
		  display.innerText = response.points + '/100';
		  changeViewByPoints(response.points);
		}
	  });
	});
}
