import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products.js';
import ProductImage from '../components/ProductImage.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Stars from '../components/Stars.jsx';
import { Heart, Truck, Shield, Refresh, WhatsApp } from '../components/Icons.jsx';
import { money, waProduct, stockLabel } from '../utils.js';
import { useStore } from '../store.jsx';
import NotFound from './NotFound.jsx';

const swatches = ['#1f2937', '#cbd5e1', '#3b82f6', '#be123c', '#16a34a'];

export default function ProductDetail() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  const { addToCart, toggleWish, wish } = useStore();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);
  const [tab, setTab] = useState('desc');

  useEffect(() => { setQty(1); setColor(null); setTab('desc'); }, [slug]);
  const related = useMemo(() => p ? products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4) : [], [p]);
  if (!p) return <NotFound />;

  const cat = CATEGORIES.find((c) => c.slug === p.category);
  const out = p.stock === 'out';
  const liked = wish.includes(p.id);
  const colors = [p.color, ...swatches.filter((c) => c !== p.color)].slice(0, 4);
  const active = color || p.color;
  const saved = p.oldPrice - p.price;

  return (
    <div className="wrap pd">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?cat=${p.category}`}>{cat?.name}</Link> / <span>{p.name}</span>
      </nav>

      <div className="pd-grid">
        <div className="pd-gallery">
          <div className="pd-main">
            <ProductImage product={p} color={active} />
            {p.discount > 0 && <span className="badge-off big">-{p.discount}%</span>}
          </div>
        </div>

        <div className="pd-info">
          <Link to={`/shop?brand=${encodeURIComponent(p.brand)}`} className="pd-brand">{p.brand}</Link>
          <h1>{p.name}</h1>
          <div className="pd-rate"><Stars value={p.rating} /> <span>{p.rating} · {p.reviews} reviews</span></div>

          <div className="pd-price">
            <strong>{money(p.price)}</strong>
            <s>{money(p.oldPrice)}</s>
            <span className="save">Save {money(saved)}</span>
          </div>
          <p className={`pd-stock ${p.stock}`}><i /> {stockLabel[p.stock]}</p>

          <p className="pd-short">{p.description}</p>

          {!p.image && !p.art.match(/powerbank|charger|keyboard|router|tv/) && (
            <div className="pd-colors">
              <span>Colour</span>
              <div>{colors.map((c) => <button key={c} style={{ background: c }} className={c === active ? 'on' : ''} onClick={() => setColor(c)} aria-label={`Colour ${c}`} />)}</div>
            </div>
          )}

          <div className="pd-buy">
            <div className="qty" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">+</button>
            </div>
            <button className="btn big" disabled={out} onClick={() => addToCart(p, qty)}>{out ? 'Out of stock' : 'Add to cart'}</button>
            <button className={`like-lg ${liked ? 'on' : ''}`} onClick={() => toggleWish(p)} aria-label="Wishlist" aria-pressed={liked}><Heart filled={liked} /></button>
          </div>
          <a className="btn-wa" href={waProduct(p, qty)} target="_blank" rel="noreferrer"><WhatsApp width={20} height={20} /> {out ? 'Ask when it will be back' : 'Buy on WhatsApp'}</a>

          <ul className="pd-perks">
            <li><Truck /> Delivery in 24 to 48 hrs (Lagos)</li>
            <li><Shield /> 100% original with warranty</li>
            <li><Refresh /> 7-day return if faulty</li>
          </ul>
        </div>
      </div>

      <div className="tabs">
        <div className="tab-nav" role="tablist">
          <button className={tab === 'desc' ? 'on' : ''} onClick={() => setTab('desc')} role="tab">Description</button>
          <button className={tab === 'spec' ? 'on' : ''} onClick={() => setTab('spec')} role="tab">Specifications</button>
          <button className={tab === 'ship' ? 'on' : ''} onClick={() => setTab('ship')} role="tab">Delivery & returns</button>
        </div>
        <div className="tab-body">
          {tab === 'desc' && <p>{p.description} Every {p.brand} product at Confam Gadget is original and checked before dispatch. Message us on WhatsApp if you would like more photos or a video of the exact unit.</p>}
          {tab === 'spec' && (
            <table className="spec"><tbody>
              <tr><th>Brand</th><td>{p.brand}</td></tr>
              <tr><th>Category</th><td>{cat?.name}</td></tr>
              {p.specs.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}
              <tr><th>Warranty</th><td>{p.name.includes('Used') ? '3 months' : '12 months'}</td></tr>
            </tbody></table>
          )}
          {tab === 'ship' && (
            <ul className="plain">
              <li>Lagos: 24 to 48 hours. Pay on delivery available.</li>
              <li>Other states: 2 to 5 working days. Payment before dispatch.</li>
              <li>Faulty on arrival? Tell us within 7 days for a replacement or repair.</li>
            </ul>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section nopad">
          <div className="section-head"><h2>You may also like</h2><Link to={`/shop?cat=${p.category}`} className="see-all">See all</Link></div>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
