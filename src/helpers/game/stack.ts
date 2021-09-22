import Card from '@/helpers/game/card';
import { CardRank } from '@/helpers/game/interfaces';
import { OutOfCardsError } from '@/helpers/game/errors';
import { getRandomArbitrary } from '@/helpers/utils';

export default class Stack {
  get totalCards (): Card[] {
    return this._totalCards;
  }

  get cardsLeft (): Card[] {
    return this._cardsLeft;
  }

  private _cardsLeft: Card[] = [];
  /**
   * All 52 cards
   * @protected
   */
  private _totalCards = [
    new Card('clubs', 'two', CardRank.TWO),
    new Card('clubs', 'three', CardRank.THREE),
    new Card('clubs', 'four', CardRank.FOUR),
    new Card('clubs', 'five', CardRank.FIVE),
    new Card('clubs', 'six', CardRank.SIX),
    new Card('clubs', 'seven', CardRank.SEVEN),
    new Card('clubs', 'eight', CardRank.EIGHT),
    new Card('clubs', 'nine', CardRank.NINE),
    new Card('clubs', 'ten', CardRank.TEN),
    new Card('clubs', 'jack', CardRank.JACK),
    new Card('clubs', 'queen', CardRank.QUEEN),
    new Card('clubs', 'king', CardRank.KING),
    new Card('clubs', 'ace', CardRank.ACE),

    new Card('diamonds', 'two', CardRank.TWO),
    new Card('diamonds', 'three', CardRank.THREE),
    new Card('diamonds', 'four', CardRank.FOUR),
    new Card('diamonds', 'five', CardRank.FIVE),
    new Card('diamonds', 'six', CardRank.SIX),
    new Card('diamonds', 'seven', CardRank.SEVEN),
    new Card('diamonds', 'eight', CardRank.EIGHT),
    new Card('diamonds', 'nine', CardRank.NINE),
    new Card('diamonds', 'ten', CardRank.TEN),
    new Card('diamonds', 'jack', CardRank.JACK),
    new Card('diamonds', 'queen', CardRank.QUEEN),
    new Card('diamonds', 'king', CardRank.KING),
    new Card('diamonds', 'ace', CardRank.ACE),

    new Card('hearts', 'two', CardRank.TWO),
    new Card('hearts', 'three', CardRank.THREE),
    new Card('hearts', 'four', CardRank.FOUR),
    new Card('hearts', 'five', CardRank.FIVE),
    new Card('hearts', 'six', CardRank.SIX),
    new Card('hearts', 'seven', CardRank.SEVEN),
    new Card('hearts', 'eight', CardRank.EIGHT),
    new Card('hearts', 'nine', CardRank.NINE),
    new Card('hearts', 'ten', CardRank.TEN),
    new Card('hearts', 'jack', CardRank.JACK),
    new Card('hearts', 'queen', CardRank.QUEEN),
    new Card('hearts', 'king', CardRank.KING),
    new Card('hearts', 'ace', CardRank.ACE),

    new Card('spades', 'two', CardRank.TWO),
    new Card('spades', 'three', CardRank.THREE),
    new Card('spades', 'four', CardRank.FOUR),
    new Card('spades', 'five', CardRank.FIVE),
    new Card('spades', 'six', CardRank.SIX),
    new Card('spades', 'seven', CardRank.SEVEN),
    new Card('spades', 'eight', CardRank.EIGHT),
    new Card('spades', 'nine', CardRank.NINE),
    new Card('spades', 'ten', CardRank.TEN),
    new Card('spades', 'jack', CardRank.JACK),
    new Card('spades', 'queen', CardRank.QUEEN),
    new Card('spades', 'king', CardRank.KING),
    new Card('spades', 'ace', CardRank.ACE),
  ];

  /**
   * @param startingCards
   */
  constructor (startingCards?: Card[]) {
    // this._cardsLeft = startingCards ?? this.totalCards;
    const fill = startingCards ?? this._totalCards;

    console.log(`filled stack with ${fill.length} cards`);
    this.fillCards(fill);
  }

  drawCards (amount: number): Card[] {
    if (amount > this._cardsLeft.length) throw new OutOfCardsError();

    const cards: Card[] = [];
    const left = this._cardsLeft;
    console.log(cards, left);

    for (let i = 0; i < amount; i++) {
      const idx = getRandomArbitrary(0, left.length - 1, true);
      console.log(left, idx);

      cards.push(left[idx]);
      left.splice(idx, 1);
    }

    this._cardsLeft = left;
    console.log(cards);
    return cards;
  }

  /**
   * Fill card with `x` amount of cards. If `amount` is defined, `cards` will be ignored.
   * Amount: Generates `x` random cards.
   * Cards: Put in predefined cards.
   * @param cards Cards to fill in. (Can be empty array if amount is defined)
   */
  fillCards (cards: Card[]): void {
    this._cardsLeft.push(...cards);
  }
}
