import './Header.scss';
import { Link } from 'react-router-dom'
import wheat from '../../assets/images/wheat.webp'
import { CartIcon } from '../icons'
import { HeartIcon } from '../icons'

export default function Header() {
  return (
    <div>
      <header className="header">
        <div className="header-inner">
          <h1 className="header-title">
            <Link to="/">Bakery <strong>MUGI</strong><img src={wheat} className="header-title-wheat" decoding="async" loading="lazy" alt="" /></Link>
          </h1>
          <nav className="header-nav">
            <ul className="header-nav-list">
             <li className="header-nav-list-item">
                <Link to="/favorites"><HeartIcon />お気に入り</Link>
              </li>
              <li className="header-nav-list-item">
                <Link to="/cart"><CartIcon />買い物かご</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}
