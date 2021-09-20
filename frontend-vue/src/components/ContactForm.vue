<template>
  <div class="contact">
    <h1>Contacto</h1>
    <input v-model="formData.name" type="text" placeholder="Nombre" class="name">
    <input v-model="formData.surname" type="text" placeholder="Apellidos" class="name">
    <input v-model="formData.email" type="text" placeholder="Email">
    <textarea v-model="formData.message" name="" id="" cols="30" rows="10" placeholder="Mensaje.."></textarea>
    <button @click="send">Enviar</button>
  </div>
</template>


<script>
import { reactive } from '@vue/reactivity'
import api from '../api';
import MessageSent from './modals/MessageSent.vue';
import { useStore } from 'vuex';
export default {
  props: ['car'],
  setup(props) {
    const formData = reactive({
      name: '',
      surname: '',
      email: '',
      message: '',
      car: props.car.id
    });

    const store = useStore();

    function send() {
      api.sendMessage(formData).then(() => {
        store.dispatch('modal/show', {
          view: MessageSent
        }); 
      });
    }

    return {
      formData,
      send
    }
  } 
}
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  padding: 50px;
  max-width: 700px;
  width: 100%;
  h1 {
    width: 100%;
  }
  button {
    width: 100px;
  }

  .name {
    width: calc(50% - 10px);
  }

  input {
    width: 100%;
  }
  textarea {
    width: 100%;
  }

  h1 {
    text-align: center;
  }
}
</style>