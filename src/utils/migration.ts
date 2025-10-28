import type { User } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Script de migración de datos
 * Ejecutar en la consola del navegador si hay usuarios sin rol
 */

export const migrateUsersData = () => {
  console.log('🔄 Iniciando migración de datos de usuarios...');
  
  try {
    // Obtener usuarios actuales
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    if (users.length === 0) {
      console.log('✅ No hay usuarios para migrar');
      return;
    }

    console.log(`📊 Usuarios encontrados: ${users.length}`);

    // Migrar usuarios, asignando rol por defecto si no tienen
    const migratedUsers = users.map((user: any, index: number) => {
      if (!user.role) {
        console.log(`⚠️  Usuario ${index + 1} sin rol. Asignando 'comprador' por defecto...`);
        return {
          ...user,
          role: 'comprador' as const,
        };
      }
      return user;
    });

    // Guardar usuarios migrados
    localStorage.setItem("users", JSON.stringify(migratedUsers));
    console.log('✅ Migración completada exitosamente');
    console.log('📋 Usuarios migrados:', migratedUsers);

    // Si hay usuario actual sin rol, actualizar también
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "null");
    if (currentUser && !currentUser.role) {
      currentUser.role = 'comprador';
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
      console.log('✅ Usuario actual actualizado');
      console.log('⚠️  Por favor, recarga la página');
    }

  } catch (error) {
    console.error('❌ Error en la migración:', error);
  }
};

/**
 * Limpiar todos los datos de autenticación
 */
export const clearAuthData = () => {
  console.log('🗑️  Limpiando datos de autenticación...');
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem("users");
  console.log('✅ Datos limpiados. Recarga la página.');
  window.location.reload();
};

/**
 * Ver todos los usuarios registrados
 */
export const showAllUsers = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  console.table(users);
  return users;
};

/**
 * Ver usuario actual
 */
export const showCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "null");
  console.log('Usuario actual:', user);
  return user;
};

/**
 * Crear usuario de prueba vendedor
 */
export const createVendorTest = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  
  const newVendor: User = {
    id: String(users.length + 1),
    name: "Vendedor Prueba",
    email: "vendedor@test.com",
    role: "vendedor",
  };

  users.push({
    ...newVendor,
    password: "123456",
  });

  localStorage.setItem("users", JSON.stringify(users));
  console.log('✅ Vendedor de prueba creado:', newVendor);
  console.log('📧 Email: vendedor@test.com');
  console.log('🔐 Contraseña: 123456');
  return newVendor;
};

/**
 * Crear usuario de prueba comprador
 */
export const createBuyerTest = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  
  const newBuyer: User = {
    id: String(users.length + 1),
    name: "Comprador Prueba",
    email: "comprador@test.com",
    role: "comprador",
  };

  users.push({
    ...newBuyer,
    password: "123456",
  });

  localStorage.setItem("users", JSON.stringify(users));
  console.log('✅ Comprador de prueba creado:', newBuyer);
  console.log('📧 Email: comprador@test.com');
  console.log('🔐 Contraseña: 123456');
  return newBuyer;
};
