<!-- components/CustomModal.vue -->
<template>
  <dialog ref="dialogRef" class="modal" @close="emit('update:visible', false)">
    <div class="modal-box">
      <slot name="content">
        <h3 class="font-bold text-lg">Título por defecto</h3>
        <p class="py-4">Mensaje por defecto del modal.</p>
      </slot>

      <div class="modal-action">
        <form method="dialog">
          <slot name="close">
            <button class="btn" @click.prevent="emit('update:visible', false)">Cerrar</button>
          </slot>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(() => props.visible, (val) => {
  if (val) dialogRef.value?.showModal()
  else dialogRef.value?.close()
})
</script>
