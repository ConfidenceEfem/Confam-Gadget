import { useState } from 'react';
import GadgetArt from './GadgetArt.jsx';

export default function ProductImage({ product, color, className = '' }) {
  const [broken, setBroken] = useState(false);
  if (product.image && !broken) {
    return <img className={className} src={product.image} alt={product.name} loading="lazy" onError={() => setBroken(true)} />;
  }
  return <GadgetArt className={className} kind={product.art} color={color || product.color} title={product.name} />;
}
