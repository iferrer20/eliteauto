
<template>
  <div :class="['filter', {'opened': opened}]">
    <template v-if="loaded">
      <Select :options="brands" placeholder="Todas" v-model="selectedBrand"/>
      <div class="open-button" @click="opened = !opened">
        <i class="icon-chevron-right"></i>
      </div>
    </template>
    <div v-else class="loader">

    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import Select from '../components/Select.vue';
import { useStore } from 'vuex';
import { computed, watch } from '@vue/runtime-core';

export default {
  components: {
    Select
  },
  setup() {

    const store = useStore();

    const opened = ref(false);
    const selectedBrand = ref('');

    const brands = computed(() => { 
      let brands = store.getters['car/getBrands']; 
      brands.unshift('Todas');
      return brands;
    });
    
    const loaded = computed(() => brands.value.length > 1);

    watch(selectedBrand, () => {
      store.dispatch('car/selectBrand', selectedBrand.value == 'Todas' ? 'all' : selectedBrand.value); 
    });

    return {
      opened,
      brands,
      loaded,
      selectedBrand
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';
 .loader {
  margin: auto;
}

.filter {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  flex-shrink: 0;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;

  .open-button {
    i {
      display: none;
    }
  }
  @include shadow;
  
@include small {

  position: absolute;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 10;

  .open-button {
    content: "";
    width: 30px;
    height: 30px;
    transform: translate(100%, -50%);
    position: absolute;
    top: 50%;
    right: 0;
    background-color: white;
    cursor: pointer;
    border-top-right-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      transition: 0.3s ease-in-out;
      display: block;
    }
  }

  &.opened {
    transform: translateX(0px);

    .open-button {
      i {
        transform: rotate(-180deg);
      }
    }
  }
  
}
  
}
</style>

<i18n>
{
  "es": {
    "all":"Todas"
  }
}
</i18n>