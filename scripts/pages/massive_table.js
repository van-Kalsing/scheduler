function render_table_calendar(container_element) {
	var container_element_id = container_element.attr("id");
	
	var grid =
		[ ["value","value","value","value","value","value","value"],
		  ["value","value","value","value","value","value","value"],
		  ["value","value","value","value","value","value","value"],
		  ["value","value","value","value","value","value","value"],
		  ["value","value","value","value","value","value","value"],
		  ["value","value","value","value","value","value","value"],
		];
		
	var table = d3.select("#" + container_element_id).append("table");
	       // thead = table.append("thead"),
	      //  tbody = table.append("tbody");
	for (var i=0;i<6;++i) {
		var row=table.append ("tr");
		for (var j=0;j<7;++j) {
			var cell = row.append("td");
			cell.text(grid[i][j]);
		//	date.getTime()-(date.getDay()*24*60*60*1000);
			//var date =
		//	npmDate (ms);
		//	for (i=0;i<35;++i)
			
		}
	}
}
