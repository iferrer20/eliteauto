import axios from 'axios';

export default {

  admin: {
    async login(username, password) {
      return (await axios.post("/admin/login/", {
        username: username,
        password: password
      })).data;
    },
    async deleteCar(id) {
      return (await axios.delete(`/admin/car/${id}/`)).data;
    }
  },
  async getCars(filters) {
    return (await axios.post("/car/list", filters)).data;
  },
  async getCar(id) {
    return (await axios.get(`/car/${id}/`)).data;
  }
  
}