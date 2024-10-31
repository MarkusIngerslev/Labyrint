export default class Maze {
  constructor(mazeData) {
    this.rows = mazeData.rows;
    this.cols = mazeData.cols;
    this.start = mazeData.start;
    this.goal = mazeData.goal;
    this.grid = mazeData.maze;
  }

  // Helper til at kontrollere om en celle har en væg i en bestemt retning
  hasWall(row, col, direction) {
    return this.grid[row][col][direction];
  }
}
