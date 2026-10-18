import Section from './Section';
import NeuralPlayground from './NeuralPlayground';
import { ABOUT, EDUCATION, TARGET_ROLES } from '../data/portfolio';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="about">
        <div>
          {ABOUT.map((p) => <p key={p}>{p}</p>)}
          <p className="mono" style={{ margin: '26px 0 12px' }}>Looking for</p>
          <div className="chips">{TARGET_ROLES.map((r) => <span key={r} className="chip">{r}</span>)}</div>
        </div>
        <div>
          <div className="edu panel">
            <small>Education</small>
            <h3>{EDUCATION.school}</h3>
            <p>{EDUCATION.degree}</p>
            <p>{EDUCATION.specialization}</p>
            <p className="mono" style={{ marginTop: 10 }}>{EDUCATION.period}</p>
          </div>
          <NeuralPlayground />
        </div>
      </div>
    </Section>
  );
}
