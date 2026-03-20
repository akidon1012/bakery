import { useState } from 'react'
import ProductList from '../../components/ProductList/ProductList'
import { products } from '../../data/products'
import type { Product } from '../../types/Product'

type Props = {
  onSelectProduct: (product: Product) => void
}

export default function List({ onSelectProduct }: Props) {
  const [query, setQuery] = useState('')
  const filteredProducts = products.filter((product) =>
    product.name.includes(query)
  )

  return (
    <section className="item-list-wrapper">
      <h2>商品一覧</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="商品名で検索"
      />
      <ProductList
        products={filteredProducts}
        onItemClick={onSelectProduct}
      />
    </section>
  )
}
