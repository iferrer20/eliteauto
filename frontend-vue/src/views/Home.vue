<template>
  <div class="home">
    <ImageSlider :images="[...Array(6).keys()].map((i,c) => `/img/slider-${c+1}.jpeg`)"></ImageSlider>
  </div>
</template>

<script>
import ImageSlider from '../components/ImageSlider.vue';

export default {
  name: 'Home',
  components: {
    ImageSlider
  }
}
</script>

<style scoped>

.home {
  height: 100vh;
}

</style>
