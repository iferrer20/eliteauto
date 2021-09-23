<template>
  <div class="messages">
    <MessageList></MessageList>
  </div>

</template>

<script>
import MessageList from '../components/MessageList.vue';

export default {
  components: {
    MessageList
  },
  setup() {
  }
}
</script>


<style lang="scss" scoped>

.messages {
  height: calc(100vh - #{$navbar-height});
}

</style>