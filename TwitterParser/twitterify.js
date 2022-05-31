const insertedIconDivClass = 'tooltip';
const insertedIconHeight = 20;

const userPopupClass = 'tooltiptext';
const userPopupText = 'Placeholder';

const tweetHeaderClass = 'css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2';
const userLogoClass = 'css-9pa8cd';

const timeToActivateObserver = 2000 // in ms

function insertIcons(){
	function addOurIcon(tweetId){
		function createUserPopup(){
			let userPopup = document.createElement('span');
			userPopup.classList.add(userPopupClass);
			let joined = document.createElement('p');
			joined.textContent = "Joined: xx.xx.xxxx";
			joined.setAttribute("style", "color: white;");
			userPopup.appendChild(joined);
			let discussions = document.createElement('p');
			discussions.textContent = "Discussions: #example1 #example2";
			discussions.setAttribute("style", "color: white;");
			userPopup.appendChild(discussions);			
			/*userPopup.innerHtml = `
			<p style="margin: 10px;">Joined: xx.xx.xxxx</p>
			<p style="margin: 10px;">Discussions: #example1 #example2</p>
			<p style="margin: 10px;">Activity: no posts/24h</p>
			`;*/
			return userPopup;
		}
		
		function createIcon(){
			let icon = document.createElement('img');
      		let iconNumber = Math.floor(Math.random() * 3);
		  	if (iconNumber == 0)
        		icon.src = chrome.runtime.getURL("TwitterParser/not-defined.png");
		  	else if (iconNumber == 1)
        		icon.src = chrome.runtime.getURL("TwitterParser/verified.png");
		  	else if (iconNumber == 2)
        		icon.src = chrome.runtime.getURL("TwitterParser/bot-alert.png");
			icon.alt = "Truly icon";
			icon.height = insertedIconHeight;
			icon.setAttribute("style", "vertical-align: bottom; margin-left: 5px;");
			return icon;
		}
		
		function createDivToInsert(){
			let div = document.createElement('div');
			div.classList.add(insertedIconDivClass);
			div.appendChild(createIcon());
			div.appendChild(createUserPopup());
			return div;
		}
		
		function postText(jQueryThisObj){
			let texts = jQueryThisObj.find($('[data-testid="tweetText"]'));
			$.post("http://127.0.0.1:5000/is_fake",
			{
				content: texts[0].innerText
			},
			function(data, status){
				console.log(data);
				return data;
			});
		}
		
		let tweetHeaders = $(this).find($('[class="' + tweetHeaderClass + '"]'));
		if($(this).find('.'.concat(insertedIconDivClass)).length != 0)
			return;
		if(tweetHeaders.length != 1)
			return;
		postText($(this));
		tweetHeaders[0].appendChild(createDivToInsert());
	}
	
	let tweets = $('[data-testid="tweet"]');
	tweets.each(addOurIcon);
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
	const primaryColumns = $('[role="main"]');
	mutationObserver.observe(primaryColumns[0], {attributes: false, childList: true, characterData: false, subtree:true});
}

const mutationObserver = new MutationObserver(checkMutations);
const myTimeout = setTimeout(addObserver, timeToActivateObserver);

