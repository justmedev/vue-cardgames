<template>
  <div class="mx-3">
    <div class="max-w-4xl m-auto my-3 p-4 flex flex-row wh">
      <div class="flex flex-col">
        <Card card-type="diamonds king"></Card>
        <Card card-type="clubs ace"></Card>
        <Card card-type="spades two"></Card>
      </div>
      <div class="flex flex-col">
        <Card card-type="diamonds king"></Card>
        <Card card-type="clubs ace"></Card>
        <Card card-type="spades two"></Card>
      </div>
      <div class="flex flex-col">
        <Card card-type="diamonds king"></Card>
        <Card card-type="clubs ace"></Card>
        <Card card-type="spades two"></Card>
      </div>
      <div class="flex flex-col">
        <Card card-type="diamonds king"></Card>
        <Card card-type="clubs ace"></Card>
        <Card card-type="spades two"></Card>
      </div>
      <div class="flex flex-col">
        <Card card-type="diamonds king"></Card>
        <Card card-type="clubs ace"></Card>
        <Card card-type="spades two"></Card>
      </div>
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
export default class War extends Vue {
}
</script>

<style>
.wh {
  height: 820px;
  width: 820px;
}
</style>
