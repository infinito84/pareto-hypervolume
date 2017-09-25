var colors = [
	'#46B29D', '#324D5C', '#F0C330', '#F25C05', '#B0A989',
	'#F20154', '#B7DFD8', '#F2B705', '#FFD0A1', '#8C9893',
	'#0E1954', '#044F88', '#5BB451', '#D14836', '#000000'
];

var inputX = document.querySelector('.nadir input:nth-child(1)');
var inputY = document.querySelector('.nadir input:nth-child(2)');
var button = document.querySelector('.nadir button');
var form = document.querySelector('.nadir');

var graph = function(frontiers, nadir) {
	if(window.draw) draw.destroy();
    var graphics = document.querySelector('canvas#c1').getContext('2d');

    window.draw = Chart.Scatter(graphics, {
        data: {
			datasets : frontiers.concat([[nadir, nadir, nadir]]).map(function(data, i){
				var color = colors[i] || '#000000';
				var color2 = Chart.helpers.color(color).alpha(0.2).rgbString();
				var label = i === 0 ? 'No' : 'Sí';
				label = (i+1) +') '+label+' = '+data.length;
				// si es el punto nadir
				if(frontiers.length === i){
					label = 'Reference Point';
					color = '#ff0000';
					color2 = '#ff0000';
				}
				return {
					label : label,
					borderColor : color,
					backgroundColor: color2,
					lineTension : 0,
					data : data.slice(0).sort(function(a, b){
						return a.x - b.x;
					})
				}
			})
		},
        options: {
            title: {
                display: true,
                text: 'Optimalidad de Pareto ('+ frontiers.length +' frentes), Hypervolume ('+hyperVolume(frontiers[0], nadir)+')'
            },
			legend: {
       			display: true,
       			position: 'right',
				labels : {
					usePointStyle : true,
					boxWidth : 10
				},
				onClick : function(e, obj){
					if(obj.datasetIndex === frontiers.length) return;

					var data = draw.data.datasets[obj.datasetIndex];
					data.showLine = !data.showLine;
					if(!data.showLine){
						setTimeout(function(){
							data._meta[0].dataset._view.fill = false;
							draw.update();
						}, 50);
						setTimeout(function(){
							data._meta[0].dataset._view.fill = false;
							draw.update();
						}, 500);
					}
					draw.update();
				}
  			}
        }
    });

	inputX.value = nadir.x;
	inputY.value = nadir.y;
	form.style.display = 'block';
}

button.onclick = function(){
	nadir.x = parseFloat(inputX.value);
	nadir.y = parseFloat(inputY.value);
	graph(frontiers, nadir);
}
