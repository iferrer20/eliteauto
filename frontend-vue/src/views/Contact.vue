<template>
  <div class="contact-box">
    <ContactForm :car="{id: null}"></ContactForm>
  </div>

</template>


<script lang="ts">
import ContactForm from '../components/ContactForm.vue';

export default {
  components: {
    ContactForm
  },
  setup() {
    
  },
}
</script>


<style lang="scss" scoped>
.contact-box {
  height: calc(100vh - var(--navbar-height));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>