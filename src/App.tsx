import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context";
import { Header, Footer } from "./components/layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderDetails from "./pages/OrderDetails";

// 🔒 Componente para proteger rutas privadas
import type { ReactElement } from "react";

function PrivateRoute({ children }: { children: ReactElement }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Router>
      {/* 🔹 Mostrar el Header solo si el usuario está logueado */}
      {isAuthenticated && <Header />}

      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
          />

          {/* RUTAS PRIVADAS */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />

          {/* 🔁 Si la ruta no existe, redirigir según el login */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </main>

      {/* 🔹 Mostrar el Footer solo si el usuario está logueado */}
      {isAuthenticated && <Footer />}
    </Router>
  );
}
