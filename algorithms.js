// variables stored in grid to represent html table
const grid_map = {
  'empty' : 0,
  'start' : 1,
  'end' : 2,
  'wall' : 3
}

const run_algorithm_button = document.getElementById('run-algorithm-submit');
run_algorithm_button.addEventListener('click', runSelectedAlgorithm);

const ALGORITHM_DELAY_MS = 100;

function htmlTableToArray(htmlTable) {
  // create grid from html table
  let grid = Array();
  for (let row of htmlTable.children) {
    grid.push(Array());
    for (let cell of row.children) {
      let entry;
      if (cell.classList.contains('start')) {
        entry = 'start';
      } else if (cell.classList.contains('end')) {
        entry = 'end';
      } else if (cell.classList.contains('wall')) {
        entry = 'wall';
      } else {
        entry = 'empty';
      }
      grid[grid.length - 1].push(grid_map[entry]);
    }
  }
  return grid;
}

const display_table = document.getElementById('display-table');

async function runSelectedAlgorithm() {
  // clear background
  await resetDisplayTableColors();
  // get algorithm string
  const algorithm_selector_form = document.getElementById('algorithm-selector-form');
  const formData = new FormData(algorithm_selector_form);
  const selected_algorithm = formData.get('algorithm-selector');
  // get table to run algorithm on
  const display_grid = htmlTableToArray(display_table);
  // call algorithm function using string name
  window[selected_algorithm](display_grid);
}

function isInGrid(i, j, grid) {
  return i >= 0 && j >= 0 && i < grid.length && j < grid[0].length;
}

function findGridStart(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == grid_map['start']) {
        return [i, j];
      }
    }
  }
}

function expand(cell, grid, visited) {
  const dirs = [
    [-1,0], // up
    [0,1],  // right
    [1,0],  // down
    [0,-1], // left
  ]

  let expanded_list = [];
  for (let dir of dirs) {
    let newrow = cell[0] + dir[0];
    let newcol = cell[1] + dir[1];
    // if newrow and newcol are in the grid and their value is not a wall
    if (isInGrid(newrow, newcol, grid) && grid[newrow][newcol] != grid_map['wall'] && !([newrow, newcol] in visited)) {
      expanded_list.push([newrow, newcol])
    }
  }
  return expanded_list;
}

async function resetDisplayTableColors() {
  for (let row of display_table.children) {
    for (let cell of row.children) {
      cell.classList.remove('visited');
    }
  }
}

async function bfs(grid) {
  let start = findGridStart(grid);
  let queue = [];
  let visited = {};

  queue.push(start);

  while (queue.length != 0) {
    let [row, col] = queue.shift();

    // check visited array to prevent searching same node twice
    if ([row, col] in visited) {
      continue;
    }
    visited[[row, col]] = 1;

    // styling of visited cells
    let id = row + '-' + col;
    const current_cell = document.getElementById(id);
    
    if (grid[row][col] == grid_map['empty']) {
      current_cell.classList.add('visited');
    }
    current_cell.classList.add('current');
     await new Promise(r => setTimeout(r, ALGORITHM_DELAY_MS));
    current_cell.classList.remove('current');

    if (grid[row][col] == grid_map['end']) {
      return true;
    }

    let expandList = expand([row, col], grid, visited);

    queue = queue.concat(expandList)
  }

  return false;

}

async function dfs(grid) {
  let start = findGridStart(grid);
  let queue = [];
  let visited = {};

  queue.push(start);

  while (queue.length != 0) {
    let [row, col] = queue.pop();

    // check visited array to prevent searching same node twice
    if ([row, col] in visited) {
      continue;
    }
    visited[[row, col]] = 1;

    // styling of visited cells
    let id = row + '-' + col;
    const current_cell = document.getElementById(id);
    
    if (grid[row][col] == grid_map['empty']) {
      current_cell.classList.add('visited');
    }
    current_cell.classList.add('current');
    await new Promise(r => setTimeout(r, ALGORITHM_DELAY_MS));
    current_cell.classList.remove('current');

    if (grid[row][col] == grid_map['end']) {
      return true;
    }

    let expandList = expand([row, col], grid, visited);

    queue = queue.concat(expandList)
  }

  return false;

}
