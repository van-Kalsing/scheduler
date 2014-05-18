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


function render_table_calendar(container_element) {
  var now = new Date;  
  
  container_element_id = container_element.attr("id");
  createCalendar(container_element_id, now.getFullYear(), now.getMonth());
}
