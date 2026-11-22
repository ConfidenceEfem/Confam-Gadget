import { config } from './config.js';

export const money = (n) => config.currency + Math.round(n).toLocaleString('en-NG');

export const waLink = (text) =>
  `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(text)}`;

export const waProduct = (p, qty = 1) =>
  waLink(`Hello ${config.brand.name}, I want to order:\n\n${qty} x ${p.name}\nPrice: ${money(p.price * qty)}\n\nIs it available? Please confirm delivery fee and payment.`);

export const stockLabel = { in: 'In stock', low: 'Only a few left', out: 'Out of stock' };
