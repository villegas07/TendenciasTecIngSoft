# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
---
```
Este proyecto fue desarrollado en **React** y cuenta con tres ramas principales, cada una creada por un integrante del equipo:

- `daniel`
- `jose`
- `brayan`

## Clonar y ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/villegas07/TendenciasTecIngSoft
   ```
2. Accede al proyecto:
    ```bash
   cd nombre-del-repo
    ```
3. Instala las dependencias:
    ```bash
   npm install
    ```
4. Inicia el servidor de desarrollo:
    ```bash
   npm run dev
    ```
    ---
1. Crea una nueva rama desde main o desde tu rama personal:
    ```bash
   git checkout -b nombre-de-tu-rama
    ```
2. Realizar tus cambios y súbirlos
    ```bash
    git add .
    git commit -m "Descripción del cambio"
    git push origin nombre-de-tu-rama
    ```

---

## 🏗️ Nueva Estructura del Proyecto

```
online-sales/
│
├── 📄 Documentación
│   ├── ARCHITECTURE.md                    ← Diagrama y estructura
│   ├── DEVELOPMENT_GUIDE.md              ← Guía de desarrollo
│   ├── DEPENDENCIES.md                   ← Dependencias recomendadas
│   └── README_IMPLEMENTATION.md          ← Este archivo
│
├── src/
│   │
│   ├── 🎨 Componentes (PRESENTATION LAYER)
│   │   ├── common/                       ← Reutilizables
│   │   │   ├── Button.tsx                ✅ Componente botón
│   │   │   ├── Card.tsx                  ✅ Componente tarjeta
│   │   │   ├── Input.tsx                 ✅ Componente input
│   │   │   ├── Modal.tsx                 ✅ Componente modal
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                       ← Estructura
│   │   │   ├── Header.tsx                ✅ Mejorado
│   │   │   ├── Footer.tsx                ✅ Mejorado
│   │   │   └── index.ts
│   │   │
│   │   ├── features/                     ← Específicos
│   │   │   ├── ProductCard.tsx           ✅ Con lógica
│   │   │   ├── ShoppingCartItem.tsx      ✅ Nuevo
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── 📄 Páginas (PRESENTATION LAYER)
│   │   ├── Home.tsx                      ✅ Existente
│   │   ├── Products.tsx                  ✅ Existente
│   │   ├── Cart.tsx                      ✅ Existente
│   │   ├── ProductDetails.tsx            ✅ Existente
│   │   ├── Login.tsx                     ✅ Existente
│   │   └── Register.tsx                  ✅ Existente
│   │
│   ├── 🔧 Hooks (LOGIC LAYER)
│   │   ├── useFetch.ts                   ✅ Para obtener datos
│   │   ├── useCart.ts                    ✅ Para el carrito
│   │   ├── useAuth.ts                    ✅ Para autenticación
│   │   └── index.ts
│   │
│   ├── 📌 Contextos (LOGIC LAYER)
│   │   ├── AuthContext.tsx               ✅ Mejorado
│   │   ├── CartContext.tsx               ✅ Nuevo
│   │   └── index.ts
│   │
│   ├── 💼 Servicios (BUSINESS LAYER)
│   │   ├── productService.ts             ✅ Lógica de productos
│   │   ├── cartService.ts                ✅ Lógica del carrito
│   │   ├── authService.ts                ✅ Lógica de autenticación
│   │   └── index.ts
│   │
│   ├── 📊 Tipos (DATA LAYER)
│   │   ├── product.ts                    ✅ Tipos de productos
│   │   ├── cart.ts                       ✅ Tipos del carrito
│   │   ├── user.ts                       ✅ Tipos de usuario
│   │   └── index.ts
│   │
│   ├── 🛠️ Utilidades (DATA LAYER)
│   │   ├── formatters.ts                 ✅ Funciones de formato
│   │   ├── validators.ts                 ✅ Funciones de validación
│   │   ├── helpers.ts                    ✅ Funciones auxiliares
│   │   ├── constants.ts                  ✅ Constantes globales
│   │   └── index.ts
│   │
│   ├── 🎨 Estilos (STYLING LAYER)
│   │   ├── variables.css                 ✅ Variables CSS
│   │   ├── global.css                    ✅ Existente
│   │   └── theme.ts                      (futuro)
│   │
│   ├── 🖼️ Assets
│   │   └── assets/
│   │       ├── images/
│   │       ├── icons/
│   │       └── fonts/
│   │
│   ├── 📦 Data
│   │   └── data/
│   │       └── products.ts
│   │
│   ├── App.tsx                           ✅ Componente raíz
│   ├── main.tsx                          ✅ Punto de entrada
│   ├── index.css
│   └── App.css
│
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

---

## ✨ Lo Que Se Creó

### 1. **Types & Data Layer** ✅
- `types/product.ts` - Interfaz Product con propiedades completas
- `types/cart.ts` - Tipos CartItem y Cart
- `types/user.ts` - Tipos User, AuthCredentials, AuthResponse
- `utils/formatters.ts` - Funciones formatCurrency, formatDate, truncateText
- `utils/validators.ts` - Validación de email, password, nombre, teléfono
- `utils/helpers.ts` - calculateCartTotal, calculateItemCount, searchItems, sortItems
- `utils/constants.ts` - URLs de API, storage keys, mensajes

### 2. **Services Layer** ✅
- `productService.ts` - getProducts, getProductById, getProductsByCategory
- `cartService.ts` - getCart, addToCart, removeFromCart, updateItemQuantity, clearCart
- `authService.ts` - login, register, logout, saveUser, getAuthToken

### 3. **Hooks & Context** ✅
- `hooks/useFetch.ts` - Hook genérico para fetch con estado
- `hooks/useCart.ts` - Hook para manejar carrito con loading
- `hooks/useAuth.ts` - Hook para autenticación con error handling
- `context/AuthContext.tsx` - Contexto global de autenticación mejorado
- `context/CartContext.tsx` - Contexto global del carrito (NUEVO)

### 4. **Components** ✅
**Common Components:**
- `Button.tsx` - Con variantes (primary, secondary, danger) y tamaños
- `Card.tsx` - Con variantes (default, elevated, outlined)
- `Input.tsx` - Con label y manejo de errores
- `Modal.tsx` - Modal reutilizable

**Layout Components:**
- `Header.tsx` - Mejorado con navegación, carrito, usuario
- `Footer.tsx` - Con links, contacto, redes sociales

**Feature Components:**
- `ProductCard.tsx` - Con imagen, rating, precio, botones
- `ShoppingCartItem.tsx` - Nuevo, para items del carrito

### 5. **Documentation** ✅
- `docs/ARCHITECTURE.md` - Diagrama visual completo
- `docs/DEVELOPMENT_GUIDE.md` - Guía de desarrollo paso a paso
- `docs/DEPENDENCIES.md` - Dependencias recomendadas
- `docs/README_IMPLEMENTATION.md` - Resumen de implementación

---

## 🎯 Principios Implementados

### 1. **Separación de Responsabilidades**
```
Componente → Hook → Servicio → localStorage/API
                  ↘ Context ↙
