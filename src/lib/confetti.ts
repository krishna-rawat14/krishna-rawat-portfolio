import { reduce } from './motion';

interface Particle { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; c: string; l: number }
const COLORS = ['#C6FF3D', '#7C5CFF', '#5CF2C2', '#ffffff'];
let parts: Particle[] = [];
let running = false;

/** Confetti burst drawn on the #cf canvas rendered by <Effects />. */
export function burst(x: number, y: number) {
  const cv = document.getElementById('cf') as HTMLCanvasElement | null;
  const cx = cv?.getContext('2d');
  if (reduce || !cv || !cx) return;
  cv.width = innerWidth;
  cv.height = innerHeight;
  for (let i = 0; i < 110; i++) {
    const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, w: 6 + Math.random() * 6, c: COLORS[i % 4], l: 1 });
  }
  if (running) return;
  running = true;
  const frame = () => {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter((p) => p.l > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.vx *= 0.99; p.r += p.vr; p.l -= 0.011;
      cx.save();
      cx.globalAlpha = Math.max(p.l, 0);
      cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.w / 4, p.w, p.w / 2);
      cx.restore();
    }
    if (parts.length) requestAnimationFrame(frame);
    else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
  };
  frame();
}
