import { shallowRef } from "@vue/reactivity";

export const modalState = {
  namespaced: true,
  state: {
    opened: false,
    view: null,
    callback: () => {}
  },
  mutations: {
    SETOPENED(state, value) {
      state.opened = value;
    },
    SETVIEW(state, view) {
      state.view = view;
    },
    SETCALLBACK(state, callback) {
      state.callback = callback;
    }
  },
  actions: {
    setOpened(state, value) {
      state.commit("SETOPENED", value);
    },
    setView(state, view) {
      state.commit("SETVIEW", shallowRef(view));
    },
    setCallback(state, callback) {
      state.commit("SETCALLBACK", callback);
    },
    show(state, {view, callback}) {
      state.dispatch("setOpened", true);
      state.dispatch("setView", view);
      state.dispatch("setCallback", callback);
    },
    close(state, payload) {
      state.dispatch("setOpened", false);
      state.getters.getCallback(payload);
    }
  },
  getters: {
    isOpened(state) {
      return state.opened;
    },
    getView(state) {
      return state.view;
    },
    getCallback(state) {
      return state.callback;
    }
  }
};