import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="wrap page-empty">
      <h1>We couldn't find that page</h1>
      <p>The gadget may have sold out or the link is wrong.</p>
      <Link to="/shop" className="btn">Browse all gadgets</Link>
    </div>
  );
}
