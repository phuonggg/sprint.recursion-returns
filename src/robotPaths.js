class Board {
  constructor(size) {
    this.board = [];
    for (let row = 0; row < size; row += 1) {
      this.board.push([]);
      for (let col = 0; col < size; col += 1) {
        this.board[row].push(false);
      }
    }
  }

  togglePiece(row, col) {
    this.board[row][col] = !this.board[row][col];
    return this.board;
  }
  hasBeenVisited(row, col) {
    return this.board[row][col];
  }
}

class RobotPaths {
  // initialize all your options
  // you may want to change this code later on, too
  constructor(size) {
    this.board = new Board(size);
    this.size = size;
    this.row = 0;
    this.col = 0;
    this.count = 0;
  }

  solve() {
    // Your code here.

    const pathsCounter = (x, y) => {
      if (x === this.size - 1 && y === this.size - 1) {
        this.count++;
        return;
      }

      if (x < 0 || y < 0 || x >= this.size || y >= this.size) {
        return;
      }

      if (this.board.hasBeenVisited(x, y)) {
        return;
      }

      this.board.togglePiece(x, y);
      pathsCounter(x, y + 1); //right
      pathsCounter(x + 1, y); //down
      pathsCounter(x, y - 1); //left
      pathsCounter(x - 1, y); //up
      this.board.togglePiece(x, y);
    };
    pathsCounter(0, 0);
    return this.count;
  }
}

module.exports = { RobotPaths };
