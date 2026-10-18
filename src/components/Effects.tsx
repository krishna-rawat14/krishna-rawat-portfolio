import { useEffect, useRef } from 'react';
import { reduce } from '../lib/motion';

/** Scroll progress, cursor background glow, panel glow, card tilt, magnetic buttons, scroll reveal. */
export default function Effects() {
  const bar = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const d = document.documentElement;
      if (bar.current) bar.current.style.width = `${(d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const reveal = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach((el) => reveal.observe(el));

    let tx = innerWidth / 2, ty = innerHeight / 3, sx = tx, sy = ty, raf = 0;
    let tilt: HTMLElement | null = null, mag: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as Element;
      const panel = t.closest<HTMLElement>('.panel');
      if (panel) {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty('--mx', `${e.clientX - r.left}px`);
        panel.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const card = t.closest<HTMLElement>('.card');
      if (tilt && tilt !== card) tilt.style.transform = '';
      tilt = card;
      if (card) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
      }
      const btn = t.closest<HTMLElement>('.btn');
      if (mag && mag !== btn) mag.style.transform = '';
      mag = btn;
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      }
    };
    const loop = () => {
      sx += (tx - sx) * 0.12; sy += (ty - sy) * 0.12;
      if (spot.current) spot.current.style.transform = `translate3d(${sx}px,${sy}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) { window.addEventListener('pointermove', onMove); loop(); }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      reveal.disconnect();
    };
  }, []);

  return (
    <>
      <div id="bar" ref={bar} />
      <div id="spot" ref={spot} />
      <canvas id="cf" aria-hidden="true" />
    </>
  );
}
