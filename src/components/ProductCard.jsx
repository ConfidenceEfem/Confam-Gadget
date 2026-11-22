import { Link } from 'react-router-dom';
import ProductImage from './ProductImage.jsx';
import Stars from './Stars.jsx';
import { Heart } from './Icons.jsx';
import { money } from '../utils.js';
import { useStore } from '../store.jsx';

export default function ProductCard({ p }) {
  const { addToCart, toggleWish, wish } = useStore();
  const liked = wish.includes(p.id);
  const out = p.stock === 'out';
  return (
    <article className="pcard">
      <Link to={`/product/${p.slug}`} className="pcard-media" aria-label={p.name}>
        <ProductImage product={p} />
        {p.discount > 0 && <span className="badge-off">-{p.discount}%</span>}
        {p.tags.includes('new') && <span className="badge-new">New</span>}
        {out && <span className="badge-out">Sold out</span>}
      </Link>
      <button className={`like ${liked ? 'on' : ''}`} onClick={() => toggleWish(p)} aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'} aria-pressed={liked}>
        <Heart filled={liked} width={18} height={18} />
      </button>
      <div className="pcard-body">
        <span className="pcard-brand">{p.brand}</span>
        <Link to={`/product/${p.slug}`} className="pcard-name">{p.name}</Link>
        <Stars value={p.rating} count={p.reviews} />
        <div className="pcard-price">
          <strong>{money(p.price)}</strong>
          <s>{money(p.oldPrice)}</s>
        </div>
        {p.stock === 'low' && <span className="low">Only a few left</span>}
      </div>
      <button className="pcard-add" disabled={out} onClick={() => addToCart(p)}>
        {out ? 'Out of stock' : 'Add to cart'}
      </button>
    </article>
  );
}
