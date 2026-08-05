import { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Top from './pages/Top/Top'
import List from './pages/List/List'
import Detail from './pages/Detail/Detail'
import type { Product } from './types/Product'


function App() {
  const [page, setPage] = useState<'top' | 'list' | 'detail'>('top')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setPage('detail')
  }
  return (
    <>
      <Header setPage={setPage} />
      <main className="contents">
        {page === 'top' && <Top />}
        {page === 'list' && <List onSelectProduct={handleSelectProduct} />}
        {page === 'detail' && selectedProduct && (
          <Detail product={selectedProduct} />
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
