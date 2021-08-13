

<template>
  <div class="select" :class="{opened: state.opened}">
    <div class="box" @click="state.opened = !state.opened">
      <template v-if="state.selected">
        {{ state.selected }}
      </template>
      <template v-else>
        Choose a brand
      </template>
      <i></i>
    </div>
    <div class="options">
      <div v-for="option in options" :key="option" @click="onClickOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  props: ['options'],
  setup(props, ctx) {
    const state = reactive({
      opened: false,
      selected: ""
    });

    function onClickOption(option) {
      state.opened = false;
      state.selected = option;
      ctx.emit("onOption", option);
    }

    return {
      state,
      onClickOption
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

.select {
  user-select: none;
  border-radius: $border-radius;
  position: relative;
  width: 100%;
  max-width: 200px;
  background-color: $white;

  .box {
    cursor: pointer;
    border-radius: $border-radius;
    padding: 5px;
    font-weight: bold;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 15px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 5px;

    @include shadow;

    i {
      @include chevron-left;
      margin-left: auto;
      transform: rotate(-90deg);
      transition: transform 0.4s ease-in-out;
    }
  }

  .options {
    height: 0px;
    font-size: 17px;
    position: absolute;
    max-height: 200px;
    overflow: auto;
    transition: 0.3s ease-in-out;
    background-color: $white;
    border-radius: $border-radius;
    width: 100%;
    box-sizing: border-box;
    
    > div {
      border-radius: $border-radius;
      padding: 10px;
      cursor: pointer;
      margin: 10px;
      transition: background-color 0.1s ease-in-out;

      &:hover {
        background-color: rgb(197, 197, 197);
        
      }
    }

    @include scroll;

  }

  &.opened {
    .options {
      height: 200px;
      @include shadow;
    }
    .box {
      i {
        transform: rotate(90deg);
      }
    }
    .options {
      display: block;
    }
  }

  
}

</style>