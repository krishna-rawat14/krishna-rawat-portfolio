import Section from './Section';
import { LEARNING, SKILLS } from '../data/portfolio';
import { cssVar } from '../lib/motion';

export default function Skills() {
  return (
    <Section id="skills" title="Technical skills" light>
      <div className="sk">
        {Object.entries(SKILLS).map(([group, items], i) => (
          <div className="panel" key={group} style={cssVar('--d', i % 4)}>
            <h3>{group}</h3>
            <div className="chips">{items.map((s, j) => <span key={s} className="chip" style={cssVar('--c', j)}>{s}</span>)}</div>
          </div>
        ))}
        <div className="panel">
          <h3>Currently learning</h3>
          <div className="chips">{LEARNING.map((s) => <span key={s} className="chip learn">{s}</span>)}</div>
        </div>
      </div>
    </Section>
  );
}
