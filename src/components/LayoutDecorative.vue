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
            <div class="relative w-8 h-8 text-black-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
              class="lucide lucide-badge-plus-icon lucide-badge-plus"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 
              0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
              <line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            </div>
          </template>
        </FloatingButton>

        <!-- Modal separado -->
        <CustomModal v-model:visible="showModal">
          <template #content>
            <h3 class="font-bold text-lg">¡Añadir Proyecto!</h3>
            <p class="py-2">Presione ESC si desea salir</p>
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
