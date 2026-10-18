import { useEffect, useRef } from 'react';
import { reduce } from '../lib/motion';

interface Node { x: number; y: number; vx: number; vy: number }

/** Drifting nodes linked by proximity. The cursor attracts nearby nodes and lights their links. */
export default function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const x = c?.getContext('2d');
    if (!c || !x) return;
    const m = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf = 0;
    let nodes: Node[] = [];

    const draw = () => {
      x.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (reduce) break;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = m.x - n.x, dy = m.y - n.y;
        if (dx * dx + dy * dy < 30000) { n.x += dx * 0.006; n.y += dy * 0.006; }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 135) continue;
          const near = Math.hypot((a.x + b.x) / 2 - m.x, (a.y + b.y) / 2 - m.y) < 170;
          const al = (1 - d / 135) * (near ? 0.85 : 0.28);
          x.strokeStyle = near ? `rgba(198,255,61,${al})` : `rgba(124,92,255,${al})`;
          x.lineWidth = near ? 1.2 : 0.8;
          x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
        }
      }
      x.fillStyle = 'rgba(230,255,170,.85)';
      for (const n of nodes) { x.beginPath(); x.arc(n.x, n.y, 1.8, 0, Math.PI * 2); x.fill(); }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: Math.round(Math.min(95, (w * h) / 13000)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      }));
      if (reduce) draw();
    };
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      m.x = e.clientX - r.left; m.y = e.clientY - r.top;
    };

    window.addEventListener('resize', size);
    window.addEventListener('pointermove', move);
    size();
    if (!reduce) draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas id="net" ref={ref} aria-hidden="true" />;
}
