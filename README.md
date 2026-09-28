# Kelajak-S — Architecture & Interior Design Studio Website

This is the official multilingual website (Uzbek, Russian, English) for **Kelajak-S**. Below is a simple guide on how to customize your content, images, styling, and publish the site.

---

## 1. How to Replace Images (`src/lib/placeholder.ts` and Data Files)

Currently, all placeholder images are generated automatically through a single helper function in **`src/lib/placeholder.ts`**.

### Option A: Replace individual project or blog images
1. Place your real photos inside the **`public/images/`** folder (create the folder if needed), for example: `public/images/villa-cover.jpg`.
2. Open **`src/data/projects.ts`** (for projects) or **`src/data/posts.ts`** (for blog articles).
3. Replace `getPlaceholderImage(...)` with your image path:
   ```ts
   // Before:
   cover: getPlaceholderImage('kelajak-loyiha-nomi-1-cover', 1600, 1050),

   // After:
   cover: '/images/villa-cover.jpg',
   ```

### Option B: Replace section background & studio images
Section images (Hero, Philosophy polaroids, Services, Principles, Stats, Testimonials, About page) also use `getPlaceholderImage('seed-name', width, height)`. You can either:
- Replace the `src={getPlaceholderImage(...)}` directly in the component/page file with `src="/images/your-photo.jpg"`, or
- Update **`src/lib/placeholder.ts`** to map specific seed names to your own image URLs.

---

## 2. How to Change Fonts (`src/config/fonts.ts`)

1. Open **`src/config/fonts.ts`** to see and edit the font families used across the site:
   - `serif`: `"Cormorant Garamond"` (used for large headings and editorial quotes)
   - `sans`: `"Inter"` (used for body text, navigation, and UI labels)
   - `mono`: `"IBM Plex Mono"` (used for technical metadata, coordinates, and numbering)
2. If you switch to a different Google Font:
   - Update the Google Fonts `<link>` URL in **`index.html`**.
   - Update the font family names in **`src/config/fonts.ts`** and the `@theme` block in **`src/index.css`**.
   - Make sure the chosen font supports **Latin Extended** (for Uzbek `oʻ` and `gʻ`) and **Cyrillic** (for Russian).

---

## 3. How to Change Colours (`src/index.css`)

All main brand colors are defined at the top of **`src/index.css`** inside `:root` and `@theme`:

```css
:root {
  --color-dark: #0d0d0d;          /* Near-black background */
  --color-offwhite: #efeeec;      /* Warm off-white primary text */
  --color-light-section: #f4f3f0; /* Warm stone background for light sections */
  --color-muted-grey: #858380;    /* Secondary muted text */
}
```

Edit these hex values in **`src/index.css`** to adjust the color palette.

---

## 4. How to Edit Texts & Translations (`src/locales/`)

All interface texts, headings, SEO titles/descriptions, buttons, and placeholders are stored in three translation files:

- **`src/locales/uz.json`** — Uzbek (default language)
- **`src/locales/ru.json`** — Russian
- **`src/locales/en.json`** — English

Search for any `[square bracket]` placeholder (such as `[Shahar]`, `[Manzil]`, `[Telefon]`, `[Email]`) in all three files and replace them with your real studio information. Keep the keys identical across all three files.

---

## 5. Where Each Data File Is (`src/data/`)

All structured content lives inside the **`src/data/`** folder:

| File | Purpose |
| :--- | :--- |
| **`src/data/projects.ts`** | Portfolio projects (slugs, categories, year, area, cover image, gallery images, task/solution/result). |
| **`src/data/posts.ts`** | Blog articles (slugs, titles, categories, dates, reading time, cover images, and article body sections). |
| **`src/data/services.ts`** | The 7 architectural services shown in the accordion on the Home page and in the Contact form dropdown. |
| **`src/data/principles.ts`** | The 6 core studio principles ("Biz doim bajaradigan oltita ish"). |
| **`src/data/process.ts`** | The 4 work process stages ("01 / Tinglash" to "04 / Qurish") and their durations. |
| **`src/data/stats.ts`** | Numeric metrics for the animated count-up statistics bar (completed projects, built area, years of practice, repeat clients). |
| **`src/data/testimonials.ts`** | Client testimonials slider items (quotes, client names, project names, and portrait seeds). |

---

## 6. How to Add Your Formspree URL in `.env`

The contact inquiry form (`/aloqa`) and newsletter forms submit data via **Formspree**.

1. Create a file named **`.env`** in the project root (you can copy **`.env.example`**).
2. Add your Formspree endpoint URL:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
   ```
3. If `VITE_FORMSPREE_ENDPOINT` is left empty, the site runs in **demo mode** (it simulates a successful submission so you can test the UI).

---

## 7. Domain Setup & How to Build for Production

### Replace placeholder domain
Before publishing, replace `https://YOUR-DOMAIN.uz` with your real domain in:
- **`index.html`** (Open Graph `og:url` and JSON-LD `url`)
- **`public/robots.txt`** (`Sitemap:` URL)
- **`public/sitemap.xml`** (`<loc>` URLs)

### Install, Run, and Build
```bash
# 1. Install dependencies
npm install

# 2. Start development server on port 3000
npm run dev

# 3. Build production bundle (outputs to the dist/ folder)
npm run build

# 4. Preview production build locally
npm run preview
```

### Hosting & Deep-Link Routing
- **Netlify / Cloudflare Pages**: `public/_redirects` is automatically copied into `dist/_redirects` (`/* /index.html 200`).
- **Vercel**: `vercel.json` is preconfigured to rewrite all routes to `/index.html`.
