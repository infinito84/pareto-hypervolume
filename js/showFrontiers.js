var frontiersDiv = document.querySelector('#frontiers');

var showFrontiers = function(frontiers){
	frontiersDiv.innerHTML = '';
	frontiers.forEach(function(frontier, i){
		var html = `<table border=1><caption>Frontier #${i+1}</caption>`;
		frontier.forEach(function(p, j){
			html += `<tr><td>${j+1}</td><td>${p.x}</td><td>${p.y}</td></tr>`;
		})
		html += `</table>`;
		frontiersDiv.innerHTML += html;
	})
}
