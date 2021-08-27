
<template>
  <div :class="['details', {'shadow': car}]">
    <template v-if="car">
      <div class="image">
        
      </div>
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
    </template>
    <div v-else class="loader">

    </div>
  </div>
</template>

<script>

export default {
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
  width: 800px;
  justify-content: center;
  border-radius: $border-radius;
  background-color: $white;

  .loader {
    
  }

  .image {
    background-color: black;
    border-radius: 5px 0px 0px 5px;
  }
  .image, .info {
    flex: 50%;
    
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