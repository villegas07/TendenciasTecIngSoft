import { useState, useCallback } from 'react';
import type { User, AuthCredentials, RegisterData } from '../types';
import { authService } from '../services';

/**
 * Hook para manejar autenticación
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await authService.login(credentials);
      authService.saveAuthToken(token);
      authService.saveUser(user);
      setUser(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await authService.register(data);
      authService.saveAuthToken(token);
      authService.saveUser(user);
      setUser(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
  };
};
