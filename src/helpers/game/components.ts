/* eslint-disable max-classes-per-file */
export class Vector2 {
  public x: number;
  public y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
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

export class Button {}
