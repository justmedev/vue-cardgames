<template>
  <div
    class="h-24 flex flex-col md:flex-row text-sm md:text-base mt-2 justify-between items-center md:items-start text-gray-400 bg-gray-800 font-poppins p-4 bottom-0 absolute w-full">
    <div>© Cardgames 2021 - {{ currentYear }} | All rights reserved</div>
    <div>We 💜 open source</div>
    <div>Mady by Ilja Busch aka <a href="//github.com/justmedev" class="text-gray-300 underline"
                                   target="_blank">justmedev</a></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
  private currentYear = (new Date()).getFullYear();
}
</script>
