// variables stored in grid to represent html table
const grid_map = {
  'empty' : 0,
  'start' : 1,
  'end' : 2,
  'wall' : 3
}

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