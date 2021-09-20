/* eslint-disable no-underscore-dangle */
import Player from '@/helpers/game/basePlayer';

/**
 * Implements basic game logic.
 * This class is just a helper and should work for multiply different card games.
 * You should make a class extending this one, which implements the logic for your specific game.
 */
export default class BaseGame {
  /**
   * Array of all the players participating in the game
   * @private
   */
  private players: Player[];
  /**
   * Total turns elapsed since game started
   * @private
   */
  private totalTurns = 0;
  /**
   * Index of the current turn
   * @private
   */
  private currentTurn = 0;
  /**
   * Player that is currently doing his turn
   * @private
   */
  private currentOnTurn: Player;

  /**
   * Make a new instance of the class
   * @param players Array of players which are participating in the game. Cannot be changed later without extending!
   * @param currentOnTurn Starting player
   */
  constructor (players: Player[], currentOnTurn: Player) {
    this.players = players;
    this.currentOnTurn = currentOnTurn;
  }
}
