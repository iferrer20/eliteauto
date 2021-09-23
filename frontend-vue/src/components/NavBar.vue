
<template>
  <div :class="['navbar', {'opacity': route.name == 'Home'}]">
    <router-link :to="{ name: 'Home'}" class="logo"><img src="/img/logo.png"></router-link>
    <div class="navbar-menu">
      <router-link :to="{ name: 'Cars' }">
        <div :class="{'selected': route.name == 'Cars'}">Coches</div>
      </router-link>
      <div :class="{'selected': route.name == 'Contact'}">Contacto</div>
      <router-link :to="{ name: 'Messages' }" v-if="isAdmin">
        <div :class="{'selected': route.name == 'Messages'}"><i class="gg-bell"></i></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    const route = useRoute();
    const isAdmin = computed(() => store.getters["user/isAdmin"]);

    return {
      route,
      isAdmin
    }
  }
}
</script>

<style lang="scss" scoped>

$navbar-color: rgb(0, 0, 0);
$navbar-color-opacity: rgba($navbar-color, 0.2);

.navbar {
  overflow-x: hidden;
  background: $navbar-color;
  height: $navbar-height;
  width: 100%;
  
  display: flex;
  padding: 15px;
  box-sizing: border-box;
  position: sticky;
  z-index: 5;
  top: 0px;
  transition: background-color 0.2s ease-in-out;

  &.opacity {
    background-color: $navbar-color-opacity;
    position: absolute;
  }

  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
  .logo {
    margin-left: 20%;
    height: 100%;

    > img {
      height: 100%;
    }
  }
  a {
    text-decoration: none;
  }

  .navbar-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      height: 100%;
    }

    div {
      font-size: 14pt;
      color: white;
      cursor: pointer;
      user-select: none;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease-in-out;
      border-radius: $border-radius;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 20px;
      padding-right: 20px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.349);
      }
      &.selected {
        background-color: rgba(255, 255, 255, 0.349);
      }
    }
  }

  img {
    border-radius: $border-radius;
  }

@include small {

  justify-content: space-around;
  > img {
    margin-left: 0px;
  }
  > * {
    margin-left: 0px;
    margin-right: 0px;
  }

  .logo {
    margin-left: 0px;
  }

  .navbar-menu {
    div {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}

}


</style>