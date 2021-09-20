<template>
  <div>
    <div class="font-poppins h-14 bg-gray-800 flex flex-row
  items-center justify-between text-gray-200 px-3 shadow-lg">
      <div class="flex-grow">
        <router-link
          class="font-bold text-lg hover:text-gray-400 transition-all cursor-pointer mr-6"
          to="/">
          Cardgames
        </router-link>

        <span v-if="!showItems">
          <span v-for="(item, i) in items" :key="i">
            <router-link class="hover:text-gray-400 transition-all cursor-pointer"
                         :to="item.to">{{ item.name }}
            </router-link>
            <span class="text-gray-600 mx-4 select-none" v-show="i !== items.length - 1">|</span>
          </span>
        </span>
      </div>
      <div class="flex-shrink">
        <div class="rounded bg-gray-700 w-10 h-10 flex justify-center items-center"
             @click="menuOpen = !menuOpen">
          <MenuIcon class="cursor-pointer" v-if="!menuOpen"></MenuIcon>
          <CloseIcon class="cursor-pointer " v-else></CloseIcon>
        </div>
      </div>
    </div>

    <Modal v-model="menuOpen">
      <div class="btn-dark w-full" :class="{ 'mb-2': items.length - 1 !== i }"
           v-for="(item, i) in items" :key="i" @click="navigateTo(item.to); menuOpen = false;">
        {{ item.name }}
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import { RawLocation } from 'vue-router';
import Modal from '@/components/Modal.vue';
import debounce from '@/utils';

@Component({
  components: {
    MenuIcon,
    CloseIcon,
    Modal,
  },
})
export default class NavBar extends Vue {
  private items = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Games',
      to: '/games',
    },
    {
      // TODO: make it actually hide
      name: 'Admin panel',
      to: '/admin',
    },
  ];
  private menuOpen = false;
  private showItems = false;

  mounted (): void {
    const minSize = 750;
    this.showItems = window.innerWidth < minSize;
    window.addEventListener('resize', debounce(() => {
      this.showItems = window.innerWidth < minSize;
    }, 300));
  }

  private navigateTo (rawLocation: RawLocation): void {
    const c = this.$route;
    const d = this.$router.match(rawLocation);
    if (d.name === c.name || d.path === c.path || d.fullPath === c.fullPath) return;
    this.$router.push(rawLocation);
  }
}
</script>
