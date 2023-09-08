<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: Object
});

const newMessage = ref('');
const emit = defineEmits(['messagesent', 'istyping']);

function sendMessage(e) {
  if (newMessage.value === '') return;

  emit("messagesent", {
    user: props.user,
    message: newMessage.value
  });

  newMessage.value = "";
}

function isTyping(e) {
  emit("istyping", {
    user: props.user
  });
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="メッセージをタイプしてください..."
      v-model="newMessage"
      @keydown = "isTyping"
      @keydown.enter="sendMessage"
    />

    <span class="input-group-btn">
      <button class="btn btn-primary" @click="sendMessage">
        送信
      </button>
    </span>
  </div>
</template>
