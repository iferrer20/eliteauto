<template>
  <div class="message" :class="['message', {cursor: !opened}, {seen: message.seen}]" @click="opened = true">
    <div><b>Nombre: </b>{{ message.name }} <span class="surname"><b>Apellidos: </b>{{ message.surname }} </span><span class="date"><b>{{ message.post_date }}</b><i @click="onDelete(message.id)" class="gg-trash"></i></span></div>
    <div class="message-content" v-if="opened">
      <router-link v-if="message.carid" :to="{name: 'Car', params: {id: message.carid}}" target="_blank">
        <div class="car-image" :style="`background-image: url(/img/car/${message.carid}/1.jpg)`"></div>
      </router-link>
      <div><span>Correo: </span> {{ message.email }}</div>
      <span>Mensaje: </span>
      <div>
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { shallowRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';
import api from '../api';

export default {
  props: ['message'],
  setup(props, ctx) {
    const opened = shallowRef(false); 
    watch(opened, () => {
      if (opened) {
        api.admin.setSeenMessage(props.message.id);
      }
    });

    function onDelete() {
      ctx.emit('onDelete', props.message.id);
    }

    return {
      opened,
      onDelete
    }
  },
}
</script>

<style lang="scss" scoped>
.message {
  background-color: $white;
  border-radius: $border-radius;
  padding: 15px;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;

  &.seen {
    background-color: $dark-white;
  }

  .message-content {
    flex-direction: column;
  }

  .gg-trash {
    display: inline-block;
    margin-left: 10px;
    vertical-align: top;
    cursor: pointer;
  }

  &.cursor {
    cursor: pointer;
  }

  .date {
    float: right;
  }

  .car-image {
    width: 300px;
    height: 300px;
    background-size: cover;
    display: inline-block;
  }

  b {
    user-select: none
  }

  @include shadow;
}
</style>