<template>
  <div class="sent">Mensaje enviado
    <div class="buttons">
      <button @click="accept">Aceptar</button>
    </div>
  </div>
</template>


<script>
export default {
  setup(props, ctx) {


    return {
      accept() {
        ctx.emit('close', true);
      }
    }
  } 
}
</script>


<style lang="scss" scoped>
.sent {
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>