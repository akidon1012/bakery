import { useState } from 'react'
import './Detail.scss';
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import Select from '../../components/ui/Select/Select'

type Props = {
  product: Product
  onBack: () => void
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export default function Detail({ product, onBack, setCartItems }: Props) {
  const [quantity, setQuantity] = useState('')
  const isSoldOut = product.stock === 0
  const handleAddCart = () => {
    if (!quantity) return
  
    setCartItems((prev) => {
      return [
        ...prev,
        {
          productId: product.id,
          quantity: Number(quantity),
        },
      ]
    })
  }
  return (
    <section className="detail-wrapper">
      <div className="detail-header show-sp">
        <h1 className="detail-product-name">{product.name}</h1>
        <p className="detail-product-id">{product.id}</p>
      </div>
      <div className="detail-inner">
        <div className="detail-img">
          <img src={product.image} decoding="async" loading="lazy" alt="" />
        </div>
        <div className="detail-info">
          <div className="detail-header show-pc">
            <h1 className="detail-product-name">{product.name}</h1>
            <p className="detail-product-id">{product.id}</p>
          </div>
          <div className="detail-description">
            {product.description}
          </div>
          <dl className="detail-price">
            <dt className="detail-price-label">価格</dt>
            <dd className="detail-price-value">
              <span className="price-unit">&yen;</span>
              <span className="price-value">{product.price.toLocaleString()}</span>
              <span className="tax-label">(税込)</span>
            </dd>
          </dl>
          <div className="detail-addcart">
            <div className="detail-addcart-qty">
              <Select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={product.stock === 0}
              >
                <option value="">数量</option>
                {Array.from({ length: product.stock }, (_, i) => (
                  <option
                    key={i + 1}
                    value={String(i + 1)}
                  >
                    {i + 1}
                  </option>
                ))}
              </Select>
            </div>
            <div className="detail-addcart-btn">
              <button
                className={`btn btn-primary btn-size-l ${isSoldOut ? 'is_soldout' : ''}`}
                disabled={isSoldOut}
                onClick={handleAddCart}
              >
                {isSoldOut ? 'SOLD OUT' : '買い物かごに入れる'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="detail-footer">
        <button onClick={onBack}>
          一覧へ戻る
        </button>
      </div>
    </section>
  )
}
