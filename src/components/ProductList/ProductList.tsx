import './ProductList.scss';
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import ProductCard from '../ProductCard/ProductCard'

type Props = {
  products: Product[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProductList({
  products,
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: Props) {
  return (
    <ul className="item-list">
       {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setCartItems={setCartItems}
          onOpenCartModal={onOpenCartModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </ul>
  )
}
