# andrastanczos.com

Minimal B&W photography site. Hugo static site deployed on Cloudflare Pages.

---

## Setup (one time)

### 1. Push to GitHub

Open a terminal and run:

```bash
cd andrastanczos
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/andrastanczos/andrastanczos.git
git push -u origin main
```

Note: You'll need to create the repo on GitHub first. Go to https://github.com/new, name it `andrastanczos`, keep it public or private (your choice), do NOT add a README (we already have one), then run the commands above.

### 2. Connect to Cloudflare Pages

1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
2. Click **Connect to Git**
3. Select your GitHub account and the `andrastanczos` repo
4. Configure build settings:
   - **Build command:** `hugo --minify`
   - **Build output directory:** `public`
   - **Environment variable:** Add `HUGO_VERSION` = `0.140.2`
5. Click **Save and Deploy**

### 3. Connect your domain

1. In Cloudflare dashboard → **Workers & Pages** → your project → **Custom domains**
2. Add `andrastanczos.com`
3. Since your domain is already on Cloudflare, DNS will configure automatically

Your site is now live.

---

## How to post

### Creating a new entry

1. Create a folder inside `content/entries/`:

```
content/entries/my-new-entry/
├── index.md
├── 001.jpg
├── 002.jpg
├── 003.jpg
└── ...
```

2. Write `index.md`:

```markdown
---
title: "My New Entry"
date: 2026-04-01
categories: ["Street"]
---

Opening text goes here.

{{</* img "001.jpg" "Optional caption for this image" */>}}

More text between images. Write as much or as little as you want.

{{</* img "002.jpg" */>}}

{{</* img "003.jpg" "Another caption" */>}}
```

3. Push to GitHub:

```bash
git add .
git commit -m "new entry: my new entry"
git push
```

Cloudflare Pages will auto-build and deploy within ~60 seconds.

### The rules

- **Images** go in the same folder as `index.md`
- **EXIF data** is extracted automatically from your JPGs (aperture, shutter speed, ISO, focal length)
- **Cover image**: the first image in the folder (alphabetically) is used as the cover on the homepage. Name your cover image `cover.jpg` if you want to control which one it is.
- **Categories**: set in frontmatter. Use whatever you want: `Street`, `Urban`, `People`, `Night`, etc. New categories appear in the sidebar automatically.
- **Captions** are optional — `{{</* img "001.jpg" */>}}` works fine without one
- **Text between images** is just regular markdown paragraphs

### File naming

I recommend naming images sequentially: `001.jpg`, `002.jpg`, etc. This keeps them in order and makes the markdown clean. But any filename works.

---

## Project structure

```
andrastanczos/
├── content/
│   ├── entries/           ← your photo entries go here
│   │   ├── morning-commute/
│   │   │   ├── index.md
│   │   │   ├── 001.jpg
│   │   │   ├── 002.jpg
│   │   │   └── ...
│   │   └── another-entry/
│   │       ├── index.md
│   │       └── ...
│   └── about/
│       └── index.md       ← your about page
├── themes/
│   └── atphoto/           ← the theme (design + templates)
│       ├── layouts/
│       ├── static/css/
│       └── static/js/
├── hugo.toml              ← site config
└── README.md
```

**Content** and **design** are completely separate. You can change the entire visual design without touching your entries, and add entries without touching any design files.

---

## Changing the design later

The theme lives in `themes/atphoto/`. Key files:

- `static/css/style.css` — all visual styling
- `layouts/_default/single.html` — entry page template
- `layouts/index.html` — homepage template
- `layouts/partials/sidebar.html` — sidebar navigation

You can edit these directly, or bring the whole project back to Claude and ask for changes. Your content in `content/` stays untouched.
