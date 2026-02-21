---
name: debug
description: Systematic debugging using logs, browser inspection, and Playwright screenshots
---

# Debug

Investigate and fix: $ARGUMENTS

## Steps

1. **Reproduce the issue** — Understand what's broken:
   - What is the expected behavior?
   - What is the actual behavior?
   - Can you reproduce it consistently?

2. **Check the terminal** — Look at the dev server output for errors:
   ```bash
   # Check if dev server is running
   npm run dev
   ```
   Look for: stack traces, unhandled promise rejections, compilation errors.

3. **Check the browser** — Use Playwright MCP to inspect the page:
   - Take a screenshot of the current state
   - Check the browser console for JavaScript errors
   - Check the Network tab for failed API requests

4. **Narrow down the source**:
   - **Build error?** → Run `npm run build` and read the error
   - **Type error?** → Run `npm run type-check`
   - **Lint error?** → Run `npm run lint`
   - **API error?** → Check the API route handler, look for missing error handling
   - **Database error?** → Check if `DATABASE_URL` is set, run `npm run db:studio`
   - **Auth error?** → Check if Clerk keys are set, check middleware.ts
   - **UI error?** → Check component props, state management, CSS classes

5. **Fix the root cause** — Don't suppress errors, fix them. Don't add workarounds, fix the underlying issue.

6. **Verify the fix**:
   - Run `npm run lint` and `npm run type-check`
   - Take a screenshot to confirm the UI looks right
   - Run relevant tests with `npm run test:e2e`

7. **Prevent regression** — If this bug could recur, add a test for it in `tests/`.
