<template>
    <div :class="positionClasses" class="fixed z-50 transition-all duration-300">
         <button class="btn btn-accent btn-circle shadow-lg" @click="visible = true">
            <!-- Si se proporciona un icono por slot, lo usa; si no, usa el por defecto -->
            <slot name="icon">
                <!-- Ícono por defecto: símbolo de suma dentro de un círculo -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="11.5" stroke="currentColor" stroke-width="1" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v8m-4-4h8" />
                </svg>
            </slot>
        </button>


    <!-- Modal insertado desde la vista -->
    <slot name="modal" :visible="visible" :updateVisible="(val) => (visible = val)" />
  </div>
</template>
 

<script setup lang="ts">
import { ref, computed} from 'vue'


const visible = ref(false)


const props = defineProps<{
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}>()


const positionClasses = computed(() => {
    switch (props.position) {
        case 'top-left': return 'top-6 left-6'
        case 'top-right': return 'top-6 right-6'
        case 'bottom-left': return 'bottom-6 left-6'
        case 'bottom-right':
        default: return 'bottom-6 right-6'
    }
})
</script>