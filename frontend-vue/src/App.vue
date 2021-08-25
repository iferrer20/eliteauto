<template>
  <NavBar></NavBar>
  <Modal/>
  <router-view/>
</template>

<script>

import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}

</script>

<style lang="scss">

@import "./scss/fonts";

#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
