<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: Object
});

const newMessage = ref('');
const fileInput = ref();
let file;

const emit = defineEmits(['messagesent']);

function fileUpload(e) {
  file = e.target.files[0];
}

function sendMessage(e) {
  emit("messagesent", {
    user: props.user,
    message: newMessage.value,
    file: file
  });

  newMessage.value = "";
  file = null;
  fileInput.value.value = null;
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control input-xs"
      placeholder="Type your message here..."
      v-model="newMessage"
      @keyup.enter="sendMessage"
    />

    <input
      style="display:none"
      type="file"
      ref="fileInput"
      class="form-control input-sm"
      accept="image/jpeg, image/png, image/gif"
      @change="fileUpload"
    />

    <button class="btn btn-sm" @click="fileInput.click()">Pick</button>

    <button class="btn btn-primary btn-sm" @click="sendMessage">
        Send
    </button>
  </div>
</template>
