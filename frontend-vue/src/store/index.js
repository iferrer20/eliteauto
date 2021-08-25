import { createStore } from 'vuex';
import { modalState } from './modal';
import { userStore } from './user';


export const store = createStore({
  modules: {
    user: userStore,
    modal: modalState
  }
});