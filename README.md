=# NoorPath

An all-in-one Islamic website in English and Bangla: Quran, hadith, duas, prayer times, Qibla, Hijri calendar, zakat calculator, Ramadan dashboard, Hajj and Umrah guide, articles, Islamic knowledge and global search. Most features work without an account. A free account adds bookmarks and last-read tracking.

This repository is the frontend. Accounts and bookmarks are provided by the separate `noorpath-backend` API.

## Tech stack

- Next.js (App Router) with JavaScript
- React
- Tailwind CSS v4
- lucide-react for icons
- Fonts via `next/font`: Inter, Amiri (Arabic) and Hind Siliguri (Bangla)

## Requirements

- Node.js (developed on Node 22)
- The backend API, only if you want login, bookmarks and the admin dashboard. Everything else works without it.

## Setup

```bash
npm install
```

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

This is the address of the backend API. If it is not set, the site still works, but login, register and bookmarks show a "server not connected" message.

## Run

```bash
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

Open the site at `http://localhost:3000`. Use `localhost` rather than `127.0.0.1`, because the backend only allows the origin set in its `CLIENT_URL`.

## Generated data files

The hadith chapter list and the dua dataset are downloaded once and stored in `src/data`, so pages do not need to fetch huge files at runtime. If these files are missing or you want to refresh them, run:

```bash
node scripts/build-hadith-index.mjs   # creates src/data/hadith-sections.json
node scripts/build-dua-data.mjs       # creates src/data/dua/*.json
```

Run them from the project root. They need an internet connection and can take a few minutes.

## Where the content comes from

| Feature | Source |
|---|---|
| Prayer times, today's Hijri date | [Aladhan API](https://aladhan.com/prayer-times-api), requested from the browser and cached for the day in `localStorage` |
| Quran text, translations, search | [Al Quran Cloud API](https://alquran.cloud/api), requested on the server |
| Quran recitation audio | Audio addresses provided by Al Quran Cloud |
| Hadith | [fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api), delivered through jsDelivr |
| Duas and dua audio | [islamicapi/masnun-dua](https://github.com/islamicapi/masnun-dua), audio streamed through jsDelivr |
| Hijri calendar | The browser's built-in Umm al-Qura calendar (`Intl`), no API |
| Qibla | Calculated from your location, using your device's compass sensor |
| Zakat calculator | Calculated locally, gold and silver prices are entered by the user |
| Articles, Islamic Knowledge, Ramadan and Hajj content | Written for this project and stored in `src/data` |

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/quran`, `/quran/[id]` | Surah list and reader with audio and bookmarks |
| `/hadith`, `/hadith/[book]`, `/hadith/[book]/[section]` | Hadith books, chapters and reader |
| `/dua`, `/dua/[category]`, `/dua/[category]/[sub]` | Dua categories, sections and list |
| `/prayer-times`, `/qibla`, `/calendar`, `/zakat` | Tools |
| `/ramadan`, `/hajj-umrah` | Ramadan dashboard and Hajj and Umrah guide |
| `/articles`, `/articles/[slug]` | Articles |
| `/knowledge`, `/knowledge/[topic]` | Islamic knowledge hub and glossary |
| `/search` | Global search |
| `/bookmarks` | Saved Quran, hadith and dua bookmarks (login required) |
| `/login`, `/register`, `/forgot-password` | Account pages |
| `/about`, `/privacy`, `/terms`, `/contact` | Information pages |
| `/admin` | Admin dashboard. Shows a 404 to anyone who is not an admin |

## Accounts and the backend

The frontend talks to the backend with `fetch` and `credentials: "include"`. The login token lives in an HttpOnly cookie that scripts cannot read. The backend must allow this site's exact origin in its `CLIENT_URL` setting.

Password reset is not connected yet: the page exists, but sending emails needs an email service that has not been set up.

## Before launch

- Set `contactEmail` in `src/data/site.js`. Until then the contact pages show a placeholder.
- Review the content with a qualified scholar or trusted printed sources. Quran, hadith and dua texts and translations come from third-party datasets. Articles, the Knowledge pages, Ramadan and Hajj guidance, and the dua and hadith UI text were written for this project and have not been reviewed by a scholar.
- Check the licence and usage terms of the third-party datasets and audio, including who the reciters are.
- Replace the draft Privacy Policy and Terms with versions reviewed for your situation, and keep them in line with what the site really does.
- The site is meant to be free and ad-free. If you add ads or analytics, update the About, Privacy and Terms pages.

## Deployment notes

- Set `NEXT_PUBLIC_API_URL` in your host's environment settings. It is read at build time.
- If the frontend and backend are on different websites, browsers can block the login cookie. The most reliable fix is to use one parent domain with subdomains (for example `app.example.com` and `api.example.com`).
- Vercel's free Hobby plan is for non-commercial use only. Check Vercel's current terms.

## Project structure

```
scripts/           one-off data download scripts
src/
  app/             pages (App Router)
  components/      UI components, grouped by feature
  data/            content files and generated datasets
  hooks/           React hooks (prayer times, compass, bookmarks)
  lib/             helpers and API clients
    api/           data fetching, one file per feature
```

## Content notice

NoorPath is for learning. It is not a source of fatwa and does not replace a qualified scholar. Rulings can differ between schools of thought and individual circumstances.