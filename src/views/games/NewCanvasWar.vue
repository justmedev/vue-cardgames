<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4">
      <canvas ref="canvas" height="540" width="960"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CanvasWar extends Vue {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private fps = 0;
  private times: number[] = [];
  private hz = 60;

  mounted (): void {
    if (!this.canvas || !this.ctx) return;

    const {
      canvas,
      ctx,
    } = this;
    if (!canvas || !ctx) return;

    // Game loop
    setInterval(() => {
      canvas.getContext();
    }, this.hz);
  }

  refreshFps (): void {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      this.fps = this.times.length;
      this.refreshLoop();
    });
  }
}
</script>
