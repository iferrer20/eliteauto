<template>
  <NavBar></NavBar>
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



#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}



</style>
