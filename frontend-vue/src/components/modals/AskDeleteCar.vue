
<template>
  <div>
    <div>Estas seguro de que desea eliminar este coche?</div>
    <button @click="accept">Aceptar</button>
    <button @click="close">Cerrar</button>
  </div>
  
</template>


<script>
export default {
  props: ['displayed'],
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