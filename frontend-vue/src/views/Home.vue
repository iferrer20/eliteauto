<template>
  <ImageSlider :images="[...Array(6).keys()].map((i,c) => require(`@/assets/slider-${c+1}.jpeg`))"></ImageSlider>
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
