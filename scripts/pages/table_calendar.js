function render_table_calendar(container_element) {
    <!DOCTYPE HTML>
<html>
<head>
<style>
.out {
  background-color: yellow;
}
  
table {
  border-collapse: collapse;
  table-layout: fixed;   
}

td, th {
  border: 1px solid black;
  padding: 3px;
  text-align: center;
}

th {
  font-weight: bold;
  background-color: #E6E6E6;
    
}
</style>  
<meta charset="utf-8">  
</head>
<body>
<div id="cal"></div>
  
<script>
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

// первая строка шапки календаря
    var tr = document.createElement('tr');

    // листать влево
    var button = document.createElement("button");
    button.setAttribute('onclick', 'createCalendar("cal", ' + year + ', ' + (month - 1) + ')');
    button.appendChild(document.createTextNode('<'));
    var elem = document.createElement("th");    
    elem.appendChild(button);
    tr.appendChild(elem);

    // месяц год
    var cell = monthName[date.getMonth()] + ' ' + date.getFullYear() + ' г';
    elem = document.createElement('th');
    elem.setAttribute('colspan', '5');
    elem.appendChild(document.createTextNode(cell));    
    tr.appendChild(elem);

    // листать вправо
    button = document.createElement("button");
    button.setAttribute('onclick', 'createCalendar("cal", ' + year + ', ' + (month + 1) + ')');
    button.appendChild(document.createTextNode('>'));
    var elem = document.createElement("th");    
    elem.appendChild(button);
    tr.appendChild(elem);

    table.appendChild(tr);    

// вторая строка шапки и тело календаря
    for (var row = 0; dayNum < dayCount; row++) { // создавать строки, если в них есть хоть один день. Актуально для некоторых февралей, например 2010г.
      var tr = document.createElement('tr');
      table.appendChild(tr);
      
      for (var col = 0; col < 7; col++) {  // заполняем строку днями
        if (row == 0) {     
		  // заполнение шапки календаря
          elem = document.createElement('th');
          cell = weekDay[col];
        } else {
		  // заполнение тела календаря
          dayNum++;
          elem = document.createElement('td');
          if ((dayNum > 0) && (dayNum <= dayCount)) {
            elem.className = 'out';
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
  
  var now = new Date;  
  
  createCalendar('cal', now.getFullYear(), now.getMonth());
  
</script>
  </body>
</html>




    container_element.html("Здесь будет табличный календарь");
}
