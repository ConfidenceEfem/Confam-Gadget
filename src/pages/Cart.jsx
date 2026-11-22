import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import ProductImage from '../components/ProductImage.jsx';
import { Trash, WhatsApp } from '../components/Icons.jsx';
import { useStore } from '../store.jsx';
import { config } from '../config.js';
import { money, waLink } from '../utils.js';

export default function Cart() {
  const { cart, setQty, removeFromCart, clearCart } = useStore();
  const items = cart.map((c) => ({ ...c, p: products.find((p) => p.id === c.id) })).filter((x) => x.p);
  const total = items.reduce((s, x) => s + x.p.price * x.qty, 0);
  const left = config.freeDeliveryAbove - total;

  const message = () => {
    const lines = items.map((x, i) => `${i + 1}. ${x.qty} x ${x.p.name} (${money(x.p.price)})`).join('\n');
    return `Hello ${config.brand.name}, I would like to place an order:\n\n${lines}\n\nTotal: ${money(total)}\n\nPlease confirm availability, delivery fee and payment.`;
  };

  if (!items.length) {
    return (
      <div className="wrap page-empty">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added any gadgets yet.</p>
        <Link to="/shop" className="btn">Start shopping</Link>
      </div>
    );
  }
  return (
    <div className="wrap cart">
      <h1>My cart <small>({items.length} {items.length === 1 ? 'item' : 'items'})</small></h1>
      <div className="cart-grid">
        <div className="cart-list">
          {items.map(({ p, qty }) => (
            <div key={p.id} className="cart-row">
              <Link to={`/product/${p.slug}`} className="cart-img"><ProductImage product={p} /></Link>
              <div className="cart-info">
                <Link to={`/product/${p.slug}`}>{p.name}</Link>
                <small>{p.brand}</small>
                <strong>{money(p.price)}</strong>
              </div>
              <div className="qty sm">
                <button onClick={() => setQty(p.id, qty - 1)} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(p.id, qty + 1)} aria-label="Increase">+</button>
              </div>
              <b className="cart-sub">{money(p.price * qty)}</b>
              <button className="icon-btn trash" onClick={() => removeFromCart(p.id)} aria-label={`Remove ${p.name}`}><Trash width={20} height={20} /></button>
            </div>
          ))}
          <button className="linkbtn" onClick={clearCart}>Clear cart</button>
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          <div className="sum-row"><span>Subtotal</span><b>{money(total)}</b></div>
          <div className="sum-row"><span>Delivery</span><b>{left <= 0 ? 'Free (Lagos)' : 'Confirmed on WhatsApp'}</b></div>
          <div className="sum-total"><span>Total</span><b>{money(total)}</b></div>
          {left > 0 && <p className="free-note">Add {money(left)} more for free delivery in Lagos.</p>}
          <a className="btn-wa" href={waLink(message())} target="_blank" rel="noreferrer"><WhatsApp width={20} height={20} /> Checkout on WhatsApp</a>
          <p className="sum-help">We reply within minutes to confirm stock, delivery and payment. Pay on delivery in Lagos.</p>
          <Link to="/shop" className="linkbtn">‹ Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
