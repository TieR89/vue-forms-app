// ./src/stores/result.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Типы для состояния
// interface ResultState {
//   requestId: string | null
//   classifier: string | null
// }

export const useResultStore = defineStore('result', () => {
  // Состояние
  const requestId = ref<string | null>(null)
  const classifier = ref<string | null>(null)

  // Action для обновления
  const setResult = (data: { requestId: string; classifier: string }) => {
    requestId.value = data.requestId
    classifier.value = data.classifier
  }

  // Action для очистки (опционально, для повторных отправок)
  const clearResult = () => {
    requestId.value = null
    classifier.value = null
  }

  return { requestId, classifier, setResult, clearResult }
})
