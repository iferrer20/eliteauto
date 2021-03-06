import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import { store } from './store';
import i18n from './i18n';

axios.defaults.baseURL = window.location.origin + "/api/";

createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(VueAxios, axios)
.mount('#app');
