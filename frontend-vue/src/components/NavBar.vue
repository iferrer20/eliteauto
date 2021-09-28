
<template>
  <div :class="['navbar', {'opacity': route.name == 'Home'}]">
    <router-link :to="{ name: 'Home'}" class="logo"><img src="/img/logo.png"></router-link>
    <div class="navbar-menu">
      <router-link :to="{ name: 'Cars' }">
        <div :class="{'selected': route.name == 'Cars'}">Coches</div>
      </router-link>
      <router-link :to="{ name: 'Contact' }">
        <div :class="{'selected': route.name == 'Contact'}">Contacto</div>
      </router-link>

      <router-link :to="{ name: 'Messages' }" v-if="isAdmin">
        <div :class="{'selected': route.name == 'Messages'}"><i class="gg-bell"></i></div>
      </router-link>
    </div>
    <div class="company-info">
      <table>
        <tbody>
          <tr>
            <td>
              <div class="phone"><i class="gg-phone"></i> <span>633024602</span></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="location"><i class="gg-pin"></i> <span>Cita. N-340 a Llosa de Ranes (Xativa) 46800</span></div>
            </td>
          </tr>
        </tbody>
      </table>
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
  height: var(--navbar-height);
  width: 100%;
  justify-content: space-around;
  
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  position: sticky;
  z-index: 5;
  top: 0px;
  transition: background-color 0.2s ease-in-out;

  div, img, a {
    max-height: 50px;
  }

  .company-info {
    margin-right: 50px;
    min-width: 200px;
    height: 100%;
    color: white;

    table {
    }
    tr {
      margin: 50px;
    }

    i {
      transform: scale(0.8);
    }

    div {
      display: flex;
      align-items: center;
      i {
        display: inline-block;
      }
      span {
        margin-left: 10px;
      }

    }

    .location {
      i {
        transform: scale(0.8) rotate(45deg);
      }
    }

  }

  &.opacity {
    background-color: $navbar-color-opacity;
    position: absolute;
  }

  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
  .logo {
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
  flex-wrap: wrap;

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