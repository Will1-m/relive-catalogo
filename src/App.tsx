// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/producto/:codigo" element={<ProductDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
