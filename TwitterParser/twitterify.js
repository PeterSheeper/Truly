const insertedIconDivClass = 'tooltip';
const insertedIconHeight = 20;

const userPopupClass = 'tooltiptext';
const userPopupText = 'Placeholder';

const tweetHeaderClass = 'css-1dbjc4n r-1d09ksm r-18u37iz r-1wbh5a2';
const userLogoClass = 'css-9pa8cd';

const timeToActivateObserver = 2000 // in ms

let negative = 0;
let all = 0;

function insertIcons(){
	function addOurIcon(){
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
			icon.id = 'fakeIcon'
			icon.src = chrome.runtime.getURL("TwitterParser/not-defined.png");
			icon.alt = "Fake news icon"
			icon.height = insertedIconHeight;
			icon.setAttribute("style", "vertical-align: bottom; margin-left: 5px;");
			return icon;
		}
		
		function createDivToInsert(){
			let div = document.createElement('div');
			div.classList.add(insertedIconDivClass);
			div.appendChild(createIcon());
			//div.appendChild(createUserPopup());
			return div;
		}
		
		function postText(jQueryThisObj){
			var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
			let texts = jQueryThisObj.find($('[data-testid="tweetText"]'));
			if(texts[0] === undefined || texts[0].innerText === undefined)
				return -1;
			let d = new Date();
			let m = d.getMonth();
			let day = d.getDate();
			let date = d.getFullYear() + '-' +  (m<10 ? '0' : '') + (m+1) +
				'-' +  (day<10 ? '0' : '') + day + 'T' + d.getHours() + ':'
				+ d.getMinutes() + ':' + d.getSeconds();
			return $.ajax({
				type: 'POST',
				url: 'http://127.0.0.1:5000/is_real',
				data: JSON.stringify({
					"content": texts[0].innerText,
					"url": MD5(texts[0].innerText),
					"date": date.toString()
				}),
				success: function(){
					//console.log('success');
				},
				error: function(){
					//console.log('error');
				},
				contentType: "application/json",
			});
		}
		
		function changeIconIfFake(jQueryThisObj){
			let promise = postText(jQueryThisObj);
			if(promise === -1)
				return;
			promise.then(function(isFake){
				console.log(isFake);
				all = all + 1;
				let icon = tweetHeaders.find('#fakeIcon')[0];
				if (isFake === 0){
					icon.src = chrome.runtime.getURL("TwitterParser/bot-alert.png");
					negative = negative + 1;
				}else if (isFake === 1)
					icon.src = chrome.runtime.getURL("TwitterParser/opinion.png");
				else if (isFake === 2)
					icon.src = chrome.runtime.getURL("TwitterParser/verified.png");
			});
		}
		
		let tweetHeaders = $(this).find($('[class="' + tweetHeaderClass + '"]'));
		if($(this).find('.'.concat(insertedIconDivClass)).length !== 0)
			return;
		if(tweetHeaders.length > 2 || tweetHeaders.length < 1)
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
			if(added_node.nodeName === 'IMG' && added_node.classList.contains(userLogoClass)) {
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

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.msg === "getPoints"){
			function calcPoints(){
				if(all === 0)
					return 0;
				return Math.round(100* negative / all);
			}
			let scorePoints = calcPoints();
			console.log(scorePoints);
			sendResponse({
				msg: "updatePoints",
				points : scorePoints
			});
		}
		if(chrome.runtime.lastError) {
			// Something went wrong
			console.warn("Whoops.. " + chrome.runtime.lastError.message);
		} else {
			// No errors
		}
	}
);
