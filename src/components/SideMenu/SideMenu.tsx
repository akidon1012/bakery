import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import './SideMenu.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SearchIcon, CloseIcon } from '../icons'
import { categories } from '../../data/categories'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: Props) {
  const navigate = useNavigate()
  const skipScrollRestoreRef = useRef(false)
  const [searchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get('q') ?? ''
  )

  useEffect(() => {
    setSearchInput(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    if (!isOpen) return

    skipScrollRestoreRef.current = false
    const scrollY = window.scrollY
    document.body.style.top = `-${scrollY}px`
    document.body.classList.add('is_sidemenu-opened')

    return () => {
      document.body.classList.remove('is_sidemenu-opened')
      document.body.style.top = ''

      if (!skipScrollRestoreRef.current) {
        const html = document.documentElement
        const previousScrollBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        window.scrollTo(0, scrollY)
        html.style.scrollBehavior = previousScrollBehavior
      }
    }
  }, [isOpen])

  const closeMenu = (options?: { scrollToTop?: boolean }) => {
    skipScrollRestoreRef.current = options?.scrollToTop ?? false
    onClose()
  }

  const currentCategoryCode = searchParams.get('category') ?? 'ALL'

  const handleCategoryClick = (categoryCode: string) => {
    closeMenu({ scrollToTop: currentCategoryCode !== categoryCode })
  }

  const handleSearch = () => {
    const q = searchInput.trim()
    const params = new URLSearchParams()

    if (q) {
      params.set('q', q)
    }

    const queryString = params.toString()
    const nextPath = queryString ? `/products?${queryString}` : '/products'
    const currentPath = `/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    navigate(nextPath)
    closeMenu({ scrollToTop: nextPath !== currentPath })
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <nav className="sidemenu show-sp" onClick={() => closeMenu()}>
      <div className="sidemenu-inner" onClick={(e) => e.stopPropagation()}>
        <div className="sidemenu-search">
          <form onSubmit={handleSearchSubmit}>
            <input
              name="search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="商品名で検索"
            />
            <button
              type="submit"
              className="sidemenu-search-button"
              aria-label="検索"
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              className="sidemenu-search-clear"
              onClick={() => {
                setSearchInput('')
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
        </div>
        <div className="sidemenu-category">
          <div className="sidemenu-category-header">商品カテゴリ</div>
            <ul className="sidemenu-category-list">
              <li className="sidemenu-category-list-item">
                <Link
                  to="/products?category=ALL"
                  onClick={() => handleCategoryClick('ALL')}
                >
                  すべての商品
                </Link>
              </li>
              {categories
                .filter((category) => category.code !== 'ALL')
                .map((category) => (
                  <li
                    key={category.code}
                    className="sidemenu-category-list-item"
                  >
                    <Link
                      to={`/products?category=${category.code}`}
                      onClick={() => handleCategoryClick(category.code)}
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
           </ul>
        </div>
        <div className="sidemenu-close">
          <button
            type="button"
            className="sidemenu-close-button"
            onClick={() => closeMenu()}
          >
            <CloseIcon /> 
            閉じる
          </button>
       </div>
      </div>
    </nav>
  )
}