
<template>
  <div class="car">
    <CarDetails :car="car"></CarDetails>
    <ContactForm :car="car"></ContactForm>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import api from '../api';
import CarDetails from '../components/CarDetails.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
  components: {
    CarDetails,
    ContactForm
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
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

</style>