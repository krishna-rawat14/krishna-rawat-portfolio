import { useEffect, useRef, useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { CONFIG, ROLES } from '../data/portfolio';
import { burst } from '../lib/confetti';
import { reduce } from '../lib/motion';

const GLYPHS = '01<>/{}#$%';

function scramble(el: HTMLElement, final: string, ms = 800) {
  const t0 = performance.now();
  const frame = (t: number) => {
    const p = Math.min((t - t0) / ms, 1);
    el.textContent = [...final].map((c, i) => (i < p * final.length ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('');
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

export default function Hero({ ready }: { ready: boolean }) {
  const names = useRef<(HTMLSpanElement | null)[]>([]);
  const [typed, setTyped] = useState(reduce ? ROLES[0] : '');

  const runScramble = () => {
    if (reduce) return;
    names.current.forEach((el, i) => { if (el) window.setTimeout(() => scramble(el, el.dataset.f ?? ''), i * 200); });
  };

  useEffect(() => {
    if (!ready) return;
    const t = window.setTimeout(runScramble, 250);
    return () => window.clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (reduce) return;
    let ri = 0, ci = 0, del = false, timer = 0;
    const tick = () => {
      const w = ROLES[ri];
      setTyped(w.slice(0, ci));
      if (!del && ci === w.length) { del = true; timer = window.setTimeout(tick, 1500); return; }
      if (del && ci === 0) { del = false; ri = (ri + 1) % ROLES.length; }
      ci += del ? -1 : 1;
      timer = window.setTimeout(tick, del ? 28 : 65);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="hero" id="top">
      <NeuralCanvas />
      <div className="wrap hg">
        <div>
          <div
            className="tag panel" id="tag" role="button" tabIndex={0} title="Click for a surprise"
            onClick={(e) => burst(e.clientX, e.clientY)}
            onKeyDown={(e) => { if (e.key === 'Enter') { const r = e.currentTarget.getBoundingClientRect(); burst(r.left + r.width / 2, r.top); } }}
          >
            <b />Open to software, full-stack and AI/ML internships
          </div>
          <h1 aria-label="Krishna Rawat" onMouseEnter={runScramble}>
            <span aria-hidden="true" data-f="Krishna" ref={(el) => { names.current[0] = el; }}>Krishna</span>
            <span aria-hidden="true" data-f="Rawat" ref={(el) => { names.current[1] = el; }}>Rawat</span>
          </h1>
          <div className="type">I’m learning to build <span>{typed}</span><u /></div>
          <p className="lead">Aspiring AI/ML engineer, CSE student and web developer building practical AI-powered solutions. Second-year B.Tech at DIT University, Dehradun.</p>
          <div className="row">
            <a className="btn p" href="#projects">View projects</a>
            <a className="btn" href="#contact">Get in touch</a>
            <a className="btn" href="#resume">View resume</a>
            {CONFIG.github && <a className="btn" href={CONFIG.github} target="_blank" rel="noreferrer">GitHub</a>}
            {CONFIG.linkedin && <a className="btn" href={CONFIG.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          </div>
        </div>
        <figure className="me">
          <div className="orb" aria-hidden="true">
            <i style={{ left: '50%', top: 0 }}><b>Python</b></i>
            <i style={{ left: '100%', top: '50%' }}><b>Node.js</b></i>
            <i style={{ left: '50%', top: '100%' }}><b>React</b></i>
            <i style={{ left: 0, top: '50%' }}><b>Robotics</b></i>
          </div>
          <div className="ring" onClick={(e) => burst(e.clientX, e.clientY)}>
            {CONFIG.photo ? <img src={CONFIG.photo} alt="Portrait of Krishna Rawat" /> : <span aria-label="Photo placeholder">KR</span>}
          </div>
          <figcaption>Rishikesh, Uttarakhand</figcaption>
        </figure>
      </div>
    </header>
  );
}
