// src/components/ProductGrid.tsx
import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import ProductCard from './ProductCard'

export interface Producto {
  nombre: string
  codigo: string
  categoria?: string
  precio: number
  descripcion?: string
  imagenes?: string[]
}

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState<Producto[]>([])
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 100

  useEffect(() => {
    axios.get<Producto[]>('/productos.json')
      .then(res => {
        const prefixMap: Record<string, string> = {
          REP: 'Repuestos',
          CEL: 'Celulares',
          ACC: 'Accesorios',
          HER: 'Herramientas',
          HRA: 'Herramientas',
          INF: 'Informática',
          CAS: 'Casa y Oficina',
          ADL: 'Adultos',
          OFF: 'Outlet',
          OFE: 'Oferta',
          ARR: 'Arribando',
        };

        const data = res.data.map(p => {
          const match = p.codigo.match(/^[A-Za-z]+/)!
          const prefix = match[0]
          let categoria = prefixMap[prefix] || 'Sin categoría'

          // Esquema de inferencia adicional por nombre
          const name = p.nombre.toLowerCase()
          if (categoria === 'Sin categoría') {
            if (/auricular|aud[ií]fono|cable|adaptador/.test(name)) categoria = 'Accesorios'
            else if (/parlante|altavoz|tarjeta|rollo/.test(name)) categoria = 'Informática'
            else if (/display|pantalla|lcd/.test(name)) categoria = 'Repuestos'
          }

          return { ...p, categoria }
        })

        setAllProducts(data)
      })
      .catch(err => console.error('Error cargando productos:', err))
  }, [])

  // Genera categorías únicas
  const categories = useMemo(() => {
    const cats = allProducts.map(p => p.categoria?.trim() || 'Sin categoría')
    return ['Todas', ...Array.from(new Set(cats))]
  }, [allProducts])

  // Filtrado por categoría y búsqueda
  const filtered = useMemo(() => {
    const lower = searchTerm.toLowerCase().trim()
    return allProducts.filter(p => {
      const cat = p.categoria?.trim() || 'Sin categoría'
      const matchCat = selectedCat && selectedCat !== 'Todas' ? cat === selectedCat : true
      const matchSearch =
        lower === '' ||
        p.nombre.toLowerCase().includes(lower) ||
        p.codigo.toLowerCase().includes(lower) ||
        p.precio.toString().includes(lower)
      return matchCat && matchSearch
    })
  }, [allProducts, selectedCat, searchTerm])

  // Paginación
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, page])

  // Agrupar por categoría
  const groupedByCategory = useMemo(() => {
    return paginated.reduce<Record<string, Producto[]>>((acc, prod) => {
      const cat = prod.categoria?.trim() || 'Sin categoría'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(prod)
      return acc
    }, {})
  }, [paginated])

  return (
    <div className="flex min-h-screen">
      <Sidebar
        categories={categories}
        selected={selectedCat ?? 'Todas'}
        onSelect={cat => {
          setSelectedCat(cat === 'Todas' ? null : cat)
          setSearchTerm('')
          setPage(1)
        }}
      />

      <main className="flex-1 p-6">
        <SearchBar
          value={searchTerm}
          onChange={val => { setSearchTerm(val); setPage(1) }}
        />

        {filtered.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            No se encontraron productos.
          </p>
        ) : (
          <>
            <div className="space-y-12 mt-6">
              {Object.entries(groupedByCategory).map(([cat, prods]) => (
                <section key={cat}>
                  <h2 className="text-2xl font-bold mb-4 uppercase">{cat}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {prods.map(p => (
                      <ProductCard
                        key={p.codigo}
                        nombre={p.nombre}
                        codigo={p.codigo}
                        categoria={p.categoria || 'Sin categoría'}
                        precio={p.precio}
                        imagen={p.imagenes?.[0]}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="self-center">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
