chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.msg === "getPoints"){
			function calcPoints(){
				let points = document.getElementsByClassName('points');
				let score = 0;
				for(let i = 0;i<points.length;i++) {
				score += parseInt(points[i].textContent);
				}
				return score;
			}
			let scorePoints = calcPoints();
			console.log(scorePoints);
			sendResponse({
				msg: "updatePoints",
				points : scorePoints
			});
		}
	}
);