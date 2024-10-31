// controller.js
import Maze from "./model.js";
import MazeView from "./view.js";

window.addEventListener("load", start);

function start() {
  document.getElementById("start").addEventListener("click", () => {
    fetch("maze.json")
      .then((response) => response.json())
      .then((data) => {
        const maze = new Maze(data);
        const mazeView = new MazeView(maze);
        mazeView.displayMaze();
        solveMaze(maze, mazeView);
      });
  });
}

function solveMaze(maze, mazeView) {
  const stack = [{ row: maze.start.row, col: maze.start.col }];
  const visited = new Set();
  const path = []; // Holder ruten

  while (stack.length) {
    const current = stack.pop();
    const { row, col } = current;

    // Tjek, om vi har nået målet
    if (row === maze.goal.row && col === maze.goal.col) {
      path.push(current);
      break;
    }

    // Marker som besøgt og opdater ruten
    visited.add(`${row},${col}`);
    path.push(current);

    // Check alle mulige retninger og læg dem i stacken, hvis de er tilgængelige
    const directions = [
      { row: row - 1, col: col, wall: "north", opposite: "south" },
      { row: row, col: col + 1, wall: "east", opposite: "west" },
      { row: row + 1, col: col, wall: "south", opposite: "north" },
      { row: row, col: col - 1, wall: "west", opposite: "east" },
    ];

    for (const dir of directions) {
      const nextRow = dir.row;
      const nextCol = dir.col;
      if (
        nextRow >= 0 &&
        nextRow < maze.rows &&
        nextCol >= 0 &&
        nextCol < maze.cols &&
        !visited.has(`${nextRow},${nextCol}`) &&
        !maze.hasWall(row, col, dir.wall) &&
        !maze.hasWall(nextRow, nextCol, dir.opposite)
      ) {
        stack.push({ row: nextRow, col: nextCol });
      }
    }
  }

  // Vis ruten i view
  path.forEach(({ row, col }) => {
    const cellDiv = mazeView.labyrinthElement.children[row * maze.cols + col];
    cellDiv.classList.add("path");
  });
}
