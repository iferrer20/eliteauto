
<template>
  <div class="car">
    <CarDetails :car="car"></CarDetails>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import api from '../api';
import CarDetails from '../components/CarDetails.vue';

export default {
  components: {
    CarDetails
  },
  props: ['id'],
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const car = ref(0);

    api.getCar(id).then((c) => {
      car.value = c;
      car.value.id = id;
    });
    
    return {
      car
    }

  }
}
</script>

<style lang="scss" scoped>

.car {
  height: calc(100vh - var(--navbar-height));
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;

  @include scroll;
}

</style>