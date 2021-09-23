<template>
  <div>
    <div>Estas seguro de que desea eliminar este mensaje?</div>
    <div class="buttons">
      <button @click="accept">Aceptar</button>
      <button @click="close">Cerrar</button>
    </div>
  </div>
</template>


<script>
export default {
  setup(props, ctx) {
    return {
      close() {
        ctx.emit('close', false);
      },
      accept() {
        ctx.emit('close', true);
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.buttons {
  display: flex;
  justify-content: center;
}
</style>