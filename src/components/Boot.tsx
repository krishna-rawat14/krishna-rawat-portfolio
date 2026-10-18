import { useCallback, useEffect, useRef, useState } from 'react';
import { reduce } from '../lib/motion';

const LINES = [
  '> boot krishna.rawat/portfolio',
  '> loading modules: web, ml, robotics ... ok',
  '> warming up neural canvas ... ok',
  '> training intro model: epoch 1/3 ... 2/3 ... 3/3',
  '> ready.',
];

/** Short terminal-style intro. Plays once per session, skippable, disabled for reduced motion. */
export default function Boot({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [off, setOff] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setOff(true);
    onDone();
    try { sessionStorage.setItem('kr-boot', '1'); } catch { /* storage unavailable */ }
  }, [onDone]);

  useEffect(() => {
    let seen = false;
    try { seen = !!sessionStorage.getItem('kr-boot'); } catch { /* storage unavailable */ }
    if (reduce || seen) { done.current = true; setOff(true); onDone(); return; }
    let timer = 0;
    const step = (i: number) => {
      if (done.current) return;
      if (i >= LINES.length) { timer = window.setTimeout(finish, 450); return; }
      setShown(i + 1);
      timer = window.setTimeout(() => step(i + 1), i === 3 ? 650 : 380);
    };
    step(0);
    window.addEventListener('keydown', finish, { once: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('keydown', finish); };
  }, [finish, onDone]);

  return (
    <div id="boot" className={off ? 'off' : ''} role="status" aria-label="Loading" onClick={finish}>
      <div>{LINES.slice(0, shown).map((l) => <div key={l}>{l}</div>)}</div>
      <div className="pb"><i style={{ width: `${(shown / LINES.length) * 100}%` }} /></div>
      <small>Press any key or tap to skip</small>
    </div>
  );
}
