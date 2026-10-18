import Section from './Section';
import { CERTIFICATES } from '../data/portfolio';
import { cssVar } from '../lib/motion';

/** Certificate cards styled like the project cards. Add `image` and `link` in the data file. */
export default function Certificates() {
  return (
    <Section id="certificates" title="Certificates">
      <p style={{ maxWidth: '40em', margin: '-18px 0 30px', color: 'var(--mut)' }}>Courses, bootcamps and job simulations I’ve completed.</p>
      <div className="pg cg" id="cg">
        {CERTIFICATES.map((c, i) => (
          <article className="card panel" key={c.name} style={cssVar('--d', i % 4)}>
            <div className="shot">
              {c.image
                ? <img src={c.image} alt={`Certificate: ${c.name}`} loading="lazy" />
                : <div className="pls"><i style={{ left: 12 }} /><i style={{ left: 26 }} /><i style={{ left: 40 }} /><span>Certificate image goes here</span></div>}
            </div>
            <div className="h"><h3>{c.name}</h3><span className="st yr">{c.year}</span></div>
            <p>{c.issuer}</p>
            <div className="chips">{c.tags?.map((t) => <span key={t} className="chip">{t}</span>)}</div>
            <div className="acts">
              {c.link
                ? <a href={c.link} target="_blank" rel="noreferrer">View certificate</a>
                : <span className="muted">Certificate link not added yet</span>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
