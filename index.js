const display_parameter_submit = document.getElementById('display-parameter-submit');
display_parameter_submit.addEventListener('click',  buildDisplay);

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
      cell.style.width = 90 / numcols + 'vh';
      cell.style.height = 70 / numrows + 'vh';
      row.appendChild(cell);
    }
    table.appendChild(row);

    const display_cell = document.getElementById('algorithm-display-cell');
    display_cell.innerHTML = '';
    display_cell.appendChild(table);
  }
}

var selected_tool = 0;

function selectTool(tool_name) {
  const TOOLS = {
    'set-start-tool' : 0,
    'add-wall-tool' : 1,
    'remove-call-tool' : 2,
  };
  selected_tool = TOOLS[tool_name];
}

buildDisplay();