$(document).ready(function() {
	// Дескрипторы страниц
	var pages =
		{
			"linear_calendar":
				{
					"type"            : "general",
					"render"          : render_linear_calendar,
					"title"           : "Линейный календарь",
					"menu_element"    : $("#linear_calendar_menu_item"),
				},
				
			"table_calendar":
				{
					"type"            : "general",
					"render"          : render_table_calendar,
					"title"           : "Табличный календарь",
					"menu_element"    : $("#table_calendar_menu_item"),
				},
				
			"gantt_diagram":
				{
					"type"            : "individual",
					"render"          : render_gantt_diagram,
					"title"           : "Сетевой график",
					"menu_element"    : $("#gantt_diagram_menu_item"),
				},
				
			"burndown_chart":
				{
					"type"            : "individual",
					"render"          : render_burndown_chart,
					"title"           : "Диаграмма сгорания",
					"menu_element"    : $("#burndown_chart_menu_item"),
				},
				
			"works_categories":
				{
					"type"            : "general",
					"render"          : render_works_categories,
					"title"           : "Категории работ",
					"menu_element"    : $("#works_categories_menu_item"),
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
			
			// Элементы панелей инструментов
			"toolboxes" :
				{
					"general_toolbox" :
						{
							"toolbox" : $("#general_toolbox"),
							
							"toolbox_items" :
								[
									$("#add_work_toolbox_item"),
									$("#edit_work_toolbox_item"),
									$("#remove_work_toolbox_item"),
								],
						},
						
					"individual_toolbox" :
						{
							"toolbox" : $("#individual_toolbox"),
							
							"toolbox_items" :
								[
									$("#add_task_toolbox_item"),
									$("#edit_task_toolbox_item"),
									$("#remove_task_toolbox_item"),
								],
						},
				},
				
			"active_work" : null,
		};
		
		
		
		
		
	// Управления интерфейсом
	function get_toolbox_item_status_getter(toolbox_item_id) {
		function get_toolbox_item_status() {
			var toolbox_item_status =
				$("#" + toolbox_item_id)
					.hasClass(
						toolbox_item_id
					);
					
			return toolbox_item_status
		}
		
		return get_toolbox_item_status
	}
	
	
	function get_toolbox_item_status_setter(toolbox_item_id) {
		function set_toolbox_item_status(toolbox_item_status) {
			if (toolbox_item_status) {
				$("#" + toolbox_item_id)
					.addClass(
						"active_toolbox_item"
					);
			} else {
				$("#" + toolbox_item_id)
					.removeClass(
						"active_toolbox_item"
					);
			}
		}
		
		return set_toolbox_item_status;
	}
	
	
	
	var general_page_interface_control =
		{
			"get_container" :
				function() {
					return interface_state["content"];
				},
				
				
			"get_add_work_status" :
				get_toolbox_item_status_getter(
					"add_work_toolbox_item"
				),
				
			"set_add_work_status" :
				get_toolbox_item_status_setter(
					"add_work_toolbox_item"
				),
				
				
			"get_edit_work_status" :
				get_toolbox_item_status_getter(
					"edit_work_toolbox_item"
				),
				
			"set_edit_work_status" :
				get_toolbox_item_status_setter(
					"edit_work_toolbox_item"
				),
				
				
			"get_remove_work_status" :
				get_toolbox_item_status_getter(
					"remove_work_toolbox_item"
				),
				
			"set_remove_work_status" :
				get_toolbox_item_status_setter(
					"remove_work_toolbox_item"
				),
		};
		
		
	var individual_page_interface_control =
		{
			"get_container" :
				function() {
					return interface_state["content"];
				},
				
				
			"get_add_task_status" :
				get_toolbox_item_status_getter(
					"add_task_toolbox_item"
				),
				
			"set_add_task_status" :
				get_toolbox_item_status_setter(
					"add_task_toolbox_item"
				),
				
				
			"get_edit_task_status" :
				get_toolbox_item_status_getter(
					"edit_task_toolbox_item"
				),
				
			"set_edit_task_status" :
				get_toolbox_item_status_setter(
					"edit_task_toolbox_item"
				),
				
				
			"get_remove_task_status" :
				get_toolbox_item_status_getter(
					"remove_task_toolbox_item"
				),
				
			"set_remove_task_status" :
				get_toolbox_item_status_setter(
					"remove_task_toolbox_item"
				),
		};
		
		
		
		
		
	// Функция активации страниц
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
				var active_page = null;
				
				if (active_page_name != null) {
					active_page = pages[active_page_name];
				}
				
				
				// Получение дескриптора запрашиваемой страницы
				var page = pages[page_name];
				
				
			// Отображение запрашиваемой страницы
				// Смена заголовка страницы
				interface_state["content_title"].html(page["title"]);
				
				
				// Активация панели инструментов
					// Скрытие активной панели инструментов
					if (active_page != null) {
						var active_toolbox_name =
							active_page["type"] == "general"
								? "general_toolbox"
								: "individual_toolbox";
								
						var active_toolbox =
							interface_state["toolboxes"][active_toolbox_name];
							
							
						active_toolbox["toolbox"].removeClass("active_toolbox");
					}
					
					
					// Отображение неактивной панели инструментов
					var toolbox_name =
						page["type"] == "general"
							? "general_toolbox"
							: "individual_toolbox";
							
					var toolbox = interface_state["toolboxes"][toolbox_name];
					
					
					toolbox["toolbox_items"]
						.forEach(function(toolbox_item) {
							toolbox_item.removeClass("active_toolbox_item");
						});
						
					toolbox["toolbox"].addClass("active_toolbox");
					
					
				// Активация элементов меню
				if (active_page != null) {
					active_page["menu_element"].toggleClass(
						"selected_menu_item"
					);
				}
				
				page["menu_element"].toggleClass("selected_menu_item");
				
				
				// Очистка текущего содержимого страницы
				interface_state["content"].html("");
				
				
				// Отображение содержимого страницы
				var interface_control =
					page["type"] == "general"
						? general_page_interface_control
						: individual_page_interface_control;
						
				page["render"](interface_control);
				
				
			// Смена состояния интерфейса
			interface_state["active_page_name"] = page_name;
	}
	
	
	
	
	
	// Функция инициализации интерфейса
	function initialize_interface(){
		// $("#selected_work_reset").click(
		// 	function() {
		// 		$("#selected_work_title").html("Работа не выбрана");
		// 		$("#selected_work_title").addClass("selected_work_not_exist");
		// 	}
		// );
		
		
		
		// Привязка функций активации страниц к элементам меню
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
		
		
		
		// Привязка открытия модальных окон к элементам панели инструментов
		$("#add_work_trigger").leanModal();
		$("#edit_work_trigger").leanModal();
		$("#remove_work_trigger").leanModal();
		$("#add_task_trigger").leanModal();
		$("#edit_task_trigger").leanModal();
		$("#remove_task_trigger").leanModal();
	}
	
	
	
	// Инициализация интерфейса
	initialize_interface();
	
	
	
	// Активация страницы "Табличный календарь"
	activate_page("table_calendar");
});
