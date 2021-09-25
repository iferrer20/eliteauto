<template>
  <div class="contact">
    <h1>Contacto</h1>
    <div class="name">
      <div class="error">{{ formErrors.name }}</div>
      <input v-model="formData.name" type="text" placeholder="Nombre">
    </div>
    <div class="surname">
      <div class="error">{{ formErrors.surname }}</div>
      <input v-model="formData.surname" type="text" placeholder="Apellidos">
    </div>

    <div class="email">
      <div class="error">{{ formErrors.email }}</div>
      <input v-model="formData.email" type="text" placeholder="Email">
    </div>

    <div class="message">
      <div class="error">{{ formErrors.message }}</div>
      <textarea v-model="formData.message" name="" id="" cols="30" rows="10" placeholder="Mensaje.."></textarea>
    </div>

    <button @click="send">Enviar</button>
  </div>
</template>


<script>
import { shallowReactive } from '@vue/reactivity'
import api from '../api';
import MessageSent from './modals/MessageSent.vue';
import { useStore } from 'vuex';
export default {
  props: ['car'],
  setup(props) {
    const formData = shallowReactive({
      name: '',
      surname: '',
      email: '',
      message: '',
      car: props.car.id
    });
    let formErrors = shallowReactive({});
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/; 
    const store = useStore();

    function checkFormData() {
      let error = false;

      Object.keys(formErrors).forEach(k => delete formErrors[k]);

      if (formData.name.length == 0) {
        formErrors.name = 'Introduce tu nombre';
        error = true;
      }
      if (formData.surname.length == 0) {
        formErrors.surname = 'Introduce tus apellidos';
        error = true;
      }
      if (formData.message.length < 10) {
        formErrors.message = 'Mensaje muy corto';
        error = true;
      }

      if (!emailRegex.test(formData.email)) {
        formErrors.email = 'Email inválido';
        error = true;
      }

      return !error;
    }
    function send() {
      if (checkFormData()) {
        api.sendMessage(formData).then(() => {
          store.dispatch('modal/show', {
            view: MessageSent
          }); 
        });

        Object.keys(formData).forEach(k => formData[k] = '');
        formData.car = props.car.id;
      }
    }

    return {
      formData,
      send,
      formErrors
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

  .message {
    width: calc(100% - 10px);
    margin: 5px;
  }

  .error {
    color: red;
    height: 18px;
    font-size: 11pt;
    margin-left: 10px;
  }
  input {
    margin: 0px;
  }
  .name, .surname {
    margin: 5px;
    width: calc(50% - 10px);

  }
  .email {
    margin-right: auto;
    width: calc(100% - 10px);
    margin: 5px;
  }

  input {
    width: 100%;
  }
  textarea {
    width: 100%;
    margin: 0px;
  }

  h1 {
    text-align: center;
  }
}
</style>