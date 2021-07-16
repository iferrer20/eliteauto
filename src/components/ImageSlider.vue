
<template>
  <div class="slider">
    <i @click="move(-1)" class="button-left"></i>
    <i @click="move(1)" class="button-right"></i>
    <div :style="styling" class="imgs" ref="slider">
      <div v-for="index in 3" 
        :key="index" 
        :style="'background-image: url(' + require(`@/assets/slider-${index}.jpeg`) + ')'"
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
    const styling = reactive({});
    
    let pos = -1;
    let childCount = 0;
    let timeout;

    function move(d=1) {
      clearTimeout(timeout);
      pos += d;

      if (pos < 0) {
        pos = childCount-1;
      } else if (pos >= childCount) {
        pos = 0;
      }
      styling.transform = `translateX(-${pos/childCount*100}%)`;

      timeout = setTimeout(move, 2000);
    }
    
    onMounted(() => {
      childCount = slider.value.childElementCount;
      styling.width = `${childCount*100}%`;
      move();
    });

    return {
      styling,
      slider,
      move
    }
    
  }
}
</script>

<style lang="scss" scoped>

.slider {
  height: 800px;
  position: relative;

  .imgs {
    height: 100%;
    display: flex;
    transition: 0.5s ease-in-out;

    div {
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      filter: brightness(30%);
    }
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
    @extend .chevron-left;
    @extend %buttons;
    left: 30px;
  }

  .button-right {
    @extend .chevron-right;
    @extend %buttons;
    right: 30px;
  }

}




</style>