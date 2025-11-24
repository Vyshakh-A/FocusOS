# FocusOS — Task Management App

This repository contains a task-management application split into a backend (Node/Express + MongoDB) and a frontend (React + Vite).

## Repository layout

- `focusos/backend/` — Node.js API server (Express, Mongoose)
- `focusos/frontend/` — React + Vite frontend
- `data/` — local DB files (for development/testing)
- `.gitattributes`, `.gitignore` — line-ending and file ignore rules

## Prerequisites

- Node.js (18+ recommended)
- npm (or yarn/pnpm)
- MongoDB running locally or a connection string

## Quick start (Windows PowerShell)

1. Backend

```powershell
cd focusos/backend
npm install
# dev (requires nodemon) or start
npm run dev
# or
npm start
```

2. Frontend

```powershell
cd focusos/frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite (usually `http://localhost:5173`) and ensure the backend is reachable at the configured API URL.

## Environment variables

- The backend expects a `.env` file in `focusos/backend/` containing secrets (DB connection string, JWT_SECRET, etc.).
- Do NOT commit `.env` to source control. This repo includes `.gitattributes` and `.gitignore` to help enforce this.

Example `focusos/backend/.env` (do not commit):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/focusos
JWT_SECRET=your_secret_here
```

## If `.env` was already committed (important)

If you accidentally pushed `focusos/backend/.env` containing secrets:

1. Remove it from tracking immediately (non-destructive):

```powershell
git rm --cached focusos/backend/.env
git add focusos/backend/.gitignore
git commit -m "Remove backend .env from repo and ignore it"
git push origin main
```

2. Rotate any exposed secrets (DB passwords, API keys, OAuth secrets) immediately.

3. If you need to remove the file from all previous commits, use a history-rewrite tool (destructive — all collaborators must re-clone):

- BFG Repo-Cleaner (simpler)
- `git-filter-repo` (precise)

See official docs for those tools and make a backup before rewriting history.

## Git / line-ending notes

- This repo includes a `.gitattributes` file that enforces LF in the repository. On Windows, Git may warn about replacing LF with CRLF; after adding `.gitattributes` normalize using:

```powershell
git add --renormalize .
git commit -m "Normalize line endings"
```

## Commits & pushing

To add and push the README and recent .gitignore changes:

```powershell
git add README.md .gitattributes focusos/frontend/.gitignore focusos/backend/.gitignore
git commit -m "Add project README and update .gitignore/.gitattributes"
git push origin main
```

Replace `main` with your active branch name if needed.

## Next actions I can take (choose one)

- I can run the safe removal (`git rm --cached focusos/backend/.env`) and commit + push for you.
- I can help purge `.env` from history using `git-filter-repo` or BFG (this will require a force-push and coordination).
- I can open a short message template you can send to collaborators explaining a forced history rewrite.

If you want me to run any git commands from this environment, confirm which action to take and the branch/remote to use.

---

Short, clear, and ready — ask me to push this README to the remote or to perform the safe `.env` removal now.
