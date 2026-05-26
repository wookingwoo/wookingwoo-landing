# wookingwoo world

Personal portfolio website for wookingwoo, showcasing projects, technical skills, contact links, drone photography, and travel history.

## Features

- Portfolio project grid with thumbnails and external links
- Personal introduction and contact links
- Technical skills grouped by category
- Drone photography section
- Travel map with a country-list fallback when Google Maps is not configured
- SEO metadata for search and social sharing

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Maps API

## Prerequisites

- Node.js 20.9 or later
- npm

## Setup

```bash
git clone https://github.com/wookingwoo/wookingwoo-landing.git
cd wookingwoo-landing
npm install
```

Create `.env.local` if you want the travel map to render with Google Maps:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

The site still renders a visited-country fallback without this key.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run audit:prod
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) after starting the development server.

## Security Notes

Run `npm run audit:prod` to check production dependencies. If npm reports the Next.js bundled PostCSS advisory, update `next` when a stable patched release is available. Do not use `npm audit fix --force` for that advisory unless the proposed Next.js version change has been reviewed, because npm can suggest a breaking downgrade.

## License

[MIT](LICENSE)
