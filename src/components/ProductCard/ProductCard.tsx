import './ProductCard.scss'
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import { addToCartItems } from '../../utils/cart'
import { CartIcon } from '../icons'
import { Link } from 'react-router-dom'
import FavoriteButton from '../FavoriteButton/FavoriteButton'

export type ProductCardProps = {
  product: Product
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export function getProductCardClassName(
  product: Product,
  extraClassName?: string
) {
  return [
    'item-list-item',
    product.stock === 0 && 'is_soldout',
    extraClassName,
  ]
    .filter(Boolean)
    .join(' ')
}

export function ProductCardContent({
  product,
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: ProductCardProps) {
  const isSoldOut = product.stock === 0

  const handleAddCart = () => {
    setCartItems((prev) => addToCartItems(prev, product.id, 1, product.stock))
    onOpenCartModal()
  }

  return (
    <>
      <div className="item-list-item-img">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} decoding="async" loading="lazy" alt={product.name} />
          {isSoldOut && <div className="item-list-item-soldout">SOLD OUT</div>}
        </Link>
        <div className="item-list-item-favorite">
          <FavoriteButton
            productId={product.id}
            productName={product.name}
            favorites={favorites}
            setFavorites={setFavorites}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
      <h2 className="item-list-item-name">
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      <div className="item-list-item-price">
        <span className="price-unit">&yen;</span>
        <span className="price-value">{product.price.toLocaleString()}</span>
        <span className="tax-label">(税込)</span>
      </div>
      <div className="item-list-item-btn">
        <button
          className={`btn btn-primary btn-size-s ${isSoldOut ? 'is_soldout' : ''}`}
          disabled={isSoldOut}
          onClick={handleAddCart}
        >
          {isSoldOut ? (
            'SOLD OUT'
          ) : (
            <>
              <CartIcon />
              買い物かごに入れる
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <li className={getProductCardClassName(props.product)}>
      <ProductCardContent {...props} />
    </li>
  )
}
