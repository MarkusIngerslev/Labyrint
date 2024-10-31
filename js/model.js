export default class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.start = { row: 0, col: 0 };
    this.goal = { row: rows - 1, col: cols - 1 };
    this.grid = [];

    // Initialiser grid med vægge overalt
    for (let row = 0; row < rows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < cols; col++) {
        this.grid[row][col] = {
          row: row,
          col: col,
          north: true,
          south: true,
          east: true,
          west: true,
          inMaze: false, // Om cellen er blevet tilføjet til labyrinten
          visited: false,
          backtracked: false,
        };
      }
    }
  }

  generateMaze() {
    const walls = [];
    const startCell = this.grid[this.start.row][this.start.col];
    startCell.inMaze = true;

    this.addWalls(startCell, walls);

    while (walls.length > 0) {
      const randomIndex = Math.floor(Math.random() * walls.length);
      const wall = walls[randomIndex];
      const { cell1, cell2, direction } = wall;

      if (!cell2.inMaze) {
        cell1[direction] = false;
        cell2[this.oppositeDirection(direction)] = false;
        cell2.inMaze = true;

        this.addWalls(cell2, walls);
      }

      walls.splice(randomIndex, 1);
    }
  }

  addWalls(cell, walls) {
    const directions = ["north", "south", "east", "west"];

    for (let dir of directions) {
      const neighbor = this.getNeighbor(cell, dir);
      if (neighbor && !neighbor.inMaze) {
        walls.push({
          cell1: cell,
          cell2: neighbor,
          direction: dir,
        });
      }
    }
  }

  getNeighbor(cell, direction) {
    const { row, col } = cell;
    let neighborRow = row;
    let neighborCol = col;

    if (direction === "north") {
      neighborRow = row - 1;
    } else if (direction === "south") {
      neighborRow = row + 1;
    } else if (direction === "east") {
      neighborCol = col + 1;
    } else if (direction === "west") {
      neighborCol = col - 1;
    }

    if (
      neighborRow >= 0 &&
      neighborRow < this.rows &&
      neighborCol >= 0 &&
      neighborCol < this.cols
    ) {
      return this.grid[neighborRow][neighborCol];
    } else {
      return null;
    }
  }

  oppositeDirection(direction) {
    if (direction === "north") return "south";
    if (direction === "south") return "north";
    if (direction === "east") return "west";
    if (direction === "west") return "east";
  }
}
