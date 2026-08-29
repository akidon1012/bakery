export function isFavorite(favorites: string[], productId: string): boolean {
  return favorites.includes(productId)
}

export function toggleFavorite(
  favorites: string[],
  productId: string
): string[] {
  if (isFavorite(favorites, productId)) {
    return favorites.filter((id) => id !== productId)
  }

  return [...favorites, productId]
}
