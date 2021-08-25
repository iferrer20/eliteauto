import axios from 'axios';

export default {
  async adminLogin(username, password) {
    return (await axios.post("/admin/login/", {
      username: username,
      password: password
    })).data;
  },
  async getCars(filters) {
    return (await axios.post("/car/list", filters)).data;
    // return [
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco",
    //     discount: 250
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   },
    //   {
    //     id: 10,
    //     brand: "Audi",
    //     model: "Q7 3.0 TDI. SPORT",
    //     km: 1000,
    //     price: 2000,
    //     motor: 3000,
    //     potency: 272,
    //     fuel: "Diesel",
    //     year: 2016,
    //     color: "Blanco"
    //   }
    // ]


  },
  async deleteCar(id) {
    return (await axios.delete(`/car/${id}/`)).data;
  }
  
}