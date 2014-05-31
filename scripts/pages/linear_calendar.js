var d = null;
var ld = null;
var e = null;
var date = new Date();
var year = date.getYear(); // Переменная под число месяца
var month = date.getMonth(); // Под число года

var lcyu = false; // Метка изменения года для up
var lcmu = false; // Метка изменения месяца для up
var lcyd = false; // Метка изменения года для down
var lcmd = false; // Метка изменения месяца для down

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
	lcmu = false;
	lcyu = false;
    e.html("");
	var dim = 32 - new Date(year, month-1, 32).getDate();
	var days = [];
	for (var i=0; i<7; i++) {
		if (dayn>1) {dayn=dayn-1; if (lcmd == true) {month = month-1; lcmd = false;}
		if (lcyd == true) {year = year-1; month = 11; lcyd = false;}}
		else {dayn=dim; if (month>0) {
		month = month-1; lcmu = true;} else {year = year-1; month = 11; lcyu = true;}}
		days[i] = dayn;
	}
	var obj1 = {Day: "Понедельник", Date: days[6]};
	var obj2 = {Day: "Вторник", 	Date: days[5]};
	var obj3 = {Day: "Среда", 		Date: days[4]};
	var obj4 = {Day: "Четверг", 	Date: days[3]};
	var obj5 = {Day: "Пятница", 	Date: days[2]};
	var obj6 = {Day: "Суббота", 	Date: days[1]};
	var obj7 = {Day: "Воскресенье", Date: days[0]};
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
	lcmd = false;
	lcyd = false;
    e.html("");
	var dim = 32 - new Date(year, month, 32).getDate();
	var days = [];
	for (var i=0; i<7; i++) {
		if (dayn<dim) {dayn=dayn+1; if (lcmu == true) {month = month+1; lcmu = false;}
		if (lcyu == true) {year = year+1; month = 11; lcyu = false;}} 
		else {dayn=1; if (month<11) {
		month++; lcmd = true;} else {year = year+1; month=0; lcyd = true;}}
		days[i] = dayn;
	}
	var obj1 = {Day: "Понедельник", Date: days[0]};
	var obj2 = {Day: "Вторник", 	Date: days[1]};
	var obj3 = {Day: "Среда", 		Date: days[2]};
	var obj4 = {Day: "Четверг", 	Date: days[3]};
	var obj5 = {Day: "Пятница", 	Date: days[4]};
	var obj6 = {Day: "Суббота", 	Date: days[5]};
	var obj7 = {Day: "Воскресенье", Date: days[6]};
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
	d = (date.getDate()-(date.getDay()||7)); //Последнее число из предыдущей выборки
	var d1 = d;
	var dim = 32 - new Date(year, month, 32).getDate();
	var days = [];
	for (var i=0; i<7; i++) {
		if (d1<dim) {d1++; if (lcmu == true) {month++; lcmu = false;}
		if (lcyu == true) {year++; month = 11; lcyu = false;}} 
		else {d1=1; if (month<11) {
		month++; lcmd = true;} else {year++; month=0; lcyd = true;}}
		days[i] = d1;
	}
	d++;
	ld = days[6];
	
	var obj1 = {Day: "Понедельник", Date: days[0]};
	var obj2 = {Day: "Вторник", 	Date: days[1]};
	var obj3 = {Day: "Среда", 		Date: days[2]};
	var obj4 = {Day: "Четверг", 	Date: days[3]};
	var obj5 = {Day: "Пятница", 	Date: days[4]};
	var obj6 = {Day: "Суббота", 	Date: days[5]};
	var obj7 = {Day: "Воскресенье", Date: days[6]};
	
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
