import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../store.jsx';

export default function Wishlist() {
  const { wish } = useStore();
  const items = products.filter((p) => wish.includes(p.id));
  return (
    <div className="wrap wishlist">
      <h1>Wishlist <small>({items.length})</small></h1>
      {items.length ? (
        <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <div className="page-empty">
          <p>Tap the heart on any product to save it here.</p>
          <Link to="/shop" className="btn">Browse gadgets</Link>
        </div>
      )}
    </div>
  );
}
