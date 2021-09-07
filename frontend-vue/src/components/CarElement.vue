
<template>
  <div class="car" v-once> <!-- render one time -->
    <router-link :to="{name: 'Car', params: {id: car.id}}" :class="{ disabled:  car.sold }">
      <div :class="['image', {sold: car.sold}]" :style="`background-image: url(/img/car/${car.id}/1.jpg)`">
        <div v-if="car.sold" class="sold">VENDIDO</div>
        <div v-if="hasDiscount" class="discount">{{ percentDiscount }}%</div>
      </div>
    </router-link>
    <div class="info">
      <div class="title">{{ title }}</div>

      <div class="price">
        {{ price }}€
        <span class="discount" v-if="car.discount">{{ priceNoDiscount }}€</span>
        
      </div>
      <div class="actions" v-if="isAdmin">
        <span @click="onEdit"><i class="gg-pen"></i></span>
        <span @click="onDelete"><i class="delete gg-trash"></i></span>
      </div>
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
      ctx.emit('onDelete', props.car);
    }

    function onEdit() {
      ctx.emit('onEdit', props.car);
    }

    // car.price.value = 1000;
    return {
      title,
      percentDiscount,
      hasDiscount,
      price,
      priceNoDiscount,
      isAdmin,
      onDelete,
      onEdit
    }
  }
}
</script>

<style lang="scss" scoped>

.car {
  background-color: $white;
  min-width: 250px;
  width: 300px;
  max-width: 400px;
  margin: 10px;
  height: fit-content;
  border-radius: $border-radius;
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  a.disabled {
    pointer-events: none;
  }

  .image {
    height: 200px;
    background-color: black;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    border-top-right-radius: $border-radius;
    border-top-left-radius: $border-radius;
    position: relative;
    overflow: hidden;

    

    &::after {
      content: "";
      background: inherit;
      position: absolute;
      background-size: cover;
      transform-origin: center;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transition: transform .3s ease-in-out;
    }
    &.sold::after {
      filter: brightness(0.5);
    }

    &:not(.sold):hover {
      &::after {
        transform: scale(1.1);
      }
    }

    .discount {
      z-index: 2;
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

    .sold {
      color: red;
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 25pt;
      font-weight: bold;
      border: 5px solid red;
      border-radius: $border-radius;
      padding: 10px;
      width: 50%;
      text-align: center;
      user-select: none;
      
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
    .actions > span {
      cursor: pointer;
      margin-left: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .actions {
      margin-left: auto;
      display: flex;
    }
  }

  @include shadow;
}

</style>