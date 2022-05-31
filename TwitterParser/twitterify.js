function insertIcons(){
	function addOurIcon(twPost){
		if(twPost.querySelector(".tooltip"))
			return;
		//find if contains username element
		var names = twPost.getElementsByClassName("css-1dbjc4n r-1wbh5a2 r-dnmrzs r-1ny4l3l");
		if(names == null || names.length == 0)
			return;
		let div = document.createElement('div');
		div.classList.add("tooltip");
		let icon = document.createElement('img');
		let iconNumber = Math.floor(Math.random() * 3);
		if (iconNumber == 0) icon.src = chrome.runtime.getURL("TwitterParser/not-defined.png");
		else if (iconNumber == 1) icon.src = chrome.runtime.getURL("TwitterParser/verified.png");
		else if (iconNumber == 2) icon.src = chrome.runtime.getURL("TwitterParser/bot-alert.png");
		icon.alt = "Fake news icon"
		icon.height = 20;
		let tooltip = document.createElement('span');
		tooltip.classList.add("tooltiptext");
		tooltip.innerText = "Placeholder";
		div.appendChild(icon);
		div.appendChild(tooltip);
		twPost.appendChild(div);
	}
	
	//find all div parents of username, date ... divs
	let userIntrosCollection = document.getElementsByClassName('css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2');
	Array.prototype.forEach.call(userIntrosCollection, function(userIntro){
		addOurIcon(userIntro);
	});
}

function checkMutations(mutations){
	mutations.forEach(function(mutation) {
		if(mutation.addedNodes)
		mutation.addedNodes.forEach(function(added_node) {
			if(added_node.nodeName == 'IMG' && added_node.classList.contains('css-9pa8cd')) {
				insertIcons();
			}
		});
	});
}

function addObserver(){
	// find main div
	const parent = document.querySelector('.css-1dbjc4n');
	mutationObserver.observe(parent, {attributes: false, childList: true, characterData: false, subtree:true});
}

const mutationObserver = new MutationObserver(checkMutations);
const myTimeout = setTimeout(addObserver, 2000);

