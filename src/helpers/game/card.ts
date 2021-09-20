import { CardRank, CardRankString } from '@/helpers/game/interfaces';

export default class Card {
  /**
   * Can be: diamonds, clubs, spades, hearts
   * @protected
   */
  protected type: string;
  /**
   * Rank as string. Can be: two, three, four, ..., ace, queen, king, jack
   * @protected
   */
  protected rank: CardRankString;
  /**
   * Rank as enum (converts it to number)
   * @protected
   */
  protected suit: CardRank;

  constructor (type: string, rank: CardRankString, suit: CardRank) {
    this.type = type;
    this.rank = rank;
    this.suit = suit;
  }
}
