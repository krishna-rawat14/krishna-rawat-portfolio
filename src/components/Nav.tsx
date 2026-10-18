import { useEffect, useRef, useState } from 'react';

const LINKS: [string, string][] = [
  ['Home', 'top'], ['About', 'about'], ['Projects', 'projects'], ['Experience', 'experience'],
  ['Skills', 'skills'], ['Certificates', 'certificates'], ['Resume', 'resume'], ['Contact', 'contact'],
];

/** Floating pill navigation with a sliding highlight that follows the section in view. */
export default function Nav() {
  const [active, setActive] = useState('top');
  const nl = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('header.hero, main section').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const place = () => {
      const a = nl.current?.querySelector<HTMLAnchorElement>('a.on');
      if (!a || !ind.current) return;
      ind.current.style.width = `${a.offsetWidth}px`;
      ind.current.style.transform = `translateX(${a.offsetLeft}px)`;
      nl.current?.scrollTo({ left: a.offsetLeft - 40, behavior: 'smooth' });
    };
    place();
    window.addEventListener('resize', place);
    window.addEventListener('load', place);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('load', place); };
  }, [active]);

  return (
    <nav aria-label="Main">
      <div id="nl" ref={nl}>
        <span id="ind" ref={ind} />
        {LINKS.map(([label, id]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
