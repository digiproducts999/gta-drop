import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const drawTarget = new Date('2026-11-23T22:00:00+05:30').getTime();

function useCountdown() {
  const [remaining, setRemaining] = useState(() => Math.max(0, drawTarget - Date.now()));
  useEffect(() => { const id = setInterval(() => setRemaining(Math.max(0, drawTarget - Date.now())), 1000); return () => clearInterval(id); }, []);
  const total = Math.floor(remaining / 1000);
  return { done: total <= 0, parts: [Math.floor(total / 86400), Math.floor(total / 3600) % 24, Math.floor(total / 60) % 60, total % 60].map(n => String(n).padStart(2, '0')) };
}

function Countdown({ compact = false }) {
  const { done, parts } = useCountdown();
  if (done) return <div className="draw-live"><i /> DRAW IN PROGRESS · VERIFIED RESULT PENDING</div>;
  return <div className={compact ? 'countdown compact' : 'countdown'}>{['DAYS','HOURS','MINUTES','SECONDS'].map((label, i) => <div className="time" key={label}><strong>{parts[i]}</strong><span>{label}</span></div>)}</div>;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false });
  const [error, setError] = useState('');
  const nav = [['THE DROP', 'details'], ['PROCESS', 'process'], ['THE DRAW', 'winner']];
  const openEntry = () => window.open('https://forms.gle/YsiQh7TeDDMDFZq28', '_blank', 'noopener,noreferrer');
  const submit = e => {
    e.preventDefault();
    if (!form.name.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g,'')) || !/^\S+@\S+\.\S+$/.test(form.email) || !form.consent) return setError('Please complete all required fields and confirm consent.');
    setSubmitted(true);
  };
  return <main>
    <header><a className="brand" href="#top" aria-label="GTADropZone home"><img src="/images/gdz-logo.jpeg" alt="GDZ"/><span>GTA<em>DROP</em>ZONE</span></a><button className="hamburger" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? '×' : '☰'}</button><nav className={menu ? 'open' : ''}>{nav.map(([name, id]) => <a onClick={() => setMenu(false)} href={'#'+id} key={id}>{name}</a>)}<button className="nav-entry" onClick={openEntry}>ENTER NOW</button></nav></header>
    <section id="top" className="hero">
      <div className="hero-image" aria-hidden="true"/>
      <div className="grain"/><div className="sun"/><div className="palms palm-left">♣</div><div className="palms palm-right">♣</div><div className="city"><span/><span/><span/><span/><span/><span/><span/></div>
      <div className="hero-copy"><p className="eyebrow">GTADROPZONE PRESENTS <b>•</b> A SPECIAL DROP</p><h1><em>GTA VI</em><span>GIVEAWAY</span></h1><p className="lead">ONE LUCKY WINNER.<br/>ONE EPIC GAMING EXPERIENCE.</p><div className="hero-actions"><button className="primary" onClick={openEntry}>ENTER THE GIVEAWAY <b>↗</b></button><a className="secondary" href="#process">HOW IT WORKS <b>↓</b></a></div></div>
      <div className="hero-bottom"><div><span>NEXT DRAW</span><b>23 NOV 2026 · 10:00 PM IST</b></div><Countdown compact/><a href="#details" className="scroll">SCROLL TO EXPLORE <i>↓</i></a></div>
    </section>
    <section id="details" className="details"><div className="section-title"><p>THE DROP / 01</p><h2>WORTH THE<br/><i>WAIT.</i></h2></div><div className="prize-card"><div className="prize-glow"/><div className="card-top"><span>THE PRIZE</span><b>01 / 01</b></div><h3>GTA GAME<br/><i>GIVEAWAY</i></h3><div className="price"><small>ENTRY CONTRIBUTION</small><strong>₹50</strong><span>Preview only · paid entry disabled</span></div></div><dl className="facts"><div><dt>DRAW DATE</dt><dd>23 NOVEMBER 2026</dd></div><div><dt>OPENING TIME</dt><dd>10:00 PM IST</dd></div><div><dt>SELECTION</dt><dd>RANDOM LUCKY DRAW</dd></div><div><dt>PRESENTED BY</dt><dd>GTADROPZONE</dd></div></dl><p className="legal-note">Paid entry remains disabled pending required legal and payment authorization. A compliant free-entry route must be offered where required.</p></section>
    <section className="ps5-feature"><div className="ps5-copy"><p className="eyebrow">GRAND PRIZE FEATURE</p><p className="ps5-kicker">PLAYSTATION <span>5</span></p><h2>PLAY THE<br/><i>NEXT ERA.</i></h2><p>The PS5 console takes centre stage in this drop, alongside the GTA game giveaway. The exact edition and prize contents will be confirmed in the official rules.</p><div className="ps5-specs"><span>01 CONSOLE</span><span>01 CONTROLLER</span><span>GTA GAME GIVEAWAY</span></div></div><div className="ps5-visual"><div className="ps5-ring"/><img src="/images/ps5-console.jpeg" alt="PlayStation 5 console and DualSense controller"/></div></section>
    <section className="clock-section"><p className="eyebrow">THE DRAW BEGINS IN</p><Countdown/><p className="timer-note">WHEN THE TIMER ENDS, THE DRAW IS CONDUCTED. THE WINNER IS ANNOUNCED HERE ONLY AFTER VERIFICATION.</p><p className="timezone">COUNTDOWN SHOWN IN ASIA/KOLKATA (IST)</p></section>
    <section id="process" className="process"><div className="section-title"><p>HOW IT WORKS / 02</p><h2>MAKE YOUR<br/><i>MOVE.</i></h2></div><div className="steps">{[['01','JOIN','Register with your name, Instagram username, and email. Only essential details, always.'],['02','GET YOUR ENTRY','After a valid, legally authorised entry, your Instagram username will be your unique entry ID.'],['03','LUCKY DRAW','Follow the announced transparent winner-selection process.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><i>↘</i></article>)}</div></section>
    <section id="winner" className="winner"><div className="winner-art"><div className="winner-sun"/><div className="winner-grid"/></div><div className="winner-copy"><p className="eyebrow">THE FINAL MOMENT / 03</p><h2>THE NEXT<br/>LUCKY WINNER<br/>COULD BE <i>YOU.</i></h2><p>Results will be published here only after a verified, auditable draw. No result has been announced.</p><div className="verify">◉ <span>VERIFIED DRAW<br/>RESULT PENDING</span></div></div></section>
    <section className="cta"><p>READY TO TAKE YOUR SHOT?</p><h2>YOUR GAME.<br/><i>YOUR DROP.</i></h2><button className="primary" onClick={openEntry}>ENTER THE GIVEAWAY <b>↗</b></button></section>
    <footer><a className="brand" href="#top" aria-label="GTADropZone home"><img src="/images/gdz-logo.jpeg" alt="GDZ"/><span>GTA<em>DROP</em>ZONE</span></a><div className="footer-links"><a href="#top">INSTAGRAM ↗</a><a href="mailto:hello@gtadropzone.com">CONTACT</a><a href="#terms">TERMS & CONDITIONS</a><a href="#privacy">PRIVACY POLICY</a><a href="#rules">GIVEAWAY RULES</a></div><p>GTADropZone is an independent giveaway brand and is not affiliated with Rockstar Games or Take-Two Interactive.</p><small>© 2026 GTADROPZONE. ALL RIGHTS RESERVED.</small></footer>
    {modal && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="entry-modal"><button className="close" onClick={() => setModal(false)}>×</button>{submitted ? <div className="success"><span>✓</span><p className="eyebrow">PREVIEW CONFIRMATION</p><h2>YOU’RE<br/><i>ON THE LIST.</i></h2><p>This is a frontend demonstration—no entry was saved, no payment was taken, and no OTP was sent.</p><button className="primary" onClick={() => setModal(false)}>CLOSE <b>×</b></button></div> : <><p className="eyebrow">SECURE REGISTRATION / PREVIEW</p><h2>JOIN THE<br/><i>DROP.</i></h2><p className="modal-intro">Complete the form to preview the registration flow. Real entry and OTP services are not enabled.</p><form onSubmit={submit}><label>FULL NAME<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" /></label><label>MOBILE NUMBER<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="10-digit mobile number" inputMode="numeric" /></label><label>EMAIL ADDRESS<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" type="email" /></label><label className="check"><input type="checkbox" checked={form.consent} onChange={e=>setForm({...form,consent:e.target.checked})}/><span>I consent to the use of my details solely for giveaway administration and accept the giveaway rules.</span></label>{error && <p className="form-error">{error}</p>}<button className="primary" type="submit">CONTINUE TO VERIFY <b>↗</b></button></form></>}</div></div>}
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
