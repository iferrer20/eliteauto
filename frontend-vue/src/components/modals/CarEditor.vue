<template>
  <div class="editor">
    

    <table>
      <tbody>
        <tr>
          <td>Marca: </td>
          <td><Select :options="brands" placeholder="Marca" v-model="car.brand"/></td>
        </tr>
        <tr>
          <td>Modelo: </td>
          <td><input type="text" placeholder="Modelo" v-model="car.model"></td>
        </tr>
        <tr>
          <td>KM: </td>
          <td><input type="number" placeholder="KM" v-model.number="car.km"></td>
        </tr>
        <tr>
          <td>Precio:</td>
          <td><input type="number" placeholder="Precio" v-model.number="car.price"></td>
        </tr>
        <tr>
          <td>Descuento: </td>
          <td><input type="number" placeholder="Descuento €" v-model.number="car.discount"></td>
        </tr>
        <tr>
          <td>Motor: </td>
          <td><input type="number" placeholder="Motor" v-model.number="car.engine"></td>
        </tr>
        <tr>
          <td>CV: </td>
          <td><input type="number" placeholder="CV" v-model.number="car.horsepower"></td>
        </tr>
        <tr>
          <td>Combustible: </td>
          <td>
            <Select :options="[
              'diesel',
              'gasoline',
              'electric'
            ]" placeholder="fuel" v-model="car.fuel" :translate="true"/>
          </td>
        </tr>
        <tr>
          <td>Caja de cambios: </td>
          <td><Select :options="[
            'automatic',
            'manual'
          ]" placeholder="transmission" v-model="car.transmission" :translate="true"/></td>
        </tr>
        <tr>
          <td>Color: </td>
          <td><Select :options="[
            'white',
            'black',
            'gray',
            'red',
            'yellow',
            'blue',
            'green',
            'purple',
            'orange'
          ]" placeholder="color" v-model="car.color" :translate="true" /></td>
        </tr>
        <tr>
          <td>Año: </td>
          <td><input type="number" v-model="car.year"></td>
        </tr>
        <tr>
          <td>Vendido: </td>
          <td>
            <input type="checkbox" v-model="car.sold">
          </td>
        </tr>
      </tbody>
    </table>

    <div class="images" v-if="car.image_sid">
      <input type="file" accept="image/png, image/jpeg" @change="onNewImage" ref="imageInput" hidden multiple> 
      <div class="add" @click="imageInput.click()">
        <i class="gg-image"></i>
      </div>
      <div class="image" v-for="(image, index) in images" :key="index">
        <div class="progress" v-if="!image.uploaded">
          <div>{{image.progress}}%</div>
        </div>
        <span class="close gg-close-o" @click="onRemoveImage(image, index +1)">
          
        </span>
        <div class="data" :style="`background-image: url(${image.data})`"></div>
      </div>
    </div>
    <div class="loader" v-else>

    </div>
    <div class="buttons">
      <button @click="onAccept(true)" :disabled="!enabledBtn">Aceptar</button>
      <button @click="onAccept(false)">Cancelar</button>
    </div>

  </div>
</template>


