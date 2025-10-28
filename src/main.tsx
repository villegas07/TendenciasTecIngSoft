import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, CartProvider } from "./context";
import { STORAGE_KEYS } from "./utils/constants";

// 🔄 Inicializar usuarios demo con roles correctos
const initializeDemoUsers = () => {
  const demoUsers = [
    {
      id: "1",
      name: "Vendedor Demo",
      email: "vendedor@example.com",
      password: "123456",
      phone: "3001234567",
      city: "Bogotá",
      country: "Colombia",
      role: "vendedor",
    },
    {
      id: "2",
      name: "Comprador Demo",
      email: "comprador@example.com",
      password: "123456",
      phone: "3001234568",
      city: "Medellín",
      country: "Colombia",
      role: "comprador",
    }
  ];

  // Siempre sobrescribir con datos limpios
  localStorage.setItem("users", JSON.stringify(demoUsers));
  
  // Limpiar usuario actual para forzar re-login
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  
  console.log("✅ Usuarios demo inicializados correctamente");
};

// Ejecutar inicialización
initializeDemoUsers();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
