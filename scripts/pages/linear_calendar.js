var d = null;
var ld = null;
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
		+"height: 20px; width: 350px', onclick='scrdown(ld)'>Вниз</button>");
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
	var days = [];
	for (var i=0; i<7; i++) {
		if (dayn>1) {dayn=dayn-1;} else {dayn=dim; if (month>0) {
		month = month-1;} else {year = year-1; month=11;}}
		days[i] = dayn;
	} 
    var LCTab = [
    { Day: "Понедельник", Date: days[6], W1: "З1", W2: "З1", W3: "  ", W4: "З6", W5: "  "},
    { Day: "Вторник",     Date: days[5], W1: "З2", W2: "З2", W3: "З1", W4: "З7", W5: "  "},
    { Day: "Среда",       Date: days[4], W1: "З3", W2: "З3", W3: "З2", W4: "З8", W5: "  "},
    { Day: "Четверг",     Date: days[3], W1: "З4", W2: "З4", W3: "З3", W4: "  ", W5: "  "},
    { Day: "Пятница",     Date: days[2], W1: "З5", W2: "З5", W3: "З4", W4: "  ", W5: "  "},
    { Day: "Суббота",     Date: days[1], W1: "З6", W2: "  ", W3: "З5", W4: "  ", W5: "З1"},
    { Day: "Воскресенье", Date: days[0], W1: "З7", W2: "  ", W3: "  ", W4: "  ", W5: "З2"}];
    // render the table
    var ZTable = tabulate(LCTab, ["Day", "Date", "W1", "W2", "W3", "W4", "W5"]);
	d = days[6];
	ld = days[0];
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
	var days = [];
	for (var i=0; i<7; i++) {
		if (dayn<dim) {dayn=dayn+1;}       else {dayn=1; if (month<11) {
		month++;} else {year = year+1; month=0;}}
		days[i] = dayn;
	}
    var LCTab = [
    { Day: "Понедельник", Date: days[0], W1: month, W2: "З1", W3: "  ", W4: "З6", W5: "  "},
    { Day: "Вторник",     Date: days[1], W1: year, W2: "З2", W3: "З1", W4: "З7", W5: "  "},
    { Day: "Среда",       Date: days[2], W1: "З3", W2: "З3", W3: "З2", W4: "З8", W5: "  "},
    { Day: "Четверг",     Date: days[3], W1: "З4", W2: "З4", W3: "З3", W4: "  ", W5: "  "},
    { Day: "Пятница",     Date: days[4], W1: "З5", W2: "З5", W3: "З4", W4: "  ", W5: "  "},
    { Day: "Суббота",     Date: days[5], W1: "З6", W2: "  ", W3: "З5", W4: "  ", W5: "З1"},
    { Day: "Воскресенье", Date: days[6], W1: "З7", W2: "  ", W3: "  ", W4: "  ", W5: "З2"}];
    // render the table
    var ZTable = tabulate(LCTab, ["Day", "Date", "W1", "W2", "W3", "W4", "W5"]);
	d = days[0];
	ld = days[6];
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
    container_element_id = container_element.attr("id");
	d = (date.getDate()-(date.getDay()||7)+1); //Последнее число из предыдущей выборки
	var dim = 32 - new Date(year, month, 32).getDate();	
	if (d < dim) {var d1 = d+1} else {month+1; d1=1;}
	if (d1 < dim) {var d2 = d1+1} else {month++; d2=1;}
	if (d2 < dim) {var d3 = d2+1} else {month++; d3=1;}
	if (d3 < dim) {var d4 = d3+1} else {month++; d4=1;}
	if (d4 < dim) {var d5 = d4+1} else {month++; d5=1;}
	if (d5 < dim) {var d6 = d5+1} else {month++; d6=1;}
	
	ld = d6;
	
	var obj1 = {Day: "Понедельник", Date: d};
	var obj2 = {Day: "Вторник", Date: d1};
	var obj3 = {Day: "Среда", Date: d2};
	var obj4 = {Day: "Четверг", Date: d3};
	var obj5 = {Day: "Пятница", Date: d4};
	var obj6 = {Day: "Суббота", Date: d5};
	var obj7 = {Day: "Воскресенье", Date: d6};
	
	//ar1["W1"] = "31";
	var LCTab = [
    obj1,
    obj2,
    obj3,
    obj4,
    obj5,
    obj6,
    obj7];
	var qutasks = 6;
	for (var i=0; i<LCTab.length; i++) {
		for (var j=0; j<qutasks; j++) {
			LCTab[i]["W"+(j+1)] = "Задача "+(j+1)+" "+LCTab[i].Date+"-го числа";
		}
	}
	var arD = ["Day", "Date"];
	for (i=0; i<qutasks; i++) {
		arD[i+2] = "W"+(i+1);
	}
	// render the table
	var ZTable = tabulate(LCTab, arD);

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

function merg_obj(o1, o2) {
var o3;
for(var key = 0; key < o1; Key++)
{
if(o2[key])
o3[key] = new Array(o1[key],o2[key]);
else
o3[key] = o1[key];
}
}
