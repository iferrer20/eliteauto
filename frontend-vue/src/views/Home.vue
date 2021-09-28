<template>
  <div class="home">
    <div class="title">Elite <span>auto</span></div>
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

<style lang="scss" scoped>

.home {
  height: 100vh;

  .title {
    position: absolute;
    font-size: 50pt;
    z-index: 5;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 700px;
    font-weight: bold;
    user-select: none;

    span {
      color: red;
    }
  }
}

</style>
