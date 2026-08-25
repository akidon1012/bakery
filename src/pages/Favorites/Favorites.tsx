import './Favorites.scss'
import ProductList from '../../components/ProductList/ProductList'
import { products } from '../../data/products'
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'

type Props = {
  onSelectProduct: (product: Product) => void
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Favorites({
  onSelectProduct,
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: Props) {
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  )

  return (
    <div className="contents">
      <div className="favorites">
        <h1 className="page-header">お気に入り</h1>
        {favoriteProducts.length === 0 ? (
          <p className="favorites-empty">お気に入りの商品はありません。</p>
        ) : (
          <section className="item-list-wrapper">
            <ProductList
              products={favoriteProducts}
              onItemClick={onSelectProduct}
              setCartItems={setCartItems}
              onOpenCartModal={onOpenCartModal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </section>
        )}
      </div>
    </div>
  )
}
