import type { Product } from '../../types/Product'

type Props = {
  product: Product
}

export default function Detail({ product }: Props) {
  return (
    <section className="detail-wrapper">
      <div className="detail">
        <div className="detail-img">
          <img src="https://placehold.jp/CCC/999/300x300.png" decoding="async" loading="lazy" alt="" />
        </div>
      </div>
      <h2>{product.name}</h2>
      <p>{product.price}円</p>
    </section>
  )
}
