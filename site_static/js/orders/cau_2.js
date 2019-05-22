$(function(){
		function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = 50;
	var height = 50;
	var click = 0;
	
	// iterate for rows	
	for (var row = 0; row < 5; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < 5; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				click: click
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}

var gridData = gridData();	
// I like to log the data to the console for quick debugging
console.log(gridData);

var grid = d3.select("#grid")
	.append("svg")
	.attr("width","270px")
	.attr("height","270px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return d.x; })
	.attr("y", function(d) { return d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#222")
	.on('click', function(d) {
       d.click ++;
       if ((d.click)%4 == 0 ) { d3.select(this).style("fill","#fff"); }
	   if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
	   if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
	   if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
    });

	// add SVG
	var start = d3.select('svg').append("image")
		.attr("xlink:href","http://127.0.0.1:8000/media/cau2/cat.svg")
		.attr("class", "start")
    	.attr("width", 50)
    	.attr("height", 50)
    	.attr("x", 1)
    	.attr("y", 1)
    var end = d3.select('svg').append("image")
		.attr("xlink:href","http://127.0.0.1:8000/media/cau2/mouse.svg")
		.style("fill","#75739F")
		.attr("class", "end")
    	.attr("width", 61)
    	.attr("height", 61)
    	.attr("x", 195)
    	.attr("y", 195)
    
    // ============================================= //
	// 				START CLICK   					 //
	// ============================================= //

	// start click

    $('.start').click(function(){
    	var grid;
    	$(this).addClass('is-loading')
		$start = $(this);
		$.ajax({
			url: $start.attr('data-href'),
			dataType: 'json',
			type: 'get',
			success: function(data){
				grid = data.grid;
				console.log(grid)
				// ADD RANDOM NODE
				for (var x in gridData){
					var column = gridData[x]
					var node = d3.select('svg').selectAll(".node")
					.data(column)
					.enter()
					.append("text")
					.text(function(d,i){
						return grid[x][i]
					})
					.attr('x',function(d,i){
						return d.x + 15
					})
					.attr('y',function(d,i){
						return d.y +30
					})
					.attr("font-family", "sans-serif")
					.attr("font-size", "20px")
					.style("fill", "rgb(0, 0, 0)")
				}
			}
		});

		// GET SOLUTION
		$start = $(this);
		$.ajax({
			url: $start.attr('data-solution'),
			dataType: 'json',
			type: 'get',
			success: function(data){
				for (so in data.solu){
					start.transition()
						.attr("transform",`translate(${data.solu[so][1]*50}, ${data.solu[so][0]*50})`)
						.delay(1000*so)
						.duration(1000)
				}
				$('.start').removeClass("is-loading")
			},
			complete: function(data){
				$('#grid').append('<p class="success has-text-centered">Đã tìm thấy lối đi!</p>')
			}
		});


    })
});