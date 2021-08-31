import { shallowRef } from "@vue/reactivity";

export const modalStore = {
  namespaced: true,
  state: {
    opened: false,
    view: null,
    events: {},
    data: {}
  },
  mutations: {
    SETOPENED(state, value) {
      state.opened = value;
    },
    SETVIEW(state, view) {
      state.view = view;
    },
    SETEVENTS(state, events) {
      state.events = events;
    },
    SETDATA(state, data) {
      state.data = data;
    }
  },
  actions: {
    setOpened(state, value) {
      state.commit("SETOPENED", value);
    },
    setView(state, view) {
      state.commit("SETVIEW", shallowRef(view));
    },
    setEvents(state, events) {
      state.commit("SETEVENTS", events);
    },
    setData(state, data) {
      state.commit("SETDATA", data);
    },
    show(state, {view, events, data}) {
      state.dispatch("setOpened", true);
      state.dispatch("setView", view);
      state.dispatch("setEvents", events);
      state.dispatch("setData", data);
    },
    close(state) {
      state.dispatch("setOpened", false);
    }
  },
  getters: {
    isOpened(state) {
      return state.opened;
    },
    getView(state) {
      return state.view;
    },
    getEvents(state) {
      return state.events;
    },
    getData(state) {
      return state.data;
    }
  }
};