

export const userStore = {
  namespaced: true,
  state: {
    admin: localStorage.getItem("admin") === 'true'
  },
  mutations: {
    SETADMIN(state) {
      state.admin = true;
    }
  },
  actions: {
    setAdmin(state) {
      state.commit("SETADMIN");
    }
  },
  getters: {
    isAdmin(state) {
      return state.admin;
    }
  }
};