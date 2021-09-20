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
  /**
   * Code to run on every game tick (loop iteration)
   */
  public run: (() => void) | null = null;

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
  stop (): void {
    this.running = false;
  }

  /**
   * Do next game loop tick (iteration)
   * @param timestamp Timestamp got from `window.requestAnimationFrame`
   * @protected
   */
  protected step (timestamp: DOMHighResTimeStamp): void {
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
