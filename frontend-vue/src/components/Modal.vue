<template>
  <div :class="['modal-shadow']" v-if="isOpened">
    <div class="modal">
      <component v-if="view" :is="view" @close="close"></component>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    
    const store = useStore();
    const isOpened = computed(() => store.getters['modal/isOpened']);
    const view = computed(() => store.getters['modal/getView']);
    const hidden = ref(true);
    

    return {
      isOpened,
      view,
      hidden,
      close(payload) {
        store.dispatch('modal/close', payload);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.modal-shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 19;
  background-color: rgba(0, 0, 0, 0.8);
  transition: background-color 0.2s ease-in-out;

  &.hidden {
    background-color: rgba(0, 0, 0, 0);
  }
}
.modal {
  position: absolute;
  background-color: $white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  border-radius: $border-radius;
  padding: 20px;
  min-width: 200px;
  min-height: 150px;
  box-sizing: border-box;
}

</style>