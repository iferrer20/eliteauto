<template>
  <div class="login">
    <div class="inputs">
      <div class="error">{{ state.error }}</div>
      <input v-model="username" type="text" placeholder="usuario">
      <input v-model="password" type="password" placeholder="contraseña">
    </div>
    <button @click="login()">Acceder</button>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import api from '../api';

export default {
  setup() {
    
    const store = useStore();
    const router = useRouter();
    const isAdmin = computed(() => {
      return store.getters["user/isAdmin"];
    });
    
    const state = reactive({
      error: ''
    });

    const username = ref(null);
    const password = ref(null);

    async function login() {
      
      api.adminLogin(username.value, password.value).then(() => {
        store.dispatch("user/setAdmin");
        router.push({name: "Cars"});
      }).catch((error) => {
        if (error.response && error.response.status == 400) {
          state.error = "Usuario o contraseña incorrectos";
        }
      });
      
    }

    return {
      login,
      username,
      password,
      isAdmin,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  .error {
    color: red;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin: 50px;
  }
}
</style>