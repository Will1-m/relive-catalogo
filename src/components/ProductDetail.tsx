// src/components/ProductDetail.tsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import { Producto } from './ProductGrid'

export default function ProductDetail() {
  const { codigo } = useParams<{ codigo: string }>()
  const [product, setProduct] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    axios.get<Producto[]>('/productos.json')
      .then(res => {
        const found = res.data.find(p => p.codigo === codigo)
        if (found) setProduct(found)
        else setError('Producto no encontrado')
      })
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false))
  }, [codigo])

  const handleAddToCart = () => {
    setAdded(true)
    console.log(`Producto agregado al carrito: ${product?.codigo}`)
  }

  if (loading) return <p className="p-6">Cargando producto…</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  // Mapa de placeholders para detalle
  const placeholderMap: Record<string, string> = {
    REPUESTOS: '/img/placeholders/repuestos.png',
    CELULARES: '/img/placeholders/celulares.png',
    ACCESORIOS: '/img/placeholders/accesorios.png',
    HERRAMIENTAS: '/img/placeholders/herramientas.png',
    INFORMATICA: '/img/placeholders/informatica.png',
    CASA_Y_OFICINA: '/img/placeholders/casa_oficina.png',
    ADULTOS: '/img/placeholders/adultos.png',
    OUTLET: '/img/placeholders/outlet.png',
    OFERTA: '/img/placeholders/oferta.png',
    SIN_CATEGORIA: '/img/placeholders/sin_categoria.png',
    DEFAULT: '/img/placeholders/default.png'
  }

  // Determinar fuente de la imagen
  let imgSrc: string
  if (product?.imagenes && product.imagenes.length > 0) {
    imgSrc = product.imagenes[0]
  } else {
    const key = (product?.categoria || 'Sin categoría').toUpperCase().replace(/\s+/g, '_')
    imgSrc = placeholderMap[key] || placeholderMap['DEFAULT']
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar categories={['Todas']} selected="Todas" onSelect={() => {}} />
      <main className="flex-1 p-6">
        <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver al catálogo
        </Link>

        {product && (
          <div className="max-w-5xl mx-auto bg-white rounded shadow p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Imagen o placeholder */}
              <div className="w-full h-auto flex items-center justify-center">
                <img
                  src={imgSrc}
                  alt={product.nombre}
                  className="max-h-96 object-contain rounded"
                />
              </div>

              {/* Detalles del producto */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800 truncate">{product.nombre}</h1>
                <p className="text-relive-orange text-2xl font-semibold">$ {product.precio}</p>
                {product.categoria && (
                  <p className="text-gray-600">
                    <span className="font-medium">Categoría:</span> {product.categoria}
                  </p>
                )}
                {product.descripcion && (
                  <div className="prose prose-sm max-w-none">
                    <p>{product.descripcion}</p>
                  </div>
                )}
                <button
                  onClick={handleAddToCart}
                  className="mt-6 bg-relive-orange text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
                >
                  {added ? 'Añadido ✔' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}