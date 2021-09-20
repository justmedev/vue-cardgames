export default class BaseGameLoop {
  private start: number | null;
  private previousTimeStamp: number;
  private elapsed: number;
  private running: boolean | null;

  constructor () {
    this.running = null;
    this.start = null;
    this.previousTimeStamp = performance.now();
    this.elapsed = 0;
  }

  step (timestamp: DOMHighResTimeStamp): void {
    if (!this.start) this.start = timestamp;
    this.elapsed = timestamp - this.start;

    if (this.previousTimeStamp !== timestamp) {
      this.run();
    }

    if (this.running) {
      this.previousTimeStamp = timestamp;
      window.requestAnimationFrame(this.step);
    }
  }

  stop (): void {
    this.running = false;
  }

  run (): void {
    throw new Error('BaseGameLoop.run() not implemented. Extend the base class and implement it!');
  }
}
