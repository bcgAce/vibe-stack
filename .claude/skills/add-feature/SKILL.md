---
name: add-feature
description: Scaffold a new feature with page, API route, and component following vibe-stack patterns
---

# Add Feature

Scaffold a new feature for: $ARGUMENTS

## Steps

1. **Understand the feature** — Ask clarifying questions if the request is ambiguous (what data, what UI, what interactions?)

2. **Check the database schema** — Read `src/db/schema/index.ts` to understand what tables and fields exist. If the feature needs data that isn't in the schema yet, create the table first following the patterns in the existing schema (text UUIDs, timestamps, relations, Zod schemas). Run `npx tsc --noEmit` then `npm run db:push` after any schema changes.

3. **Check available UI components** — Before importing any shadcn/ui component, verify it exists in `src/components/ui/`. Available components:
   - badge, button, card, data-table, dialog, dropdown-menu, form, input, label, separator, skeleton, sidebar, table, tabs, textarea, toast, toaster, tooltip
   - If you need a component that's not listed above, build it with plain HTML + Tailwind instead of importing a missing module.

4. **Create the page** — Add a new route in `src/app/`:
   - Use Server Components by default
   - Only add `'use client'` for interactive parts
   - Follow the existing layout pattern (sidebar + header)
   - Add `data-testid` attributes on key elements

5. **Create the API route** (if needed) — Add in `src/app/api/`:
   - Use `ApiResponse` helper from `@/lib/ai-response`
   - Wrap handlers with `withErrorHandling`
   - Validate input with Zod schemas
   - Check `if (!db)` before database operations

   ```typescript
   import { ApiResponse, withErrorHandling } from '@/lib/ai-response';
   import { db } from '@/lib/db';
   import { z } from 'zod';

   const schema = z.object({
     /* fields */
   });

   async function handlePOST(request: NextRequest) {
     if (!db) return ApiResponse.error('Database not configured', 503);
     const body = schema.parse(await request.json());
     const result = await doSomething(body);
     return ApiResponse.success({ result });
   }

   export const POST = withErrorHandling(handlePOST);
   ```

6. **Create components** — Add in `src/components/`:
   - Use shadcn/ui components from `@/components/ui/` as building blocks
   - Add `data-testid` attributes for testing
   - Keep components focused — one component, one job

7. **Update the sidebar** — This is required. Add a link to the new page in `src/components/app-sidebar.tsx`:

   ```typescript
   <SidebarMenuButton asChild isActive={pathname.startsWith('/your-route')} tooltip="Your Page">
     <Link href="/your-route">
       <YourIcon className="h-5 w-5" />
       <span>Your Page</span>
     </Link>
   </SidebarMenuButton>
   ```

8. **Add a test** — Create a Playwright test in `tests/`:
   - Use `data-testid` selectors only — NEVER use getByText()
   - Test the happy path at minimum
   - See `tests/README.md` for patterns

9. **Verify** — Run `npm run dev` and manually check the feature works, then run `npm run lint` to catch issues
