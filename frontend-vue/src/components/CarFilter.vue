
<template>
  <div :class="['filter', {'opened': opened}]">
    <template v-if="loaded">
      <b>Marca</b>
      <Select :options="brands" placeholder="Todas" v-model="selectedBrand" />
      <b>Precio</b>
      <RangeSelector :min="0" :max="20000" v-model:radio1="minPrice" v-model:radio2="maxPrice" @onapply="onApplyPrice"/>
      <div class="prices">
        <span>{{ minPrice }}</span>
        <span>{{ maxPrice }}</span>
      </div>
      <div class="open-button" @click="opened = !opened">
        <i class="gg-chevron-right"></i>
      </div>
    </template>
    <div v-else class="loader">

    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import Select from './Select.vue';
import RangeSelector from './RangeSelector.vue';
import { useStore } from 'vuex';
import { computed, watch } from '@vue/runtime-core';

export default {
  components: {
    Select,
    RangeSelector
  },
  setup() {

    const store = useStore();

    const opened = ref(false);
    const selectedBrand = ref('');
    const minPrice = ref(0);
    const maxPrice = ref(20000);

    const brands = computed(() => { 
      let brands = store.getters['car/getBrands']; 
      brands.unshift('Todas');
      return brands;
    });
    
    const loaded = computed(() => brands.value.length > 1);

    watch(selectedBrand, () => {
      store.dispatch('car/selectBrand', selectedBrand.value == 'Todas' ? 'all' : selectedBrand.value); 
    });

    function onApplyPrice() {
      store.dispatch('car/setPriceRange', {minPrice: minPrice.value, maxPrice: maxPrice.value});
    }

    return {
      opened,
      brands,
      loaded,
      selectedBrand,
      minPrice,
      maxPrice,
      onApplyPrice
    }
  }
}
</script>

<style lang="scss" scoped>

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
  align-items: center;

  .prices {
    font-weight: bold;
    width: 220px;
    span:nth-child(2) {
      float: right;
    }
    user-select: none;
  }

  b {
    align-self: flex-start;
    margin-left: 30px;
    margin: 20px;
  }

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