import Swal from 'sweetalert2';

/**
 * Notificación de éxito
 */
export const showSuccessAlert = (
  title: string = '¡Éxito!',
  message?: string
) => {
  return Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#4f46e5', // Indigo-600
    confirmButtonText: 'Aceptar',
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

/**
 * Notificación de error
 */
export const showErrorAlert = (
  title: string = '¡Error!',
  message?: string
) => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#ef4444', // Red-500
    confirmButtonText: 'Aceptar',
  });
};

/**
 * Notificación de advertencia
 */
export const showWarningAlert = (
  title: string = '¡Advertencia!',
  message?: string
) => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: '#f97316', // Orange-500
    confirmButtonText: 'Aceptar',
  });
};

/**
 * Notificación de información
 */
export const showInfoAlert = (
  title: string = 'Información',
  message?: string
) => {
  return Swal.fire({
    icon: 'info',
    title,
    text: message,
    confirmButtonColor: '#4f46e5', // Indigo-600
    confirmButtonText: 'Aceptar',
  });
};

/**
 * Confirmación de acción
 */
export const showConfirmAlert = (
  title: string = '¿Estás seguro?',
  message?: string,
  confirmButtonText: string = 'Sí, continuar'
): Promise<boolean> => {
  return Swal.fire({
    icon: 'question',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5', // Indigo-600
    cancelButtonColor: '#6b7280', // Gray-500
    confirmButtonText,
    cancelButtonText: 'Cancelar',
  }).then((result) => result.isConfirmed);
};

/**
 * Diálogo de entrada de texto
 */
export const showPromptAlert = (
  title: string = 'Ingresa un valor',
  message?: string
): Promise<string | null> => {
  return Swal.fire({
    title,
    text: message,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      placeholder: 'Escribe aquí...',
    },
    showCancelButton: true,
    confirmButtonColor: '#4f46e5', // Indigo-600
    cancelButtonColor: '#6b7280', // Gray-500
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    return result.isConfirmed ? result.value : null;
  });
};

/**
 * Notificación flotante (Toast) - en esquina
 */
export const showToast = (
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
  position = 'bottom-end' as const
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: position as any,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const iconMap: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  return Toast.fire({
    icon: iconMap[type],
    title: message,
  });
};

/**
 * Notificación de carga
 */
export const showLoadingAlert = (
  title: string = 'Cargando...',
  message?: string
) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'info',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

/**
 * Cerrar alerta de carga
 */
export const closeLoadingAlert = () => {
  return Swal.close();
};

/**
 * Alerta personalizada con HTML
 */
export const showCustomAlert = (
  title: string,
  html: string,
  confirmButtonText: string = 'Aceptar'
) => {
  return Swal.fire({
    title,
    html,
    icon: 'info',
    confirmButtonColor: '#4f46e5', // Indigo-600
    confirmButtonText,
  });
};

/**
 * Eliminar elemento con confirmación
 */
export const showDeleteConfirmAlert = (
  itemName: string = 'este elemento'
): Promise<boolean> => {
  return Swal.fire({
    icon: 'warning',
    title: '¡Eliminar!',
    text: `¿Estás seguro de que deseas eliminar ${itemName}? Esta acción no se puede deshacer.`,
    showCancelButton: true,
    confirmButtonColor: '#ef4444', // Red-500
    cancelButtonColor: '#6b7280', // Gray-500
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => result.isConfirmed);
};

/**
 * Notificación de producto agregado al carrito
 */
export const showAddToCartSuccess = (
  productName: string,
  quantity: number = 1
) => {
  return showToast(
    `${productName} (x${quantity}) agregado al carrito ✨`,
    'success',
    'bottom-end'
  );
};

/**
 * Notificación de producto eliminado del carrito
 */
export const showRemoveFromCartSuccess = (
  productName: string
) => {
  return showToast(
    `${productName} eliminado del carrito 🗑️`,
    'info',
    'bottom-end'
  );
};

/**
 * Notificación de sesión iniciada
 */
export const showLoginSuccess = (
  userName: string
) => {
  return showToast(
    `¡Bienvenido, ${userName}! 👋`,
    'success',
    'bottom-end'
  );
};

/**
 * Notificación de sesión cerrada
 */
export const showLogoutSuccess = () => {
  return showToast(
    '¡Sesión cerrada correctamente! 👋',
    'info',
    'bottom-end'
  );
};

/**
 * Notificación de compra realizada
 */
export const showCheckoutSuccess = (
  orderNumber: string
) => {
  return Swal.fire({
    icon: 'success',
    title: '¡Compra Realizada!',
    text: `Tu pedido #${orderNumber} ha sido registrado exitosamente.`,
    confirmButtonColor: '#4f46e5',
    confirmButtonText: 'Aceptar',
    timer: 4000,
    timerProgressBar: true,
  });
};

/**
 * Notificación de carrito vacío
 */
export const showEmptyCartAlert = () => {
  return showWarningAlert(
    'Carrito Vacío',
    'Tu carrito no tiene productos. ¡Agrega algunos para continuar!'
  );
};

/**
 * Notificación de error de validación
 */
export const showValidationErrorAlert = (
  errors: string[]
) => {
  const errorList = errors.map(err => `• ${err}`).join('<br>');
  return Swal.fire({
    icon: 'error',
    title: 'Errores de Validación',
    html: errorList,
    confirmButtonColor: '#ef4444',
    confirmButtonText: 'Aceptar',
  });
};
