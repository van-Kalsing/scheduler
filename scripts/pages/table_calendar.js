function createCalendar(id, year, month) {
  var weekDay = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  var monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 
               'Июнь', 'Июль', 'Август', 'Сентябрь', 
               'Октябрь', 'Ноябрь', 'Декабрь'];
  var date = new Date(year, month);    
  var dayCount = (new Date(year, month + 1, 0)).getDate();
  var dayNum = 1 - (date.getDay() == 0 ? 7 : date.getDay());
  
  var parent = document.getElementById(id);
  parent.innerHTML = "";
  var table = document.createElement('table');    
  table.className += " table_calendar";
  
// первая строка шапки календаря
  var tr = document.createElement('tr');
  tr.className += " table_calendar";

  // листать влево
  var button = document.createElement("button");
  button.setAttribute('onclick', 'createCalendar("' + id + '", ' + year + ', ' + (month - 1) + ')');
  button.appendChild(document.createTextNode('<'));
  var elem = document.createElement("th");    
  elem.className += " table_calendar";
  elem.appendChild(button);
  tr.appendChild(elem);

  // месяц год
  var cell = monthName[date.getMonth()] + ' ' + date.getFullYear() + ' г';
  elem = document.createElement('th');
  elem.className += " table_calendar";
  elem.setAttribute('colspan', '5');
  elem.appendChild(document.createTextNode(cell));    
  tr.appendChild(elem);

  // листать вправо
  button = document.createElement("button");
  button.setAttribute('onclick', 'createCalendar("' + id + '", ' + year + ', ' + (month + 1) + ')');
  button.appendChild(document.createTextNode('>'));
  var elem = document.createElement("th");    
  elem.className += " table_calendar";
  elem.appendChild(button);
  tr.appendChild(elem);

  table.appendChild(tr);    

// вторая строка шапки и тело календаря
  for (var row = 0; dayNum < dayCount; row++) { // создавать строки, если в них есть хоть один день. Актуально для некоторых февралей, например 2010г.
    var tr = document.createElement('tr');
    tr.className += " table_calendar";
    table.appendChild(tr);
    
    for (var col = 0; col < 7; col++) {  // заполняем строку днями
      if (row == 0) {     
    // заполнение шапки календаря
        elem = document.createElement('th');
        elem.className += " table_calendar";
        cell = weekDay[col];
      } else {
    // заполнение тела календаря
        dayNum++;
        elem = document.createElement('td');
        elem.className += " table_calendar";
        if ((dayNum > 0) && (dayNum <= dayCount)) {
          elem.className += ' out';
          cell = dayNum;
        }              
          cell = (new Date(year, month, dayNum)).getDate();
      }
      // заполняем ячейку календаря
      elem.appendChild(document.createTextNode(cell));
      tr.appendChild(elem);        
    }
  }
  parent.appendChild(table);
}


var width = 960,
    height = 136,
    cellSize = 17; // cell size

var day = d3.time.format("%w"),
    week = d3.time.format("%U"),
    percent = d3.format(".1%"),
    format = d3.time.format("%Y-%m-%d");

var color = d3.scale.quantize()
    .domain([-.05, .05])
    .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

var svg = d3.select("body").selectAll("svg")
    .data(d3.range(2014, 2015))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")
    .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })
    .attr("y", function(d) { return day(d) * cellSize; })
    .datum(format);

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);

d3.csv("dji.csv", function(error, csv) {
  var data = d3.nest()
    .key(function(d) { return d.Date; })
    .rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
    .map(csv);

  rect.filter(function(d) { return d in data; })
      .attr("class", function(d) { return "day " + color(data[d]); })
    .select("title")
      .text(function(d) { return d + ": " + percent(data[d]); });
});

function monthPath(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = +day(t0), w0 = +week(t0),
      d1 = +day(t1), w1 = +week(t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}

d3.select(self.frameElement).style("height", "2910px");
function render_table_calendar(container_element) {
  var now = new Date;  
  
  container_element_id = container_element.attr("id");
  createCalendar(container_element_id, now.getFullYear(), now.getMonth());
}
