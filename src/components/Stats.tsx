import { useEffect, useRef } from 'react';
import { CERTIFICATES, PROJECTS, SKILLS } from '../data/portfolio';
import { reduce } from '../lib/motion';

/** Counts from 0 to the real value each time it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      if (reduce) { el.textContent = String(to); return; }
      cancelAnimationFrame(raf);
      const t0 = performance.now();
      const frame = (now: number) => {
        const p = Math.min((now - t0) / 1800, 1);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>0</b>;
}

export default function Stats() {
  const count = (s: string) => PROJECTS.filter((p) => p.status === s).length;
  const skills = Object.values(SKILLS).reduce((a, l) => a + l.length, 0);
  const items: [number, string][] = [
    [PROJECTS.length, 'Projects in portfolio'], [count('completed'), 'Completed'],
    [count('in-progress'), 'In progress'], [skills, 'Technologies and tools'], [CERTIFICATES.length, 'Certifications'],
  ];
  return (
    <div className="stl">
      <div className="wrap rv stats" id="stats">
        {items.map(([n, label]) => <div className="stat" key={label}><CountUp to={n} /><span>{label}</span></div>)}
      </div>
    </div>
  );
}
