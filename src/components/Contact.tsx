import { useRef, useState, type FormEvent } from 'react';
import { CONFIG } from '../data/portfolio';
import { burst } from '../lib/confetti';

type Fields = { n: string; e: string; m: string };
type Result = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; text: string };

function validate(f: Fields): Partial<Fields> {
  const er: Partial<Fields> = {};
  if (f.n.trim().length < 2) er.n = 'Enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.e.trim())) er.e = 'Enter a valid email address.';
  if (f.m.trim().length < 20) er.m = 'Write at least 20 characters so I know how to help.';
  return er;
}

export default function Contact() {
  const [f, setF] = useState<Fields>({ n: '', e: '', m: '' });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [res, setRes] = useState<Result>({ kind: 'idle' });
  const btn = useRef<HTMLButtonElement>(null);
  const configured = Boolean(CONFIG.formEndpoint || CONFIG.email);

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    const er = validate(f);
    setErrors(er);
    if (Object.keys(er).length) return;
    if (CONFIG.formEndpoint) {
      setRes({ kind: 'sending' });
      try {
        const r = await fetch(CONFIG.formEndpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: f.n.trim(), email: f.e.trim(), message: f.m.trim() }),
        });
        if (!r.ok) throw new Error(`Server replied ${r.status}`);
        setRes({ kind: 'sent' });
        setF({ n: '', e: '', m: '' });
        const b = btn.current?.getBoundingClientRect();
        if (b) burst(b.left + b.width / 2, b.top);
      } catch (err) {
        setRes({ kind: 'error', text: `Message not sent (${err instanceof Error ? err.message : 'network error'}). Please try again or email directly.` });
      }
    } else {
      const body = `${f.m.trim()}\n\nFrom: ${f.n.trim()} (${f.e.trim()})`;
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`Portfolio message from ${f.n.trim()}`)}&body=${encodeURIComponent(body)}`;
      setRes({ kind: 'mailto' });
    }
  };

  const field = (k: keyof Fields, label: string, type = 'text') => (
    <>
      <label htmlFor={k}>{label}</label>
      {k === 'm'
        ? <textarea id={k} rows={5} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errors[k]} />
        : <input id={k} type={type} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!errors[k]} autoComplete={k === 'n' ? 'name' : 'email'} />}
      <div className="er">{errors[k]}</div>
    </>
  );

  return (
    <section className="s" id="contact">
      <div className="wrap rv">
        <div className="big">Let’s build<br /><span>something.</span></div>
        <div className="ct">
          <div>
            <p style={{ fontSize: 18, marginTop: 0 }}>Looking for an intern who ships web projects and is growing into AI/ML? Send a message.</p>
            <div style={{ display: 'grid', gap: 10, justifyItems: 'start' }}>
              {CONFIG.phone && <a className="btn" href={`tel:${CONFIG.phone.replace(/\s/g, '')}`}>{CONFIG.phone}</a>}
              {CONFIG.email && <a className="btn" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>}
              {CONFIG.github && <a className="btn" href={CONFIG.github} target="_blank" rel="noreferrer">GitHub</a>}
              {CONFIG.linkedin && <a className="btn" href={CONFIG.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>
          </div>
          <form className="panel" onSubmit={submit} noValidate>
            {!configured && <div className="note">The form isn’t connected yet. Add an email or a form endpoint in src/data/portfolio.ts.</div>}
            {field('n', 'Name')}{field('e', 'Email', 'email')}{field('m', 'Message')}
            <button className="btn p" type="submit" ref={btn} disabled={!configured || res.kind === 'sending'}>
              {res.kind === 'sending' ? 'Sending…' : CONFIG.formEndpoint || !configured ? 'Send message' : 'Open in email app'}
            </button>
            <div id="msg" role="status" aria-live="polite">
              {res.kind === 'sent' && <span style={{ color: '#C6FF3D' }}>Message sent. Thank you, I’ll reply by email.</span>}
              {res.kind === 'mailto' && 'Your email app should have opened with the message filled in. Nothing is sent until you press send there.'}
              {res.kind === 'error' && <span style={{ color: '#fda4af' }}>{res.text}</span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
