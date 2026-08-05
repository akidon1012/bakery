import type { Product } from '../../types/Product'
import ProductCard from '../ProductCard/ProductCard'

type Props = {
  products: Product[]
  onItemClick: (product: Product) => void
}

export default function ProductList({ products, onItemClick }: Props) {
  return (
    <ul className="item-list">
       {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onItemClick}
        />
      ))}
    </ul>
  )
}
