import { useEffect, useRef, useState } from 'react';
import { reduce } from '../lib/motion';

interface Pt { x: number; y: number; c: 0 | 1 }
const H = 10;
const LR = 0.08;

/** A real 2-10-1 neural network trained live with SGD on the points you place. Not project data. */
export default function NeuralPlayground() {
  const cv = useRef<HTMLCanvasElement>(null);
  const cap = useRef<HTMLParagraphElement>(null);
  const cls = useRef<0 | 1>(0);
  const act = useRef({ rings: () => {}, clear: () => {} });
  const [cur, setCur] = useState<0 | 1>(0);

  useEffect(() => {
    const c = cv.current;
    const x = c?.getContext('2d');
    const hm = document.createElement('canvas');
    hm.width = 44; hm.height = 26;
    const hc = hm.getContext('2d');
    if (!c || !x || !hc) return;

    let w = 0, h = 0, raf = 0, epoch = 0, loss = 0, acc = 0, fr = 0;
    let pts: Pt[] = [];
    let W1: number[][] = [], b1: number[] = [], W2: number[] = [], b2 = 0;
    const rnd = () => (Math.random() - 0.5) * 1.2;

    const init = () => {
      W1 = Array.from({ length: H }, () => [rnd(), rnd()]);
      b1 = Array.from({ length: H }, () => rnd() * 0.3);
      W2 = Array.from({ length: H }, () => rnd());
      b2 = 0; epoch = 0;
    };
    const fwd = (px: number, py: number) => {
      const a: number[] = new Array(H);
      let z = b2;
      for (let i = 0; i < H; i++) { a[i] = Math.tanh(W1[i][0] * px + W1[i][1] * py + b1[i]); z += W2[i] * a[i]; }
      return { a, p: 1 / (1 + Math.exp(-z)) };
    };
    const train = (n: number) => {
      if (!pts.length) return;
      for (let s = 0; s < n; s++) {
        const q = pts[Math.floor(Math.random() * pts.length)];
        const { a, p } = fwd(q.x, q.y);
        const d = p - q.c;
        for (let i = 0; i < H; i++) {
          const da = d * W2[i] * (1 - a[i] * a[i]);
          W2[i] -= LR * d * a[i]; W1[i][0] -= LR * da * q.x; W1[i][1] -= LR * da * q.y; b1[i] -= LR * da;
        }
        b2 -= LR * d;
      }
      epoch += n;
    };
    const metrics = () => {
      if (!pts.length) { loss = acc = 0; return; }
      let l = 0, k = 0;
      for (const q of pts) {
        const p = fwd(q.x, q.y).p;
        l -= q.c ? Math.log(p + 1e-9) : Math.log(1 - p + 1e-9);
        if ((p > 0.5) === !!q.c) k++;
      }
      loss = l / pts.length; acc = k / pts.length;
    };
    const draw = () => {
      x.clearRect(0, 0, w, h);
      const id = hc.createImageData(44, 26);
      for (let i = 0; i < 44; i++) for (let j = 0; j < 26; j++) {
        const p = fwd(((i + 0.5) / 44) * 2 - 1, ((j + 0.5) / 26) * 2 - 1).p;
        const k = Math.abs(p - 0.5) * 2, o = (j * 44 + i) * 4, v = p > 0.5;
        id.data[o] = v ? 124 : 198; id.data[o + 1] = v ? 92 : 255; id.data[o + 2] = v ? 255 : 61;
        id.data[o + 3] = Math.round(255 * (v ? 0.08 + 0.4 * k : 0.06 + 0.3 * k));
      }
      hc.putImageData(id, 0, 0);
      x.imageSmoothingEnabled = true;
      x.drawImage(hm, 0, 0, w, h);
      for (const q of pts) {
        x.beginPath(); x.arc(((q.x + 1) / 2) * w, ((q.y + 1) / 2) * h, 5, 0, Math.PI * 2);
        x.fillStyle = q.c ? '#7C5CFF' : '#C6FF3D'; x.fill();
        x.lineWidth = 1.5; x.strokeStyle = '#fff'; x.stroke();
      }
      if (cap.current) cap.current.textContent = pts.length
        ? `${pts.length} points | epoch ${epoch} | loss ${loss.toFixed(3)} | accuracy ${Math.round(acc * 100)}%`
        : 'Click the canvas to place points. Pick a color above, or press Rings.';
    };
    const frame = () => { train(20); if (++fr % 8 === 0) metrics(); draw(); raf = requestAnimationFrame(frame); };
    const refresh = () => { if (reduce) { train(1500); metrics(); draw(); } };
    const blobs = () => {
      pts = [];
      for (let i = 0; i < 14; i++) {
        pts.push({ x: -0.5 + (Math.random() - 0.5) * 0.5, y: -0.3 + (Math.random() - 0.5) * 0.5, c: 0 });
        pts.push({ x: 0.5 + (Math.random() - 0.5) * 0.5, y: 0.3 + (Math.random() - 0.5) * 0.5, c: 1 });
      }
    };
    const rings = () => {
      pts = [];
      for (let i = 0; i < 22; i++) {
        let a = Math.random() * Math.PI * 2, r = 0.05 + Math.random() * 0.25;
        pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, c: 0 });
        a = Math.random() * Math.PI * 2; r = 0.58 + Math.random() * 0.3;
        pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r, c: 1 });
      }
    };
    const size = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) refresh(); else draw();
    };
    const down = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      pts.push({ x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1, c: cls.current });
      refresh();
    };

    act.current = {
      rings: () => { init(); rings(); refresh(); },
      clear: () => { init(); pts = []; refresh(); draw(); },
    };
    c.addEventListener('pointerdown', down);
    window.addEventListener('resize', size);
    init(); blobs(); size();
    if (!reduce) frame();
    return () => { cancelAnimationFrame(raf); c.removeEventListener('pointerdown', down); window.removeEventListener('resize', size); };
  }, []);

  const pick = (c: 0 | 1) => { cls.current = c; setCur(c); };

  return (
    <div className="gd panel">
      <div className="gdh"><b>Teach a tiny neural network</b><span>runs live in your browser</span></div>
      <canvas id="gd" ref={cv} aria-label="Interactive demo: click to add points and watch a small neural network learn to separate two classes" />
      <div className="gdc">
        <button type="button" className={`chipb${cur === 0 ? ' on' : ''}`} aria-pressed={cur === 0} onClick={() => pick(0)}>Lime points</button>
        <button type="button" className={`chipb v${cur === 1 ? ' on' : ''}`} aria-pressed={cur === 1} onClick={() => pick(1)}>Violet points</button>
        <button type="button" className="chipb" onClick={() => act.current.rings()}>Rings</button>
        <button type="button" className="chipb" onClick={() => act.current.clear()}>Clear</button>
      </div>
      <p ref={cap} />
    </div>
  );
}
