import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider, CartProvider } from "./context";

// Inicializar datos de prueba
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([
    {
      id: "1",
      name: "Usuario Demo",
      email: "demo@example.com",
      password: "123456",
      phone: "3001234567",
      city: "Bogotá",
      country: "Colombia",
      role: "customer",
    }
  ]));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
