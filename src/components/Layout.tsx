import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-relive-orange text-white p-4 text-xl font-bold">
        Relive - Catálogo
      </header>
      <div className="flex flex-1">
        {children}
      </div>
    </div>
  )
}
