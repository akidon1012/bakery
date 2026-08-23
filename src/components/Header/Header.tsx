import { useState } from 'react'
import './Header.scss';
import { Link } from 'react-router-dom'
import wheat from '../../assets/images/wheat.webp'
import { CartIcon, CloseIcon, HeartIcon, MenuIcon } from '../icons'
import type { CartItem } from '../../types/CartItem'
import { categories } from '../../data/categories'

type Props = {
  cartItems: CartItem[]
  query: string
  setQuery: (value: string) => void
}

export default function Header({ cartItems, query, setQuery }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
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
      </header>
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
        <div className="header-search">
          <input
            name="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="商品名で検索"
          />
          <button
            type="button"
            className="header-search-clear"
            onClick={() => setQuery('')}
          >
            クリア
          </button>
        </div>
      </nav>
    </div>
  )
}
