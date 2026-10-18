import { CONFIG, PROJECTS } from '../data/portfolio';

const NAV: [string, string][] = [
  ['Home', 'top'], ['About', 'about'], ['Projects', 'projects'], ['Experience', 'experience'],
  ['Skills', 'skills'], ['Certificates', 'certificates'], ['Resume', 'resume'], ['Contact', 'contact'],
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fbig">Let’s build something <span>useful.</span></div>
        <div className="fg">
          <div>
            <div className="fl">KR<i>.</i></div>
            <p>Krishna Rawat, B.Tech CSE student (AI/ML and Robotics) at DIT University, Dehradun. Open to software, full-stack and AI/ML internships.</p>
          </div>
          <div><h4>Navigate</h4>{NAV.map(([l, id]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
          <div><h4>Projects</h4>{PROJECTS.map((p) => <a key={p.title} href="#projects">{p.title}</a>)}</div>
          <div>
            <h4>Connect</h4>
            {CONFIG.phone && <a href={`tel:${CONFIG.phone.replace(/\s/g, '')}`}>{CONFIG.phone}</a>}
            {CONFIG.email && <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>}
            {CONFIG.github && <a href={CONFIG.github} target="_blank" rel="noreferrer">GitHub</a>}
            {CONFIG.linkedin && <a href={CONFIG.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {CONFIG.resume && <a href={CONFIG.resume} download>Resume</a>}
            <a href="#contact">Contact form</a>
          </div>
        </div>
        <div className="fb">
          <span>© {new Date().getFullYear()} Krishna Rawat. All rights reserved.</span>
          <span>Designed and built by me with React and TypeScript</span>
          <a className="btn" href="#top">Back to top &uarr;</a>
        </div>
      </div>
      <div className="fw" aria-hidden="true">KRISHNA RAWAT</div>
    </footer>
  );
}
