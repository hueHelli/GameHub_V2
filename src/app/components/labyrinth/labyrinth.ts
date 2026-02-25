import { Component, OnInit } from '@angular/core';
import { LabyrinthField } from './labyrinth-field/labyrinth-field';

@Component({
  selector: 'app-labyrinth',
  imports: [LabyrinthField],
  templateUrl: './labyrinth.html',
  styleUrl: './labyrinth.scss',
})
export class Labyrinth implements OnInit {
  width: number = 10;
  height: number = 10;

  labyrinthFields = Array.from(Array(this.height * 2 - 1), () =>
    Array.from(Array(this.width * 2 - 1), () => {
      return { isWall: true, isPlayer: false };
    }),
  );

  generateLabyrinth(): void {
    let field: { x: number; y: number } = { x: 0, y: 0 };

    for (let i = 0; i < this.width * this.height; i++) {
      let oldField = field;
      field = this.getNewRandomCords(field);

      let wallToOpen = this.getWallFieldToOpen(oldField, field);
      /* console.log(field); */
      this.labyrinthFields[field.x][field.y].isWall = false;
      this.labyrinthFields[wallToOpen.x][wallToOpen.y].isWall = false;
    }
  }

  getNewRandomCords(old: { x: number; y: number }): { x: number; y: number } {
    let newField = { x: old.x, y: old.y };

    /* console.log(old);
    console.log(direction); */

    do {
      let direction = Math.floor(Math.random() * 4);

      switch (direction) {
        case 0:
          newField.x = old.x + 2;
          break;
        case 1:
          newField.y = old.y + 2;
          break;
        case 2:
          newField.x = old.x - 2;
          break;
        case 3:
          newField.y = old.y - 2;
          break;
      }
      console.log(newField);
    } while (this.rerollField(newField) /* || this.areFieldTouched(newField) */);
    this.areFieldTouched(newField);
    return newField;
  }

  rerollField(cords: { x: number; y: number }): boolean {
    console.log(
      `rerollField: ${cords.x >= this.width || cords.x < 0 || cords.y >= this.height || cords.y < 0}`,
    );
    return cords.x >= this.width || cords.x < 0 || cords.y >= this.height || cords.y < 0;
  }

  areFieldTouched(cords: { x: number; y: number }): boolean {
    console.log(`areFieldTouched: ${!this.labyrinthFields[cords.x][cords.y].isWall}`);
    return !this.labyrinthFields[cords.x][cords.y].isWall;
  }

  getWallFieldToOpen(
    old: { x: number; y: number },
    newField: { x: number; y: number },
  ): { x: number; y: number } {
    if (old.x == newField.x) {
      if (old.y < newField.y) {
        return { x: newField.x, y: newField.y - 1 };
      } else if (old.y > newField.y) {
        return { x: newField.x, y: newField.y + 1 };
      }
    } else if (old.y == newField.y) {
      if (old.y < newField.x) {
        return { x: newField.x - 1, y: newField.y };
      } else if (old.x > newField.x) {
        return { x: newField.x + 1, y: newField.y };
      }
    }

    return newField;
  }

  ngOnInit(): void {
    /* this.labyrinthFields[5][5].isWall = false;
    this.labyrinthFields[6][6].isWall = false;
    this.labyrinthFields[6][6].isPlayer = true; */
    this.generateLabyrinth();
  }
}
