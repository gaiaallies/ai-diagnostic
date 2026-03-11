# Gaia Allies — AI Readiness Diagnostic

Branded diagnostic engine for law firm leads.
Each firm gets its own route under `diagnostic.gaiaallies.com`.

## Live Routes

| Firm | URL |
|------|-----|
| Landing Page | `diagnostic.gaiaallies.com` |
| BDM Law | `diagnostic.gaiaallies.com/bdm` |

## Deploy to Vercel (One-Time Setup)

### Step 1: Push to GitHub
1. Create a new repo on GitHub (e.g. `gaia-diagnostic`)
2. Push this folder to it:
   ```bash
   cd gaia-diagnostic
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/gaia-diagnostic.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free tier works)
2. Click "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects Next.js — just click "Deploy"
5. Your site is live at `gaia-diagnostic.vercel.app` within ~60 seconds

### Step 3: Add Your Custom Domain
1. In Vercel dashboard → your project → Settings → Domains
2. Add `diagnostic.gaiaallies.com`
3. Vercel gives you a DNS record to add (CNAME)
4. Go to your domain registrar (wherever gaiaallies.com is managed)
5. Add the CNAME record:
   - **Type:** CNAME
   - **Name:** diagnostic
   - **Value:** cname.vercel-dns.com
6. Wait ~5 minutes for DNS propagation
7. Done. `diagnostic.gaiaallies.com/bdm` is live.

## Adding a New Firm

1. Create a new file in `pages/` (e.g. `pages/nisar.js`)
2. Copy the BDM template, update the firm-specific content
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add Nisar diagnostic"
   git push
   ```
4. Vercel auto-deploys. New route is live in ~30 seconds.

## Local Development

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Project Structure

```
gaia-diagnostic/
├── pages/
│   ├── _app.js          # Global CSS loader
│   ├── index.js          # Landing page (root URL)
│   └── bdm.js            # BDM Law diagnostic
├── styles/
│   └── globals.css       # Base styles + font imports
├── public/               # Static assets (favicon, images)
├── next.config.js
├── package.json
└── README.md
```
