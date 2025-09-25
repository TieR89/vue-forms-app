// Обязательное поле
export const required = (value: string, fieldName: string): string | null => {
  return value.trim() ? null : `${fieldName} обязательно для заполнения`
}

// Email (простая проверка)
export const email = (value: string): string | null => {
  if (!value) return null // Необязательное
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value) ? null : 'Некорректный email'
}

// ИНН (физ/юр лицо: 12 цифр для физ, 10 для юр)
export const inn = (value: string): string | null => {
  if (!value) return 'ИНН обязательно'
  const digits = value.replace(/\D/g, '') // Только цифры
  if (digits.length === 10 || digits.length === 12) {
    return null
  }
  return 'ИНН должен быть 10 (юр.лицо) или 12 (физ.лицо) цифр'
}

// Телефон (+7 (000) 000-00-00)
export const phone = (value: string): string | null => {
  if (!value) return 'Телефон обязательно'
  const regex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
  return regex.test(value) ? null : 'Формат: +7 (000) 000-00-00'
}

// Дата рождения (DD.MM.YYYY, простая проверка: формат и разумные значения)
export const birthDate = (value: string): string | null => {
  if (!value) return 'Дата рождения обязательно';
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(value)) return 'Формат: DD.MM.YYYY';
  const [day, month, year] = value.split('.').map(Number);
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
    return 'Некорректная дата';
  }
  return null;
};

// Логин (мин 6 символов, только латиница, цифры, _, -)
export const login = (value: string): string | null => {
  if (!value) return 'Логин обязательно';
  const regex = /^[a-zA-Z0-9_-]{6,}$/;
  return regex.test(value) ? null : 'Минимум 6 символов, только латиница, цифры, _, -';
};
