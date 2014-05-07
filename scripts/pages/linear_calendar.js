function render_linear_calendar(container_element) {
	container_element.html(
		<body>
			<style>
				body {
    				background-color: ghostwhite;
				}
				div {
    					position: absolute;
    					left: 50px;
    					top: 50px;
				}
				div1 {
    					position: absolute;
    					left: 200px;
    					top: 50px;
				}
				td, th {
    					padding: 4px 4px;
				}
				th {
    					font-weight: bold;
    					background-color: lightgrey;
				}
				td {
    					background-color: #FFFACD;
				}
			</style>
    			<form>
        			<div id="container"></div>
        			<div1 id="container1"></div1>
    			</form>
    			<form1>
        			<button style="position: absolute; left: 200px; top: 50px; height: 225px;" onclick="this.style.left=parseInt(this.style.left)+43+'px'; tabulate1(Tasks, ['T1']);">+</button>
    			</form1>
    		</body>
	);
}
function tabulate(data, columns) {
    var table = d3.select("#container").append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
            .text(function(d) { return d.value; });
    
    return table;
}

function tabulate1(data, columns) {
    var table = d3.select("#container1").append("table"),
        thead = table.append("thead"),
        tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column]};
            });
        })
        .enter()
        .append("td")
            .text(function(d) { return d.value; });
    
    return table;
}

// create some people
var pre = 9; //Последнее число из предыдущей выборки
var Days = [
    {Day: "Понедельник", Date: pre+1},
    {Day: "Вторник", Date: pre+2},
    {Day: "Среда", Date: pre+3},
    {Day: "Четверг", Date: pre+4},
    {Day: "Пятница", Date: pre+5},
    {Day: "Суббота", Date: pre+6},
    {Day: "Воскресенье", Date: pre+7}
];

var Tasks = [
    {T1: "Раб.1"},
    {T1: "Раб.2"},
    {T1: "Раб.3"},
    {T1: "Раб.4"},
    {T1: "Раб.5"},
    {T1: "Раб.6"},
    {T1: "Раб.7"}
];

// render the table
var ZTable = tabulate(Days, ["Day", "Date"]);
//var TTable = tabulate(Tasks, ['T1', 'T2']);

// uppercase the column headers
ZTable.selectAll("thead th")
    .text(function(column) {
        return column.charAt(0).toUpperCase() + column.substr(1);
    });
    
//sort by age
ZTable.selectAll("tbody tr")
  .sort(function(a, b){
       return d3.descending(a.age, b.age);
    });

