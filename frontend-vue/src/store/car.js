
export const carStore = {
  namespaced: true,
  state: {
    cars: [],
    filters: {brand: 'all'},
    brands: []
  },
  mutations: {
    SETCARS(state, value) {
      state.cars = value;
    },
    SETBRAND(state, value) {
      state.filters.brand = value;
    },
    SETBRANDS(state, value) {
      state.brands = value;
    }
  },
  actions: {
    setCars(state, value) {
      state.commit("SETCARS", value);
    },
    selectBrand(state, value) {
      state.commit("SETBRAND", value);
    },
    setBrands(state, brands) {
      state.commit("SETBRANDS", brands);
    }
  },
  getters: {
    getCars(state) {
      return state.cars;
    },
    getBrands(state) {
      return state.brands;
    },
    getFilters(state) {
      return state.filters;
    }
  }
};