import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams
} from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import AddCartModal from './components/AddCartModal/AddCartModal'
import Top from './pages/Top/Top'
import List from './pages/List/List'
import Detail from './pages/Detail/Detail'
import Cart from './pages/Cart/Cart'
import { products } from './data/products'
import type { Product } from './types/Product'
import type { CartItem } from './types/CartItem'
import { mergeCartItems } from './utils/cart'

function AppContent() {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')

  const handleSelectProduct = (product: Product) => {
    navigate(`/products/${product.id}`)
  }

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems')
    const parsed: CartItem[] = saved ? JSON.parse(saved) : []
    return mergeCartItems(parsed)
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const [cartError, setCartError] = useState<string | null>(null)

  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const handleOpenCartModal = () => {
    setIsCartModalOpen(true)
  }

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false)
  }
  function DetailRoute() {
    const { id } = useParams()
    const product = products.find((item) => item.id === id)

    if (!product) {
      return <p>商品が見つかりませんでした。</p>
    }

    return (
      <Detail
        product={product}
        onBack={() => navigate('/products')}
        setCartItems={setCartItems}
        onOpenCartModal={handleOpenCartModal}
        setCartError={setCartError}
      />
    )
  }
  return (
    <div className="container">
      <Header
        cartItems={cartItems}
        query={query}
        setQuery={setQuery}
      />
      <Routes>
        <Route path="/" element={<Top />} />

        <Route
          path="/products"
          element={
            <List
              onSelectProduct={handleSelectProduct}
              setCartItems={setCartItems}
              onOpenCartModal={handleOpenCartModal}
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />

        <Route
          path="/products/:id" 
          element={<DetailRoute />} 
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
      </Routes>
      <Footer />
      <AddCartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal}
      />

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
