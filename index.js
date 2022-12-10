function buildDisplay() {
  const display_parameter_form = document.getElementById('display-parameter-form');
  const formData = new FormData(display_parameter_form);
  const numrows = formData.get('numrows');  
  const numcols = formData.get('numcols');

  const table = document.createElement('table');
  table.id = 'display-table';
  for(let i = 0; i < numrows; i++) {
    const row = document.createElement('tr');
    for(let j = 0; j < numcols; j++) {
      const cell = document.createElement('td');
      cell.classList.add('display-cell');
      cell.id = i + '-' + j;
      cell.innerText='here';
      row.appendChild(cell);
    }
    table.appendChild(row);

    const display_cell = document.getElementById('algorithm-display-cell');
    display_cell.innerHTML = '';
    display_cell.appendChild(table);
  }
}

buildDisplay();