import type { Product } from '../../types/Product'


type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <li className="item-list-item" key={product.id}>
      <div className="item-list-item-img">
        <a href=""><img src="https://placehold.jp/CCC/999/300x300.png" decoding="async" loading="lazy" alt="" /></a>
      </div>
      <h2 className="item-list-item-name"><a href="">{product.name}</a></h2>
      <div className="item-list-item-price">
        <span className="price-unit">&yen;</span>
        <span className="price-value">{product.price}</span>
        <span className="tax-label">(税込)</span>
      </div>
      <p></p>
    </li>
  )
}