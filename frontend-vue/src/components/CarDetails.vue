
<template>
  <div class="details shadow" v-if="car">
    <ImageSlider :images="[...Array(car.nimgs).keys()].map((i,c) => `/img/car/${car.id}/${c+1}.jpg`)" class="image">
      
    </ImageSlider>
    
    <div class="info">
      <div>
        <span>Marca</span>
        <span>{{ car.brand }}</span>
      </div>
      <div>
        <span>Modelo</span>
        <span>{{ car.model }}</span>
      </div>
      <div>
        <span>Kilometros</span>
        <span>{{ car.km }}</span>
      </div>
      <div>
        <span>Precio</span>
        <span>{{ car.price-car.discount }}</span>
      </div>
      <div>
        <span>Potencia (cv)</span>
        <span>{{ car.horsepower }}</span>
      </div>
      <div>
        <span>Caja de cambios</span>
        <span>{{ $t(car.transmission) }}</span>
      </div>
      <div>
        <span>Motor</span>
        <span>{{ car.engine }}</span>
      </div>
      <div>
        <span>Color</span>
        <span>{{ $t(car.color) }}</span>
      </div>
    </div>
  </div>
  <div v-else class="loader">

  </div>

</template>

<script>
import ImageSlider from './ImageSlider.vue';
export default {
  components: {
    ImageSlider
  },
  props: ['car'],
  setup() {

    return {
      
    }
  } 
}

</script>

<style lang="scss" scoped>

.details {
  display: flex;
  flex-direction: column;
  border-radius: $border-radius;
  background-color: $white;
  max-width: 700px;
  width: 100%;

  .loader {
    align-self: center;
  }

  .image {
    background-color: black;
    border-radius: $border-radius 0px 0px $border-radius;

    width: 100%;
    height: 350px;
    border-radius: 5px 5px 0px 0px;
  }

  .info {
    div:not(:last-child) {
      border-bottom: 1px solid rgb(173, 173, 173);
    }
  }

  @include small {
    flex-direction: column;

    .image {
      flex: unset;
      height: 200px;

    }
    .info {
      flex: unset;
    }
  }
  .info {
    display: flex;
    flex-direction: column;

    div {
      width: 100%;

      span {
        display: inline;
        float: left;
        padding: 20px;
      }
      span:nth-child(2) {
        float: right;
      }
    }

    
  }
}
</style>