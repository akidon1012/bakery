type Props = {
  setPage: (page: 'top' | 'list' | 'detail') => void
}

export default function Header({ setPage }: Props) {
  return (
    <header className="header">
      <h1 className="header-title">React Practice</h1>
      <div className="header-nav">
        <button onClick={() => setPage('top')}>TOP</button>
        <button onClick={() => setPage('list')}>商品一覧</button>
      </div>
    </header>
  )
}
