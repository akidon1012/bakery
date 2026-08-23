import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './AddCartModal.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function AddCartModal({
  isOpen,
  onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    }

    if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      className="modal add-cart-modal"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      >
        <div className="modal-inner">
          <p className="modal-message">
            買い物かごに追加しました
          </p>

          <div className="modal-btns">
            <button
              type="button"
              className="btn btn-secondary btn-size-m"
              onClick={onClose}
            >
              閉じる
            </button>

            <Link
              to="/cart"
              className="btn btn-primary btn-size-m"
              onClick={onClose}
            >
              買い物かごを見る
            </Link>
          </div>
        </div>
    </dialog>
  )
}