var chart_parameters =
	{
		"width"  : 700,
		"height" : 400,
		
		"graphs_parameters" :
			{
				"area_left"   : 75,
				"area_right"  : 655,
				"area_top"    : 10,
				"area_bottom" : 355,
			},
			
		"dates_grid_parameters" :
			{
				"axis_y"     : 370,
				"axis_left"  : 30,
				"axis_right" : 700,
				
				"line_top"    : 0,
				"line_bottom" : 370,
				
				"captions_number" : 5,
				"captions_y"      : 385,
			},
			
		"rest_tasks_number_grid_parameters" :
			{
				"layers_maximal_number" : 5,
				
				"axis_x"      : 30,
				"axis_top"    : 0,
				"axis_bottom" : 370,
				
				"lines_left"  : 30,
				"lines_right" : 700,
				
				"captions_x" : 15,
			},
	};
	
	
	
	
	
function prepare_data() {
	// Извлечение данных из базы данных
	//!!!!! Получить данные из БД
	var data =
		{
			"tasks_number" : 7,
			
			"work_start_date" : new Date("4/23/2014"),
			
			"work_end_date" : new Date("5/27/2014"),
			
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
					{
						"date"  : new Date("5/21/2014"),
						"tasks" : [5, 6],
					},
					{
						"date"  : new Date("5/27/2014"),
						"tasks" : [7],
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
	
	
	// Определение дат, которым соответствуют узлы
	// function prepare_dates() {
	// 	var dates_times = new Array();
	// 	var dates       = new Array();
		
		
	// 	function prepare_dates(transitions) {
	// 		transitions.forEach(function(transition) {
	// 			var date_time = transition["date"].getTime();
				
	// 			if (dates_times.indexOf(date_time) == -1) {
	// 				dates_times.push(date_time);
	// 				dates.push(date);
	// 			}
	// 		});
	// 	}
	// 	data["schedule"]
	// }
	
	
	var prepared_data =
		{
			"tasks_number"    : data["tasks_number"],
			"work_start_date" : data["work_start_date"],
			"work_end_date"   : data["work_end_date"],
			"schedule"        : prepare_transitions(data["schedule"]),
			"implementation"  : prepare_transitions(data["implementation"]),
			// "dates"           : prepare_dates(),
		};
		
		
		
	return prepared_data;
}





function render_data(data, chart) {
	// Определение масштабов
	var graphs_parameters = chart_parameters["graphs_parameters"];
	
	var date_scale =
		d3.scale.linear()
			.domain([
				data["work_start_date"].getTime(),
				data["work_end_date"].getTime(),
			])
			.range([
				graphs_parameters["area_left"],
				graphs_parameters["area_right"]
			]);
			
			
	var rest_tasks_number_scale =
		d3.scale.linear()
			.domain([
				0,
				data["tasks_number"]
			])
			.range([
				graphs_parameters["area_bottom"],
				graphs_parameters["area_top"]
			]);
			
			
			
			
			
	// Функция прорисовки структурных элементов диаграммы
	function render_structural_elements() {
		var grid            = null;
		var grid_parameters = null;
		
		
		
		// Прорисовка вертикальной сетки
			// Создание группы элементов, составляющих вертикальную сетку
			grid =
				chart
					.append("g")
					.attr("id", "dates_grid");
					
			grid_parameters =
				chart_parameters[
					"dates_grid_parameters"
				];
				
				
				
			// Добавление координатной оси
			grid
				.append("line")
				.attr("id", "axis")
				
				.attr("x1", grid_parameters["axis_left"])
				.attr("y1", grid_parameters["axis_y"])
				.attr("x2", grid_parameters["axis_right"])
				.attr("y2", grid_parameters["axis_y"]);
				
				
				
			// Добавление линии даты
			grid
				.append("line")
				.attr("id", "line")
				.classed("active", false)
				.classed("passive", true)
				
				.attr("x1", 0)
				.attr("y1", grid_parameters["line_top"])
				.attr("x2", 0)
				.attr("y2", grid_parameters["line_bottom"]);
				
				
				
			// Вычисление расстояния между подписями дат
			var captions_number = grid_parameters["captions_number"];
			
			/* Производится округление до ближайшего целого большего
				вычисленного расстояния, т.к. иначе, из-за того, что моменты,
				времени соответствующие узлам, приходятся на первую миллисекунду
				суток, округление к меньшему целому может привести к выводу
				предыдущих суток (а дата, соответствующая последнему узлу,
				должна совпадать с датой окончания работы) */
			var captions_relative_distance =
				- Math.floor(
					- (data["work_end_date"] - data["work_start_date"]) /
						(captions_number - 1)
				);
				
				
				
			// Прорисовка подписей дат
			var caption_index = 0;
			
			for (; caption_index < captions_number; ++caption_index) {
				// Вычисление позиции подписи даты
				var line_relative_position =
					caption_index * captions_relative_distance
						+ data["work_start_date"].getTime();
						
				var caption_position =
					date_scale(
						line_relative_position
					);
					
					
				// Определение текста подписи даты
				var caption_date  = new Date(line_relative_position);
				var caption_day   = caption_date.getDate();
				var caption_month = caption_date.getMonth() + 1;
				var caption_year  = caption_date.getFullYear();
				
				if (caption_day < 10) {
					caption_day = "0" + caption_day;
				}
				
				if (caption_month < 10) {
					caption_month = "0" + caption_month;
				}
				
				var caption_text =
					caption_day + "."
						+ caption_month + "."
						+ caption_year;
						
						
				// Добавление подписи даты
				grid
					.append("text")
					.classed("caption", true)
					
					.attr("x", caption_position)
					.attr("y", grid_parameters["captions_y"])
					.text(caption_text);
			}
			
			
			
		// Прорисовка горизонтальной сетки
			// Создание группы элементов, составляющих горизонтальную сетку
			grid =
				chart
					.append("g")
					.attr("id", "rest_tasks_number_grid");
					
			grid_parameters =
				chart_parameters[
					"rest_tasks_number_grid_parameters"
				];
				
				
				
			// Добавление координатной оси
			grid
				.append("line")
				.attr("id", "axis")
				
				.attr("x1", grid_parameters["axis_x"])
				.attr("y1", grid_parameters["axis_top"])
				.attr("x2", grid_parameters["axis_x"])
				.attr("y2", grid_parameters["axis_bottom"]);
				
				
				
			// Вычисление числа уровней сетки и расстояния между ними
			var lines_number =
				Math.min(
					grid_parameters["layers_maximal_number"],
					data["tasks_number"] + 1
				);
				
			var lines_relative_distance =
				- Math.floor(
					- (data["tasks_number"] + 1) / lines_number
				);
				
				
				
			// Прорисовка уровней сетки
			for (var line_index = 0; line_index < lines_number; ++line_index) {
				var line_relative_position =
					data["tasks_number"]
						- line_index * lines_relative_distance;
						
				if (line_relative_position >= 0) {
					var line_position =
						rest_tasks_number_scale(
							line_relative_position
						);
						
						
					// Добавление линии сетки
					grid
						.append("line")
						.classed("line", true)
						
						.attr("x1", grid_parameters["lines_left"])
						.attr("y1", line_position)
						.attr("x2", grid_parameters["lines_right"])
						.attr("y2", line_position);
						
						
					// Добавление подписи сетки
					grid
						.append("text")
						.classed("caption", true)
						
						.attr("x", grid_parameters["captions_x"])
						.attr("y", line_position)
						.text(line_relative_position);
				} else {
					break;
				}
			}
	}
	
	
	
	// Функция прорисовки узлов и переходов
	function render_transitions(transitions, graph) {
		// Прорисовка узлов
			// Вспомогательные функции вычисления координат элементов,
			// отображающих узлы
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
			
			
			
			// Вспомогательные функции обработки наведения указателя мыши на
			// элементы отображающие узелы
			function activate_node(node) {
				var scaled_date = date_scale(node["date"]);
				
				chart.select("#dates_grid #line")
					.classed("active", true)
					.classed("passive", false)
					
					.attr("x1", scaled_date)
					.attr("x2", scaled_date);
			}
			
			
			function deactivate_node(node) {
				chart.select("#dates_grid #line")
					.classed("active", false)
					.classed("passive", true);
			}
			
			
			
			// Создание групп элементов, отображающих узлы
			var nodes =
				graph.selectAll()
					.data(transitions["nodes"])
					.enter()
					
					.append("g")
					.classed("node", true);
					
					
			// Добавление внутренних кругов (видимых всегда)
			nodes
				.append("circle")
				.classed("inner", true)
				
				.attr("r", 3)
				.attr("cx", scale_node_date)
				.attr("cy", scale_node_rest_tasks_number);
				
				
			// Добавление внешних кругов (видимых при наведнии указателя мыши)
			nodes
				.append("circle")
				.classed("outer", true)
				
				.attr("r", 5)
				.attr("cx", scale_node_date)
				.attr("cy", scale_node_rest_tasks_number)
				
				.on("mouseover", activate_node)
				.on("mouseout", deactivate_node);
				
				
				
		// Прорисовка переходов
			// Вспомогательная функция вычисления точек полилинии,
			// отображающей переход
			function compute_shift_points(shift) {
				var predecessor_node = shift["predecessor"];
				var successor_node   = shift["successor"];
				
				
				var first_point =
					date_scale(predecessor_node["date"]) 
						+ ","
						+ rest_tasks_number_scale(
								predecessor_node["rest_tasks_number"]
							);
							
				var second_point =
					date_scale(successor_node["date"]) 
						+ ","
						+ rest_tasks_number_scale(
								predecessor_node["rest_tasks_number"]
							);
							
				var third_point =
					date_scale(successor_node["date"]) 
						+ ","
						+ rest_tasks_number_scale(
								successor_node["rest_tasks_number"]
							);
							
				var points =
					first_point
						+ " " + second_point
						+ " " + third_point;
						
						
				return points;
			}
			
			
			
			// Добавление полилиний, отображающих переходы
			graph.selectAll()
				.data(transitions["shifts"])
				.enter()
				
				.append("polyline")
				.classed("shift", true)
				
				.attr("points", compute_shift_points);
	}
	
	
	
	
	
	// Прорисовка диаграммы
		// Установка общих свойств диаграммы
		chart
			.style("width", chart_parameters["width"] + "px")
			.style("height", chart_parameters["height"] + "px");
			
			
			
		// Прорисовка структурных элементов диаграммы
		render_structural_elements();
		
		
		
		// Прорисовка графиков
			// Прорисовка первого графика
			var implementation_graph =
				chart
					.append("g")
					.attr("id", "implementation_graph");
					
			render_transitions(
				data["implementation"],
				implementation_graph
			);
			
			
			// Прорисовка первого графика
			var schedule_graph =
				chart
					.append("g")
					.attr("id", "schedule_graph");
					
			render_transitions(
				data["schedule"],
				schedule_graph
			);
}





function render_burndown_chart(container_element) {
	var container_element_id = container_element.attr("id");
	
	
	var data  = prepare_data();
	var chart =
		d3.select("#" + container_element_id)
			.append("svg")
			.attr("id", "chart");
			
	render_data(data, chart);
}