<script>
import Select from '../Select.vue';
import { reactive, ref } from '@vue/reactivity';
import { onUnmounted, watch } from '@vue/runtime-core';
import api from '../../api';
export default {
  components: {
    Select
  },
  props: ['data'],
  setup(props, ctx) {
    const car = props.data ? reactive({...props.data}) : reactive({
      brand: '',
      model: '',
      km: '',
      price: '',
      discount: '',
      engine: '',
      horsepower: '',
      fuel: '',
      transmission: '',
      color: '',
      year: 2021,
      sold: false
    });

    const enabledBtn = ref(false);
    const imageInput = ref(null);
    let images = ref([]);

    let imageRequestQueue = [];
    api.admin.getImageSid(car.id).then(sid => { 
      car.image_sid = sid ;
      images.value = props.data ? [...Array(props.data.nimgs).keys()].map((i,c) => ({
        data: `/img/car/${car.id}/${c+1}.jpg`,
        uploaded: true,
        image_sid: sid
      })) : [];
    });

    let uploadingImages = false;
    async function uploadImages() {
      enabledBtn.value = false;
      uploadingImages = true;
      for (let i = 0;i<100;i++) {
        try {
          if (imageRequestQueue.length == 0) {
            break;
          }

          await api.admin.uploadImage(imageRequestQueue[0], car.image_sid);
          imageRequestQueue.shift();
          
        } catch(e) {
          continue;
        }
        
      }
      
      uploadingImages = false;
      verifyCar();
    }

    onUnmounted(() => {
      imageRequestQueue = [];

    });


    function verifyCar() {
      if (uploadingImages) {
        enabledBtn.value = false;
        return;
      }
      if (images.value.length == 0) {
        enabledBtn.value = false;
        return;
      }

      let entries = Object.entries(car);
      enabledBtn.value = true;

      for (const entry of entries) {
        if (entry[1] === '') {
          enabledBtn.value = false;
          break;
        }
      }
    }
    watch(car, () => verifyCar());

    const brands = [
      "Audi",
      "BMW",
      "Buick",
      "Cadillac",
      "Chevrolet",
      "Chrysler",
      "Dodge",
      "Ferrari",
      "Ford",
      "GM",
      "GEM",
      "GMC",
      "Honda",
      "Hummer",
      "Hyundai",
      "Infiniti",
      "Isuzu",
      "Jaguar",
      "Jeep",
      "Kia",
      "Lamborghini",
      "Lexus",
      "Lincoln",
      "Lotus",
      "Mazda",
      "Mercedes Benz",
      "Mercury",
      "Mitsubishi",
      "Nissan",
      "Oldsmobile",
      "Peugeot",
      "Pontiac",
      "Porsche",
      "Regal",
      "Saab",
      "Saturn",
      "Subaru",
      "Suzuki",
      "Toyota",
      "Volkswagen",
      "Volvo"
    ];

    function onNewImage() {
      
      imageInput.value.files.forEach(imageFile => {
        let formData = new FormData();
        formData.append("image", imageFile);
        formData.append("image_sid", car.image_sid);
        let image = {progress: ref(0), formData, uploaded: false, image_sid: car.image_sid};

        let fr = new FileReader();
        fr.readAsDataURL(imageFile);

        imageRequestQueue.push(image);
        
        fr.onload = (frResult) => {
          let imageData = frResult.currentTarget.result;
          if (imageData) {
            image.data = imageData;
            images.value.push(image);
          }
        }
      });

      if (!uploadingImages) {
        uploadImages();
      }
    }
    function onRemoveImage(image, id) {
      if (image.uploaded) {
        api.admin.removeImage(image, id).then(() => {
          images.value.splice(id-1, 1);
        });
      }
    }

    function onAccept(c) {
      if (!c) {
        ctx.emit('close');
        return;
      }

      ctx.emit('event', 'onSubmit', car);
    }

    

    return {
      onAccept,
      brands,
      car,
      imageInput,
      onNewImage,
      onRemoveImage,
      enabledBtn,
      images
    }
  }
}
</script>

<style lang="scss" scoped>

.error {
  color: red;
  margin-left: 10px;
  font-size: 10pt;
}
.editor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .label {
    align-self: flex-start;
    margin-left: 10px;
  }

  .sold {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 5px 5px 5px 10px;
    font-weight: bold;
    width: 200px;

  }
  .images {
    @include scroll;
    margin: 10px;
    display: flex;
    max-width: 300px;
    overflow-x: auto;
    overflow-y: none;

    .add {
      display: flex;
      i {
        margin: auto;
        transform: scale(3);
      }
    }

    > div {
      min-width: 100px;
      min-height: 100px;
      background-color: $dark-white;
      border-radius: $border-radius;
      cursor: pointer;
      margin: 5px;
    }

    .image {
      padding: 5px;
      box-sizing: border-box;
      position: relative;

      .close {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: rgb(223, 223, 223);
        z-index: 1;
        border-radius: $border-radius;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close:hover {
        background-color: rgb(197, 197, 197);
        cursor: pointer;
      }
      
      > div {
        position: relative;
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 5px;
      }

      .progress {
        position: absolute;
        z-index: 1;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        
        > div {
          margin: auto;
          color: white;
          font-weight: bold;
        }
      }
    }
  }

  .loader-parent {
    position: absolute;
    background-color: white;
    border-radius: $border-radius;
    display: flex;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    .loader {
      margin: auto;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
  }
}

</style>