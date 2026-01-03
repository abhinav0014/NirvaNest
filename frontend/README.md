NirvaNest Frontend (scaffold)

This is a minimal Next.js (App Router) TypeScript scaffold with simple pages to test the backend auth and listings APIs.

Development:

1. From `frontend` install deps: `npm install` or `pnpm install`.
2. Run dev server: `npm run dev`.

Tailwind + UI setup
--------------------
After cloning, install frontend deps and start dev server:

```bash
cd frontend
npm install
npm run dev
```

This scaffold includes Tailwind CSS and Headless UI components. If you change Node versions, re-run `npm install`.

Notes:
- The frontend calls backend endpoints at `/api/v1/*`. In development you may need to proxy or run the backend on the same host/port.
- This scaffold is intentionally minimal; expand components, state management, and styling as next steps.
