<template>
  <div class="relative min-h-screen">
    <div class="pb-24">
      <NavBar></NavBar>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer,
  },
})
export default class App extends Vue {}
</script>
