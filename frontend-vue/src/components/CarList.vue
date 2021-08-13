
<template>
  <div class="list">
    <CarFilter/>
    <div class="cars">
      <CarElement v-for="car in state.cars" :key="car.id" :car="car"/>
      <div class="hidden" v-for="index in 10" :key="index"></div>
    </div>
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity';
import api from '../api';
import CarFilter from './CarFilter.vue';
import CarElement from './CarElement.vue';

export default {
  components: {
    CarFilter,
    CarElement
  },
  setup() {
    const state = reactive({
      cars: []
    });

    api.getCars().then(cars => state.cars = cars);

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

.list {
  display: flex;
  position: relative;
  height: calc(100vh - #{$navbar-height});

  .cars {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    overflow: auto;
    justify-content: center;

    @include scroll;
  }
  .hidden {
    flex-grow: 1; 
    width: 300px; 
    margin-left: 10px;
    margin-right: 10px;
    max-width: 400px;
  }
}



</style>