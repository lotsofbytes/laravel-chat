<script setup>
import { onUpdated, ref } from 'vue';

defineProps({
  toast: Object
});

let toastRef = ref(null);

onUpdated(() => {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastRef.value);
  toastBootstrap.show();
});

</script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div ref=toastRef class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">{{ toast.name }}さんへのお知らせ！</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>
