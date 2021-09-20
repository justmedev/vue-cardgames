// eslint-disable-next-line import/prefer-default-export
export class OutOfCardsError extends Error {
  constructor (message?: string) {
    super(message ?? 'No more cards left to give!');
    this.name = 'OutOfCards';
  }
}
