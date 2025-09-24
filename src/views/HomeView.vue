<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">Добро пожаловать в приложение</h1>
      <p class="mb-8">Выберите форму для заполнения:</p>
      <router-link to="/form-a" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Форма A</router-link>
      <router-link to="/form-b" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Форма B</router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
