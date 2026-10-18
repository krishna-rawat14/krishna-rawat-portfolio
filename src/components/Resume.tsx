import Section from './Section';
import { ACHIEVEMENTS, CERTIFICATES, CONFIG, EDUCATION, EXPERIENCE, LEARNING, LOCATION, PROJECTS, SCHOOLS, SKILLS, STATUS_LABEL, SUMMARY } from '../data/portfolio';

/** Resume built from the same data as the rest of the site. Print to save it as a PDF. */
export default function Resume() {
  const contact = [LOCATION, CONFIG.phone, CONFIG.email, CONFIG.github, CONFIG.linkedin].filter(Boolean).join(' | ');
  return (
    <Section id="resume" title="Resume">
      <div className="row">
        {CONFIG.resume
          ? <a className="btn p" href={CONFIG.resume} download>Download PDF</a>
          : <button className="btn p" type="button" onClick={() => window.print()}>Print / save as PDF</button>}
      </div>
      {!CONFIG.resume && <p className="rhint">If the button does nothing in your browser, press Ctrl+P (Cmd+P on Mac) and choose Save as PDF.</p>}
      <article className="paper" id="rdoc" style={{ marginTop: 26 }}>
        <header><h3>Krishna Rawat</h3><p>B.Tech Computer Science and Engineering (AI/ML and Robotics)</p><p>{contact}</p></header>
        <h4>Summary</h4><p>{SUMMARY}</p>
        <h4>Education</h4>
        <div className="rrow"><p><b>{EDUCATION.school}</b><br />{EDUCATION.degree}. {EDUCATION.specialization}</p><p>{EDUCATION.period}</p></div>
        {SCHOOLS.map((s) => <div className="rrow" key={s.name} style={{ marginTop: 10 }}><p><b>{s.name}</b><br />{s.level}</p><p>{s.year}</p></div>)}
        <h4>Experience</h4>
        {EXPERIENCE.map((e) => (
          <div key={e.org}>
            <div className="rrow" style={{ marginTop: 8 }}><p><b>{e.role}</b>, {e.org}</p><p>{e.period}</p></div>
            <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        ))}
        <h4>Projects</h4>
        <ul>
          {PROJECTS.filter((p) => p.status !== 'planned').map((p) => (
            <li key={p.title}><b>{p.title}</b> ({STATUS_LABEL[p.status].toLowerCase()}): {p.summary} <i>{p.stack.join(', ')}</i></li>
          ))}
        </ul>
        <h4>Technical skills</h4>
        {Object.entries(SKILLS).map(([g, l]) => <p key={g} style={{ margin: '4px 0' }}><b>{g}:</b> {l.join(', ')}</p>)}
        <p style={{ margin: '4px 0' }}><b>Currently learning:</b> {LEARNING.join(', ')}</p>
        {CERTIFICATES.length > 0 && (
          <>
            <h4>Certifications</h4>
            <ul>{CERTIFICATES.map((c) => <li key={c.name}>{c.name}{c.issuer ? `, ${c.issuer}` : ''}{c.year ? ` (${c.year})` : ''}</li>)}</ul>
          </>
        )}
        <h4>Achievements</h4>
        <ul>{ACHIEVEMENTS.map((a) => <li key={a.title}><b>{a.title}</b>: {a.detail}</li>)}</ul>
      </article>
    </Section>
  );
}
