import { useRef } from 'react'
import './Top.scss'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import mv01 from '../../assets/images/mv/mv01.webp'
import mv01Sp from '../../assets/images/mv/mv01_sp.webp'
import mv02 from '../../assets/images/mv/mv02.webp'
import mv02Sp from '../../assets/images/mv/mv02_sp.webp'
import mv03 from '../../assets/images/mv/mv03.webp'
import mv03Sp from '../../assets/images/mv/mv03_sp.webp'

const mvSlides = [
  { pc: mv01, sp: mv01Sp },
  { pc: mv02, sp: mv02Sp },
  { pc: mv03, sp: mv03Sp },
]

export default function Top() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const paginationRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <section className="top-mv">
        <Swiper
          className="top-mv-list swiper"
          modules={[Autoplay, Navigation, Pagination]}
          loop
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
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    alt=""
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
          {mvSlides.map((slide, index) => (
            <SwiperSlide key={`mv-dup-${index}`} className="top-mv-list-item">
              <Link to="/products" className="top-mv-list-item-link">
                <picture>
                  <source srcSet={slide.sp} media="(max-width: 768px)" />
                  <img
                    src={slide.pc}
                    decoding="async"
                    loading="lazy"
                    alt=""
                  />
                </picture>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
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
      </section>
      <main className="contents">
        <section className="top-recommend">

        </section>
        <section className="top-category">
          <ul className="top-category-list"></ul>
        </section>
      </main>
    </div>
  )
}
