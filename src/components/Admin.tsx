import { useMemo, useState } from 'react';
import { getEditableContent, resetEditableContent, saveEditableContent } from '../data/portfolio';

export default function Admin() {
  const [json, setJson] = useState(() => JSON.stringify(getEditableContent(), null, 2));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function save() {
    try {
      const parsed = JSON.parse(json);
      for (const key of ['CONFIG','SUMMARY','EDUCATION','EXPERIENCE','PROJECTS','SKILLS','CERTIFICATES']) {
        if (!(key in parsed)) throw new Error(`Missing required section: ${key}`);
      }
      saveEditableContent(parsed);
      setMessage('Saved in this browser. Refreshing…');
      setError('');
      window.setTimeout(() => window.location.reload(), 400);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON. Check punctuation and brackets.');
      setMessage('');
    }
  }
  function download() {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'krishna-portfolio-content.json'; a.click();
    URL.revokeObjectURL(url);
  }
  function importFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setJson(String(reader.result ?? '')); setMessage('Imported. Review and save your changes.'); setError(''); };
    reader.readAsText(file);
  }
  function reset() {
    if (window.confirm('Restore the default content from src/data/portfolio.ts?')) {
      resetEditableContent(); window.location.reload();
    }
  }
  return <main className="admin-wrap">
    <p className="admin-eyebrow">PORTFOLIO CONTROL ROOM</p>
    <h1>Resume & portfolio editor</h1>
    <p className="admin-intro">Edit the JSON below. Saving updates this browser's portfolio and resume. In Resume, choose Print / save as PDF to create an updated PDF.</p>
    <div className="admin-notice"><b>Important:</b> Browser edits are local to this device and are not a secure login. To publish changes to everyone, edit <code>src/data/portfolio.ts</code> and redeploy your site.</div>
    <label className="admin-label" htmlFor="content-json">Editable portfolio content (JSON)</label>
    <textarea id="content-json" className="admin-editor" spellCheck={false} value={json} onChange={e => setJson(e.target.value)} />
    {error && <p className="admin-error" role="alert">{error}</p>}
    {message && <p className="admin-success" role="status">{message}</p>}
    <div className="admin-actions">
      <button className="btn p" type="button" onClick={save}>Save changes & refresh</button>
      <button className="btn" type="button" onClick={download}>Export JSON backup</button>
      <label className="btn admin-upload">Import JSON backup<input type="file" accept=".json,application/json" onChange={e => importFile(e.target.files?.[0])} /></label>
      <button className="btn" type="button" onClick={reset}>Reset browser edits</button>
      <a className="btn" href="/">Back to portfolio</a>
      <a className="btn" href="#resume">Open resume</a>
    </div>
    <p className="admin-foot">Direct code editing: open <code>src/data/portfolio.ts</code> in VS Code and edit the <code>DEFAULT_*</code> values.</p>
  </main>;
}
