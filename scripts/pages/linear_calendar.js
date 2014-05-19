var d = null;
var e = null;

function tabulate(data, columns) {
    e.html("<button style='position: relative; left: 0px; top: 20px;" 
        + " height: 20px; width: 350px', onclick='scrup(-7)'>Вверх</button> " 
        + "<button style='position: relative; left: 0px; top: 250px; height: 20px; width: 350px', onclick='scrup(7)'>Вниз</button>");
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


function scrup(q) {
    e.html("");
    
    var date = new Date();    
  //  var dayCount = (new Date(year, month + 1, 0)).getDate();
    //var dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay());

    // create some people
    // d = (date.getDate()-(date.getDay()||7)+1); //Последнее число из предыдущей выборки
    d=d+q;
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

function render_linear_calendar(container_element) {
    e = container_element;
    container_element.html("<button style='position: relative; left: 0px; top: 20px;" 
        + " height: 20px; width: 350px', onclick='scrup(-7)'>Вверх</button> <button style='position: relative; left: 0px; top: 250px; height: 20px; width: 350px', onclick='scrup(7)'>Вниз</button>");
    container_element_id = container_element.attr("id");
	
	var date = new Date();    
  //  var dayCount = (new Date(year, month + 1, 0)).getDate();
    //var dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay());

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
