import { useEffect, useRef } from 'react'
import type { FormEvent } from 'react'
import './Header.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import wheat from '../../assets/images/wheat.webp'
import { CartIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from '../icons'
import type { CartItem } from '../../types/CartItem'
import { categories } from '../../data/categories'

type Props = {
  cartItems: CartItem[]
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ cartItems, isMenuOpen, setIsMenuOpen }: Props) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchQuery = searchParams.get('q') ?? ''

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight =
        document.querySelector('.header')?.clientHeight ?? 0
  
      if (window.scrollY >= headerHeight) {
        document.body.classList.add('is_scrolled')
      } else {
        document.body.classList.remove('is_scrolled')
      }
    }
  
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('is_scrolled')
    }
  }, [])

  const handleSearch = () => {
    const q = searchInputRef.current?.value.trim() ?? ''
    const params = new URLSearchParams()

    if (q) {
      params.set('q', q)
    }

    const queryString = params.toString()
    navigate(queryString ? `/products?${queryString}` : '/products')
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
  }

  const cartCount = cartItems.reduce(    (sum, item) => sum + item.quantity,
    0
  )
  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <h1 className="header-title">
            <Link to="/">Bakery <strong>MUGI</strong><img src={wheat} className="header-title-wheat" decoding="async" loading="lazy" alt="" /></Link>
          </h1>
          <nav className="header-nav">
            <ul className="header-nav-list">
             <li className="header-nav-list-item">
                <Link to="/favorites"><HeartIcon />お気に入り</Link>
              </li>
              <li className="header-nav-list-item">
                <Link to="/cart"><CartIcon />
                  買い物かご
                  {cartItems.length > 0 && (
                    <span className="header-nav-list-item-cnt">{cartCount}</span>
                  )}
                </Link>
              </li>
              <li className="header-nav-list-item show-sp">
                <button
                  type="button"
                  className="header-nav-menu-button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                  メニュー
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <nav className="header-category show-pc">
          <ul className="header-category-list">
            <li className="header-category-list-item">
              <Link to="/products?category=ALL">すべての商品</Link>
            </li>
            {categories
              .filter((category) => category.code !== 'ALL')
              .map((category) => (
                <li
                  key={category.code}
                  className="header-category-list-item"
                >
                  <Link to={`/products?category=${category.code}`}>
                    {category.label}
                  </Link>
                </li>
              ))}
          </ul>
          <form className="header-search" onSubmit={handleSearchSubmit}>
            <input
              key={searchQuery}
              ref={searchInputRef}
              name="search"
              type="text"
              defaultValue={searchQuery}
              placeholder="商品名で検索"
            />
            <button
              type="submit"
              className="header-search-button"
              aria-label="検索"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="header-search-clear"
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.value = ''
                }

                const params = new URLSearchParams()
                const category = searchParams.get('category')

                if (category) {
                  params.set('category', category)
                }

                const queryString = params.toString()
                navigate(queryString ? `/products?${queryString}` : '/products')
              }}
            >
              クリア
            </button>
          </form>
        </nav>
      </header>
     </div>
  )
}
