
<template>
  <div class="car">
    <router-link :to="{name: 'Car', params: {id: car.id}}">
      <div class="image">
        <div v-if="hasDiscount" class="discount">{{ percentDiscount }}%</div>
      </div>
    </router-link>
    <div class="info">
      <div class="title">{{ title }}</div>

      <div class="price">
        {{ price }}€
        <span class="discount" v-if="car.discount">{{ priceNoDiscount }}€</span>
        
      </div>
      <span class="delete icon-trash" v-if="isAdmin" @click="onDelete"></span>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex';
export default {
  props: ['car'],
  setup(props, ctx) {
    const title = computed(() => `${props.car.brand} ${props.car.model}`);
    const percentDiscount = computed(() => parseInt((props.car.price - props.car.discount)/props.car.price*100-100));
    const hasDiscount = computed(() => props.car.discount > 0);
    const price = computed(() => {
      return (props.car.price - (props.car.discount ? props.car.discount : 0)).toLocaleString();
    });
    const store = useStore();
    const priceNoDiscount = computed(() => props.car.price.toLocaleString());
    const isAdmin = computed(() => store.getters["user/isAdmin"]);
    
    function onDelete() {
      ctx.emit('onDelete', props.car.id);
    }

    // car.price.value = 1000;
    return {
      title,
      percentDiscount,
      hasDiscount,
      price,
      priceNoDiscount,
      isAdmin,
      onDelete
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

.car {
  background-color: $white;
  min-width: 250px;
  width: 300px;
  max-width: 400px;
  margin: 10px;
  border-radius: $border-radius;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;

  .image {
    height: 200px;
    background-color: black;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;

    .discount {
      position: absolute;
      top: 20px;
      left: 20px;
      font-size: 11pt;
      pointer-events: none;
      user-select: none;
      background-color: rgb(248, 0, 0);
      border-radius: $border-radius;
      font-weight: bold;
      padding: 5px;
      color: white;
    }

  }

  .info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 80px;
    flex-grow: 1;

    .title {
      font-weight: bold;
    }
    .price {
      font-size: 15pt;
      font-weight: bold;
      color: rgb(255, 0, 0);
      margin-top: auto;

      .discount {
        font-size: 13pt;
        color: rgb(146, 146, 146);
        font-weight: normal;
        text-decoration: line-through;
      }

      
    }
    .delete {
      margin-left: auto;
      cursor: pointer;
    }
  }

  @include shadow;
}

</style>