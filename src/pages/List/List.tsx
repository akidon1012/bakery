import { useSearchParams } from 'react-router-dom'
import './List.scss';
import ProductList from '../../components/ProductList/ProductList'
import { products } from '../../data/products'
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import { categories } from '../../data/categories'

type Props = {
  onSelectProduct: (product: Product) => void
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

function buildSearchParams(categoryCode: string, searchQuery: string) {
  const params = new URLSearchParams()

  if (categoryCode !== 'ALL') {
    params.set('category', categoryCode)
  }

  if (searchQuery.trim()) {
    params.set('q', searchQuery.trim())
  }

  return params
}

export default function List({
  onSelectProduct,
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryCode = searchParams.get('category') ?? 'ALL'
  const searchQuery = searchParams.get('q') ?? ''
  const selectedCategory = categories.find(
    (category) => category.code === categoryCode
  )

  const filteredProducts = products.filter((product) => {
    const matchQuery = product.name.includes(searchQuery)
    const matchCategory =
      categoryCode === 'ALL' ||
      (selectedCategory !== undefined &&
        product.category === selectedCategory.value)
    return matchQuery && matchCategory
  })

  const pageTitle = searchQuery.trim()
    ? `「${searchQuery}」の検索結果`
    : categoryCode === 'ALL'
      ? 'すべての商品'
      : selectedCategory?.label

  return (
    <>
    <div className="contents">
      <h1 className="page-header">
        {pageTitle}
      </h1>
      <section className="item-list-wrapper">
        <ProductList
          products={filteredProducts}
          onItemClick={onSelectProduct}
          setCartItems={setCartItems}
          onOpenCartModal={onOpenCartModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </section>
    </div>
  </>
  )
}
