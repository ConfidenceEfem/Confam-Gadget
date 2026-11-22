import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { config } from '../config.js';
import { CATEGORIES } from '../data/products.js';
import { Cart, Heart, Search, Menu, Close, Headset, Chevron, Phone, Truck } from './Icons.jsx';
import GadgetArt from './GadgetArt.jsx';
import { useStore } from '../store.jsx';
import { waLink } from '../utils.js';

export function Logo({ light }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`} aria-label={config.brand.name}>
      <span className="logo-mark">
        <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
          <rect width="40" height="40" rx="11" fill="#1db4f5" />
          <path d="M26 13.5a9 9 0 1 0 0 13" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="29" cy="20" r="2.4" fill="#fff" />
        </svg>
      </span>
      <span className="logo-text"><b>{config.brand.first}</b><span>{config.brand.second}</span></span>
    </Link>
  );
}

export default function Header() {
  const { cartCount, wish } = useStore();
  const nav = useNavigate();
  const loc = useLocation();
  const [params] = [new URLSearchParams(loc.search)];
  const [q, setQ] = useState(params.get('q') || '');
  const [cat, setCat] = useState('');
  const [open, setOpen] = useState(false);
  const [allCats, setAllCats] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => { setOpen(false); setAllCats(false); }, [loc.pathname, loc.search]);
  useEffect(() => { if (loc.pathname !== '/shop') setQ(''); }, [loc.pathname]);
  useEffect(() => {
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setAllCats(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const submit = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q.trim()) sp.set('q', q.trim());
    if (cat) sp.set('cat', cat);
    nav(`/shop${sp.toString() ? `?${sp}` : ''}`);
  };

  const links = [
    ['/', 'Home', true],
    ['/shop', 'Shop All'],
    ['/shop?sort=popular', 'Best Sellers'],
    ['/shop?deals=1', "Today's Deals"],
    ['/shop?cat=phones', 'Phones'],
    ['/shop?cat=laptops', 'Laptops'],
    ['/shop?cat=audio', 'Audio'],
    ['/contact', 'Contact Us'],
  ];

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="wrap topbar-in">
          <span>{config.topBarText}</span>
          <span className="topbar-r"><Truck width={15} height={15} /> Free delivery in Lagos above {config.currency}{config.freeDeliveryAbove.toLocaleString()}</span>
        </div>
      </div>

      <div className="mainbar">
        <div className="wrap mainbar-in">
          <button className="icon-btn burger" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
          <Logo />

          <div className="allcats" ref={menuRef}>
            <button className="allcats-btn" onClick={() => setAllCats((v) => !v)} aria-expanded={allCats}>
              <Menu width={20} height={20} /> <span>All Categories</span>
            </button>
            {allCats && (
              <div className="allcats-menu" role="menu">
                {CATEGORIES.map((c) => (
                  <Link key={c.slug} to={`/shop?cat=${c.slug}`} role="menuitem">
                    <GadgetArt kind={c.art} color={c.color} /> {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <form className="search" onSubmit={submit} role="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for phones, laptops, brands…" aria-label="Search products" />
            <label className="search-cat">
              <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
              <Chevron />
            </label>
            <button type="submit" aria-label="Search"><Search /></button>
          </form>

          <nav className="actions" aria-label="Account actions">
            <a className="act hide-sm" href={waLink(config.whatsapp.greeting)} target="_blank" rel="noreferrer"><Headset /><span>Support</span></a>
            <Link className="act" to="/wishlist"><span className="act-ico"><Heart />{wish.length > 0 && <i>{wish.length}</i>}</span><span>Wishlist</span></Link>
            <Link className="act" to="/cart"><span className="act-ico"><Cart />{cartCount > 0 && <i>{cartCount}</i>}</span><span>My cart</span></Link>
          </nav>
        </div>
      </div>

      <div className="navbar">
        <div className="wrap navbar-in">
          <nav className="navlinks" aria-label="Main">
            {links.map(([to, label, end]) => (
              <NavLink key={to} to={to} end={end} className={() => (isActive(loc, to) ? 'on' : '')}>{label}</NavLink>
            ))}
          </nav>
          <span className="shipto"><Phone width={16} height={16} /> {config.contact.phone}</span>
        </div>
      </div>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true">
          <div className="drawer-bg" onClick={() => setOpen(false)} />
          <div className="drawer-panel">
            <div className="drawer-head"><Logo /><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu"><Close /></button></div>
            <p className="drawer-title">Shop by category</p>
            <div className="drawer-cats">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} to={`/shop?cat=${c.slug}`}><GadgetArt kind={c.art} color={c.color} /><span>{c.name}</span></Link>
              ))}
            </div>
            <p className="drawer-title">Pages</p>
            <div className="drawer-links">
              {links.filter((l) => !l[0].includes('cat=')).map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/cart">Cart</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function isActive(loc, to) {
  const [path, query] = to.split('?');
  if (loc.pathname !== path) return false;
  if (!query) return !loc.search || path !== '/shop';
  return loc.search.includes(query);
}
