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
    },
    async uploadImage(image) {
      
      let { data } = await axios.put('/admin/car/image/', image.formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function(progressEvent) {
          image.progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      });
      
      image.uploaded = true;

      return data;
    },
    async removeImage(image, id) {
      return await (await axios.delete('/admin/car/image/', { data: {id, image_sid: image.image_sid}})).data;
    },
    async getImageSid(id) {
      id = id ? id : '';
      const { image_sid } = (await axios.get('/admin/car/image/sid/' + id)).data;
      return image_sid;
    },
    async getMessages() {
      return (await axios.get('/admin/messages/')).data;
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
  },
  async sendMessage(data) {
    return (await axios.post('/message/', data)).data;
  }
}