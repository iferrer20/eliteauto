
export const carStore = {
  namespaced: true,
  state: {
    cars: [],
    filters: {brand: 'all', minPrice: 0, maxPrice: 20000},
    brands: []
  },
  mutations: {
    SETCARS(state, value) {
      state.cars = value;
    },
    SETBRAND(state, value) {
      state.filters.brand = value;
    },
    SETPRICES(state, value) {
      state.filters.minPrice = value.minPrice;
      state.filters.maxPrice = value.maxPrice;
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
    setPriceRange(state, value) {
      state.commit("SETPRICES", value);
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