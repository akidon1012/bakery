import { useId } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import './ProductSlider.scss'
import type { Product } from '../../types/Product'
import type { CartItem } from '../../types/CartItem'
import { ProductCardContent } from '../ProductCard/ProductCard'

import {
  getProductCardClassName,
  PRODUCT_SLIDER_SLIDES_PER_GROUP_PC,
  PRODUCT_SLIDER_SLIDES_PER_VIEW_PC,
} from '../../utils/products'

type Props = {
  className: string
  title: string
  products: Product[]
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ProductSlider({
  className,
  title,
  products,
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: Props) {
  const sliderId = useId().replace(/:/g, '')
  const prevId = `product-slider-prev-${sliderId}`
  const nextId = `product-slider-next-${sliderId}`

  if (products.length === 0) return null

  const cardProps = {
    setCartItems,
    onOpenCartModal,
    favorites,
    setFavorites,
  }

  return (
    <section className={className}>
      <h2 className="section-header">{title}</h2>
      <div className="product-slider">
        <button
          type="button"
          id={prevId}
          className="swiper-prev"
          aria-label="前の商品"
        />
        <button
          type="button"
          id={nextId}
          className="swiper-next"
          aria-label="次の商品"
        />
        <Swiper
          className="product-slider-list swiper"
          wrapperTag="ul"
          modules={[Navigation]}
          slidesPerView={2}
          slidesPerGroup={2}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: PRODUCT_SLIDER_SLIDES_PER_VIEW_PC,
              slidesPerGroup: PRODUCT_SLIDER_SLIDES_PER_GROUP_PC,
              spaceBetween: 32,
            },
          }}
          navigation={{
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              tag="li"
              className={getProductCardClassName(product, 'swiper-slide')}
            >
              <ProductCardContent product={product} {...cardProps} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
