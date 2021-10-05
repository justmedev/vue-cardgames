import Card from '@/helpers/game/card';

/**
 * Can be extended easily
 */
export default class BasePlayer {
  get score (): number {
    return this._score;
  }
  protected name: string;
  private _score = 0;
  /**
   * Cards the player is currently holding on his hand
   * @private
   */
  hand: Card[] = [];

  constructor (name: string, hand?: Card[], score?: number) {
    this.name = name;
    this.hand = hand ?? this.hand;
    this._score = score ?? this._score;
  }
}
