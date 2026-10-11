# GDG RBU – Next.js + TypeScript
Neo-brutalist, responsive recreation of the GDG RBU Figma design.
**Features:** responsive (mobile/tablet/desktop), dark/light mode (persisted), scroll-reveal animations, FAQ accordion, AI "Ask GDG" assistant (`/api/ask`, Claude API with offline fallback).
## Run
```
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY (optional)
npm run dev
```
## Deploy
Push to GitHub → import on vercel.com → add `ANTHROPIC_API_KEY` env var → Deploy.
## Structure
`app/layout.tsx` fonts/theme bootstrap · `app/page.tsx` sections · `app/globals.css` design tokens · `app/api/ask/route.ts` AI endpoint
