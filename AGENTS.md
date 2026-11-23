<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands and checks

- Use npm (`package-lock.json`): `npm ci`, `npm run dev`, `npm run build`.
- Verify changes with `npm run lint` and `npm run typecheck`; there is no test script or test runner configured.
- Focused lint: `npx eslint "path/to/file.tsx"`. Format only touched files with `npx prettier --write "path/to/file.tsx"`; `npm run format` rewrites all TS/TSX files.
- `next/font/google` in `app/layout.tsx` downloads Geist fonts; builds may need network access.

## Boundaries and data

- This directory is the Next.js client, not a monorepo. Jobs use a separate backend: `lib/api/jobs.ts` reads, `lib/actions/jobs/page.ts` creates/deletes. Despite its name, the latter is an ordinary fetch module, not a Server Action.
- Jobs API base: `NEXT_PUBLIC_API_BASE_URL`, falling back to `http://localhost:5000`. Database-backed job pages require that service; do not assume `/api/jobs` exists here.
- Authentication runs inside Next.js through `app/api/auth/[...all]/route.ts` and `lib/auth.ts`, independently of the jobs backend. It uses MongoDB database `hireloopdb`, URI `BETTER_AUTH_URI`, and Better Auth settings `BETTER_AUTH_URL` / `BETTER_AUTH_SECRET`.
- `app/layout.tsx` and `lib/auth.ts` configure Node DNS to `1.1.1.1` / `8.8.8.8` for Atlas SRV resolution. Keep these Node-only imports out of client components.
- `lib/auth-client.ts` infers additional fields via a **type-only** import of server auth. Roles are `seeker`, `recruiter`, `admin`; sidebar filtering is UI logic, not authorization. Public signup currently accepts `role`, including admin—do not treat that as a secure privilege-assignment mechanism.
- Import shared domain types with `import type { Job, NewJobData, Role } from "@/types"`. MongoDB jobs use `_id`, not `id`; don't import types from route pages for new code. Component-local props stay with their component.
- Dashboard navigation lives in `app/components/DashboardSidebar.tsx`; route matching must select the longest matching URL so `/jobs/new` doesn't also highlight `/jobs`.
- Root `app/layout.tsx` supplies theming, not the navbar or toast host. Public pages mount their own navbar; auth and dashboard use separate layouts. The dashboard layout mounts `Toaster`.

## UI conventions that matter

- `components.json` selects shadcn **base-nova** (`@base-ui/react`), not Radix. Add primitives with `npx shadcn@latest add <component>`.
- Compose triggers with `render={<Button ... />}`; never nest a Button inside another button/trigger. For button-styled Next links use `nativeButton={false}` and `render={<Link href="..." />}`, not Radix's `asChild`.
- Tailwind v4 theme/style entry is `app/globals.css`; there is no Tailwind config file. `@/` resolves to the repository root.
- Form handlers collect named inputs via `new FormData(event.currentTarget)`; preserve field names when changing UI so API payloads don't silently change.
