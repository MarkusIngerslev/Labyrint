// controller.js
import Maze from "./model.js";
import MazeView from "./view.js";

window.addEventListener("load", start);

function start() {
  // Start bygning af labyrint ved klik på knap
  // document.getElementById("start").addEventListener("click", buildMaze);

  // Byg labyrint ved start
  buildMaze();
}

function buildMaze() {
  fetch("maze.json")
    .then((response) => response.json())
    .then((data) => {
      const maze = new Maze(data);
      const mazeView = new MazeView(maze);
      mazeView.displayMaze();
    });
}
