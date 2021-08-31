

<template>
  <div class="select" :class="{opened: opened}">
    <div class="box" @click="opened = !opened">
      <template v-if="!isEmpty">
        {{ translate ? $t(modelValue) : modelValue }}
      </template>
      <template v-else>
        {{ translate ? $t(placeholder) : placeholder }}
        <!-- {{ translate ? $t(default) : default }} -->
      </template>
      <i class="gg-chevron-left"></i>
    </div>
    <div class="options">
      <template v-for="(option, index) in options">
        <div :key="option" @click="onClickOption(option, index)" v-if="option != ''">
          {{ translate ? $t(option) : option }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core';
export default {
  props: ['options', 'placeholder', 'translate', 'modelValue'],
  setup(props, ctx) {
    const opened = ref(false);
    const isEmpty = computed(() => !props.modelValue || props.modelValue == '');

    function onClickOption(option, i) {
      opened.value = false;

      ctx.emit("update:modelValue", option);
      ctx.emit("onOption", option, i);
    }

    return {
      opened,
      onClickOption,
      isEmpty
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
  max-width: 220px;
  background-color: $white;
  margin: 5px;

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

    @include shadow;

    i {
      margin-left: auto;
      transform: rotate(-90deg);
      transition: transform 0.4s ease-in-out;
    }
  }

  .options {
    font-size: 17px;
    position: absolute;
    z-index: 2;
    max-height: 0px;
    overflow: auto;
    transition: 0.3s ease-in-out;
    background-color: $white;
    border-radius: $border-radius;
    width: 100%;
    box-sizing: border-box;
    margin-top: 5px;
    
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
      height: auto;
      max-height: 200px;
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