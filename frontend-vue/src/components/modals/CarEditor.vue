<template>
  <div class="editor">
    <div class="loader-parent" v-if="!brands">
      <div class="loader"></div>
    </div>
    
    <div class="error" v-if="isEmpty('brand')">Selecciona una marca</div>
    <Select :options="brands" placeholder="Marca" v-model="car.brand"/>
    <div class="error" v-if="isEmpty('model')">Introduce un modelo</div>
    <input type="text" placeholder="Modelo" v-model="car.model">
    <div class="error" v-if="isEmpty('km')">Introduce los km</div>
    <input type="number" placeholder="KM" v-model="car.km">
    <div class="error" v-if="isEmpty('brand')">Introduce el precio</div>
    <input type="number" placeholder="Precio" v-model="car.price">
    <div class="error" v-if="isEmpty('discount')">Introduce un descuento</div>
    <input type="number" placeholder="Descuento €" v-model="car.discount">
    <div class="error" v-if="isEmpty('engine')">Introduce el motor</div>
    <input type="number" placeholder="Motor" v-model="car.engine">
    <div class="error" v-if="isEmpty('horsepower')">Introduce el CV</div>
    <input type="number" placeholder="CV" v-model="car.horsepower">
    <div class="error" v-if="isEmpty('fuel')">Elige una opción</div>
    <Select :options="[
      'diesel',
      'gasoline',
      'electric'
    ]" placeholder="fuel" v-model="car.fuel" :translate="true"/>
    <div class="error" v-if="isEmpty('transmission')">Elige una opción</div>
    <Select :options="[
      'automatic',
      'manual'
    ]" placeholder="transmission" v-model="car.transmission" :translate="true"/>
    <div class="error" v-if="isEmpty('color')">Elige un color</div>
    <Select :options="[
      'white',
      'black',
      'gray',
      'red',
      'yellow',
      'blue',
      'green',
      'purple',
      'orange'
    ]" placeholder="color" v-model="car.color" :translate="true" />
    <div class="error" v-if="isEmpty('year')">Introduce el año</div>
    <input type="number" v-model="car.year">
    
    <div class="sold">
      <span>Vendido: </span>
      <input type="checkbox" v-model="car.sold">
    </div>

    <div class="images">
      <input type="file" accept="image/png, image/jpeg" @change="onImage" ref="imageInput" hidden multiple> 
      <div class="add" @click="imageInput.click()">
        <i class="gg-image"></i>
      </div>
      <div class="image" v-for="(data, index) in dataFiles" :key="index">
        <div :style="`background-image: url(${data})`"></div>
      </div>
    </div>
    

    
    
    <div class="buttons">
      <button @click="onAccpet(true)">Aceptar</button>
      <button @click="onAccpet(false)">Cancelar</button>
    </div>

  </div>
</template>


<script>
import Select from '../Select.vue';
import { reactive, ref } from '@vue/reactivity';
import axios from 'axios';
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

    const emptyFields = ref([]);
    const dataFiles = ref([]);
    const imageInput = ref(null);
    const isEmpty = e => emptyFields.value.includes(e);

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

    function onImage() {
      let formData = new FormData();
      let image = imageInput.value.files[imageInput.value.files.length-1];
      formData.append("image", image);
      axios.post('/admin/car/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      let fr = new FileReader();
      fr.readAsDataURL(image);

      fr.onload = (frResult) => {
        let imageData = frResult.currentTarget.result;
        if (imageData) {
          dataFiles.value.push(imageData);
        }
      }

    }

    function onAccpet(c) {
      
      if (!c) {
        ctx.emit('close');
        return;
      }
      

      { // verify empty fields
        emptyFields.value = [];
        let entries = Object.entries(car);
        entries.forEach(([key, value]) => {
          if (value === '') {
            emptyFields.value.push(key);
          }
        });
        if (emptyFields.value.length > 0) {
          return;
        }
      }
 
      ctx.emit('event', 'onSubmit', car);
    }

    return {
      onAccpet,
      brands,
      car,
      emptyFields,
      isEmpty,
      imageInput,
      onImage,
      dataFiles
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/scss/icons';

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
    max-width: 200px;
    overflow: auto;

    .add {
      display: flex;
      i {
        margin: auto;
        transform: scale(1.5);
      }
    }

    > div {
      min-width: 50px;
      min-height: 50px;
      max-width: 50px;
      max-height: 50px;
      background-color: $dark-white;
      border-radius: $border-radius;
      cursor: pointer;
      margin: 5px;

      > div {
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 5px;
      }
    }
    .image {
      padding: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
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