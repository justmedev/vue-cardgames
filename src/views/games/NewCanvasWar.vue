<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4">
      <canvas ref="canvas" height="540" width="960"></canvas>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseGameLoop, { GameLoopExit } from '@/helpers/game/baseGameLoop';
import Stack from '@/helpers/game/stack';
import Card from '@/helpers/game/card';
import { Rect, Vector2 } from '@/helpers/game/components';
import { mouseInRectBounds } from '@/helpers/game/utils';
import BasePlayer from '@/helpers/game/basePlayer';
import BaseGame from '@/helpers/game/baseGame';

@Component
export default class CanvasWar extends Vue {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private img: HTMLImageElement | null = null;
  private backImg: {
    img: HTMLImageElement | null,
    loaded: boolean,
  } = {
    img: null,
    loaded: false,
  };
  private imgLoaded = false;
  private mouse = {
    position: new Vector2(0, 0),
    offsetPosition: new Vector2(0, 0),
    clicked: false,
  };

  mounted (): void {
    this.canvas = this.$refs.canvas as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    if (!this.canvas || !this.ctx) return;

    const {
      canvas,
      ctx,
    } = this;
    if (!canvas || !ctx) return;

    // Stack testing
    const stack = new Stack();
    console.log(stack.cardsLeft.length);
    const cardsDrawn: Card[] = stack.drawCards(2);
    console.log(stack.cardsLeft.length, cardsDrawn);

    // Load image
    this.img = new Image(1246 / 12, 1934 / 12);
    this.img.src = `/cards/${cardsDrawn[0].type}/${cardsDrawn[0].rank}.png`;
    this.img.onload = () => {
      this.imgLoaded = true;
    };

    this.backImg.img = new Image(1246 / 12, 1934 / 12);
    this.backImg.img.src = '/cards/backsides/red.png';
    this.backImg.img.onload = () => {
      this.backImg.loaded = true;
    };

    // Event listeners
    canvas.addEventListener('mousemove', (e) => {
      this.mouse.offsetPosition.x = e.offsetX;
      this.mouse.offsetPosition.y = e.offsetY;

      this.mouse.position.x = e.x;
      this.mouse.position.y = e.y;
    });

    canvas.addEventListener('mousedown', () => {
      this.mouse.clicked = true;
    });

    canvas.addEventListener('mouseup', () => {
      this.mouse.clicked = false;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === ' ') {
        stack.drawCards(5);
      } else if (e.key === 'w') {
        stack.drawCards(1);
      }
    });

    // Initialize BaseGame
    const game = new BaseGame([new BasePlayer('Robert'), new BasePlayer('Jack')], new BasePlayer('Robert'));

    // Initialize players
    const player = new BasePlayer('test');
    player.hand = cardsDrawn;
    console.log('player hand', player.hand);

    // Gotta do it like this for now;
    const card = {
      position: new Vector2(0, 0),
      dragging: false,
    };

    let stackOffset = new Vector2(0, 0);

    // Game loop
    const gameLoop = new BaseGameLoop();
    gameLoop.start();
    gameLoop.run = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = '#dedede';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fps
      ctx.fillStyle = 'black';
      ctx.font = '16px Poppins';
      ctx.textAlign = 'end';
      ctx.fillText(`${gameLoop.fps} fps`, canvas.width - 5, 17);

      if (this.imgLoaded && this.img) {
        // document.body.style.cursor = 'default';
        // if (mouseInRectBounds(this.mouse.offsetPosition, new Rect(card.position.x, card.position.y, this.img.width, this.img.height))) {
        //   document.body.style.cursor = 'pointer';
        //   card.dragging = this.mouse.clicked;
        //   if (card.dragging) {
        //     document.body.style.cursor = 'move';
        //     card.position = this.mouse.offsetPosition;
        //     if (this.mouse.offsetPosition.x - card.position.x === )
        //   }
        // }
        ctx.drawImage(this.img, card.position.x, card.position.y, this.img.width, this.img.height);
      }

      // Hover & Click test
      ctx.fillStyle = 'blue';
      if (mouseInRectBounds(this.mouse.offsetPosition, new Rect(100, 100, 100, 100))) {
        ctx.fillStyle = 'green';
        if (this.mouse.clicked) ctx.fillStyle = 'red';
      }
      ctx.fillRect(100, 100, 100, 100);

      // Draw card stack
      if (this.backImg.img && this.backImg.loaded) {
        [...Array(stack.cardsLeft.length < 12 ? stack.cardsLeft.length : 12)
          .keys()].forEach(() => {
          if (!this.backImg.img) return;
          ctx.drawImage(this.backImg.img, 200 + stackOffset.x, 200 + stackOffset.y, this.backImg.img.width, this.backImg.img.height);
          stackOffset.x -= 1;
          stackOffset.y -= 0.75;
        });
        if (mouseInRectBounds(this.mouse.offsetPosition, new Rect(200 + stackOffset.x, 200 + stackOffset.y, this.backImg.img.width, this.backImg.img.height)) && this.mouse.clicked) {
          console.log('click on stack');
        }
        stackOffset = Vector2.zero();
      }

      // Draw player hand
      player.hand.forEach((c: Card) => {
        ctx.fillStyle = 'pink';
        ctx.fillRect(300, 200, 300, 200);
      });

      // Cards left text
      ctx.fillStyle = 'black';
      ctx.font = '16px Poppins';
      ctx.textAlign = 'right';
      ctx.fillText(`${stack.cardsLeft.length} Cards left on stack`, canvas.width - 5, canvas.height - 5);
    };

    gameLoop.beforeStop = (reason: GameLoopExit) => {
      console.log(reason);
      if (reason === GameLoopExit.UNFOCUSED_WINDOW) {
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#a1a1a1';
        ctx.font = '20px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('Game paused — Window unfocused', canvas.width / 2, canvas.height / 2);
      }
    };
  }
}
</script>
