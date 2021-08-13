
<template>
  <div :class="['filter', {'opened': state.opened}]">
    <Select @onOption="onBrand" :options='[
      "",
      "Audi",
      "BMW",
      "Buick",
      "Cadillac",
      "Chevrolet",
      "Chrysler",
      "Dodge",
      "Ferrari",
      "Ford",
      "GM",
      "GEM",
      "GMC",
      "Honda",
      "Hummer",
      "Hyundai",
      "Infiniti",
      "Isuzu",
      "Jaguar",
      "Jeep",
      "Kia",
      "Lamborghini",
      "Lexus",
      "Lincoln",
      "Lotus",
      "Mazda",
      "Mercedes Benz",
      "Mercury",
      "Mitsubishi",
      "Nissan",
      "Oldsmobile",
      "Peugeot",
      "Pontiac",
      "Porsche",
      "Regal",
      "Saab",
      "Saturn",
      "Subaru",
      "Suzuki",
      "Toyota",
      "Volkswagen",
      "Volvo"
      ]'>
    </Select>
    <div class="open-button" @click="state.opened = !state.opened">
      <i></i>
    </div>
  </div>
  
</template>

<script>
import { reactive } from '@vue/reactivity';
import Select from '../components/Select.vue';

export default {
  components: {
    Select
  },
  setup() {
    
    const state = reactive({
      oepend: false
    });

    function onBrand(x) {
      console.log(x);
    }
    return {
      state,
      onBrand
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

.filter {
  width: 300px;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  flex-shrink: 0;
  background-color: white;
  position: relative;
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
      @include chevron-right;
      transition: 0.3s ease-in-out;
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
