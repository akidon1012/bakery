import { useRef } from 'react'
import './Top.scss'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProductSlider from '../../components/ProductSlider/ProductSlider'
import { products } from '../../data/products'
import {
  getRandomSliderProducts,
  PRODUCT_SLIDER_CACHE_KEYS,
} from '../../utils/products'
import type { CartItem } from '../../types/CartItem'

import mv01 from '../../assets/images/mv/mv01.webp'
import mv01Sp from '../../assets/images/mv/mv01_sp.webp'
import mv02 from '../../assets/images/mv/mv02.webp'
import mv02Sp from '../../assets/images/mv/mv02_sp.webp'
import mv03 from '../../assets/images/mv/mv03.webp'
import mv03Sp from '../../assets/images/mv/mv03_sp.webp'
import mv04 from '../../assets/images/mv/mv04.webp'
import mv04Sp from '../../assets/images/mv/mv04_sp.webp'

const mvSlides = [
  { pc: mv01, sp: mv01Sp },
  { pc: mv02, sp: mv02Sp },
  { pc: mv03, sp: mv03Sp },
  { pc: mv04, sp: mv04Sp },
  { pc: mv01, sp: mv01Sp },
  { pc: mv02, sp: mv02Sp },
  { pc: mv03, sp: mv03Sp },
  { pc: mv04, sp: mv04Sp },
]

type Props = {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
  onOpenCartModal: () => void
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Top({
  setCartItems,
  onOpenCartModal,
  favorites,
  setFavorites,
}: Props) {
  const newArrivalProducts = getRandomSliderProducts(
    products,
    PRODUCT_SLIDER_CACHE_KEYS.topNewArrivals
  )
  const recommendedProducts = getRandomSliderProducts(
    products,
    PRODUCT_SLIDER_CACHE_KEYS.topRecommended
  )
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const paginationRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <section className="top-mv">
      <button
          type="button"
          ref={prevRef}
          className="swiper-prev"
          aria-label="前のスライド"
        />
        <button
          type="button"
          ref={nextRef}
          className="swiper-next"
          aria-label="次のスライド"
        />
        <div ref={paginationRef} className="swiper-dots" />
        <Swiper
          className="top-mv-list swiper"
          modules={[Autoplay, Navigation, Pagination]}
          loop
          maxBackfaceHiddenSlides={0}
          speed={800}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1.2,
              centeredSlides: true,
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation === 'object') {
              swiper.params.navigation.prevEl = prevRef.current
              swiper.params.navigation.nextEl = nextRef.current
            }
            if (typeof swiper.params.pagination === 'object') {
              swiper.params.pagination.el = paginationRef.current
            }
          }}
        >
          {mvSlides.map((slide, index) => (
            <SwiperSlide key={`mv-${index}`} className="top-mv-list-item">
              <Link to="/products" className="top-mv-list-item-link">
                <picture>
                  <source srcSet={slide.sp} media="(max-width: 768px)" />
                  <img
                    src={slide.pc}
                    decoding="async"
                    alt=""
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="contents">
        <ProductSlider
          className="top-new"
          title="新着商品"
          products={newArrivalProducts}
          setCartItems={setCartItems}
          onOpenCartModal={onOpenCartModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <ProductSlider
          className="top-recommend"
          title="おすすめ商品"
          products={recommendedProducts}
          setCartItems={setCartItems}
          onOpenCartModal={onOpenCartModal}
          favorites={favorites}
          setFavorites={setFavorites}
        />
        <section className="top-category">
          <ul className="top-category-list"></ul>
        </section>
      </div>
    </div>
  )
}
