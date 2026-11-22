import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

const load = (k, d) => {
  try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('cg_cart', [])); // [{id, qty}]
  const [wish, setWish] = useState(() => load('cg_wish', [])); // [id]
  const [toast, setToast] = useState('');

  useEffect(() => save('cg_cart', cart), [cart]);
  useEffect(() => save('cg_wish', wish), [wish]);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((m) => setToast(m), []);

  const addToCart = useCallback((p, qty = 1) => {
    setCart((c) => {
      const f = c.find((x) => x.id === p.id);
      return f ? c.map((x) => (x.id === p.id ? { ...x, qty: Math.min(10, x.qty + qty) } : x)) : [...c, { id: p.id, qty }];
    });
    setToast(`${p.name} added to cart`);
  }, []);
  const setQty = (id, qty) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, Math.min(10, qty)) } : x)));
  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const clearCart = () => setCart([]);
  const toggleWish = (p) => {
    setWish((w) => (w.includes(p.id) ? w.filter((i) => i !== p.id) : [...w, p.id]));
    setToast(wish.includes(p.id) ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  const value = { cart, wish, toast, notify, addToCart, setQty, removeFromCart, clearCart, toggleWish,
    cartCount: cart.reduce((s, x) => s + x.qty, 0) };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
