import type { User, AuthCredentials, RegisterData, AuthResponse } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Servicio de autenticación
 * En producción, esto se conectaría con el backend
 */

export const authService = {
  /**
   * Inicia sesión
   */
  login: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);

    if (!user) {
      throw new Error('Correo o contraseña incorrectos');
    }

    // En producción, verificar contraseña con el backend
    const mockToken = 'mock_jwt_token_' + Date.now();

    // 🔍 Asegurar que el usuario tenga rol
    const userRole = user.role || 'comprador'; // Rol por defecto
    console.log(`✅ Login exitoso: ${user.email} - Rol: ${userRole}`);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        country: user.country,
        role: userRole,
      },
      token: mockToken,
    };
  },

  /**
   * Registra un nuevo usuario
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u: any) => u.email === data.email);

    if (userExists) {
      throw new Error('Este correo ya está registrado');
    }

    // 🔍 Asegurar que el rol esté definido
    const userRole = data.role || 'comprador';

    const newUser = {
      id: String(users.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      role: userRole as 'vendedor' | 'comprador',
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const mockToken = 'mock_jwt_token_' + Date.now();

    console.log(`✅ Registro exitoso: ${newUser.email} - Rol: ${userRole}`);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token: mockToken,
    };
  },

  /**
   * Obtiene el usuario actualmente autenticado
   */
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
  },

  /**
   * Guarda el token de autenticación
   */
  saveAuthToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  /**
   * Obtiene el token de autenticación
   */
  getAuthToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Guarda el usuario autenticado
   */
  saveUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  /**
   * Limpia la autenticación
   */
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
