const insertedIconDivClass = 'tooltip';
const insertedIconSrc = 'TwitterParser/logo-48.png';
const insertedIconHeight = 20;

const userPopupClass = 'tooltiptext';
const userPopupText = 'Placeholder';

const userHeaderClass = 'css-1dbjc4n r-1wbh5a2 r-dnmrzs r-1ny4l3l';
const tweetHeaderClass = 'css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2';
const userLogoClass = 'css-9pa8cd';
const twitterPostsPageDivClass = 'css-1dbjc4n r-kemksi r-1kqtdi0 r-1ljd8xs r-13l2t4g r-1phboty r-1jgb5lz r-11wrixw r-61z16t r-1ye8kvj r-13qz1uu r-184en5c';

const timeToActivateObserver = 2000 // in ms

function insertIcons(){
	function addOurIcon(twPost){
		function createUserPopup(){
			let userPopup = document.createElement('span');
			userPopup.classList.add(userPopupClass);
			userPopup.innerText = userPopupText;
			return userPopup;
		}
		
		function createIcon(){
			let icon = document.createElement('img');
			icon.src = chrome.runtime.getURL(insertedIconSrc);
			icon.alt = "Fake news icon"
			icon.height = insertedIconHeight;
			return icon;
		}
		
		function createDivToInsert(){
			let div = document.createElement('div');
			div.classList.add(insertedIconDivClass);
			div.appendChild(createIcon());
			div.appendChild(createUserPopup());
			return div;
		}
		
		if(twPost.querySelector('.'.concat(insertedIconDivClass)))
			return;							
		var userHeaders = twPost.getElementsByClassName(userHeaderClass);
		if(userHeaders == null || userHeaders.length == 0)
			return;
		twPost.appendChild(createDivToInsert());
	}
	
	let userIntrosCollection = document.getElementsByClassName(tweetHeaderClass);
	Array.prototype.forEach.call(userIntrosCollection, function(userIntro){
		addOurIcon(userIntro);
	});
}

function checkMutations(mutations){
	mutations.forEach(function(mutation) {
		if(mutation.addedNodes)
		mutation.addedNodes.forEach(function(added_node) {
			if(added_node.nodeName == 'IMG' && added_node.classList.contains(userLogoClass)) {
				insertIcons();
			}
		});
	});
}

function addObserver(){
	const parents = document.getElementsByClassName(twitterPostsPageDivClass);
	mutationObserver.observe(parents[0], {attributes: false, childList: true, characterData: false, subtree:true});
}

const mutationObserver = new MutationObserver(checkMutations);
const myTimeout = setTimeout(addObserver, timeToActivateObserver);

