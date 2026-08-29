import './Cart.scss';
import type { CartItem } from '../../types/CartItem'
import { products } from '../../data/products'
import { Link } from 'react-router-dom'
import Select from '../../components/ui/Select/Select'

type Props = {
  cartItems: CartItem[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
}

export default function Cart({ 
  cartItems,
  setCartItems,
}: Props) {
  const total = cartItems.reduce((sum, cartItem) => {
    const product = products.find(
      (product) => product.id === cartItem.productId
    )

    if (!product) return sum

    return sum + product.price * cartItem.quantity
  }, 0)

  return (
    <div className="contents">
      <div className="cart">
        <h1 className="page-header">買い物かご</h1>
        {cartItems.length === 0 ? (
          <p className="p">
            買い物かごには商品が入っていません。
          </p>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-list-header show-pc">
              <div className="cart-list-header-row1">
                <div className="cart-list-header-name">商品名</div>
              </div>
              <div className="cart-list-header-row2">
                <div className="cart-list-header-price">価格<span className="tax-label">(税込)</span></div>
                <div className="cart-list-header-qty">数量</div>
                <div className="cart-list-header-subtotal">小計<span className="tax-label">(税込)</span></div>
              </div>
            </div>
            <ul className="cart-list">
              {cartItems.map((cartItem) => {
                const product = products.find(
                  (product) => product.id === cartItem.productId
                )

                if (!product) return null

                const subtotal = product.price * cartItem.quantity

                const handleRemove = (productId: string) => {
                  setCartItems((prev) =>
                    prev.filter((item) => item.productId !== productId)
                  )
                }
                return (
                  <li
                    key={cartItem.productId}
                    className="cart-list-item"
                  >
                    <div className="cart-list-item-row1">
                      <div className="cart-list-item-img">
                        <Link to={`/products/${product.id}`}>
                          <img src={product.image} alt={product.name} decoding="async" loading="lazy"/>
                        </Link>
                      </div>
                      <div className="cart-list-item-info">
                        <h3 className="cart-list-item-name">
                        <Link to={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                        </h3>
                      </div>
                    </div>
                    <div className="cart-list-item-row2">
                      <div className="cart-list-item-price">
                        <dl className="cart-list-item-price-dl">
                          <dt className="cart-list-item-price-label show-sp">単価</dt>
                          <dd className="cart-list-item-price-value">
                          <span className="price-unit">&yen;</span><span className="price-value">{product.price.toLocaleString()}</span><span className="tax-label show-sp">(税込)</span>
                          </dd>
                        </dl>
                      </div>
                      <div className="cart-list-item-qty">
                        <dl className="cart-list-item-qty-dl">
                          <dt className="cart-list-item-qty-label show-sp">数量</dt>
                          <dd className="cart-list-item-qty-select">
                            <span className="select-wrap">
                              <Select
                                value={cartItem.quantity}
                                onChange={(e) => {
                                  const newQuantity = Number(e.target.value)

                                  setCartItems((prev) =>
                                    prev.map((item) =>
                                      item.productId === cartItem.productId
                                        ? { ...item, quantity: newQuantity }
                                        : item
                                    )
                                  )
                                }}
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
                            </span>
                          </dd>
                        </dl>
                      </div>
                      <div className="cart-list-item-subtotal">
                        <dl className="cart-list-item-subtotal-dl">
                          <dt className="cart-list-item-subtotal-label show-sp">小計</dt>
                          <dd className="cart-list-item-subtotal-value"> 
                            <span className="price-unit">&yen;</span><span className="price-value">{subtotal.toLocaleString()}</span><span className="tax-label show-sp">(税込)</span>
                          </dd>
                        </dl>
                      </div>
                      <div className="cart-list-item-remove">
                        <button onClick={() => handleRemove(cartItem.productId)} className="cart-list-item-remove-btn">×削除</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="cart-list-total">
              <dl className="cart-list-total-dl">
                <dt className="cart-list-total-label">商品代金合計</dt>
                <dd className="cart-list-total-value">
                  <span className="price-unit">&yen;</span>
                  <span className="price-value">{total.toLocaleString()}</span>
                  <span className="tax-label">(税込)</span>
                </dd>
              </dl>
            </div>
            <div className="btns">
              <Link to="/products" className="btn btn-primary btn-size-l">お買い物を続ける</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}