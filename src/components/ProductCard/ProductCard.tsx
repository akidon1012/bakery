import './ProductCard.scss';
import type { Product } from '../../types/Product'
import { HeartIcon } from '../icons'

type Props = {
  product: Product
  onClick: (product: Product) => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProductCard({
  product,
  onClick,
  favorites,
  setFavorites,
}: Props) {
  const isSoldOut = product.stock === 0
  const isFavorite = favorites.includes(product.id)
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
  
    setFavorites((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id)
      } else {
        return [...prev, product.id]
      }
    })
  }
  return (
    <li className={`item-list-item ${isSoldOut ? 'is_soldout' : ''}`}>
      <div className="item-list-item-img">
        <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onClick(product)
            }}
          >
          <img src={product.image} decoding="async" loading="lazy" alt="" />
          {isSoldOut && <div className="item-list-item-soldout">SOLD OUT</div>}
        </a>
        <div className="item-list-item-favorite">
          <button 
            aria-pressed={isFavorite} 
            className={`favorite-button ${isFavorite ? 'is_active' : ''}`}
            onClick={handleToggle}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
      <h2 className="item-list-item-name">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onClick(product)
          }}
        >
          {product.name}
        </a>
      </h2>
      <div className="item-list-item-price">
        <span className="price-unit">&yen;</span>
        <span className="price-value">{product.price.toLocaleString()}</span>
        <span className="tax-label">(税込)</span>
      </div>
      <p></p>
    </li>
  )
}