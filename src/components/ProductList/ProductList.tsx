import type { Product } from '../../types/Product'
import ProductCard from '../ProductCard/ProductCard'

type Props = {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <ul className="item-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}
