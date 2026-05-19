# Team Dashboard

A React + Vite team management dashboard with AI-powered natural language commands.

## Features
- **Members** — add/remove team members, view by department and status
- **Tasks** — kanban board (To do / In progress / Done), assign to members
- **Notes** — quick notes with pin support
- **Jira** — live ticket view (requires setup, see below)
- **AI Commands** — update the dashboard via natural language using Claude API

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to https://vercel.com/new and import the repo
3. Framework: Vite — Vercel detects this automatically
4. Click Deploy

## AI Commands setup

1. Get a Claude API key from https://console.anthropic.com/settings/keys
2. Open the **AI Commands** tab in the app
3. Paste your API key — it's stored only in your browser's localStorage

Example commands:
- "Put Lucas a task to check merchant approval rate"
- "Add a high priority task for Alice: fix auth bug"
- "Mark the CI/CD pipeline task as done"
- "Add a note: sprint review on Friday"
- "Add new member: João Costa, Backend Dev, Engineering"

## Jira setup

See the **Jira → Setup guide** tab inside the app for step-by-step instructions.

The short version:
1. Generate an Atlassian API token at https://id.atlassian.com/manage-profile/security/api-tokens
2. Add to `.env`:
```
VITE_JIRA_DOMAIN=your-company.atlassian.net
VITE_JIRA_EMAIL=you@company.com
VITE_JIRA_TOKEN=your_token
VITE_JIRA_PROJECT=YOUR_PROJECT_KEY
```
3. Add a Vite proxy in `vite.config.js` to handle CORS (see Jira tab for full config)
4. On Vercel: add the same env vars under Project → Settings → Environment Variables

## Tech stack
- React 18
- Vite 5
- Lucide React (icons)
- DM Sans + DM Mono (Google Fonts)
- Claude API (AI commands)
