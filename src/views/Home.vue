<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4">
      Hello
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/game/Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Home extends Vue {
  private cardTypes = ['ace diamonds'];

  mounted (): void {
    console.log(this.cardTypes[0]);
  }
}
</script>
