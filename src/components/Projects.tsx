import { Fragment, useState } from 'react';
import Section from './Section';
import { PROJECTS, STATUS_LABEL, type Project } from '../data/portfolio';
import { cssVar } from '../lib/motion';

function Card({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const id = `cs${i}`;
  return (
    <article className="card panel" style={cssVar('--d', i % 4)}>
      <div className="shot">
        {p.image
          ? <img src={p.image} alt={`Screenshot of ${p.title}`} loading="lazy" />
          : <div className="pls"><i style={{ left: 12 }} /><i style={{ left: 26 }} /><i style={{ left: 40 }} /><span>Screenshot goes here</span></div>}
      </div>
      <div className="h"><h3>{p.title}</h3><span className={`st ${p.status}`}>{STATUS_LABEL[p.status]}</span></div>
      <p>{p.summary}</p>
      <div className="chips">{p.stack.map((s, j) => <span key={s} className="chip" style={cssVar('--c', j)}>{s}</span>)}</div>
      <div className={`cs${open ? ' open' : ''}`} id={id}>
        <div>
          <dl>
            <div className="flow" aria-label="Pipeline">
              {p.pipeline.map((x, j) => (
                <Fragment key={x}>{j > 0 && <em>&rarr;</em>}<span style={cssVar('--i', j)}>{x}</span></Fragment>
              ))}
            </div>
            <div><dt>Problem</dt><dd>{p.problem}</dd></div>
            <div><dt>Approach</dt><dd>{p.approach}</dd></div>
            <div><dt>Outcome</dt><dd>{p.outcome ?? 'No measured results yet. They will be added when the project is complete.'}</dd></div>
          </dl>
        </div>
      </div>
      <div className="acts">
        <button className="tg" type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          {open ? 'Hide case study' : 'Read case study'}
        </button>
        {p.github && <a href={p.github} target="_blank" rel="noreferrer">Code</a>}
        {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
        {!p.github && !p.demo && <span className="muted">No public links yet</span>}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects" light>
      <p style={{ maxWidth: '40em', margin: '-18px 0 30px', color: 'var(--mut)' }}>
        Every card shows its real status. Planned and in-progress work has no results attached.
      </p>
      <div className="pg" id="pg">{PROJECTS.map((p, i) => <Card key={p.title} p={p} i={i} />)}</div>
    </Section>
  );
}
