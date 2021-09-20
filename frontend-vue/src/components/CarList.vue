<template>
  <div class="list">

    <CarFilter />
    <div class="list-cars">
      <template v-if="isAdmin">
        <div class="admin-menu">
          <i class="add gg-add-r nolinkdec" @click="onCreateCar"></i>
        </div>
      </template>
      <div class="cars" v-if="!loading">
        <template v-if="!noCars">
          <CarElement v-for="car in cars" :key="car.id" :car="car" @onDelete="onDeleteCar" @onEdit="onEditCar"/>
          <div class="hidden" v-for="index in 10" :key="index"></div>
        </template>
        <div class="nocars" v-else>
          No hay coches disponibles
          <i class="gg-smile-sad"></i>
        </div>
        
      </div>
      <div class="loader" v-else>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/reactivity';
import api from '../api';
import CarFilter from './CarFilter.vue';
import CarElement from './CarElement.vue';
import { computed, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import AskDeleteCarVue from './modals/AskDeleteCar.vue';
import CarEditor from './modals/CarEditor.vue';

export default {
  components: {
    CarFilter,
    CarElement
  },
  setup() {

    const loading = ref(true);
    const store = useStore();
    const isAdmin = computed(() => store.getters['user/isAdmin']);
    const cars = computed(() => store.getters['car/getCars']);
    const noCars = computed(() => cars.value.length == 0);
    const filters = computed(() => store.getters['car/getFilters']);

    // const brands = computed(() => store.getters['car/getBrands']);

    function getCars() {
      loading.value = true;
      api.getCars(filters.value).then(carList => {
        store.dispatch('car/setCars', carList);
        loading.value = false;
      });
    }
    
    function getBrands() {
      api.getBrands().then((brands) => {
        if (brands.length == 0) {
          brands.push('');
        }
        store.dispatch('car/setBrands', brands);
      });
    }

    function onCreateCar() {
      store.dispatch('modal/show', {
        view: CarEditor,
        events: {
          onSubmit(car) {
            api.admin.createCar(car).then(() => {
              store.dispatch('modal/close');
              getBrands();
              getCars();
            });
          }
        }
      });
    }

    function onEditCar(car) {
      store.dispatch('modal/show', {
        view: CarEditor,
        events: {
          onSubmit(car) {
            api.admin.updateCar(car).then(() => {
              store.dispatch('modal/close');
              getBrands();
              getCars();
            });
          }
        },
        data: car // passing car to modal
      })
    }

    function onDeleteCar(car) {
      store.dispatch('modal/show', {
        view: AskDeleteCarVue,
        events: {
          onClose(accepted) {
            if (accepted) {
              api.admin.deleteCar(car).then(() => {
                getCars();
              });
            }
          }
        }
      }); 
    }

    
    watch(filters.value, () => {
      getCars();
    });

    { // Todo
      getBrands();
      getCars();
    }


    return {
      filters,
      isAdmin,
      onDeleteCar,
      onCreateCar,
      onEditCar,
      loading,
      cars,
      noCars
    }
  }
}
</script>

<style lang="scss" scoped>

.list {
  display: flex;
  position: relative;
  height: calc(100vh - #{$navbar-height});

  .admin-menu {
    flex: 0 0 100%;
    display: flex;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 2;
    height: 80px;

    .add {
      transform: scale(2) translate(50%, 50%);
      background: rgb(0, 241, 32);
      z-index: 2;
      top: 0px;
      left: 0px;
      cursor: pointer;
    }
  }
  .list-cars {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .nocars {
      margin: auto;
      font-size: 15pt;
      user-select: none;
      font-weight: bold;
      color: $gray;
      text-align: center;
    }
    .nocars > i {
      margin: auto;
      transform: scale(2) translateY(5px);
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

}



</style>