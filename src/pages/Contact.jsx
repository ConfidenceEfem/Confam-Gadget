import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { config } from '../config.js';
import { Phone, Mail, Pin, Clock, WhatsApp, Chevron } from '../components/Icons.jsx';
import { waLink } from '../utils.js';

export default function Contact() {
  const [f, setF] = useState({ name: '', phone: '', message: '' });
  const [open, setOpen] = useState(0);
  const { hash } = useLocation();
  useEffect(() => { if (hash === '#faq') setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 60); }, [hash]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    window.open(waLink(`Hello ${config.brand.name}, my name is ${f.name}${f.phone ? ` (${f.phone})` : ''}.\n\n${f.message}`), '_blank');
  };
  const c = config.contact;
  return (
    <div className="wrap contact">
      <h1>Contact us</h1>
      <p className="lead">Questions about a gadget, price or delivery? We usually reply within minutes.</p>
      <div className="contact-grid">
        <div className="contact-cards">
          <a className="ccard wa" href={waLink(config.whatsapp.greeting)} target="_blank" rel="noreferrer"><WhatsApp /><span><b>Chat on WhatsApp</b><small>The fastest way to order</small></span></a>
          <div className="ccard"><Phone /><span><b>Call us</b><small>{c.phone}</small></span></div>
          <div className="ccard"><Mail /><span><b>Email</b><small>{c.email}</small></span></div>
          <div className="ccard"><Pin /><span><b>Visit the shop</b><small>{c.address}</small></span></div>
          <div className="ccard"><Clock /><span><b>Opening hours</b>{c.hours.map(([d, h]) => <small key={d}>{d}: {h}</small>)}</span></div>
        </div>
        <form className="cform" onSubmit={send}>
          <h2>Send us a message</h2>
          <label>Your name<input required value={f.name} onChange={set('name')} placeholder="e.g. Chinedu" /></label>
          <label>Phone (optional)<input value={f.phone} onChange={set('phone')} inputMode="tel" placeholder="080…" /></label>
          <label>Message<textarea required rows="5" value={f.message} onChange={set('message')} placeholder="Which gadget are you looking for?" /></label>
          <button className="btn-wa" type="submit"><WhatsApp width={20} height={20} /> Send on WhatsApp</button>
        </form>
      </div>

      <section id="faq" className="faq">
        <h2>Delivery, payment & returns</h2>
        {config.faqs.map(([q, a], i) => (
          <div key={q} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>{q}<Chevron /></button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </section>
    </div>
  );
}
