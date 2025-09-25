interface ApiResponse {
  requestId?: string
  classifier?: string
  error?: string
}

// Тип для data (общий для форм)
type FormData = Record<string, string>

// Имитация отправки (fetch-like с setTimeout)
export const submitForm = async (
  path: '/form/a' | '/form/b',
  data: FormData,
): Promise<ApiResponse> => {
  // Используем data (симуляция логирования на сервере)
  console.log(`Submitting data to ${path}:`, data)

  return new Promise((resolve) => {
    setTimeout(() => {
      // Симулируем 80% success, 20% error
      if (Math.random() < 0.8) {
        // Используем path для вариации response
        const classifier = path === '/form/a' ? 'classifier-a' : 'classifier-b'
        resolve({
          requestId: '12345', // Фиксировано для теста; можно randomize
          classifier,
        })
      } else {
        resolve({ error: 'Сообщение об ошибке (симуляция)' })
      }
    }, 1000) // Задержка 1 сек
  })
}
