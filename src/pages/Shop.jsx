import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { Filter, Close, Star, Chevron } from '../components/Icons.jsx';
import { CATEGORIES, BRANDS, products } from '../data/products.js';
import { config } from '../config.js';
import { money } from '../utils.js';

const SORTS = [
  ['relevance', 'Relevance'],
  ['popular', 'Popularity'],
  ['new', 'Newest'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['rating', 'Top rated'],
  ['discount', 'Biggest discount'],
];
const PRICE_CHIPS = [['Under ₦50K', 0, 50000], ['₦50K to ₦200K', 50000, 200000], ['₦200K to ₦500K', 200000, 500000], ['Above ₦500K', 500000, '']];

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get('q') || '';
  const cat = sp.get('cat') || '';
  const brands = (sp.get('brand') || '').split(',').filter(Boolean);
  const min = sp.get('min') || '';
  const max = sp.get('max') || '';
  const rating = Number(sp.get('rating') || 0);
  const stock = sp.get('stock') === '1';
  const deals = sp.get('deals') === '1';
  const sort = sp.get('sort') || 'relevance';
  const page = Math.max(1, Number(sp.get('page') || 1));
  const [mobile, setMobile] = useState(false);
  const [minIn, setMinIn] = useState(min);
  const [maxIn, setMaxIn] = useState(max);
  const top = useRef(null);

  useEffect(() => { setMinIn(min); setMaxIn(max); }, [min, max]);
  useEffect(() => { document.body.style.overflow = mobile ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobile]);

  const update = (patch, keepPage = false) => {
    const n = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => { if (v === '' || v == null || v === false || (Array.isArray(v) && !v.length)) n.delete(k); else n.set(k, Array.isArray(v) ? v.join(',') : v === true ? '1' : v); });
    if (!keepPage) n.delete('page');
    setSp(n);
  };

  const base = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (term) {
        const hay = `${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase();
        if (!term.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
  }, [q]);

  const filtered = useMemo(() => {
    let r = base.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (min !== '' && p.price < Number(min)) return false;
      if (max !== '' && p.price > Number(max)) return false;
      if (rating && p.rating < rating) return false;
      if (stock && p.stock === 'out') return false;
      if (deals && !(p.tags.includes('flash') || p.discount >= 12)) return false;
      return true;
    });
    const by = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      popular: (a, b) => b.reviews - a.reviews,
      new: (a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')) || b.id - a.id,
      discount: (a, b) => b.discount - a.discount,
    }[sort];
    if (by) r = [...r].sort(by);
    return r;
  }, [base, cat, brands.join(), min, max, rating, stock, deals, sort]);

  const per = config.productsPerPage;
  const pages = Math.max(1, Math.ceil(filtered.length / per));
  const cur = Math.min(page, pages);
  const shown = filtered.slice((cur - 1) * per, cur * per);

  const goPage = (n) => {
    update({ page: n === 1 ? '' : n }, true);
    setTimeout(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  };

  // counts in the sidebar respond to the search term
  const catCount = (slug) => base.filter((p) => p.category === slug).length;
  const brandPool = [...new Set(base.filter((p) => !cat || p.category === cat).map((p) => p.brand))].sort();

  const chips = [];
  if (q) chips.push(['Search: ' + q, () => update({ q: '' })]);
  if (cat) chips.push([CATEGORIES.find((c) => c.slug === cat)?.name || cat, () => update({ cat: '' })]);
  brands.forEach((b) => chips.push([b, () => update({ brand: brands.filter((x) => x !== b) })]));
  if (min !== '' || max !== '') chips.push([`${min !== '' ? money(min) : '₦0'} – ${max !== '' ? money(max) : 'any'}`, () => update({ min: '', max: '' })]);
  if (rating) chips.push([`${rating}★ & up`, () => update({ rating: '' })]);
  if (stock) chips.push(['In stock only', () => update({ stock: '' })]);
  if (deals) chips.push(['Deals', () => update({ deals: '' })]);

  const title = cat ? CATEGORIES.find((c) => c.slug === cat)?.name : q ? `Results for “${q}”` : deals ? "Today's Deals" : 'All Products';

  const sidebar = (
    <div className="filters">
      <div className="f-block">
        <h3>Category</h3>
        <ul className="f-cats">
          <li><button className={!cat ? 'on' : ''} onClick={() => update({ cat: '' })}>All gadgets <small>{base.length}</small></button></li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}><button className={cat === c.slug ? 'on' : ''} onClick={() => update({ cat: c.slug })} disabled={!catCount(c.slug)}>{c.name} <small>{catCount(c.slug)}</small></button></li>
          ))}
        </ul>
      </div>
      <div className="f-block">
        <h3>Brand</h3>
        <div className="f-brands">
          {brandPool.map((b) => (
            <label key={b} className="check"><input type="checkbox" checked={brands.includes(b)} onChange={(e) => update({ brand: e.target.checked ? [...brands, b] : brands.filter((x) => x !== b) })} /><span>{b}</span></label>
          ))}
        </div>
      </div>
      <div className="f-block">
        <h3>Price (₦)</h3>
        <form className="f-price" onSubmit={(e) => { e.preventDefault(); update({ min: minIn, max: maxIn }); }}>
          <input inputMode="numeric" placeholder="Min" value={minIn} onChange={(e) => setMinIn(e.target.value.replace(/\D/g, ''))} aria-label="Minimum price" />
          <span>to</span>
          <input inputMode="numeric" placeholder="Max" value={maxIn} onChange={(e) => setMaxIn(e.target.value.replace(/\D/g, ''))} aria-label="Maximum price" />
          <button type="submit">Go</button>
        </form>
        <div className="f-chips">
          {PRICE_CHIPS.map(([l, a, b]) => <button key={l} className={String(a) === (min || '0') && String(b) === max ? 'on' : ''} onClick={() => update({ min: a === 0 ? '0' : a, max: b })}>{l}</button>)}
        </div>
      </div>
      <div className="f-block">
        <h3>Rating</h3>
        {[4, 3].map((r) => (
          <label key={r} className="check"><input type="radio" name="rating" checked={rating === r} onChange={() => update({ rating: r })} />
            <span className="rate-row">{[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={i <= r} />)} & up</span></label>
        ))}
        {rating > 0 && <button className="linkbtn" onClick={() => update({ rating: '' })}>Clear rating</button>}
      </div>
      <div className="f-block">
        <label className="check"><input type="checkbox" checked={stock} onChange={(e) => update({ stock: e.target.checked })} /><span>In stock only</span></label>
        <label className="check"><input type="checkbox" checked={deals} onChange={(e) => update({ deals: e.target.checked })} /><span>Deals only</span></label>
      </div>
      {chips.length > 0 && <button className="clear-all" onClick={() => setSp(new URLSearchParams())}>Clear all filters</button>}
    </div>
  );

  return (
    <div className="wrap shop">
      <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <span>{title}</span></nav>
      <div className="shop-layout">
        <aside className="shop-side">{sidebar}</aside>

        <section className="shop-main" ref={top}>
          <div className="shop-top">
            <div>
              <h1>{title}</h1>
              <p>{filtered.length} {filtered.length === 1 ? 'product' : 'products'} found</p>
            </div>
            <div className="shop-tools">
              <button className="btn-line show-sm" onClick={() => setMobile(true)}><Filter width={18} height={18} /> Filters{chips.length ? ` (${chips.length})` : ''}</button>
              <label className="sort">
                <span>Sort by</span>
                <select value={sort} onChange={(e) => update({ sort: e.target.value === 'relevance' ? '' : e.target.value })}>
                  {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
                <Chevron />
              </label>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="active-chips">
              {chips.map(([l, f]) => <button key={l} onClick={f}>{l} <Close width={14} height={14} /></button>)}
              <button className="linkbtn" onClick={() => setSp(new URLSearchParams())}>Clear all</button>
            </div>
          )}

          {shown.length ? (
            <div className="grid g3">{shown.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          ) : (
            <div className="empty">
              <h3>No gadgets match your search</h3>
              <p>Try a different word, or remove some filters.</p>
              <button className="btn" onClick={() => setSp(new URLSearchParams())}>Clear all filters</button>
            </div>
          )}

          {pages > 1 && (
            <nav className="pager" aria-label="Pagination">
              <button disabled={cur === 1} onClick={() => goPage(cur - 1)}>‹ Prev</button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={n === cur ? 'on' : ''} aria-current={n === cur ? 'page' : undefined} onClick={() => goPage(n)}>{n}</button>
              ))}
              <button disabled={cur === pages} onClick={() => goPage(cur + 1)}>Next ›</button>
            </nav>
          )}
          {shown.length > 0 && <p className="pager-note">Showing {(cur - 1) * per + 1} to {(cur - 1) * per + shown.length} of {filtered.length}</p>}
        </section>
      </div>

      {mobile && (
        <div className="drawer filter-drawer" role="dialog" aria-modal="true">
          <div className="drawer-bg" onClick={() => setMobile(false)} />
          <div className="drawer-panel right">
            <div className="drawer-head"><b>Filters</b><button className="icon-btn" onClick={() => setMobile(false)} aria-label="Close filters"><Close /></button></div>
            <div className="drawer-scroll">{sidebar}</div>
            <div className="drawer-foot"><button className="btn" onClick={() => setMobile(false)}>Show {filtered.length} results</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
