import type { ReactNode } from 'react';

interface Props { id: string; title: string; light?: boolean; children: ReactNode }

/** Page section with an animated heading underline and reveal-on-scroll. */
export default function Section({ id, title, light, children }: Props) {
  return (
    <section className={`s${light ? ' light' : ''}`} id={id}>
      <div className="wrap rv">
        <h2>{title}</h2>
        <div className="ul" />
        {children}
      </div>
    </section>
  );
}
