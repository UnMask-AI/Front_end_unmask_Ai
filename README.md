# UnMask AI — Frontend

Next.js (App Router) marketing site, auth, dashboard, and analyze UI.

## Setup

```bash
npm install
cp .env.example .env.local   # already committed template; .env.local is gitignored
npm run dev
```

**Important:** `NEXT_PUBLIC_*` values are read when the dev server **starts**. After editing `.env.local`, stop the server (Ctrl+C) and run `npm run dev` again. If the UI still says it cannot reach the API, open `http://localhost:8000/` in the browser to confirm the backend is up, then check `docker compose` logs if you use Docker.

Open [http://localhost:3000](http://localhost:3000).

## Backend connection

The app calls the API at **`NEXT_PUBLIC_API_URL`** (must include the **`/api/v1`** prefix). Default in code is `http://localhost:8000/api/v1`.

1. Start the backend (see **`../backend_UnMask-AI/README.md`**). With Docker, run compose from **`backend_UnMask-AI/docker`**, not from a path that does not contain that folder.
2. Ensure **`.env.local`** exists (copy from **`.env.example`**) and matches where the API listens.

If you see a runtime error like **`__webpack_modules__[moduleId] is not a function`**, delete the build cache and restart dev:

```bash
rm -rf .next
npm run dev
```

Also ensure you are not opening the app from a different directory than `Front_end_unmask_Ai` (the repo used to ship an extra root `package-lock.json` that confused Next’s workspace root).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Run production build     |
| `npm run lint` | ESLint                   |

## Deploy on Vercel

Set **`NEXT_PUBLIC_API_URL`** in the project environment to your **HTTPS** API base including `/api/v1`. The browser cannot call `http://localhost` from a deployed site.

See [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying).
