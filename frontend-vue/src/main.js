import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import { store } from './store';

axios.defaults.baseURL = "http://localhost/api/";

createApp(App).use(store).use(router).use(VueAxios, axios).use(store).mount('#app');
