import { Fragment, useCallback, useState } from 'react';
import Boot from './components/Boot';
import Effects from './components/Effects';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { MARQUEE } from './data/portfolio';
import Admin from './components/Admin';

export default function App() {
  const [ready, setReady] = useState(false);
  if (window.location.hash === '#admin') return <Admin />;
  const onBoot = useCallback(() => { document.body.classList.add('go'); setReady(true); }, []);

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Boot onDone={onBoot} />
      <Effects />
      <Nav />
      <Hero ready={ready} />
      <div className="mq" aria-hidden="true">
        <div>
          {Array.from({ length: 4 }, (_, r) => MARQUEE.map((w) => (
            <Fragment key={`${r}-${w}`}><span>{w}</span><span>✦</span></Fragment>
          )))}
        </div>
      </div>
      <main>
        <Stats />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
