import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import type { Product } from './types/Product'
import ProductList from './components/ProductList/ProductList'

const products: Product[] = [
  { id: 1, name: 'コート', price: 30000 },
  { id: 2, name: 'ジャケット', price: 28000 },
  { id: 3, name: 'ブラウス', price: 7000 },
  { id: 4, name: 'カットソー', price: 6000 },
  { id: 5, name: 'Tシャツ', price: 5000 },
  { id: 6, name: 'ミニスカート', price: 6000 },
  { id: 7, name: 'ロングスカート', price: 9000 },
  { id: 8, name: 'パンツ', price: 8000 },
  { id: 9, name: 'ハーフパンツ', price: 7000 },
  { id: 10, name: 'クロップドパンツ', price: 7000 },
  { id: 11, name: 'ジーンズ', price: 10000 },
  { id: 12, name: 'ワンピース', price: 12000 },
]

function App() {
  return (
    <>
      <Header />
      <main className="contents">
        <section className="item-list-wrapper">
          <h2>商品一覧</h2>
          <ProductList products={products} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
