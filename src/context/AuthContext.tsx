import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, AuthCredentials, RegisterData, AuthContextType } from '../types';
import { authService } from '../services';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar usuario al montar el componente
  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.login(credentials);
      authService.saveAuthToken(token);
      authService.saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.register(data);
      authService.saveAuthToken(token);
      authService.saveUser(user);
      setUser(user);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
