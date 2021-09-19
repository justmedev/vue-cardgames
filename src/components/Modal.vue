<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full overlayAnim"
    v-show="actualOpen"
    ref="modal"
  >
    <div
      class="relative top-20 mx-auto p-2 border shadow-lg rounded-md bg-white anim"
      :class="smallerWidth ? 'w-80': 'w-96'"
    >
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  VModel,
  Vue, Watch,
} from 'vue-property-decorator';
import debounce from '@/utils';

@Component
export default class Modal extends Vue {
  @VModel({
    required: true,
    type: Boolean,
  }) private open!: boolean;
  @Prop({
    required: false,
    default: false,
    type: Boolean,
  }) private persistent!: boolean;
  private smallerWidth = false;
  private actualOpen = false;
  mounted (): void {
    const minSize = 850;
    this.smallerWidth = window.innerWidth < minSize;
    window.addEventListener('resize', debounce(() => {
      this.smallerWidth = window.innerWidth < minSize;
    }, 300));
    this.actualOpen = this.open;
    const modal = (this.$refs.modal as HTMLDivElement);
    window.onclick = (e: Event) => {
      if (e.target === modal && !this.persistent) {
        this.close();
      }
    };
  }
  @Watch('open')
  openStateChange (): void {
    if (!this.open) {
      this.close();
      return;
    }
    this.actualOpen = this.open;
  }
  private close () {
    const modal = (this.$refs.modal as HTMLDivElement);
    modal.classList.add('disappearAnim');
    setTimeout(() => {
      this.actualOpen = false;
      this.open = false;
      modal.classList.remove('disappearAnim');
    }, 190);
  }
}
</script>

<style scoped>
.anim {
  animation: fadeDown .3s ease-in-out;
}
.overlayAnim {
  animation: overlayFade .3s ease-in-out;
}
/*noinspection ALL*/
.disappearAnim {
  animation: disappear .2s ease-in-out;
}
@keyframes disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes overlayFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20%, 0) rotate3d(1, 0, 0, 90deg);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg);
  }
}
</style>
