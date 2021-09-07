
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

    setTimeout(() => {
      api.getCar(id).then((c) => {
        car.value = c;
        car.value.id = id;
      });
    }, 500);
    
    
    
    return {
      car
    }

  }
}
</script>

<style lang="scss" scoped>

.car {
  height: calc(100vh - #{$navbar-height});
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>