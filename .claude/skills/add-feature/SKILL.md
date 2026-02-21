---
name: add-feature
description: Scaffold a new feature with page, API route, and component following vibe-stack patterns
---

# Add Feature

Scaffold a new feature for: $ARGUMENTS

## Steps

1. **Understand the feature** — Ask clarifying questions if the request is ambiguous (what data, what UI, what interactions?)

2. **Create the page** — Add a new route in `src/app/`:
   - Use Server Components by default
   - Only add `'use client'` for interactive parts
   - Follow the existing layout pattern (sidebar + header)

3. **Create the API route** (if needed) — Add in `src/app/api/`:
   - Use `ApiResponse` helper from `@/lib/ai-response`
   - Wrap handlers with `withErrorHandling`
   - Validate input with Zod schemas
   ```typescript
   import { ApiResponse, withErrorHandling } from '@/lib/ai-response';
   import { z } from 'zod';

   const schema = z.object({ /* fields */ });

   async function handlePOST(request: NextRequest) {
     const body = schema.parse(await request.json());
     const result = await doSomething(body);
     return ApiResponse.success({ result });
   }

   export const POST = withErrorHandling(handlePOST);
   ```

4. **Create components** — Add in `src/components/`:
   - Use shadcn/ui components from `@/components/ui/` as building blocks
   - Add `data-testid` attributes for testing
   - Keep components focused — one component, one job

5. **Add to navigation** — Update `src/components/app-sidebar.tsx` with a link to the new page

6. **Add a test** — Create a Playwright test in `tests/`:
   - Use `data-testid` selectors only
   - Test the happy path at minimum
   - See `tests/README.md` for patterns

7. **Verify** — Run `npm run dev` and manually check the feature works, then run `npm run lint` to catch issues
