function render_table_calendar(container_element) {
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

var pre = 0; //Последнее число из предыдущей выборки
var Days = [
    {ПН: pre+1, ВТ:pre+2,СР:pre+3,ЧТ:pre+4,ПТ:pre+5,СБ:pre+6,ВС:pre+7},
    {ПН: pre+8, ВТ:pre+9,СР:pre+10,ЧТ:pre+11,ПТ:pre+12,СБ:pre+13,ВС:pre+14},
    {ПН: pre+15, ВТ:pre+16,СР:pre+17,ЧТ:pre+18,ПТ:pre+19,СБ:pre+20,ВС:pre+21},
    {ПН: pre+22, ВТ:pre+23,СР:pre+24,ЧТ:pre+25,ПТ:pre+26,СБ:pre+27,ВС:pre+28},
    {ПН: pre+29, ВТ:pre+30,СР:pre+31,ЧТ:" ",ПТ:" ",СБ:" ",ВС:" "},
];

// render the table

var ZTable = tabulate(Days, [ "ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"]);
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
}		
