import Section from './Section';
import { ACHIEVEMENTS, EXPERIENCE } from '../data/portfolio';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      {EXPERIENCE.map((e) => (
        <article className="xp panel" key={e.org} style={{ marginBottom: 20 }}>
          <h3>{e.role}</h3>
          <p style={{ margin: '8px 0 0', color: 'var(--ac)' }}>{e.org}</p>
          <p className="mono" style={{ margin: 0, color: 'var(--mut)' }}>{e.period}</p>
          <ul>{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        </article>
      ))}
      <h3 style={{ margin: '48px 0 18px', fontSize: 20 }}>Achievements</h3>
      <div className="sk">
        {ACHIEVEMENTS.map((a) => (
          <div className="panel" key={a.title}>
            <h3 style={{ fontSize: 16, marginBottom: 6 }}>{a.title}</h3>
            <p style={{ margin: 0, color: 'var(--mut)' }}>{a.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
