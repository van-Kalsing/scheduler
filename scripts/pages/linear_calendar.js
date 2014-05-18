function render_linear_calendar(container_element) {
    container_element.html("<button style='position: absolute; left: 390px; top: 95px; height: 20px; width: 350px', onclick='this.style.left=parseInt(this.style.left)+43+'px''>Вверх</button> <button style='position: absolute; left: 390px; top: 360px; height: 20px; width: 350px'>Вниз</button>");
    container_element_id = container_element.attr("id");
	
	function tabulate(data, columns) {
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

	// create some people
	var pre = 9; //Последнее число из предыдущей выборки
	var str1 = "T1: 'раб1', T2: 'раб1', T3: 'раб1', T4: 'раб1', T5: 'раб1'";
	var LCTab = [
    { Day: "Понедельник", Date: pre + 1, T1: "раб1", T2: "раб1", T3: "раб1", T4: "раб1", T5: "раб1"},
    { Day: "Вторник", Date: pre + 2, T1: 'раб2', T2: "раб2", T3: "раб2", T4: "раб2", T5: "раб2"},
    { Day: "Среда", Date: pre + 3, T1: "раб3", T2: "раб3", T3: "раб3", T4: "раб3", T5: "раб3"},
    { Day: "Четверг", Date: pre + 4, T1: "раб4", T2: "раб4", T3: "раб4", T4: "раб4", T5: "раб4"},
    { Day: "Пятница", Date: pre + 5, T1: "раб5", T2: "раб5", T3: "раб5", T4: "раб5", T5: "раб5"},
    { Day: "Суббота", Date: pre + 6, T1: "раб6", T2: "раб6", T3: "раб6", T4: "раб6", T5: "раб6"},
    { Day: "Воскресенье", Date: pre + 7, T1: "раб7", T2: "раб7", T3: "раб7", T4: "раб7", T5: "раб7"}];

	var Tasks = [
    { T1: "Раб.1" },
    { T1: "Раб.2" },
    { T1: "Раб.3" },
    { T1: "Раб.4" },
    { T1: "Раб.5" },
    { T1: "Раб.6" },
    { T1: "Раб.7" }];

	// render the table
	var ZTable = tabulate(LCTab, ["Day", "Date", "T1", "T2", "T3", "T4", "T5"]);
	//ZTable = tabulate(Tasks, ["T1"]);
	//var TTable = tabulate(Tasks, ['T1', 'T2']);

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
