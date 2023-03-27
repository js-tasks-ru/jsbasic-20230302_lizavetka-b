function highlight(table) {
  for (let row of table.rows) {
   
    if (!row.cells[3].dataset.available) {
      row.hidden = true;
    } else if (row.cells[3].dataset.available == 'true') {
      row.classList.add('available');
    } else {
      row.classList.add('unavailable');
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
  
}