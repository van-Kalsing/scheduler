$(document).ready(function() {
	// Дескрипторы страниц
	var pages =
		{
			"linear_calendar":
				{
					"render"       : render_linear_calendar,
					"title"        : "Линейный календарь",
					"menu_element" : $("#linear_calendar_menu_item"),
				},
				
			"table_calendar":
				{
					"render"       : render_table_calendar,
					"title"        : "Табличный календарь",
					"menu_element" : $("#table_calendar_menu_item"),
				},
				
			"gantt_diagram":
				{
					"render"       : render_gantt_diagram,
					"title"        : "Сетевой график",
					"menu_element" : $("#gantt_diagram_menu_item"),
				},
				
			"burndown_chart":
				{
					"render"       : render_burndown_chart,
					"title"        : "Диаграмма сгорания",
					"menu_element" : $("#burndown_chart_menu_item"),
				},
				
			"works_categories":
				{
					"render"       : render_works_categories,
					"title"        : "Категории работ",
					"menu_element" : $("#works_categories_menu_item"),
				},
				
			"create_work":
				{
					"render"       : render_create_work,
					"title"        : "Новая работа",
					"menu_element" : $("#create_work_menu_item"),
				},
		};
		
		
		
	// Состояние интерфейса
	var interface_state =
		{
			// Имя активной страницы
			"active_page_name" : null,
			
			// Элемент заголовка страницы
			"content_title" : $("#content_title"),
			
			// Элемент содержания страницы
			"content" : $("#content"),
		};
		
		
		
	function activate_page(page_name) {
		// Определение имени активной страницы
		active_page_name = interface_state["active_page_name"];
		
		
		// Проверка переданных данных
			// Проверка корректности запрашиваемой страницы
			is_correct_page_name = page_name in pages;
			
			if (!is_correct_page_name) {
				// Запрошена некорректная страница
				return; //!!!!! Необходимо обрабатывать
			}
			
			
			// Проверка активности запрашиваемой страницы
			if (page_name == active_page_name) {
				// Запрошенная страница является активной ->
				//    никаких действий не производится
				return;
			}
			
			
		// Активация страницы
			// Получение дескрипторов активной и запрашиваемой страниц
				// Получение дескриптора активной страницы
				if (active_page_name != null) {
					active_page = pages[active_page_name];
				} else {
					active_page = null
				}
				
				// Получение дескриптора запрашиваемой страницы
				page = pages[page_name];
				
				
			// Отображение запрашиваемой страницы
				// Смена заголовка страницы
				interface_state["content_title"].html(page["title"]);
				
				// Смена стилей элементов меню
				page["menu_element"].toggleClass("selected_menu_item");
				
				if (active_page != null) {
					active_page["menu_element"].toggleClass(
						"selected_menu_item"
					);
				}
				
				// Отображение содержимого страницы
				page["render"](interface_state["content"]);
				
				
			// Смена состояния интерфейса
			interface_state["active_page_name"] = page_name;
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
				activate_page("gantt_diagram");
			}
		);
		
		$("#burndown_chart_menu_item").click(
			function() {
				activate_page("burndown_chart");
			}
		);
		
		$("#linear_calendar_menu_item").click(
			function() {
				activate_page("linear_calendar");
			}
		);
		
		$("#table_calendar_menu_item").click(
			function() {
				activate_page("table_calendar");
			}
		);
		
		$("#works_categories_menu_item").click(
			function() {
				activate_page("works_categories");
			}
		);
		
		$("#create_work_menu_item").click(
			function() {
				activate_page("create_work");
			}
		);
	}
	
	
	
	initialize_interface();
});
