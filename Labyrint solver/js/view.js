// view.js
export default class MazeView {
  constructor(maze) {
    this.maze = maze;
    this.labyrinthElement = document.getElementById("labyrint");
  }

  displayMaze() {
    this.labyrinthElement.innerHTML = ""; // Rens tidligere visning
    this.labyrinthElement.style.gridTemplateColumns = `repeat(${this.maze.cols}, 40px)`;

    this.maze.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        // Tilføj klasser for vægge
        if (cell.north) cellDiv.classList.add("wall-north");
        if (cell.east) cellDiv.classList.add("wall-east");
        if (cell.south) cellDiv.classList.add("wall-south");
        if (cell.west) cellDiv.classList.add("wall-west");

        // Marker start og goal
        if (
          rowIndex === this.maze.start.row &&
          colIndex === this.maze.start.col
        ) {
          cellDiv.classList.add("start");
        }
        if (
          rowIndex === this.maze.goal.row &&
          colIndex === this.maze.goal.col
        ) {
          cellDiv.classList.add("goal");
        }

        this.labyrinthElement.appendChild(cellDiv);
      });
    });
  }

  displayroute(route) {
    const cells = this.labyrinthElement.children;

    for (let i = 0; i < route.size(); i++) {
      const cell = route.get(i);
      const cellIndex = cell.row * this.maze.cols + cell.col;
      const cellDiv = cells[cellIndex];
      cellDiv.classList.add("route");
    }
  }

  displayBacktracks() {
    const cells = this.labyrinthElement.children;

    for (let i = 0; i < cells.length; i++) {
      const cell =
        this.maze.grid[Math.floor(i / this.maze.cols)][i % this.maze.cols];
      if (cell.backtracked) {
        const cellDiv = cells[i];
        cellDiv.classList.add("backtrack");
      }
    }
  }
}
