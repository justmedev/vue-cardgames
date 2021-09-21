export enum GameLoopExit {
  UNKNOWN,
  EXIT_BY_CLIENT,
  UNFOCUSED_WINDOW,
}

export default class BaseGameLoop {
  get fps (): number {
    // eslint-disable-next-line no-underscore-dangle
    return this._fps;
  }

  protected _fps = 0;
  protected times: number[] = [];

  protected startedAt: number | null = null;
  protected previousTimeStamp: number = performance.now();
  protected elapsed = 0;
  protected running = false;
  protected lastStopReason: GameLoopExit = GameLoopExit.UNKNOWN;

  /**
   * This will run before the game stops
   * @protected
   */
  public beforeStop: ((stopReason: GameLoopExit) => void) | null = null;
  /**
   * Code to run on every game tick (loop iteration)
   */
  public run: (() => void) | null = null;

  constructor () {
    window.addEventListener('blur', () => {
      this.stop(GameLoopExit.UNFOCUSED_WINDOW);
    });

    window.addEventListener('focus', () => {
      if (!this.running && this.lastStopReason === GameLoopExit.UNFOCUSED_WINDOW) this.start();
    });
  }

  refreshFps (): void {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      // eslint-disable-next-line no-underscore-dangle
      this._fps = this.times.length;
      if (this.running) this.refreshFps();
    });
  }

  /**
   * Start the game loop
   */
  start (): void {
    console.log('Starting game loop');
    this.running = true;
    window.requestAnimationFrame((t) => {
      this.step(t);
    });
    this.refreshFps();
  }

  /**
   * Stop the game loop
   */
  stop (reason?: GameLoopExit): void {
    this.lastStopReason = reason ?? GameLoopExit.UNKNOWN;
    if (this.beforeStop) this.beforeStop(this.lastStopReason);
    this.running = false;
  }

  /**
   * Do next game loop tick (iteration)
   * @param timestamp Timestamp got from `window.requestAnimationFrame`
   * @protected
   */
  protected step (timestamp: DOMHighResTimeStamp): void {
    if (!this.running) return;
    if (!this.startedAt) this.startedAt = timestamp;
    this.elapsed = timestamp - this.startedAt;

    if (this.previousTimeStamp !== timestamp) {
      if (!this.run) {
        throw new Error('Code to run is undefined. Bind it to a function!');
      }
      this.run();
    }

    if (this.running) {
      this.previousTimeStamp = timestamp;
      window.requestAnimationFrame((t) => {
        this.step(t);
      });
    }
  }
}
