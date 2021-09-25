<template>
  <div class="message-list">
    <Message v-for="message in messages" :key="message.id" :message="message" @onDelete="onDeleteMessage"></Message>

  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import api from '../api'
import { useStore } from 'vuex';
import AskDeleteMessage from './modals/AskDeleteMessage.vue';
import Message from './Message.vue';
export default {
  components: {
    Message
  },
  setup() {
    const messages = ref([]);
    const store = useStore();

    function getMessages() {
      api.admin.getMessages().then((msgs) => {
        messages.value = msgs.map(m => { 
          let d = new Date(m.post_date);
          m.post_date = d.getDay() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes()
          return m;
        });
      });
    }

    function onDeleteMessage(msgid) {
      store.dispatch('modal/show', {
        view: AskDeleteMessage,
        events: {
          onClose(accept) {
            if (accept) {
              api.admin.deleteMessage(msgid).then(() => {
                getMessages();
              });
            }
          }
        }
      });
    }

    getMessages();

    return {
      messages,
      onDeleteMessage
    }
  } 
}
</script>

<style lang="scss" scoped>

.message-list {
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-sizing: border-box;

  
}
</style>