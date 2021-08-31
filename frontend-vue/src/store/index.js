import { createStore } from 'vuex';
import { modalStore } from './modal';
import { userStore } from './user';
import { carStore } from './car';


export const store = createStore({
  modules: {
    user: userStore,
    modal: modalStore,
    car: carStore
  }
});