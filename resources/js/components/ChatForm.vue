<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: Object
});

const newMessage = ref('');
const emit = defineEmits(['messagesent']);

function sendMessage() {
  emit("messagesent", {
    user: props.user,
    message: newMessage.value
  });

  newMessage.value = "";
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control input-sm"
      placeholder="Type your message here..."
      v-model="newMessage"
      @keyup.enter="sendMessage"
    />

    <span class="input-group-btn">
      <button class="btn btn-primary btn-sm" @click="sendMessage">
        Send
      </button>
    </span>
  </div>
</template>
