<script setup>
import { onMounted, onUpdated, ref } from "vue";

const props = defineProps(['visible','question']);
const emit = defineEmits(['confirmed']);

let modalRef = ref(null);
let modal = null;

onMounted(() => {
  modal = new bootstrap.Modal(modalRef.value);
  if (props.visible) {
    modal.show();
  }
})

onUpdated(() => {
  if (! props.visible) {
    modal.hide();
  }
})

</script>

<template>
  <div class="modal" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <p>{{ question }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="emit('confirmed')">はい</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">いいえ</button>
        </div>
      </div>
    </div>
  </div>
</template>