```

### 2. **Reutilización**
- Componentes comunes reutilizables
- Servicios compartidos
- Hooks personalizados

### 3. **Escalabilidad**
- Fácil agregar nuevas features
- Cambiar backend sin tocar UI
- Testeable en cada capa

### 4. **Type Safety**
- Todas las interfaces en `types/`
- TypeScript estricto
- Mejor autocompletado

---

## 📊 Flujo de Datos

```
Usuario Interactúa
    ↓
Componente (ProductCard)
    ↓
Hook (useCart)
    ↓
Servicio (cartService)
    ↓
localStorage
    ↓
Hook actualiza estado
    ↓
Context propaga cambios
    ↓
Componentes re-renderizan
    ↓
Usuario ve el cambio ✅
```

---

## ✅ Checklist de Características

- ✅ Estructura de carpetas completa
- ✅ Types definidos y exportados
- ✅ Servicios con lógica de negocio
- ✅ Hooks personalizados
- ✅ Contextos globales
- ✅ Componentes reutilizables
- ✅ Componentes de layout mejorados
- ✅ Utilidades de formateo y validación
- ✅ Constantes centralizadas
- ✅ Documentación completa
- ✅ Estilos CSS variables

---

## 🚀 Cómo Usar Esta Arquitectura

### Para Agregar una Nueva Página

1. **Crear Página** en `pages/NewPage.tsx`
2. **Usar Contextos y Hooks**
```tsx
import { useAuthContext } from '../context';
import { useCart } from '../hooks';
import { Button, Card } from '../components';

export const NewPage = () => {
  const { user } = useAuthContext();
  const { cart, addToCart } = useCart();
  
  return (
    <div>
      <h1>Bienvenido {user?.name}</h1>
      {/* Contenido */}
    </div>
  );
};
```

### Para Agregar un Nuevo Servicio

1. Crear `services/newService.ts`
2. Crear hook en `hooks/useNewFeature.ts`
3. Usar en componentes

### Para Agregar un Nuevo Componente

1. Decidir: ¿common, layout o feature?
2. Crear en carpeta correspondiente
3. Exportar en `index.ts`

---

## 📚 Recursos Útiles

- **ARCHITECTURE.md** - Para entender la estructura completa
- **DEVELOPMENT_GUIDE.md** - Para guía paso a paso
- **DEPENDENCIES.md** - Para saber qué instalar
- **README_IMPLEMENTATION.md** - Para próximos pasos

---

## 🎓 Lecciones Aprendidas

Esta arquitectura permite:

1. **Mantener el código limpio y organizado**
2. **Reutilizar lógica sin duplication**
3. **Testear cada capa independientemente**
4. **Escalar fácilmente**
5. **Cambiar tecnologías sin refactorizar**
6. **Colaborar mejor en equipo**

---

## 🚀 Próximos Pasos

1. Instalar dependencias faltantes
2. Completar páginas (ProductDetails, Login, Register)
3. Conectar con backend real
4. Agregar validación de formularios
5. Implementar testing
6. Deployar a producción

---