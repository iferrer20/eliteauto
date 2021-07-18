
<template>
  <div class="slider">
    <i @click="move(-1)" class="button-left"></i>
    <i @click="move(1)" class="button-right"></i>
    <div class="title">EliteAuto</div>
    <div :style="state.styling" class="imgs" ref="slider">
      <div v-for="img in state.images" :key="img"
        :style="'background-image: url(' + img + ')'"
        alt="">
        
      </div>
    </div>
  </div>
  
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core';

export default {
  setup() {
    const slider = ref(null);
    const state = reactive({
      images: [...Array(6).keys()].map((i,c) => require(`@/assets/slider-${c+1}.jpeg`)),
      styling: {}
    });
    

    let timeout;
    let direction = -1;

    function timeoutMove() {
      timeout = setTimeout(move, 2000);
    }

    function move(d=1) {
      clearTimeout(timeout);

      state.styling.transition = '0.5s transform ease-in-out';
      state.styling.transform = `translateX(-${(d+1)/state.images.length*100}%)`;
      direction = d;

      timeoutMove();
    }
    function transitionEnd() {
      if (direction == 1) {
        state.images.push(state.images[0]);
        state.images.shift();
      } else if (direction == -1) {
        state.images.unshift(state.images[state.images.length-1]);
        state.images.pop();
      }
      delete state.styling.transition;
      state.styling.transform = `translateX(-${1/state.images.length*100}%)`;
    }
    
    onMounted(() => {
      slider.value.addEventListener('transitionend', transitionEnd);
      state.styling.width = `${state.images.length*100}%`;
      transitionEnd();
      timeoutMove();
    });

    return {
      move,
      state,
      slider
    }
    
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

.slider {
  height: 100vh;
  position: relative;
  overflow-x: hidden;

  .imgs {
    height: 100%;
    display: flex;
    

    div {
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center 60%;
      background-size: cover;
      filter: brightness(30%);
    }
  }

  .title {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 50pt;
    color: white;
    font-weight: bold;
    user-select: none;
  }

  %buttons {
    position: absolute;
    color: white;
    z-index: 1;
    bottom: 50%;
    transform: scale(3);
    filter: opacity(50%);
    cursor: pointer;
    transition: 0.2s ease-in-out;
    
    &:hover {
      transform: scale(3.5);
    }
  }

  .button-left {
    @extend %chevron-left;
    @extend %buttons;
    left: 30px;
  }

  .button-right {
    @extend %chevron-right;
    @extend %buttons;
    right: 30px;
  }

}




</style>