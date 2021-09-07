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

@import "@/scss/fonts";
@import '@/scss/icons';

input, button {
  background-color: $white;
  border: none;
  outline: none;
  margin: 5px;
  padding: 10px;
  font-size: 13pt;
  border-radius: $border-radius;
  @include shadow;
}

button {
  cursor: pointer;
}

button:disabled {
  color: $dark-white;
  cursor: unset;
}

input[type=number], input[type=text], input[type=password] {
  width: 200px;
}


@import '~css.gg/icons/scss/check';
input[type=checkbox]:hover {
  background-color: $dark-white;
}
input[type=checkbox] {
  appearance: none;
  width: 30px;
  height: 30px;
  background-color: $white;
  position: relative;
  cursor: pointer;
}
input[type=checkbox]:checked {
  background-color: $red;
}

input[type=checkbox]:checked::after {
  @extend .gg-check::after;
  position: absolute;
  left: 7px;
  top: 5px;
  transform: scale(1.5) rotate(45deg);
  color: white;
}


.loader {
  border: 7px solid $dark-white;
  border-radius: 50%;
  border-top: 7px solid #1d1d1d;
  width: 50px;
  height: 50px;
  animation: spin 0.5s linear infinite;
  margin: auto;
}


@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.nolinkdec {
  text-decoration: none;
  color: black;
}

#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
