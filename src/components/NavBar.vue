
<template>
  <div id="navbar">
    <img src="../assets/logo.png">
    <div id="navbar-menu">
      <div>Coches</div>
      <div>Contacto</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  setup() {

  },
}
</script>

<style lang="scss" scoped>

$navbar-color: rgb(24, 24, 24);
$navbar-height: 60px;

#navbar {
  background: $navbar-color;
  height: $navbar-height;
  width: 100%;
  display: flex;
  padding: 10px;
  box-sizing: border-box;

  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
  > img {
    margin-left: 20%;
  }

  #navbar-menu {
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      padding: 10px;
      color: white;
      cursor: pointer;
      user-select: none;
      font-weight: bold;
    }
  }

  img {
    border-radius: 10px;
  }
  @include small {
    > img {
      margin-left: 0px;
    }
  }
}

</style>