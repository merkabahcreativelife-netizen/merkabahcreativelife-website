import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("merkabah_cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("merkabah_cart", JSON.stringify(items)); }, [items]);

  const add = (p) => setItems(prev => {
    const ex = prev.find(i => i.id === p.id);
    if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { id: p.id, name: p.name, price: p.discount_price || p.price || 0, image: p.image, qty: 1 }];
  });
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const setQty = (id, qty) => setItems(prev => qty <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, qty } : i));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return <CartContext.Provider value={{ items, add, remove, setQty, clear, total, count }}>{children}</CartContext.Provider>;
}
