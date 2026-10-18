# Design notes

## Direction
A futuristic but readable developer portfolio for an AI/ML and software engineering student.
The identity comes from the subject: a neural-network canvas, terminal-style intro and
engineering-style case studies, with sections that alternate between dark and light.

## Palette
| Token | Value | Use |
|---|---|---|
| Ink | `#0B0B10` | Dark section background |
| Paper | `#F1EFE7` | Light section background |
| Lime | `#C6FF3D` | Primary accent on dark, active states, stats |
| Violet | `#7C5CFF` / `#5B3DF5` | Secondary accent, accent on light sections |
| Muted | `#8E8E9E` / `#6a6a77` | Secondary text |

Colors are CSS variables in `src/index.css` (`:root` for dark, `.light` for light sections).

## Typography
- Unbounded: headings and large display text
- Inter: body text
- JetBrains Mono: labels, stats, code-like details

## Motion
Intro boot sequence, scrambled name reveal, typing line, drifting neural canvas that reacts
to the cursor, soft cursor background glow, staggered scroll reveals, card tilt, magnetic
buttons, animated stats, a gradient-descent simulation and confetti.
All motion is switched off for visitors with `prefers-reduced-motion`.

## Content rules
- No invented statistics, credentials, results or experience.
- Stats are counted from the data in `src/data/portfolio.ts`.
- Projects show a real status: completed, in progress or planned.
- Links and features appear only when configured. The contact form never claims success
  unless a form service accepted the message.

## Accessibility
Skip link, visible focus rings, semantic landmarks, labelled form fields with inline errors,
`aria-live` form status, and keyboard-operable case studies.
