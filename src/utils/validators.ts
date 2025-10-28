/**
 * Valida un correo electrónico
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña (mínimo 6 caracteres)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Valida que dos contraseñas sean iguales
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Valida un número de teléfono
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{7,}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Valida un nombre
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};
