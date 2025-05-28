// Ejemplo: src/components/ProductCard.tsx
import React from 'react'

interface ProductCardProps {
  nombre: string
  codigo: string
  categoria: string
  precio: number
  imagen?: string
}

// Mapa de placeholders locales (coloca estos PNG en public/img/placeholders/)
const placeholderMap: Record<string, string> = {
  REPUESTOS: '/img/placeholders/repuestos.png',
  CELULARES: '/img/placeholders/celulares.png',
  ACCESORIOS: '/img/placeholders/accesorios.png',
  HERRAMIENTAS: '/img/placeholders/herramientas.png',
  INFORMATICA: '/img/placeholders/informatica.png',
  CASA_Y_OFICINA: '/img/placeholders/casa_oficina.png',
  ADULTOS: '/img/placeholders/adultos.png',
  SIN_CATEGORIA: '/img/placeholders/sin_categoria.png',
  DEFAULT: '/img/placeholders/default.png'
}

export default function ProductCard({ nombre, codigo, categoria, precio, imagen }: ProductCardProps) {
  // Determinar placeholder según categoría (upper + espacios a guiones)
  const key = categoria.toUpperCase().replace(/\s+/g, '_')
  const src = imagen
    ? imagen
    : (placeholderMap[key] || placeholderMap['DEFAULT'])

  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition">
      <img
        src={src}
        alt={nombre}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold truncate">{nombre}</h3>
      <p className="text-gray-500 text-sm mb-1">{categoria}</p>
      <p className="text-relive-orange font-bold">$ {precio}</p>
      <p className="text-gray-400 text-xs mt-1">Código: {codigo}</p>
    </div>
  )
}
