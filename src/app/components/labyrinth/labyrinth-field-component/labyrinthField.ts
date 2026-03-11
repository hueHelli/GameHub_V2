import * as uuid from 'uuid';

export enum wall {
  none,
  wall,
  open,
}

export enum cardinalDirection {
  n,
  e,
  s,
  w,
}

export class labyrinthField {
  id: string;
  x: number;
  y: number;
  walls: { n: wall; e: wall; s: wall; w: wall };

  constructor(x: number, y: number, walls: { n: wall; e: wall; s: wall; w: wall }) {
    this.id = uuid.v7();
    this.x = x;
    this.y = y;
    this.walls = walls;
  }

  openWall(direction: cardinalDirection): void {
    switch (direction) {
      case cardinalDirection.n:
        this.walls.n = wall.open;
        break;
      case cardinalDirection.e:
        this.walls.e = wall.open;
        break;
      case cardinalDirection.s:
        this.walls.s = wall.open;
        break;
      case cardinalDirection.w:
        this.walls.w = wall.open;
        break;
    }
  }

  getRandomDirection(): cardinalDirection {
    let poolOfDirections = [];
    if (this.walls.n == wall.wall) poolOfDirections.push(cardinalDirection.n);
    if (this.walls.e == wall.wall) poolOfDirections.push(cardinalDirection.e);
    if (this.walls.s == wall.wall) poolOfDirections.push(cardinalDirection.s);
    if (this.walls.w == wall.wall) poolOfDirections.push(cardinalDirection.w);

    let rand = Math.floor(Math.random() * poolOfDirections.length);
    return poolOfDirections[rand];
  }
}
