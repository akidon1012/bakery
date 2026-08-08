import './List.scss';
import ProductList from '../../components/ProductList/ProductList'
import { products } from '../../data/products'
import type { Product } from '../../types/Product'
import { categories } from '../../data/categories'

type Props = {
  onSelectProduct: (product: Product) => void
  query: string
  setQuery: (value: string) => void
  category: string
  setCategory: (value: string) => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function List({
  onSelectProduct,
  query,
  setQuery,
  category,
  setCategory,
  favorites,
  setFavorites,
}: Props) {
  const filteredProducts = products.filter((product) => {
    const matchQuery = product.name.includes(query)
    const matchCategory =
      category === 'all' || product.category === category
    return matchQuery && matchCategory
  })

  return (
    <>
    {/* <h1 className="page-header">商品一覧</h1> */}
    <section className="item-list-filter">
      <div className="item-list-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="商品名で検索"
        />
        <button className="item-list-search-clear" onClick={() => setQuery('')}>
          クリア
        </button>
      </div>
      <div className="item-list-category">
        <ul className="item-list-category-list">
          {categories.map((cat) => {
            const isActive = category === cat.value
            return (
              <li
                key={cat.value}
                className={`item-list-category-list-item ${
                  isActive ? 'is_active' : ''
                }`}
              >
                <button onClick={() => setCategory(cat.value)}>
                  {cat.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
    <section className="item-list-wrapper">
      
      <div className="category-filter">

      </div>
      <ProductList
        products={filteredProducts}
        onItemClick={onSelectProduct}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </section>
  </>
  )
}
