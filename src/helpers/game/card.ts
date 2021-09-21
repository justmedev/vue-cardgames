import { CardRank, CardRankString } from '@/helpers/game/interfaces';

export default class Card {
  get type (): string {
    return this._type;
  }

  get suit (): CardRank {
    return this._suit;
  }

  get rank (): CardRankString {
    return this._rank;
  }

  /**
   * Can be: diamonds, clubs, spades, hearts
   * @protected
   */
  private readonly _type: string;
  /**
   * Rank as string. Can be: two, three, four, ..., ace, queen, king, jack
   * @protected
   */
  private readonly _rank: CardRankString;
  /**
   * Rank as enum (converts it to number)
   * @protected
   */
  private readonly _suit: CardRank;

  constructor (type: string, rank: CardRankString, suit: CardRank) {
    this._type = type;
    this._rank = rank;
    this._suit = suit;
  }
}
