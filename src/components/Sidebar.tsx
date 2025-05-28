import React from 'react'
import { FaMobileAlt, FaTools, FaLaptop, FaHome, FaHeart, FaTag, FaClock, FaBoxOpen } from 'react-icons/fa'

interface SidebarProps {
  categories: string[]
  selected: string
  onSelect: (cat: string) => void
}

export default function Sidebar({ categories, selected, onSelect }: SidebarProps) {
  const icons: Record<string, React.ReactNode> = {
    Repuestos: <FaMobileAlt />,
    Accesorios: <FaBoxOpen />,
    Herramientas: <FaTools />,
    Informática: <FaLaptop />,
    'Casa y Oficina': <FaHome />,
    Adultos: <FaHeart />,
    Oferta: <FaTag />,
    Outlet: <FaBoxOpen />,
    Arribando: <FaClock />,
    Todas: <FaBoxOpen />
  }

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen sticky top-0">
      <h3 className="px-6 py-4 text-lg font-bold uppercase border-b">Categorías</h3>
      <nav className="overflow-y-auto">
        <ul>
          {categories.map(cat => (
            <li key={cat} className="border-b last:border-b-0">
              <button
                onClick={() => onSelect(cat)}
                className={`flex items-center w-full px-6 py-3 hover:bg-gray-100 transition ${selected === cat ? 'bg-gray-200' : ''}`}
              >
                <span className="mr-3 text-xl">{icons[cat] || <FaBoxOpen />}</span>
                <span className="text-sm font-medium truncate">{cat}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}