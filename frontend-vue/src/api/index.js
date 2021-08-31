import axios from 'axios';

export default {

  admin: {
    async login(username, password) {
      return (await axios.post('/admin/login/', {
        username: username,
        password: password
      })).data;
    },
    async deleteCar({id}) {
      return (await axios.delete('/admin/car/', {data: {id: id}})).data;
    },
    async createCar(car) {
      return (await axios.put('/admin/car/', car)).data;
    },
    async updateCar(car) {
      return (await axios.post('/admin/car/', car)).data;
    }
  },
  async getCars(filters) {
    return (await axios.post('/car/list', filters)).data;
  },
  async getCar(id) {
    return (await axios.get(`/car/${id}/`)).data;
  },
  async getBrands() {
    return (await axios.get('/car/brands/')).data;
  },
  async getAllBrands() {
    return (await axios.get('/car/allbrands/')).data;
  }
}