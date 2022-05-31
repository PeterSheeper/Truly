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
			userPopup.innerText = userPopupText;
			return userPopup;
		}
		
		function createIcon(isTrue){
			let icon = document.createElement('img');
			icon.id = 'fakeIcon'
			icon.src = chrome.runtime.getURL("TwitterParser/not-defined.png");
			icon.alt = "Fake news icon"
			icon.height = insertedIconHeight;
			return icon;
		}
		
		function createDivToInsert(isTrue){
			let div = document.createElement('div');
			div.classList.add(insertedIconDivClass);
			div.appendChild(createIcon(isTrue));
			div.appendChild(createUserPopup());
			return div;
		}
		
		function postText(jQueryThisObj){
			let texts = jQueryThisObj.find($('[data-testid="tweetText"]'));
			return $.ajax({
				type: 'POST',
				url: 'http://127.0.0.1:5000/is_fake',
				data: JSON.stringify({
					"content": texts[0].innerText
				}),
				success: function(data){
					console.log('success');
				},
				error: function(data){
					console.log('error');
				},
				contentType: "application/json",
			});
		}
		
		function changeIconIfFake(jQueryThisObj){
			let promise = postText(jQueryThisObj);
			promise.then(function(isFake){
				let icon = tweetHeaders.find('#fakeIcon')[0];
				if (isFake)
					icon.src = chrome.runtime.getURL("TwitterParser/bot-alert.png");
				else
					icon.src = chrome.runtime.getURL("TwitterParser/verified.png");
			});
		}
		
		let tweetHeaders = $(this).find($('[class="' + tweetHeaderClass + '"]'));
		if($(this).find('.'.concat(insertedIconDivClass)).length != 0)
			return;
		if(tweetHeaders.length != 1)
			return;
		tweetHeaders[0].appendChild(createDivToInsert(false));
		changeIconIfFake($(this));
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

