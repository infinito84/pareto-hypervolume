var colors = [
	'#46B29D', '#324D5C', '#F0C330', '#F25C05', '#B0A989',
	'#F20154', '#B7DFD8', '#F2B705', '#FFD0A1', '#8C9893',
	'#0E1954', '#044F88', '#5BB451', '#D14836', '#000000'
];

var graph = function(frontiers) {
	if(window.draw) draw.destroy();
    var graphics = document.querySelector('canvas#c1').getContext('2d');

    window.draw = Chart.Scatter(graphics, {
        data: {
			datasets : frontiers.map(function(data, i){
				var color = colors[i] || '#000000';
				var label = i === 0 ? 'No' : 'Sí';
				return {
					label : (i+1) +') '+label+' = '+data.length,
					borderColor : color,
					backgroundColor: Chart.helpers.color(color).alpha(0.2).rgbString(),
					data : data.slice(0).sort(function(a, b){
						return a.x - b.x;
					})
				}
			})
		},
        options: {
            title: {
                display: true,
                text: 'Optimalidad de Pareto ('+ frontiers.length +' frentes)'
            },
			legend: {
       			display: true,
       			position: 'right',
				labels : {
					usePointStyle : true,
					boxWidth : 10
				},
				onClick : function(e, obj){
					// Si se presiona shift, muestra la línea
					if(e.shiftKey){
						var data = draw.data.datasets[obj.datasetIndex];
						data.showLine = !data.showLine;
						if(!data.showLine){
							setTimeout(function(){
								data._meta[0].dataset._view.fill = false;
								draw.update();
							}, 50);
						}

					}
					else{
						var data = draw.data.datasets[obj.datasetIndex];
						data.hidden = !data.hidden;
					}
					draw.update();
				}
  			}
        }
    });
}

var graphHyperVolume = function(frontiers) {
	if(window.hyperDraw) hyperDraw.destroy();
    var graphics = document.querySelector('canvas#c2').getContext('2d');

    window.hyperDraw = new Chart.Line(graphics, {
        data: {
			labels : frontiers.map(function(frontier, i){
				return ''+(frontiers.length - i)
			}),
			datasets : [{
				borderColor : colors[1],
				backgroundColor: Chart.helpers.color(colors[1]).alpha(0.2).rgbString(),
				data : frontiers.reverse().map(function(frontier, i){
					return {
						x : i,
						y : hyperVolume(frontier)
					}
				})
			}]
		},
        options: {
            title: {
                display: true,
                text: 'Hypervolume = '+ hyperVolume(frontiers.pop())
            },
			legend: {
       			display: false,
  			}
        }
    });
}
