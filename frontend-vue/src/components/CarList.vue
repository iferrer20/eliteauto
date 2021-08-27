
<template>
  <div class="list">
    <Modal />
    <CarFilter :filters="filters"/>
    <div class="cars">
      <template v-if="isAdmin">
        <div class="admin-menu">
          <i class="add icon-add"></i>
        </div>
      </template>
      <CarElement v-for="(car, index) in state.cars" :key="index" :car="car" @onDelete="onDeleteCar"/>
      <div class="hidden" v-for="index in 10" :key="index"></div>
    </div>
    
  </div>
</template>
<script>
import { reactive } from '@vue/reactivity';
import api from '../api';
import CarFilter from './CarFilter.vue';
import CarElement from './CarElement.vue';
import Modal from './Modal.vue';
import { computed, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import AskDeleteCarVue from './modals/AskDeleteCar.vue';

export default {
  components: {
    CarFilter,
    CarElement,
    Modal
  },
  setup() {
    const state = reactive({
      cars: {},
      modalDisplayed: true
    });
    const store = useStore();
    const isAdmin = computed(() => store.getters['user/isAdmin']);

    let filters = reactive({
      brand: "all"
    });

    function getCars() {
      api.getCars(filters).then(cars => {
        state.cars = {};
        cars.map(car => {
          state.cars[car.id] = car;
        });
      });
    }

    function onDeleteCar(id) {
      store.dispatch('modal/show', {
        view: AskDeleteCarVue,
        callback(accepted) {
          if (accepted) {
            api.admin.deleteCar(id).then(() => {
              delete state.cars[id];
            });
          }
        }
      }); 
    }
    
    watch(filters, () => {
      getCars();
    });

    getCars();
    

    return {
      state,
      filters,
      isAdmin,
      onDeleteCar
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

.list {
  display: flex;
  position: relative;
  height: calc(100vh - #{$navbar-height});

  .admin-menu {
    flex: 0 0 100%;
    top: 0px;
    left: 0px;
    position: sticky;
    z-index: 5;

    .add {
      transform: scale(2) translate(50%, 50%);
      background: rgb(0, 241, 32);
      z-index: 2;
      top: 0px;
      left: 0px;
      cursor: pointer;
    }
  }
  
  .cars {
    display: flex;
    position: relative;
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