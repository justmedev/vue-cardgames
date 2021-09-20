export interface ApiImageResponse {
  paths: string[],
  subPaths: {
    path: string,
    name: string,
  }[],
}

export enum CardRank {
  TWO = 2,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}
