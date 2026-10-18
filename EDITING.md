# How to update your portfolio yourself

You never need anyone else to add a certificate, achievement or project. All content lives in one file:

**`src/data/portfolio.ts`**

Stats numbers (projects, certifications, skills) and the resume update automatically from this file.

## Option A: edit on github.com (no tools needed)
1. Open your repository on github.com.
2. Click `src`, then `data`, then `portfolio.ts`.
3. Click the pencil icon (Edit this file).
4. Copy one of the snippets below into the right list, change the text, keep the commas and quotes.
5. Click **Commit changes**. The site rebuilds and updates in about 1 to 2 minutes (GitHub Pages: Settings > Pages > Source: GitHub Actions).

## Option B: edit on your computer
1. Open the folder in VS Code and edit `src/data/portfolio.ts`.
2. Check it with `npm run dev`.
3. Publish: `git add .`, `git commit -m "Add certificate"`, `git push`.

## Add a certificate
Put it at the top of `CERTIFICATES` (newest first):
```ts
{ name: 'Certificate name', issuer: 'Issuer', year: 'November 2026', tags: ['Topic'], image: 'assets/cert-name.png', link: 'https://link-to-certificate' },
```
`image` and `link` are optional. Delete them if you don't have them.

## Add an achievement
Put it at the top of `ACHIEVEMENTS`:
```ts
{ title: 'What you achieved', detail: 'Event, organization and date.' },
```

## Add or update a project
Put it in `PROJECTS`. Status is `'completed'`, `'in-progress'` or `'planned'`:
```ts
{
  title: 'Project name',
  status: 'in-progress',
  summary: 'One or two sentences about what it is.',
  problem: 'What problem it solves.',
  approach: 'How you built it.',
  stack: ['React', 'Node.js'],
  pipeline: ['Plan', 'Build', 'Test', 'Deploy'],
  outcome: null,                       // write real, measured results here only when you have them
  image: 'assets/project-name.png',    // optional screenshot
  github: 'https://github.com/...',    // optional
  demo: 'https://...',                 // optional
},
```

## Add images, photo or resume
1. On GitHub open the `public/assets` folder, then **Add file > Upload files**, and commit.
2. Refer to the file as `assets/file-name.png` (no leading slash, same capital letters as the file name).
3. Photo: `CONFIG.photo`. Resume PDF: `CONFIG.resume` (for example `'assets/resume.pdf'`).

## Other things you can change in the same file
`CONFIG` (email, phone, GitHub, LinkedIn, contact form link), `SKILLS`, `LEARNING`, `EXPERIENCE`, `EDUCATION`, `ABOUT`.

## Common mistakes
- Every item in a list needs a comma after its closing `}`.
- Use straight quotes `'...'`. If your text contains an apostrophe, use `’` instead of `'`.
- Don't write results you haven't measured. Keep `outcome: null` until you have them.


## Resume & portfolio dashboard
Run `npm run dev` and visit `http://localhost:5173/#admin`. Edit the JSON and click **Save changes & refresh**. Export/import JSON backups are supported. In the Resume section, use **Print / save as PDF** and select Save as PDF in the browser dialog. Browser edits are device-local, not secure authentication, and do not publish to visitors. To publish, edit `DEFAULT_*` values in `src/data/portfolio.ts`, commit and redeploy. A shared admin needs a backend/database and real authentication.
