var selected_menu_item = "gantt_diagram_menu_item";
var selected_page_name = "gantt-diagram";





function select_page(page_name) {
	if(page_name == selected_page_name) {
		return;
	}
	
	
	var menu_item = null;
	
	switch(page_name) {
		case "gantt-diagram":
			menu_item = "gantt_diagram_menu_item";
			
			$("#content_title").html("Сетевой график");
			$("#content").html(
				"<img id='cap' src='images/caps/gantt-diagram.png' />"
			);
			
			break;
			
			
		case "burndown-chart":
			menu_item = "burndown_chart_menu_item";
			
			$("#content_title").html("Диаграмма сгорания");
			$("#content").html(
				"<img id='cap' src='images/caps/burndown-chart.png' />"
			);
			
			break;
			
			
		case "calendar":
			menu_item = "calendar_menu_item";
			
			$("#content_title").html("Календарь");
			$("#content").html(
				"<img id='cap' src='images/caps/calendar.png' />"
			);
			
			break;
			
			
		case "works-categories":
			menu_item = "works_categories_menu_item";
			
			$("#content_title").html("Категории работ");
			$("#content").html(
				"<img id='cap' src='images/caps/works-categories.png' />"
			);
			
			break;
			
			
		case "create-work":
			menu_item = "create_work_menu_item";
			
			$("#content_title").html("Новая работа");
			$("#content").html("");
			
			break;
			
			
	}
	
	
	$("#" + selected_menu_item).toggleClass("selected_menu_item");
	$("#" + menu_item).toggleClass("selected_menu_item");
	
	
	selected_menu_item = menu_item;
	selected_page_name = page_name;
}



function initialize_interface(){
	$("#selected_work_reset").click(
		function() {
			$("#selected_work_title").html("Работа не выбрана");
			$("#selected_work_title").addClass("selected_work_not_exist");
		}
	);
	
	
	$("#gantt_diagram_menu_item").click(
		function() {
			select_page("gantt-diagram");
		}
	);
	
	$("#burndown_chart_menu_item").click(
		function() {
			select_page("burndown-chart");
		}
	);
	
	$("#calendar_menu_item").click(
		function() {
			select_page("calendar");
		}
	);
	
	$("#works_categories_menu_item").click(
		function() {
			select_page("works-categories");
		}
	);
	
	$("#create_work_menu_item").click(
		function() {
			select_page("create-work");
		}
	);
}


window.onload = initialize_interface;
