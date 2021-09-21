import { Rect, Vector2 } from '@/helpers/game/components';

export function mouseInRectBounds (mousePosition: Vector2, rect: Rect): boolean {
  const xCheck = mousePosition.x > rect.x && mousePosition.x < rect.x + rect.width;
  const yCheck = mousePosition.y > (rect.y) && mousePosition.y < rect.y + rect.height;

  // topRight: 0, 0
  // bottomRight: 0, height

  // const yCheck = mousePosition. < (rectPosition.y + rectHeight);
  return xCheck && yCheck;
}

export function _ (): void {
  // ...
}
