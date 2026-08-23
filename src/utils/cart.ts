import type { CartItem } from '../types/CartItem'

export function mergeCartItems(items: CartItem[]): CartItem[] {
  const merged = new Map<string, number>()

  for (const item of items) {
    merged.set(item.productId, (merged.get(item.productId) ?? 0) + item.quantity)
  }

  return Array.from(merged, ([productId, quantity]) => ({ productId, quantity }))
}

export function addToCartItems(
  prev: CartItem[],
  productId: string,
  quantity: number,
  maxStock: number
): CartItem[] {
  const existingItem = prev.find((item) => item.productId === productId)

  if (!existingItem) {
    return [...prev, { productId, quantity: Math.min(quantity, maxStock) }]
  }

  return prev.map((item) =>
    item.productId === productId
      ? {
          ...item,
          quantity: Math.min(item.quantity + quantity, maxStock),
        }
      : item
  )
}
