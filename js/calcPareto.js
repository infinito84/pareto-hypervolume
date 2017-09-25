var dominates = function(a, b){
	return (a.x <= b.x && a.y <= b.y) && (a.x < b.x || a.y < b.y);
}

var calcPareto = function(data){
	window.nadir = {x:0, y: 0};
	data.forEach(function(p){
		if(p.x > nadir.x) nadir.x = p.x;
		if(p.y > nadir.y) nadir.y = p.y;
	})

	window.frontiers = [];
	while(data.length){
		var no = [];
		var si = [];
		for(var i=0; i < data.length; i++){
			var howManyDominates = 0;
			for(var j=0; j<data.length; j++){
				if(j === i) continue;
				if(dominates(data[j], data[i])){
					howManyDominates++;
				}
			}
			if(!howManyDominates){
				no.push(data[i]);
			}
			else{
				si.push(data[i]);
			}
		}
		data = si;
		frontiers.push(no);
	}
	graph(frontiers, nadir);
	showFrontiers(frontiers);
	console.log('Nadir', nadir)
}
