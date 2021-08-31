<template>
  <div :class="['modal-shadow']" v-if="isOpened">
    <div class="modal">
      <component v-if="view" :is="view" @event="callEvent" @close="close" :data="data"></component>
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
    const data = computed(() => store.getters['modal/getData']);
    const hidden = ref(true);

    function callEvent(f, payload) {
      
      let events = store.getters["modal/getEvents"];
      if (events) {
        if (events[f]) {
          events[f](payload);
        }
      }
    }
    
    return {
      isOpened,
      view,
      hidden,
      data,
      close(payload) {
        callEvent("onClose", payload);
        store.dispatch('modal/close', payload);
      },
      callEvent
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
  display: flex;
  overflow: auto;

  .modal {
    background-color: $white;
    border-radius: $border-radius;
    padding: 20px;
    min-width: 200px;
    box-sizing: border-box;
    margin: auto;
  }

  &.hidden {
    background-color: rgba(0, 0, 0, 0);
  }
}


</style>