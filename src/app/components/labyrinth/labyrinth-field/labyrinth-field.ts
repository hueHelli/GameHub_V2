import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labyrinth-field',
  imports: [CommonModule],
  templateUrl: './labyrinth-field.html',
  styleUrl: './labyrinth-field.scss',
})
export class LabyrinthField {
  private _isWall: boolean = false;
  private _isPlayer: boolean = false;

  @Input()
  set isWall(v: boolean) {
    if (!this._isPlayer) {
      this._isWall = v;
    }
  }

  @Input()
  set isPlayer(v: boolean) {
    if (!this._isWall) {
      this._isPlayer = v;
    }
  }

  get isWall() {
    return this._isWall;
  }

  get isPlayer() {
    return this._isPlayer;
  }
}
