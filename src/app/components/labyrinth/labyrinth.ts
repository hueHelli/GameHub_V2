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

  labyrinthFields = Array.from(Array(this.height), () =>
    Array.from(Array(this.width), () => {
      return { isWall: true, isPlayer: false };
    }),
  );

  ngOnInit(): void {
    this.labyrinthFields[5][5].isWall = false;
    this.labyrinthFields[6][6].isWall = false;
    this.labyrinthFields[6][6].isPlayer = true;
  }
}
