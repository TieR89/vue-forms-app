<script setup lang="ts">
import { computed } from 'vue'
import { useResultStore } from '@/stores/result'

const store = useResultStore()

// Computed для данных (если null, не отображаем)
const hasResult = computed(() => store.requestId && store.classifier)
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Результаты</h2>

      <div v-if="hasResult" class="mb-4">
        <p class="text-lg"><strong>Request ID:</strong> {{ store.requestId }}</p>
        <p class="text-lg"><strong>Classifier:</strong> {{ store.classifier }}</p>
      </div>

      <div v-else class="text-center text-gray-400">
        <p>Нет результатов. Отправьте форму для получения данных.</p>
      </div>

      <router-link to="/" class="block text-center mt-4 text-blue-400 hover:text-blue-500"
        >Вернуться на главную</router-link
      >
    </div>
  </div>
</template>

<style scoped></style>
