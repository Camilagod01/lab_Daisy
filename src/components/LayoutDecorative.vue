<template>
  <div class="min-h-screen flex flex-col bg-base-200">
    <!-- Top bar -->
    <TopDecorative />

    <!-- Contenedor principal: sidebar + vista -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <div class="w-64 bg-base-300 p-4">
        <SideDecorative />
      </div>

      <!-- Vista principal -->
      <div class="flex-1 overflow-auto bg-base-100 p-6 relative">
        <!-- Contenido dinámico -->
        <slot />

        <!-- Botón flotante -->
        <FloatingButton position="top-right" @click="showModal = true">
          <template #icon>
            <div class="relative w-8 h-8 text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3
                  19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </template>
        </FloatingButton>

        <!-- Modal separado -->
        <CustomModal v-model:visible="showModal">
          <template #content>
            <h3 class="font-bold text-lg">¡Gracias!</h3>
            <p class="py-2">Viva la Sele</p>
          </template>
          <template #close>
            <button class="btn btn-error" @click.prevent="showModal = false">Cerrar</button>
          </template>
        </CustomModal>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopDecorative from './TopDecorative.vue'
import SideDecorative from './SideDecorative.vue'
import FloatingButton from './FloatingButton.vue'
import CustomModal from './CustomModal.vue'

const showModal = ref(false)
</script>
