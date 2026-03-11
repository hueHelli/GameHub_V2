import { Component, OnInit } from '@angular/core';
import { LabyrinthFieldComponent } from './labyrinth-field-component/labyrinth-field-component';
import {
  cardinalDirection,
  labyrinthField,
  wall,
} from './labyrinth-field-component/labyrinthField';

@Component({
  selector: 'app-labyrinth',
  imports: [LabyrinthFieldComponent],
  templateUrl: './labyrinth.html',
  styleUrl: './labyrinth.scss',
})
export class Labyrinth implements OnInit {
  width: number = 10;
  height: number = 10;

  generated: boolean = false;

  labyrinthFields: Array<labyrinthField> = [];

  generateLabyrinth(): void {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.labyrinthFields.push(
          new labyrinthField(x, y, { n: wall.wall, e: wall.wall, s: wall.wall, w: wall.wall }),
        );
      }
    }

    console.log(this.labyrinthFields);

    for (let field of this.labyrinthFields) {
      let direction = field.getRandomDirection();
      field.openWall(direction);
      this.openWallOnOtherField(field, direction);
    }
    /* this.openWallOnOtherField(this.labyrinthFields[0], cardinalDirection.e); */

    console.log(this.labyrinthFields);

    this.generated = true;
  }

  openWallOnOtherField(field: labyrinthField, direction: cardinalDirection): void {
    if (!this.existsFieldBehindWall(field, direction)) return;

    switch (direction) {
      case cardinalDirection.n:
        console.log(this.getFieldAt(field.x, field.y - 1));
        this.getFieldAt(field.x, field.y - 1)?.openWall(cardinalDirection.s);
        break;
      case cardinalDirection.e:
        console.log(this.getFieldAt(field.x + 1, field.y));
        this.getFieldAt(field.x + 1, field.y)?.openWall(cardinalDirection.w);
        break;
      case cardinalDirection.s:
        console.log(this.getFieldAt(field.x, field.y + 1));
        this.getFieldAt(field.x, field.y + 1)?.openWall(cardinalDirection.n);
        break;
      case cardinalDirection.w:
        console.log(this.getFieldAt(field.x - 1, field.y));
        this.getFieldAt(field.x - 1, field.y)?.openWall(cardinalDirection.e);
        break;
    }
  }

  existsFieldBehindWall(field: labyrinthField, direction: cardinalDirection): boolean {
    let x;
    let y;

    switch (direction) {
      case cardinalDirection.n:
        x = field.x;
        y = field.y - 1;
        break;
      case cardinalDirection.e:
        x = field.x + 1;
        y = field.y;
        break;
      case cardinalDirection.s:
        x = field.x;
        y = field.y + 1;
        break;
      case cardinalDirection.w:
        x = field.x - 1;
        y = field.y;
        break;
    }

    return this.getFieldAt(x, y) === undefined ? false : true;
  }

  getFieldAt(x: number, y: number): labyrinthField | undefined {
    return this.labyrinthFields.find((f) => f.x === x && f.y === y);
  }

  ngOnInit(): void {
    /* this.labyrinthFields[5][5].isWall = false;
    this.labyrinthFields[6][6].isWall = false;
    this.labyrinthFields[6][6].isPlayer = true; */
    this.generateLabyrinth();
  }
}
