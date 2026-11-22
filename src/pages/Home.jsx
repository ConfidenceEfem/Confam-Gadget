import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider.jsx';
import GadgetArt from '../components/GadgetArt.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Arrow, Truck, Shield, Refresh, Wallet, WhatsApp } from '../components/Icons.jsx';
import { config } from '../config.js';
import { CATEGORIES, BRANDS, products } from '../data/products.js';
import { waLink } from '../utils.js';

function useCountdown() {
  const end = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d.getTime(); };
  const [left, setLeft] = useState(end() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, end() - Date.now())), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000), s = Math.floor((left % 60000) / 1000);
  return [h, m, s].map((v) => String(v).padStart(2, '0'));
}

function Section({ title, to, children, tint }) {
  return (
    <section className={`section ${tint ? 'tint' : ''}`}>
      <div className="wrap">
        <div className="section-head">
          <h2>{title}</h2>
          {to && <Link to={to} className="see-all">See all <Arrow /></Link>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [h, m, s] = useCountdown();
  const flash = products.filter((p) => p.tags.includes('flash') && p.stock !== 'out').slice(0, 4);
  const best = products.filter((p) => p.tags.includes('best')).slice(0, 8);
  const fresh = products.filter((p) => p.tags.includes('new')).slice(0, 4);
  const [b1, b2] = config.sideBanners;

  return (
    <>
      <div className="wrap hero-grid">
        <HeroSlider />
        <div className="side-banners">
          {[b1, b2].map((b) => (
            <Link key={b.title} to={b.to} className={`sbanner ${b.tone}`}>
              <div>
                <small>{b.kicker}</small>
                <b>{b.title}</b>
                <span>{b.sub}</span>
                <em>Shop now <Arrow /></em>
              </div>
              <GadgetArt kind={b.art} color={b.color} />
            </Link>
          ))}
        </div>
      </div>

      <div className="wrap trust">
        {[[Truck, 'Fast delivery', '24 to 48 hrs in Lagos'], [Shield, '100% original', 'With warranty'], [Refresh, '7-day returns', 'If it arrives faulty'], [Wallet, 'Pay on delivery', 'Available in Lagos']].map(([I, t, d]) => (
          <div key={t}><I /><span><b>{t}</b><small>{d}</small></span></div>
        ))}
      </div>

      <Section title="Shop by category">
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/shop?cat=${c.slug}`} className="cat-tile">
              <span className="cat-art"><GadgetArt kind={c.art} color={c.color} /></span>
              <b>{c.name}</b>
              <small>{products.filter((p) => p.category === c.slug).length} items</small>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="⚡ Flash Sale" to="/shop?deals=1" tint>
        <div className="flash-bar">
          <span>Ends in</span>
          <div className="timer"><b>{h}</b>:<b>{m}</b>:<b>{s}</b></div>
          <small>Prices reset at midnight</small>
        </div>
        <div className="grid">{flash.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <Section title="Best Sellers" to="/shop?sort=popular">
        <div className="grid">{best.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <div className="wrap">
        <div className="promo">
          <div>
            <small>Order in minutes</small>
            <h3>Browse, add to cart and checkout on WhatsApp</h3>
            <p>No account needed. We confirm stock, delivery fee and payment with you directly.</p>
            <a className="btn-white" href={waLink(config.whatsapp.greeting)} target="_blank" rel="noreferrer"><WhatsApp width={18} height={18} /> Chat with us</a>
          </div>
          <div className="promo-art"><GadgetArt kind="phone" color="#1f2937" /><GadgetArt kind="earbuds" color="#f8fafc" /><GadgetArt kind="watch" color="#f97316" /></div>
        </div>
      </div>

      <Section title="New Arrivals" to="/shop?sort=new">
        <div className="grid">{fresh.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <Section title="Top brands" tint>
        <div className="brands">
          {['Apple', 'Samsung', 'Sony', 'HP', 'JBL', 'Anker', 'Tecno', 'Infinix', 'Xiaomi', 'LG'].filter((b) => BRANDS.includes(b)).map((b) => (
            <Link key={b} to={`/shop?brand=${encodeURIComponent(b)}`}>{b}</Link>
          ))}
        </div>
      </Section>
    </>
  );
}
