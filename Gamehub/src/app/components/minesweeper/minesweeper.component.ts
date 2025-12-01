import { Component } from '@angular/core';

interface Cell {
  coordinates: {
    row: number;
    col: number;
  };
  mine: boolean;
  open: boolean;
  flagged: boolean;
  adjacentMines: number;
  adjacentFlags: number;
}

@Component({
  selector: 'app-minesweeper.component',
  imports: [],
  templateUrl: './minesweeper.component.html',
  styleUrl: './minesweeper.component.scss',
})
export class MinesweeperComponent {
  field: Array<Array<Cell>> = [];
  rows: number = 10;
  cols: number = 10;
  flags: number = 10;
  private totalCells = 100;
  private moves = 0;
  private totalMines = 10;
  private randomMines: Array<{ row: number; col: number }> = [];

  initField() {
    this.field = [];
    this.randomMines = [];
    this.flags = this.totalMines;
    this.moves = 0;
    this.totalCells = this.rows * this.cols;
    for (let i = 0; i < this.totalMines; i++) {
      const randY = Math.floor(Math.random() * this.rows);
      const randX = Math.floor(Math.random() * this.cols);
      if (this.randomMines.find((mine) => mine.row === randY && mine.col === randX)) {
        i--;
        continue;
      }
      this.randomMines.push({ row: randY, col: randX });
    }
    for (let i = 0; i < this.rows; i++) {
      this.field.push([]);
      for (let j = 0; j < this.cols; j++) {
        this.field[i].push({
          coordinates: { row: i, col: j },
          mine: this.randomMines.find((mine) => mine.row === i && mine.col === j) ? true : false,
          open: false,
          flagged: false,
          adjacentMines: 0,
          adjacentFlags: 0,
        });
      }
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let adjacentMines = 0;
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            if (y === 0 && x === 0) continue;
            const newY = i + y;
            const newX = j + x;
            if (newY >= 0 && newY < this.rows && newX >= 0 && newX < this.cols) {
              if (this.field[newY][newX].mine) {
                adjacentMines++;
              }
            }
          }
        }
        this.field[i][j].adjacentMines = adjacentMines;
      }
    }
  }

  open({ row, col }: { row: number; col: number }) {
    if (this.field[row][col].mine) {
      this.lose();
      return;
    }
    if (!this.field[row][col].flagged) {
      if (!this.field[row][col].open) {
        this.field[row][col].open = true;
        this.moves++;
      }
      if (
        this.field[row][col].adjacentMines === 0 ||
        (this.field[row][col].adjacentMines > 0 &&
          this.field[row][col].adjacentFlags === this.field[row][col].adjacentMines)
      ) {
        this.openAdjecentCells(row, col);
      }
    }
    if (this.moves === this.totalCells - this.totalMines) {
      alert('Congratulations! You Win!');
    }
  }

  openAdjecentCells(row: number, col: number) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (y === 0 && x === 0) continue;
        const newY = row + y;
        const newX = col + x;
        if (newY >= 0 && newY < this.rows && newX >= 0 && newX < this.cols) {
          if (!this.field[newY][newX].open && !this.field[newY][newX].flagged) {
            this.open({ row: newY, col: newX });
          }
        }
      }
    }
  }

  flag({ row, col }: { row: number; col: number }, $event: MouseEvent) {
    $event.preventDefault();
    if (this.flags > 0) {
      this.flags--;
      if (!this.field[row][col].open) {
        this.field[row][col].flagged = !this.field[row][col].flagged;
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            //if (y === 0 && x === 0) continue;
            const newY = row + y;
            const newX = col + x;
            if (newY >= 0 && newY < this.rows && newX >= 0 && newX < this.cols) {
              this.field[newY][newX].adjacentFlags++;
            }
          }
        }
      }
    }
  }

  lose() {
    alert('You hit a mine! Game Over.');
    this.field.forEach((row) => {
      row.forEach((cell) => {
        cell.open = true;
      });
    });
  }

  floor(value: number) {
    return Math.floor(value);
  }

  ngOnInit() {
    this.initField();
  }
}
