<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4">
      <canvas ref="canvas" height="540" width="960"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseGameLoop from '@/helpers/game/baseGameLoop';
import Stack from '@/helpers/game/stack';

@Component
export default class CanvasWar extends Vue {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private img: HTMLImageElement | null = null;
  private imgLoaded = false;

  mounted (): void {
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    if (!this.canvas || !this.ctx) return;

    const {
      canvas,
      ctx,
    } = this;
    if (!canvas || !ctx) return;

    // Load image
    this.img = new Image(1246 / 12, 1934 / 12);
    this.img.src = '/cards/diamonds/two.png';
    this.img.onload = () => {
      this.imgLoaded = true;
    };

    // Stack testing
    const stack = new Stack();
    console.log(stack.cardsLeft.length);
    stack.drawCards(2);
    console.log(stack.cardsLeft.length);

    // Game loop
    const gameLoop = new BaseGameLoop();
    gameLoop.start();
    gameLoop.run = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#dedede';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'black';
      ctx.font = '16px Poppins';
      ctx.textAlign = 'end';
      ctx.fillText(`${gameLoop.fps} fps`, canvas.width - 5, 17);

      if (this.imgLoaded && this.img) ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    };
  }
}
</script>
