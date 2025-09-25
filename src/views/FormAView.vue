<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { required, email, inn, phone } from '@/utils/validators';

interface FormAData {
  name: string;
  email: string;
  inn: string;
  phone: string;
}

const formData = ref<FormAData>({
  name: '',
  email: '',
  inn: '',
  phone: ''
});

// Ошибки для каждого поля (для border)
const fieldErrors = ref<Record<keyof FormAData, string | null>>({
  name: null,
  email: null,
  inn: null,
  phone: null
});

// Общий список ошибок (фильтруем не-null)
const errors = computed(() => Object.values(fieldErrors.value).filter(e => e !== null) as string[]);

// Валидность формы
const isValid = computed(() => errors.value.length === 0);

// Realtime валидация: watch на formData
watch(formData, () => {
  fieldErrors.value.name = required(formData.value.name, 'Имя');
  fieldErrors.value.email = email(formData.value.email);
  fieldErrors.value.inn = inn(formData.value.inn);
  fieldErrors.value.phone = phone(formData.value.phone);
}, { deep: true });

// onSubmit (заглушка)
const onSubmit = () => {
  console.log('Submit Form A:', formData.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Форма A</h2>

      <!-- Общий список ошибок над кнопкой -->
      <ul v-if="errors.length" class="mb-4 text-red-500 list-disc pl-5">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>

      <form @submit.prevent="onSubmit">
        <!-- Имя * -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium mb-1">Имя *</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.name, 'border-gray-600': !fieldErrors.name }"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.email, 'border-gray-600': !fieldErrors.email }"
          />
        </div>

        <!-- ИНН * -->
        <div class="mb-4">
          <label for="inn" class="block text-sm font-medium mb-1">ИНН *</label>
          <input
            id="inn"
            v-model="formData.inn"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.inn, 'border-gray-600': !fieldErrors.inn }"
          />
        </div>

        <!-- Телефон * -->
        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium mb-1">Телефон *</label>
          <input
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="+7 (000) 000-00-00"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.phone, 'border-gray-600': !fieldErrors.phone }"
          />
        </div>

        <button
          type="submit"
          :disabled="!isValid"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>
