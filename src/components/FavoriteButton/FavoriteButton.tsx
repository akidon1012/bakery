import type { MouseEvent } from 'react'
import './FavoriteButton.scss'
import { HeartIcon } from '../icons'
import { isFavorite, toggleFavorite } from '../../utils/favorites'

type Props = {
  productId: string
  productName: string
  favorites: string[]
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function FavoriteButton({
  productId,
  productName,
  favorites,
  setFavorites,
  className,
  onClick,
}: Props) {
  const active = isFavorite(favorites, productId)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    setFavorites((prev) => toggleFavorite(prev, productId))
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active
          ? `${productName}をお気に入りから削除`
          : `${productName}をお気に入りに追加`
      }
      className={`favorite-button ${active ? 'is_active' : ''}${className ? ` ${className}` : ''}`}
      onClick={handleClick}
    >
      <HeartIcon />
    </button>
  )
}
