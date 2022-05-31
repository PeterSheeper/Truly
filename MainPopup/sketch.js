const fontSizeStorageId = 'addOnFontSize';
const owlVisiblityStorageId = 'owlVisible';
const alertStorageId = 'alertEnabled';

const defaultFontSize = '20'

function preload(){
  setFontSize();
  setOwlVisibility();
  changeViewOnKey();
  updateScore();
}

function setup() {
  noCanvas();
}

function draw(){
}


function changeViewOnKey(){
	document.addEventListener('keydown', (event) => {
		var key = event.key;
		var root = document.documentElement;
		var owl = document.getElementById("owl");
		var sign = document.getElementById("sign");

		if (key == 'r') {
			root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--redBorder'));
			root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--redBackground'));
			owl.setAttribute("src", "assets/negative.gif");
			sign.setAttribute("src", "assets/negative.png");
			sign.setAttribute("title", "potential fake news");
			chrome.runtime.sendMessage({
        action: 'updateIcon',
        value: true
      });
		} else if (key == 'g') {
			root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greenBorder'));
			root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greenBackground'));
			owl.setAttribute("src", "assets/positive.gif");
			sign.setAttribute("src", "assets/positive.png");
			sign.setAttribute("title", "verified");
			chrome.runtime.sendMessage({
        action: 'updateIcon',
        value: false
      });
		} else if (key == 'b') {
			root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greyBorder'));
			root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greyBackground'));
			owl.setAttribute("src", "assets/neutral.gif");
			sign.setAttribute("src", "assets/neutral.png");
			sign.setAttribute("title", "not defined");
			chrome.runtime.sendMessage({
        action: 'updateIcon',
        value: false
      });
		}
	}, false);
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
		if(item.owlVisible == false)
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
		if(item.alertEnabled == false)
			alertEn = false;
	  }
	  // Alert.enabled = alertEn
	}

	chrome.storage.sync.get('alertEnabled', onGot);
}

function updateScore() {
	let points = document.getElementsByClassName('points');
	let score = 0;
	for(let i = 0;i<points.length;i++) {
		score += parseInt(points[i].textContent);
	}
	let display = document.getElementById('points');
	display.innerHtml = score;
}