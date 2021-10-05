/* eslint-disable no-underscore-dangle */
import BasePlayer from '@/helpers/game/basePlayer';

/**
 * Implements basic game logic.
 * This class is just a helper and should work for multiply different card games.
 * You should make a class extending this one, which implements the logic for your specific game.
 */
export default class BaseGame {
  get totalTurns (): number {
    return this._totalTurns;
  }

  get currentOnTurn (): BasePlayer {
    return this._currentOnTurn;
  }

  get currentTurn (): number {
    return this._currentTurn;
  }

  /**
   * Array of all the players participating in the game
   * @private
   */
  public players: BasePlayer[];
  /**
   * Total turns elapsed since game started
   * @private
   */
  private _totalTurns = 0;
  /**
   * Index of the current turn
   * @private
   */
  private _currentTurn = 0;
  /**
   * Player that is currently doing his turn
   * @private
   */
  private _currentOnTurn: BasePlayer;

  /**
   * Make a new instance of the class
   * @param players Array of players which are participating in the game. Cannot be changed later without extending!
   * @param currentOnTurn Starting player
   */
  constructor (players: BasePlayer[], currentOnTurn: BasePlayer) {
    this.players = players;
    this._currentOnTurn = currentOnTurn;
  }

  public nextTurn (): void {
    this._currentTurn++;

    const lastOnTurn = this._currentOnTurn;
    const lastOnTurnIndex = this.players.findIndex((player) => player.hand === lastOnTurn.hand && player.score === lastOnTurn.score);

    let currentOnTurn: BasePlayer | null = null;
    if (lastOnTurnIndex === this.players.length - 1) {
      // eslint-disable-next-line prefer-destructuring
      currentOnTurn = this.players[0];
    } else {
      currentOnTurn = this.players[lastOnTurnIndex + 1];
    }

    if (!currentOnTurn) return;
    this._currentOnTurn = currentOnTurn;
  }
}
