import type { Product } from '../types/Product'
import type { CartItem } from '../types/CartItem'

const SLIDER_CACHE_TTL_MS = 24 * 60 * 60 * 1000

export const PRODUCT_SLIDER_MAX_COUNT = 12
export const PRODUCT_SLIDER_MIN_COUNT = 4
export const PRODUCT_SLIDER_SLIDES_PER_VIEW_PC = 4
export const PRODUCT_SLIDER_SLIDES_PER_GROUP_PC = 4

type FilterOptions = {
  excludeIds?: string[]
  limit?: number
}

type CachedSelection = {
  ids: string[]
  cachedAt: number
}

function shuffleArray<T>(items: T[]): T[] {
  const result = [...items]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function mapIdsToProducts(ids: string[], allProducts: Product[]): Product[] {
  const productMap = new Map(allProducts.map((product) => [product.id, product]))

  return ids
    .map((id) => productMap.get(id))
    .filter((product): product is Product => product !== undefined)
}

function filterProducts(
  allProducts: Product[],
  options: FilterOptions & { categories?: string[] } = {}
): Product[] {
  const { excludeIds = [], categories, limit } = options
  const excludeSet = new Set(excludeIds)
  const categorySet = categories ? new Set(categories) : null

  const filtered = allProducts.filter((product) => {
    if (excludeSet.has(product.id)) return false
    if (categorySet && !categorySet.has(product.category)) return false
    return true
  })

  return limit === undefined ? filtered : filtered.slice(0, limit)
}

function getCachedRandomIds(
  storageKey: string,
  candidateIds: string[],
  limit: number
): string[] {
  const saved = localStorage.getItem(storageKey)

  if (saved) {
    const cached = JSON.parse(saved) as CachedSelection
    const isExpired = Date.now() - cached.cachedAt >= SLIDER_CACHE_TTL_MS
    const validIds = cached.ids.filter((id) => candidateIds.includes(id))

    if (!isExpired && validIds.length > 0) {
      return validIds.slice(0, limit)
    }
  }

  const ids = shuffleArray(candidateIds).slice(0, limit)
  const cache: CachedSelection = {
    ids,
    cachedAt: Date.now(),
  }

  localStorage.setItem(storageKey, JSON.stringify(cache))
  return ids
}

export function getRandomSliderProducts(
  allProducts: Product[],
  cacheKey: string,
  options: FilterOptions = {}
): Product[] {
  const { limit = PRODUCT_SLIDER_MAX_COUNT, excludeIds = [] } = options
  const candidates = filterProducts(allProducts, { excludeIds })
  const candidateIds = candidates.map((product) => product.id)

  if (candidateIds.length === 0) return []

  let selectedIds = getCachedRandomIds(cacheKey, candidateIds, limit)

  if (selectedIds.length < limit) {
    const selectedSet = new Set(selectedIds)
    const remainingIds = shuffleArray(
      candidateIds.filter((id) => !selectedSet.has(id))
    )
    selectedIds = [...selectedIds, ...remainingIds].slice(0, limit)
  }

  return mapIdsToProducts(selectedIds, allProducts)
}

export function getSameCategoryProducts(
  allProducts: Product[],
  category: string,
  options: FilterOptions = {}
): Product[] {
  return filterProducts(allProducts, {
    ...options,
    categories: [category],
  })
}

export function getCartCategoryProducts(
  allProducts: Product[],
  cartItems: CartItem[],
  options: FilterOptions = {}
): Product[] {
  const cartProductIds = cartItems.map((item) => item.productId)
  const cartProducts = allProducts.filter((product) =>
    cartProductIds.includes(product.id)
  )
  const categories = [...new Set(cartProducts.map((product) => product.category))]

  if (categories.length === 0) return []

  return filterProducts(allProducts, {
    ...options,
    categories,
    excludeIds: [...(options.excludeIds ?? []), ...cartProductIds],
  })
}

export function getCartSliderProducts(
  allProducts: Product[],
  cartItems: CartItem[]
): Product[] {
  const cartProductIds = cartItems.map((item) => item.productId)

  if (cartItems.length === 0) {
    return getRandomSliderProducts(
      allProducts,
      PRODUCT_SLIDER_CACHE_KEYS.cartRecommended
    )
  }

  const categoryProducts = getCartCategoryProducts(allProducts, cartItems).slice(
    0,
    PRODUCT_SLIDER_MAX_COUNT
  )

  if (categoryProducts.length >= PRODUCT_SLIDER_MIN_COUNT) {
    return categoryProducts
  }

  const excludedIds = new Set([
    ...cartProductIds,
    ...categoryProducts.map((product) => product.id),
  ])
  const needCount = Math.min(
    PRODUCT_SLIDER_MIN_COUNT - categoryProducts.length,
    PRODUCT_SLIDER_MAX_COUNT - categoryProducts.length
  )

  const randomProducts = getRandomSliderProducts(
    allProducts,
    PRODUCT_SLIDER_CACHE_KEYS.cartRecommended,
    {
      excludeIds: [...excludedIds],
      limit: needCount,
    }
  )

  return [...categoryProducts, ...randomProducts].slice(0, PRODUCT_SLIDER_MAX_COUNT)
}

export const PRODUCT_SLIDER_CACHE_KEYS = {
  topNewArrivals: 'productSlider:top:newArrivals',
  topRecommended: 'productSlider:top:recommended',
  cartRecommended: 'productSlider:cart:recommended',
} as const

export function getProductCardClassName(
  product: Product,
  extraClassName?: string
) {
  return [
    'item-list-item',
    product.stock === 0 && 'is_soldout',
    extraClassName,
  ]
    .filter(Boolean)
    .join(' ')
}