var chart_parameters =
	{
		"width"   : 700,
		"height"  : 500,
		"padding" : 10,
	};
	
	
	
	
	
function prepare_data() {
	// Извлечение данных из базы данных
	//!!!!! Получить данные из БД
	var data =
		{
			"tasks_number" : 4,
			
			"work_start_date" : new Date("4/23/2014"),
			
			"work_end_date" : new Date("5/20/2014"),
			
			"schedule" :
				[
					{
						"date"  : new Date("5/1/2014"),
						"tasks" : [1],
					},
					{
						"date"  : new Date("5/10/2014"),
						"tasks" : [2, 3],
					},
					{
						"date"  : new Date("5/20/2014"),
						"tasks" : [4],
					},
				],
				
			"implementation" :
				[
					{
						"date"  : new Date("5/3/2014"),
						"tasks" : [1],
					},
					{
						"date"  : new Date("5/7/2014"),
						"tasks" : [3],
					},
					{
						"date"  : new Date("5/13/2014"),
						"tasks" : [2],
					},
					{
						"date"  : new Date("5/20/2014"),
						"tasks" : [4],
					},
				],
		};
		
		
		
	// Определение узлов и переходов
	function prepare_transitions(transitions) {
		var prepared_transitions =
			{
				"nodes"  : new Array(),
				"shifts" : new Array(),
			};
			
		var nodes  = prepared_transitions["nodes"];
		var shifts = prepared_transitions["shifts"];
		
		
		// Формирование начального узла
		var init_node =
			{
				"date"              : data["work_start_date"],
				"rest_tasks_number" : data["tasks_number"],
				"tasks"             : new Array(),
			};
			
		nodes.push(init_node);
		
		
		// Формирование остальных узлов и переходов
		transitions.forEach(function(transition) {
			transition["tasks"].forEach(function(task) {
				last_node         = nodes[nodes.length - 1];
				rest_tasks_number = last_node["rest_tasks_number"] - 1;
				
				
				node =
					{
						"date"              : transition["date"],
						"rest_tasks_number" : rest_tasks_number,
						"tasks"             : transition["tasks"],
					};
					
				nodes.push(node);
				
				
				shift =
					{
						"predecessor" : last_node,
						"successor"   : node,
					};
					
				shifts.push(shift);
			});
		});
		
		
		return prepared_transitions;
	}
	
	
	var prepared_data =
		{
			"tasks_number"    : data["tasks_number"],
			"work_start_date" : data["work_start_date"],
			"work_end_date"   : data["work_end_date"],
			"schedule"        : prepare_transitions(data["schedule"]),
			"implementation"  : prepare_transitions(data["implementation"]),
		};
		
		
		
	return prepared_data;
}





function render_data(data, chart) {
	// Определение масштабов
	var date_scale =
		d3.scale.linear()
			.domain([
				data["work_start_date"].getTime(),
				data["work_end_date"].getTime(),
			])
			.range([
				chart_parameters["padding"],
				chart_parameters["width"] - chart_parameters["padding"]
			]);
			
			
	var rest_tasks_number_scale =
		d3.scale.linear()
			.domain([
				0,
				data["tasks_number"]
			])
			.range([
				chart_parameters["height"] - chart_parameters["padding"],
				chart_parameters["padding"]
			]);
			
			
			
	// Функция прорисовки узлов и переходов
	function render_transitions(transitions, nodes_class, shifts_class) {
		// Вспомогательные функции для вычисления координат круга,
		// отображающего узел
		function scale_node_date(node) {
			var scaled_date =
				date_scale(
					node["date"]
				);
				
			return scaled_date;
		}
		
		
		function scale_node_rest_tasks_number(node) {
			var scaled_rest_tasks_number =
				rest_tasks_number_scale(
					node["rest_tasks_number"]
				);
				
			return scaled_rest_tasks_number;
		}
		
		
		
		// Вспомогательная функция для вычисления точек полилинии,
		// отображающей переход
		function compute_shift_points(shift) {
			var predecessor_node = shift["predecessor"];
			var successor_node   = shift["successor"];
			
			
			var first_point =
				scale_node_date(predecessor_node) 
					+ ","
					+ scale_node_rest_tasks_number(predecessor_node);
					
			var second_point =
				scale_node_date(successor_node) 
					+ ","
					+ scale_node_rest_tasks_number(predecessor_node);
					
			var third_point =
				scale_node_date(successor_node) 
					+ ","
					+ scale_node_rest_tasks_number(successor_node);
					
			var points =
				first_point
					+ " " + second_point
					+ " " + third_point;
					
					
			return points;
		}
		
		
		
		// Прорисовка узлов
		chart.selectAll("." + nodes_class)
			.data(transitions["nodes"])
			.enter()
			
			.append("circle")
			.classed(nodes_class, true)
			.attr("r", 3)
			.attr("cx", scale_node_date)
			.attr("cy", scale_node_rest_tasks_number);
			
			
			
		// Прорисовка переходов
		chart.selectAll("." + shifts_class)
			.data(transitions["shifts"])
			.enter()
			
			.append("polyline")
			.classed(shifts_class, true)
			.attr("points", compute_shift_points);
	}
	
	
	
	// Прорисовка диаграммы
	chart
		.style("width", chart_parameters["width"] + "px")
		.style("height", chart_parameters["height"] + "px");
		
	render_transitions(
		data["implementation"],
		"implementation_nodes",
		"implementation_shifts"
	);
	
	render_transitions(
		data["schedule"],
		"schedule_nodes",
		"schedule_shifts"
	);
}





function render_burndown_chart(container_element) {
	var container_element_id = container_element.attr("id");
	
	
	var data  = prepare_data();
	var chart =
		d3.select("#" + container_element_id)
			.append("svg");
			
	render_data(data, chart);
}
