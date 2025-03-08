This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Roadmap

Development roadmap to keep track of version feature developments.

### Version 0.1.0 (initial)
Initial application release.
- [x] Side navigation & mobile navigtion
- [ ] 404 & Error Pages
- [ ] Colors scheme add as variable
- [ ] Sticky header
- [ ] Logbook, Pilots & Aircraft overview & manegement
  - [ ] Update data schemes
  - [ ] Logbook Flight Table
    - [x] Loading animation (Skeleton ShadCn)
    - [x] FIX date sorting & last date first
    - [x] Rework flight table to fit screen width
    - [x] Column visibility && save column visibility with cookie
    - [ ] Simulator flights for flight lists & table
  - [ ] Logbook Flight Submit
    - [x] [FIX] Time input button not centered
    - [ ] Calculate time on change
  - [ ] Totals page
- [ ] Progressive Web App (PWA) (Capacitor?)
- [ ] Update folder structure

### Future releases
- [ ] Offline functionality
- [ ] Documentation using [Aria-Docs](https://github.com/nisabmohd/Aria-Docs)