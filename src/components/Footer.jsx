import { Link } from 'react-router-dom';
import { config } from '../config.js';
import { CATEGORIES } from '../data/products.js';
import { Logo } from './Header.jsx';
import { Phone, Mail, Pin } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Logo light />
          <p className="footer-about">{config.brand.description}</p>
        </div>
        <div>
          <h4>Shop</h4>
          {CATEGORIES.slice(0, 6).map((c) => <Link key={c.slug} to={`/shop?cat=${c.slug}`}>{c.name}</Link>)}
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/contact#faq">Delivery & returns</Link>
          <Link to="/cart">My cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h4>Visit us</h4>
          <p className="fline"><Pin width={16} height={16} /> {config.contact.address}</p>
          <p className="fline"><Phone width={16} height={16} /> {config.contact.phone}</p>
          <p className="fline"><Mail width={16} height={16} /> {config.contact.email}</p>
        </div>
      </div>
      <div className="footer-bar"><div className="wrap">© {new Date().getFullYear()} {config.brand.name}. All rights reserved.</div></div>
    </footer>
  );
}
