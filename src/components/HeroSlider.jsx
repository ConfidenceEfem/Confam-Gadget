import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../config.js';
import GadgetArt from './GadgetArt.jsx';
import { Arrow } from './Icons.jsx';

export default function HeroSlider() {
  const slides = config.heroSlides;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <div className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, k) => (
        <div key={s.title} className={`slide bg-${s.bg} ${k === i ? 'on' : ''}`} aria-hidden={k !== i}>
          <div className="slide-copy">
            <span className="slide-kicker">{s.kicker}</span>
            <h1>{s.title}</h1>
            <p className="slide-sale"><span>{s.sub}</span><b>{s.badge}</b></p>
            <p className="slide-note">{s.note}</p>
            <Link className="btn-white" to={s.link} tabIndex={k === i ? 0 : -1}>Shop now <Arrow /></Link>
          </div>
          <div className="slide-art"><span className="glow" /><GadgetArt kind={s.art} color={s.color} /></div>
        </div>
      ))}
      <div className="dots" role="tablist" aria-label="Slides">
        {slides.map((s, k) => <button key={s.title} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} aria-selected={k === i} role="tab" />)}
      </div>
    </div>
  );
}
