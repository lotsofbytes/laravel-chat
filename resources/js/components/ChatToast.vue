<script setup>
import { onUpdated } from 'vue';

defineProps({
  toast: Object
});

onUpdated(() => {
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
});

</script>

<template>
   <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
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
