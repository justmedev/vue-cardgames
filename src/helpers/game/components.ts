/* eslint-disable max-classes-per-file */

export class Vector2 {
  public x: number;
  public y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static zero (): Vector2 {
    return {
      x: 0,
      y: 0,
    };
  }
}

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor (x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Quaternion {
  public w: number;
  public x: number;
  public y: number;
  public z: number;

  constructor (w: number, x: number, y: number, z: number) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Rect extends Vector2 {
  public width: number;
  public height: number;

  constructor (x: number, y: number, width: number, height: number) {
    super(x, y);

    this.width = width;
    this.height = height;
  }
}

export class Button {
}
