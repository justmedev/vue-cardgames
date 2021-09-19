<template>
  <div class="cardsize rounded-xl bg bg-yellow-100 flex justify-center items-center">
    <img v-if="mappedSrc" :src="mappedSrc" :alt="cardType" class="imagesize">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop({
    type: String,
    required: true,
  }) private cardType: string | undefined;
  private mappedSrc = '';
  private cardsFolder = '/cards';

  mounted (): void {
    if (!this.cardType) return;
    this.mappedSrc = `${this.cardsFolder}/${this.cardType.replace(' ', '/')}.png`;
  }
}
</script>

<style scoped>
.cardsize {
  height: calc(1924px/ 8);
  width: calc(1280px / 8);
}

.imagesize {
  height: calc(1934px / 8.4);
  width: calc(1246px / 8.4);
}
</style>
