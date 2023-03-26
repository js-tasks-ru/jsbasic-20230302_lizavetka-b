function highlight(table) {
  for (let row of table.rows) {
   
    if (!row.cells[3].dataset.available) {
      row.setAttribute('class', 'hidden');
    } else if (row.cells[3].dataset.available == 'true') {
      row.setAttribute('class','available');
    } else {
      row.setAttribute('class', 'unavailable');
    }
    
    if (row.cells[2].textContent == 'm') {
      row.classList.add('male');
    } else if (row.cells[2].textContent == 'f'){
      row.classList.add('female');
     
    }
    
    if (row.cells[1].innerHTML < 18) {
      row.style = "text-decoration: line-through";
    }
    
  }
  return (table);
}