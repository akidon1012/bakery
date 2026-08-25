import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SideMenu from './components/SideMenu/SideMenu'
import AddCartModal from './components/AddCartModal/AddCartModal'
import Top from './pages/Top/Top'
import List from './pages/List/List'
import Detail from './pages/Detail/Detail'
import Cart from './pages/Cart/Cart'
import Favorites from './pages/Favorites/Favorites'
import { products } from './data/products'
import type { Product } from './types/Product'
import type { CartItem } from './types/CartItem'
import { mergeCartItems } from './utils/cart'

function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, search])

  return null
}

function AppContent() {
  const navigate = useNavigate()

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <ScrollToTop />
      <Header
        cartItems={cartItems}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      <main className="main">
        <Routes>
          <Route path="/" element={<Top />} />

          <Route
            path="/products"
            element={
              <List
                onSelectProduct={handleSelectProduct}
                setCartItems={setCartItems}
                onOpenCartModal={handleOpenCartModal}
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
          <Route
            path="/favorites"
            element={
              <Favorites
                onSelectProduct={handleSelectProduct}
                setCartItems={setCartItems}
                onOpenCartModal={handleOpenCartModal}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
        </Routes>
      </main>
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
