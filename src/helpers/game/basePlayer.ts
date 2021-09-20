import Card from '@/helpers/game/card';

/**
 * Can be extended easily
 */
export default class BasePlayer {
  protected name: string;
  protected score = 0;
  /**
   * Cards the player is currently holding on his hand
   * @private
   */
  protected hand: Card[] = [];

  constructor (name: string, hand?: Card[], score?: number) {
    this.name = name;
    this.hand = hand ?? this.hand;
    this.score = score ?? this.score;
  }
}
