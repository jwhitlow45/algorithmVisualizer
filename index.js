const display_parameter_submit = document.getElementById('display-parameter-submit');
display_parameter_submit.addEventListener('click',  buildDisplay);

const set_start_tool = document.getElementById('set-start-tool');
const set_end_tool = document.getElementById('set-end-tool');
const add_wall_tool = document.getElementById('add-wall-tool');
const remove_wall_tool = document.getElementById('remove-wall-tool');

set_start_tool.addEventListener('click', function(){ selectTool('set-start-tool') });
set_end_tool.addEventListener('click', function(){ selectTool('set-end-tool') });
add_wall_tool.addEventListener('click', function(){ selectTool('add-wall-tool') });
remove_wall_tool.addEventListener('click', function(){ selectTool('remove-wall-tool') });

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
      cell.addEventListener('click', handleCellClick)
      row.appendChild(cell);
    }
    table.appendChild(row);

    const display_cell = document.getElementById('algorithm-display-cell');
    display_cell.innerHTML = '';
    display_cell.appendChild(table);
  }
}

var selected_tool = -1;
var start_cell = null;
var end_cell = null;

const TOOLS = {
  'set-start-tool' : 0,
  'set-end-tool' : 1,
  'add-wall-tool' : 2,
  'remove-wall-tool' : 3,
};

function selectTool(tool_name) {

  selected_tool = TOOLS[tool_name];

  const tool_elements = document.getElementsByClassName('tool');
  for (let tool_elem of tool_elements) {
    if (tool_elem.id == tool_name)
      tool_elem.style.opacity = .5;
    else
      tool_elem.style.opacity = 1;
  }
}

function handleCellClick() {
  let cell = document.getElementById(this.id);

  if (selected_tool == TOOLS['set-start-tool'])
    handleSetStartTool(cell);
  else if (selected_tool == TOOLS['set-end-tool'])
    handleSetEndTool(cell);
  else if (selected_tool == TOOLS['add-wall-tool'])
    handleAddWallTool(cell);
  else if (selected_tool == TOOLS['remove-wall-tool'])
    handleRemoveWallTool(cell);
  else
    alert('No tool selected!');

}

function handleSetStartTool(cell) {
  if (start_cell) {
    start_cell.classList.remove('start');
  }
  cell.classList.add('start');
  start_cell = cell;
}

function handleSetEndTool(cell) {
  if (end_cell) {
    end_cell.classList.remove('end');
  }
  cell.classList.add('end');
  end_cell = cell;
}

function handleAddWallTool(cell) {
  cell.classList.add('wall');
}

function handleRemoveWallTool(cell) {
  cell.classList.remove('wall');
}

buildDisplay();