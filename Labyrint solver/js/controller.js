import Maze from "./model.js";
import MazeView from "./view.js";
import Stack from "..//Datastrukturer/stack.js";

window.addEventListener("load", start);

function start() {
  // Start bygning af labyrint ved klik på knap
  // document.getElementById("start").addEventListener("click", buildMaze);

  // Byg labyrint ved start
  buildMaze();
}

function buildMaze() {
  fetch("./mazes/maze2.json")
    .then((response) => response.json())
    .then((data) => {
      const maze = new Maze(data);
      const mazeView = new MazeView(maze);
      mazeView.displayMaze();
      solveMaze(maze, mazeView);
    });
}

// Funktion til at finde rute gennem labyrinten med Depth-First Search (DFS)
function solveMaze(maze, mazeView) {
  // Variable til at holde på ruten gennem labyrinten
  const route = new Stack();
  const status = { goalReached: false };

  // Startpunkt
  const startCell = maze.grid[maze.start.row][maze.start.col];

  visitCell(startCell, maze, route, status);

  mazeView.displayroute(route);
  mazeView.displayBacktracks();
}

// Funktion til at besøge en celle i labyrinten
function visitCell(cell, maze, route, status) {
  // Tjekker først om målet er nået i forvejen
  if (status.goalReached) {
    return;
  }

  // Sætter cellen til at være besøgt og tilføjer den til ruten
  cell.visited = true;
  route.push(cell);

  // Tjekker om den besøgte celle er målet og returnerer hvis det er tilfældet
  if (cell.row === maze.goal.row && cell.col === maze.goal.col) {
    status.goalReached = true;
    return;
  }

  // Laver rækkefølge på tjek af retninger
  const directions = ["east", "south", "west", "north"];

  // Ændre rækkefølgen på retninger for hvert besøg
  // shuffleDirections(directions);

  // Loop over hver retning og besøg nabocellen hvis den ikke er besøgt
  for (let dir of directions) {
    if (status.goalReached) {
      return;
    }

    if (!cell[dir]) {
      const neighbor = getNeighbor(cell, dir, maze);
      if (neighbor && !neighbor.visited) {
        visitCell(neighbor, maze, route, status);
      }
    }
  }

  // Hvis route ender i en blindgyde, så backtrack
  if (!status.goalReached) {
    route.pop();
    cell.backtracked = true;
  }
}

// Funktion til at finde nabocelle
function getNeighbor(cell, direction, maze) {
  // Variabler til at holde på nuværende celle og nabocellens række og kolonne
  const row = cell.row;
  const col = cell.col;
  let neighborRow = row;
  let neighborCol = col;

  // Opdaterer nabocellens række og kolonne afhængig af retning
  if (direction === "north") {
    neighborRow = row - 1;
  } else if (direction === "south") {
    neighborRow = row + 1;
  } else if (direction === "east") {
    neighborCol = col + 1;
  } else if (direction === "west") {
    neighborCol = col - 1;
  }

  // Returnerer nabocellen hvis den er indenfor labyrintens grænser
  if (
    neighborRow >= 0 &&
    neighborRow < maze.rows &&
    neighborCol >= 0 &&
    neighborCol < maze.cols
  ) {
    return maze.grid[neighborRow][neighborCol];
  } else {
    return null;
  }
}

function shuffleDirections(directions) {
  for (let i = directions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [directions[i], directions[j]] = [directions[j], directions[i]];
  }
}
