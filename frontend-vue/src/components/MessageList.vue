<template>
  <div class="message-list">
    <div :class="['message', {cursor: !message.opened}]" v-for="message in messages" :key="message.id" @click="message.opened = true">
      <div><b>Nombre: </b>{{ message.name }} <span class="surname"><b>Apellidos: </b>{{ message.surname }} </span><span class="date"><b>{{ message.post_date }}</b><i @click="deleteMessage(message.id)" class="gg-trash"></i></span></div>
      <div v-if="message.opened">
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
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import api from '../api'
import { useStore } from 'vuex';
import AskDeleteMessage from './modals/AskDeleteMessage.vue';
export default {
  setup() {
    const messages = ref([]);
    const store = useStore();

    api.admin.getMessages().then((msgs) => {
      messages.value = msgs.map(m => { 
        let d = new Date(m.post_date);
        m.post_date = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
        return m;
      });
    });

    function deleteMessage(msgid) {
      store.dispatch('modal/show', {
        view: AskDeleteMessage,
        events: {
          onClose(accept) {
            if (accept) {
            }
          }
        }
      });
    }

    return {
      messages,
      deleteMessage
    }
  } 
}
</script>

<style lang="scss" scoped>

.message-list {
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;

  .message {
    width: fit-content;
    background-color: $white;
    border-radius: $border-radius;
    padding: 15px;
    box-sizing: border-box;

    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

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
}
</style>