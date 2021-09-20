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

interface CardsResponse {
  paths: string[],
  subPaths: {
    path: string,
    name: string,
  }[],
}

enum CardRank {
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

class Vector2 {
  public x: number;
  public y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

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
  private cards: Card[] = [];
  private position: Vector2;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor (position: Vector2, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.position = position;

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

        const data: CardsResponse = JSON.parse(res.data);
        const { subPaths } = data;

        const valueMap = {
          two: CardRank.TWO,
          three: CardRank.THREE,
          four: CardRank.FOUR,
          five: CardRank.FIVE,
          six: CardRank.SIX,
          seven: CardRank.SEVEN,
          eight: CardRank.EIGHT,
          nine: CardRank.NINE,
          ten: CardRank.TEN,
          jack: CardRank.JACK,
          queen: CardRank.QUEEN,
          king: CardRank.KING,
          ace: CardRank.ACE,
        };
        type ValueMapType =
          'two'
          | 'three'
          | 'four'
          | 'five'
          | 'six'
          | 'seven'
          | 'eight'
          | 'nine'
          | 'ten'
          | 'jack'
          | 'queen'
          | 'king'
          | 'ace';

        subPaths.forEach((sub) => {
          if (sub.name.includes('backsides')) return;

          const splitSub = sub.path.split('/');
          const value = valueMap[splitSub[splitSub.length - 1].substr(splitSub[splitSub.length - 1].lastIndexOf('.png'), 4) as ValueMapType];
          const suit = sub.name.split(' ')[0];
          const rank = sub.name.split(' ')[1];

          this.cards.push(new Card(rank, suit, value, sub.path, 1, 1));
        });
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
  private mousePos = new Vector2(0, 0);
  private mouseClicked = false;

  mounted (): void {
    // canvas.onmousemove = (pos) => {
    //   console.log(pos);
    //   this.mousePos.x = pos.clientX;
    //   this.mousePos.y = pos.clientY;
    // };

    // TODO: Move
    this.canvas = this.$refs.canvas as unknown as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    if (!this.canvas) return;
    if (!this.ctx) return;

    // const game = new Game();

    const {
      ctx,
      canvas,
    } = this;
    if (!ctx || !canvas) return;

    let offset = 0;
    let grd = null;
    // const deck = new Deck(0, 0, canvas, ctx);

    canvas.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.offsetX;
      this.mousePos.y = e.offsetY;
    });

    canvas.addEventListener('mousedown', () => {
      this.mouseClicked = true;
    });

    canvas.addEventListener('mouseup', () => {
      this.mouseClicked = false;
    });

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

        // Create button
        const button = new Path2D();
        button.rect(150, 75, 100, 30);

        if (ctx.isPointInPath(button, this.mousePos.x, this.mousePos.y)) {
          ctx.fillStyle = 'blue';
          if (this.mouseClicked) {
            // Button clicked
            console.log('clicked button');
            ctx.fillStyle = 'green';
          }
        } else {
          ctx.fillStyle = 'red';
        }

        ctx.fill(button);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText('Button', 168, 98);
      });

      // FPS counter
      ctx.fillStyle = 'black';
      ctx.font = '14px Arial';
      ctx.fillText(this.fps.toString(), 930, 15);
      offset = 0;
    }, 60);

    // Start fps counter
    this.refreshLoop();
  }

  update (): void {
    // ...
  }

  draw (): void {
    // ...
  }

  mouseInRect (position: Vector2): boolean {
    console.log(position, this.mousePos);
    if (this.mousePos) {
      return true;
    }
    return false;
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
