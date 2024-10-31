import Maze from "./model.js";
import MazeView from "./view.js";
import Stack from "../Datastrukturer/stack.js";

let maze;
let mazeView;

window.addEventListener("load", start);

function start() {
  document.getElementById("generate").addEventListener("click", generateMaze);
  document.getElementById("solve").addEventListener("click", solveMaze);
  document.getElementById("reset").addEventListener("click", resetMaze);
}

function generateMaze() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);

  maze = new Maze(rows, cols);
  maze.generateMaze(); // Generer labyrinten

  mazeView = new MazeView(maze);
  mazeView.displayMaze();
}

function solveMaze() {
  if (!maze) {
    alert("Generer en labyrint først!");
    return;
  }

  const route = new Stack();
  const status = { goalReached: false };

  const startCell = maze.grid[maze.start.row][maze.start.col];

  visitCell(startCell, maze, route, status);

  mazeView.displayRoute(route);
  mazeView.displayBacktracks();
}

function resetMaze() {
  maze = null;
  mazeView.clearMaze();
}

function visitCell(cell, maze, route, status) {
  if (status.goalReached) {
    return;
  }

  cell.visited = true;
  route.push(cell);

  if (cell.row === maze.goal.row && cell.col === maze.goal.col) {
    status.goalReached = true;
    return;
  }

  const directions = ["east", "south", "west", "north"];

  for (let dir of directions) {
    if (status.goalReached) {
      return;
    }

    if (!cell[dir]) {
      const neighbor = maze.getNeighbor(cell, dir);
      if (neighbor && !neighbor.visited) {
        visitCell(neighbor, maze, route, status);
      }
    }
  }

  if (!status.goalReached) {
    route.pop();
    cell.backtracked = true;
  }
}
