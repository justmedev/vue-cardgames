<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4">
      <canvas ref="canvas" height="540" width="960"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable max-classes-per-file */
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Card {
  // private static backImgPath: string; // path

  public rank: string;
  public suit: string;
  public value: number; // ace = 1
  public faceImgPath: string;
  public xPos;
  public yPos;

  constructor (rank: string, suit: string, value: number, faceImgPath: string, xPos: number, yPos: number) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
    this.faceImgPath = faceImgPath;
    this.xPos = xPos;
    this.yPos = yPos;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Deck {
  // private cards: Card[] = [];
  private x: number;
  private y: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor (x: number, y: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;

    this.canvas = canvas;
    this.ctx = ctx;
  }

  generate (): void {
    // Generate deck
    axios.get('/cards/data.json')
      .then((res) => {
        if (res.status !== 200) {
          // error
          console.log(res);
          return;
        }

        console.log(res.data);
      })
      .catch(() => console.log);
  }

  draw (): void {
    // ...
  }

  update (): void {
    // ...
  }
}

@Component
export default class CanvasWar extends Vue {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private fps = 0;
  private times: number[] = [];

  mounted (): void {
    // dTODO: Move
    this.canvas = this.$refs.canvas as unknown as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    if (!this.canvas) return;
    if (!this.ctx) return;

    const {
      ctx,
      canvas,
    } = this;

    let offset = 0;
    let grd = null;
    // const deck = new Deck(0, 0, canvas, ctx);

    // Game loop
    setInterval(() => {
      if (!ctx) return;
      if (!canvas) return;

      // Clear canvas
      ctx.fillStyle = 'white';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#eeeeee';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Deck
      [...Array(8)
        .keys()].forEach(() => {
        offset += 5;

        grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grd.addColorStop(0, 'white');
        grd.addColorStop(1, 'black');

        ctx.fillStyle = grd;
        ctx.fillRect(canvas.width / 2 + offset / 2, canvas.height / 2 + offset / 1.2, 120, 180);
      });

      // FPS counter
      ctx.fillStyle = 'black';
      ctx.fillText(this.fps.toString(), 940, 10);
      offset = 0;
    }, 100);

    // Start fps counter
    this.refreshLoop();
  }

  refreshLoop (): void {
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
