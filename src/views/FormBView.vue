<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { required, email, birthDate, login } from '@/utils/validators'
import { useRouter } from 'vue-router'
import { useResultStore } from '@/stores/result'
import { submitForm } from '@/services/api'

const router = useRouter()
const store = useResultStore()

// Типы для формы
interface FormBData {
  name: string
  surname: string
  patronymic: string
  birthDate: string
  login: string
  email: string
}

// Состояние формы
const formData = ref<FormBData>({
  name: '',
  surname: '',
  patronymic: '',
  birthDate: '',
  login: '',
  email: '',
})

// Ошибки для каждого поля (для border)
const fieldErrors = ref<Record<keyof FormBData, string | null>>({
  name: null,
  surname: null,
  patronymic: null,
  birthDate: null,
  login: null,
  email: null,
})

// Общий список ошибок (фильтруем не-null)
const errors = computed(
  () => Object.values(fieldErrors.value).filter((e) => e !== null) as string[],
)

// Валидность формы
const isValid = computed(() => errors.value.length === 0)

// Realtime валидация: watch на formData
watch(
  formData,
  () => {
    fieldErrors.value.name = required(formData.value.name, 'Имя')
    fieldErrors.value.surname = required(formData.value.surname, 'Фамилия')
    fieldErrors.value.patronymic = required(formData.value.patronymic, 'Отчество')
    fieldErrors.value.birthDate = birthDate(formData.value.birthDate)
    fieldErrors.value.login = login(formData.value.login)
    fieldErrors.value.email = required(formData.value.email, 'Email') || email(formData.value.email) // Обязательный + формат
  },
  { deep: true },
)

const isLoading = ref(false)
const submitError = ref<string | null>(null)

const onSubmit = async () => {
  if (!isValid.value) return
  isLoading.value = true
  submitError.value = null

  try {
    const response = await submitForm('/form/b', formData.value)
    if (response.error) {
      submitError.value = response.error
    } else {
      store.setResult({ requestId: response.requestId!, classifier: response.classifier! })
      router.push('/result')
    }
  } catch {
    submitError.value = 'Ошибка отправки'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
    <div class="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Форма B</h2>

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

        <!-- Фамилия * -->
        <div class="mb-4">
          <label for="surname" class="block text-sm font-medium mb-1">Фамилия *</label>
          <input
            id="surname"
            v-model="formData.surname"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{
              'border-red-500': fieldErrors.surname,
              'border-gray-600': !fieldErrors.surname,
            }"
          />
        </div>

        <!-- Отчество * -->
        <div class="mb-4">
          <label for="patronymic" class="block text-sm font-medium mb-1">Отчество *</label>
          <input
            id="patronymic"
            v-model="formData.patronymic"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{
              'border-red-500': fieldErrors.patronymic,
              'border-gray-600': !fieldErrors.patronymic,
            }"
          />
        </div>

        <!-- Дата рождения * -->
        <div class="mb-4">
          <label for="birthDate" class="block text-sm font-medium mb-1">Дата рождения *</label>
          <input
            id="birthDate"
            v-model="formData.birthDate"
            type="text"
            placeholder="DD.MM.YYYY"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{
              'border-red-500': fieldErrors.birthDate,
              'border-gray-600': !fieldErrors.birthDate,
            }"
          />
        </div>

        <!-- Логин * -->
        <div class="mb-4">
          <label for="login" class="block text-sm font-medium mb-1">Логин *</label>
          <input
            id="login"
            v-model="formData.login"
            type="text"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.login, 'border-gray-600': !fieldErrors.login }"
          />
        </div>

        <!-- Email * -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium mb-1">Email *</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            :class="{ 'border-red-500': fieldErrors.email, 'border-gray-600': !fieldErrors.email }"
          />
        </div>

        <p v-if="submitError" class="mt-2 text-red-500 text-center">{{ submitError }}</p>
        <button
          type="submit"
          :disabled="!isValid || isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {{ isLoading ? 'Отправка...' : 'Отправить' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
