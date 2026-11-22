import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from '../config.js';
import { waLink } from '../utils.js';
import { WhatsApp } from './Icons.jsx';
import { useStore } from '../store.jsx';

export function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink(config.whatsapp.greeting)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <WhatsApp width={28} height={28} />
    </a>
  );
}

export function Toast() {
  const { toast } = useStore();
  return <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>;
}
