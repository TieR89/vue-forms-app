<script setup lang="ts">

</script>

<template>
  <div class="dark">
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <router-link to="/" class="font-bold">Главная</router-link>
        <div>
          <router-link to="/form-a" class="mr-4">Форма A</router-link>
          <router-link to="/form-b" class="mr-4">Форма B</router-link>
          <router-link to="/result">Результаты</router-link>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
</style>
