function preload(){
  setFontSize();
  changeViewOnKey();
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
		} else if (key == 'g') {
			root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greenBorder'));
			root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greenBackground'));
			owl.setAttribute("src", "assets/positive.gif");
			sign.setAttribute("src", "assets/positive.png");
			sign.setAttribute("title", "verified");
		} else if (key == 'b') {
			root.style.setProperty('--borderColor', getComputedStyle(root).getPropertyValue('--greyBorder'));
			root.style.setProperty('--backgroundColor', getComputedStyle(root).getPropertyValue('--greyBackground'));
			owl.setAttribute("src", "assets/neutral.gif");
			sign.setAttribute("src", "assets/neutral.png");
			sign.setAttribute("title", "not defined");
		}
	}, false);
}

function setFontSize(){
	function onGot(item) {
	  let size = "20";
	  if (item.addOnFontSize) {
		size = item.addOnFontSize;
	  }
	  document.querySelector('#points').style.fontSize = size + 'px';
	}

	chrome.storage.sync.get('addOnFontSize', onGot);
}