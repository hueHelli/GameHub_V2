import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { labyrinthField, wall } from './labyrinthField';

@Component({
  selector: 'app-labyrinth-field-component',
  imports: [CommonModule],
  templateUrl: './labyrinth-field-component.html',
  styleUrl: './labyrinth-field-component.scss',
})
export class LabyrinthFieldComponent {
  public myWall = wall;

  @Input() field?: labyrinthField;
}
