import Maze from "./model.js";
import MazeView from "./view.js";

window.addEventListener("load", start);

function start() {
  document.getElementById("generate").addEventListener("click", generateMaze);
}

function generateMaze() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);

  const maze = new Maze(rows, cols);
  maze.generateMaze(); // Generer labyrinten med Prim's algoritme

  const mazeView = new MazeView(maze);
  mazeView.displayMaze();

  // Udskriv JSON til konsollen eller vis det på siden
  const jsonOutput = document.getElementById("json-output");
  jsonOutput.textContent = JSON.stringify(maze.toJSON(), null, 2);
}
