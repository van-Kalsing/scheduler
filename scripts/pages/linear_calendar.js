var d = null;
var e = null;
var date = new Date();
var t = false; // триггер для функции scrdown
var t1 = false; // триггер для функции scrup
var year = date.getYear(); // Переменная под число месяца
var month = date.getMonth(); // Под число года
		
function tabulate(data, columns) {
e.html("<button style='position: relative; left: 0px; top: 20px;" 
        + " height: 20px; width: 350px', onclick='scrup(d)'>Вверх</button> " 
        + "<button style='position: relative; left: 0px; top: 250px;"
		+"height: 20px; width: 350px', onclick='scrdown(d)'>Вниз</button>");
    container_element_id = e.attr("id");
    var table = d3.select("#" + container_element_id).append("table"),
    thead = table.append("thead"),
    tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
    .selectAll("th")
    .data(columns)
    .enter()
    .append("th")
        .text(function (column) { return column; });
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
    .data(data)
    .enter()
    .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
    .data(function (row) {
        return columns.map(function (column) {
            return { column: column, value: row[column] };
        });
    })
    .enter()
    .append("td")
        .text(function (d) { return d.value; });

    return table;
}

function scrup(dayn) {
    e.html("");
	var dim = 32 - new Date(year, month-1, 32).getDate();
	if (t1 == false) {
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	t1 = true; t = false;}
	if (dayn>1) {dayn=dayn-1;}       else {dayn=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn>1) {var dayn1=dayn-1;}  else {dayn1=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn1>1){var dayn2=dayn1-1;} else {dayn2=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn2>1){var dayn3=dayn2-1;} else {dayn3=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn3>1){var dayn4=dayn3-1;} else {dayn4=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn4>1){var dayn5=dayn4-1;} else {dayn5=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
	if (dayn5>1){var dayn6=dayn5-1;} else {dayn6=dim; if (month>0) {
	month = month-1;} else {year = year-1; month=11;}}
    var LCTab = [
    { Day: "Понедельник", Date: dayn6, W1: "З1", W2: "З1", W3: "  ", W4: "З6", W5: "  "},
    { Day: "Вторник",     Date: dayn5, W1: "З2", W2: "З2", W3: "З1", W4: "З7", W5: "  "},
    { Day: "Среда",       Date: dayn4, W1: "З3", W2: "З3", W3: "З2", W4: "З8", W5: "  "},
    { Day: "Четверг",     Date: dayn3, W1: "З4", W2: "З4", W3: "З3", W4: "  ", W5: "  "},
    { Day: "Пятница",     Date: dayn2, W1: "З5", W2: "З5", W3: "З4", W4: "  ", W5: "  "},
    { Day: "Суббота",     Date: dayn1, W1: "З6", W2: "  ", W3: "З5", W4: "  ", W5: "З1"},
    { Day: "Воскресенье", Date: dayn,  W1: "З7", W2: "  ", W3: "  ", W4: "  ", W5: "З2"}];
    // render the table
    var ZTable = tabulate(LCTab, ["Day", "Date", "W1", "W2", "W3", "W4", "W5"]);
	d=dayn6;
    // uppercase the column headers
    ZTable.selectAll("thead th")
    .text(function (column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });

    //sort by age
    ZTable.selectAll("tbody tr")
  .sort(function (a, b) {
      return d3.descending(a.age, b.age);
  });
}

function scrdown(dayn) {
    e.html("");
	var dim = 32 - new Date(year, month, 32).getDate();	
	if (t == false) {
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	t = true; t1 = false;} 
	if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn<dim) {var dayn1=dayn+1;}  else {dayn1=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn1<dim){var dayn2=dayn1+1;} else {dayn2=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn2<dim){var dayn3=dayn2+1;} else {dayn3=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn3<dim){var dayn4=dayn3+1;} else {dayn4=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn4<dim){var dayn5=dayn4+1;} else {dayn5=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
	if (dayn5<dim){var dayn6=dayn5+1;} else {dayn6=1; if (month<11) {
	month = month+1;} else {year = year+1; month=0;}}
    var LCTab = [
    { Day: "Понедельник", Date: dayn, W1: month, W2: "З1", W3: "  ", W4: "З6", W5: "  "},
    { Day: "Вторник",     Date: dayn1, W1: year, W2: "З2", W3: "З1", W4: "З7", W5: "  "},
    { Day: "Среда",       Date: dayn2, W1: "З3", W2: "З3", W3: "З2", W4: "З8", W5: "  "},
    { Day: "Четверг",     Date: dayn3, W1: "З4", W2: "З4", W3: "З3", W4: "  ", W5: "  "},
    { Day: "Пятница",     Date: dayn4, W1: "З5", W2: "З5", W3: "З4", W4: "  ", W5: "  "},
    { Day: "Суббота",     Date: dayn5, W1: "З6", W2: "  ", W3: "З5", W4: "  ", W5: "З1"},
    { Day: "Воскресенье", Date: dayn6,  W1: "З7", W2: "  ", W3: "  ", W4: "  ", W5: "З2"}];
    // render the table
    var ZTable = tabulate(LCTab, ["Day", "Date", "W1", "W2", "W3", "W4", "W5"]);
	d = dayn6;
    // uppercase the column headers
    ZTable.selectAll("thead th")
    .text(function (column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });

    //sort by age
    ZTable.selectAll("tbody tr")
  .sort(function (a, b) {
      return d3.descending(a.age, b.age);
  });
}

function render_linear_calendar(interface_control) {
    interface_control.set_add_work_status(true);
    
    var container_element = interface_control.get_container();
    
    e = container_element;
    container_element.html("<button style='position: relative; left: 0px; top: 20px;" 
        + " height: 20px; width: 350px', onclick='scrup(-7)'>Вверх</button> <button style='position: relative; left: 0px; top: 250px; height: 20px; width: 350px', onclick='scrup(7)'>Вниз</button>");
    container_element_id = container_element.attr("id");
	// create some people
	d = (date.getDate()-(date.getDay()||7)+1); //Последнее число из предыдущей выборки
	var LCTab = [
    { Day: "Понедельник", Date: d + 0, W1: "З1", W2: "З1", W3: "  ", W4: "З6", W5: "  "},
    { Day: "Вторник",     Date: d + 1, W1: "З2", W2: "З2", W3: "З1", W4: "З7", W5: "  "},
    { Day: "Среда",       Date: d + 2, W1: "З3", W2: "З3", W3: "З2", W4: "З8", W5: "  "},
    { Day: "Четверг",     Date: d + 3, W1: "З4", W2: "З4", W3: "З3", W4: "  ", W5: "  "},
    { Day: "Пятница",     Date: d + 4, W1: "З5", W2: "З5", W3: "З4", W4: "  ", W5: "  "},
    { Day: "Суббота",     Date: d + 5, W1: "З6", W2: "  ", W3: "З5", W4: "  ", W5: "З1"},
    { Day: "Воскресенье", Date: d + 6, W1: "З7", W2: "  ", W3: "  ", W4: "  ", W5: "З2"}];

	// render the table
	var ZTable = tabulate(LCTab, ["Day", "Date", "W1", "W2", "W3", "W4", "W5"]);

	// uppercase the column headers
	ZTable.selectAll("thead th")
    .text(function (column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });

	//sort by age
	ZTable.selectAll("tbody tr")
  .sort(function (a, b) {
      return d3.descending(a.age, b.age);
  });
}
