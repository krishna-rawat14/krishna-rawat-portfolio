# Krishna Rawat - Portfolio

Personal portfolio built with React, TypeScript and Vite.

> The projects, experience entry and skills are sample content. Replace them with real details in `src/data/portfolio.ts` before sharing.

## Run locally (Windows, VS Code)
1. Install Node.js 20 LTS from nodejs.org.
2. Open this folder in VS Code and open the terminal (Ctrl + `).
3. `npm install` (this also creates `package-lock.json`, commit it)
4. `npm run dev` and open the address shown (usually http://localhost:5173)
5. `npm run build` type-checks and builds to `dist/`. `npm run preview` serves the build.

## Project structure
```
public/            favicon and assets/ (photo, screenshots, resume PDF)
src/
  data/portfolio.ts  ALL editable content: CONFIG, projects, skills, certificates, experience
  components/        Hero, Nav, Stats, About, Projects, Experience, Skills, Resume, Contact, Footer...
  lib/               confetti and motion helpers
  index.css          design tokens and styles
DESIGN.md          design decisions
.github/workflows/ GitHub Pages deployment
```

## Edit your details
Full step-by-step guide with copy-paste snippets: see [EDITING.md](EDITING.md).

Everything lives in `src/data/portfolio.ts`:
- `CONFIG`: `email`, `github`, `linkedin`, `resume` (`"assets/resume.pdf"`), `photo` (`"assets/photo.jpg"`), `formEndpoint`.
- `PROJECTS`: status, summary, problem, approach, stack, pipeline, `image` (`"assets/shot.png"`), `github`, `demo`. Keep `outcome` as `null` until you have real, measured results.
- `SKILLS`, `CERTIFICATES`, `EXPERIENCE`, `EDUCATION`, `ABOUT`, `SUMMARY`.

Put image and PDF files in `public/assets/`. Empty links stay hidden and the contact form stays disabled until an email or form endpoint is set. Stat numbers are counted from your data.

## Contact form
- With `email` set, the form opens the visitor's email app with the message filled in. Nothing is sent until they press send.
- With `formEndpoint` set (for example a free form at formspree.io), the form posts there and shows success only if the server accepts it.

## Deploy
**GitHub Pages (included):** push to `main`, then in the repository open Settings > Pages and set Source to GitHub Actions. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

**Vercel or Cloudflare Pages:** import the repository, build command `npm run build`, output directory `dist`.

## Push to GitHub
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/krishna-rawat-portfolio.git
git push -u origin main
```
Create the empty repository on github.com first.


## Resume editor
Run `npm run dev` and visit `http://localhost:5173/#admin`. See `EDITING.md` for instructions and browser-local storage limitations.
