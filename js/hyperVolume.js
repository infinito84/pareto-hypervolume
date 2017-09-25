var round = function(hvol){
	var decimals = 3;
	var n = Math.pow(10, decimals);
	var fixed = Math.round(hvol * n) / n;
	//if(fixed === 0 && hvol !== 0) return hvol;
	return fixed;
}

var hyperVolume = function(frontier, ref){
	var referencePoint = ref;
	frontier = frontier.map(function(p){
		return {
			x : p.x - referencePoint.x,
			y : p.y - referencePoint.y
		}
	})

	var hvol = 0.0;
	var q = frontier.shift();
	var h = q.x;
	frontier.forEach(function(p){
		hvol += h * (q.y - p.y);
		if(p.x < h){
			h = p.x;
		}
		q = p;
	});
	hvol += h * q.y;
	return round(hvol);
};

var hyperVolume = function(frontier, ref){
	var referencePoint = ref;
	frontier = frontier.map(function(p){
		return {
			x : p.x - referencePoint.x,
			y : p.y - referencePoint.y
		}
	})

	var hvol = 0.0;
	var q = frontier.shift();
	var h = q.x;
	frontier.forEach(function(p){
		hvol += h * (q.y - p.y);
		if(p.x < h){
			h = p.x;
		}
		q = p;
	});
	hvol += h * q.y;
	return round(hvol);
};


// 3.25 http://esa.github.io/pygmo/tutorials/getting_started_with_hyper_volumes.html
console.log('Ejemplo Hypervolume', hyperVolume([
	{x : 1, y : 0},
	{x : 0.5, y : 0.5},
	{x : 0, y : 1},
	{x : 1.5, y : 0.75}
], {x: 2, y : 2}))
