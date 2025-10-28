import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: "Camisa básica",
    price: 45000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Camisa de algodón cómoda y versátil para uso diario.",
    category: "Ropa",
    stock: 15,
    rating: 4.5,
  },
  {
    id: '2',
    name: "Tenis deportivos",
    price: 120000,
    image: "https://images.unsplash.com/photo-1600181953309-4a1c93b8e91e",
    description: "Tenis ligeros ideales para entrenamiento o actividades diarias.",
    category: "Calzado",
    stock: 8,
    rating: 4.8,
  },
  {
    id: '3',
    name: "Gorra casual",
    price: 35000,
    image: "https://images.unsplash.com/photo-1586281380434-3e0eaf3d5b08",
    description: "Gorra con estilo clásico y materiales de alta calidad.",
    category: "Accesorios",
    stock: 20,
    rating: 4.2,
  },
  {
    id: '4',
    name: "Chaqueta liviana",
    price: 99000,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    description: "Chaqueta ideal para clima fresco, con diseño moderno.",
    category: "Ropa",
    stock: 12,
    rating: 4.6,
  },
];
