import './ProductList.scss';
import type { Product } from '../../types/Product'
import ProductCard from '../ProductCard/ProductCard'

type Props = {
  products: Product[]
  onItemClick: (product: Product) => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProductList({
  products,
  onItemClick,
  favorites,
  setFavorites,
}: Props) {
  return (
    <ul className="item-list">
       {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onItemClick}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </ul>
  )
}
