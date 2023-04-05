/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  elem = null;
  #rows = [];
  
  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }

  #tableTemplate() {
    let table = document.createElement('table');
    let header = document.createElement('thead');
    header.innerHTML = `<tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
        </tr>`;
    table.append(header);
    let body = document.createElement('tbody');

    for (let user of this.#rows) {
     let row = document.createElement('tr');
      row.insertCell(0).textContent = user.name;
      row.insertCell(1).textContent = user.age;
      row.insertCell(2).textContent = user.salary;
      row.insertCell(3).textContent = user.city;
      row.insertCell(4).innerHTML = '<button>X</button>';
      body.append(row);
    }
    
    table.append(body);
    return table;
  } 

  #closeOnClick = (event) => {
    if (event.target.tagName != 'BUTTON') return;
    let clicked = event.target.parentNode.parentNode.rowIndex;
    this.elem.deleteRow(clicked);

  }

  #render() {
    let elem = this.#tableTemplate();
    elem.addEventListener('click', this.#closeOnClick);
    return elem;
  }


}
