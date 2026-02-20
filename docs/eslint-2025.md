# ESLint Configuration

## Philosophy

The ESLint config is relaxed by default. It catches real bugs without getting in your way.

**What it catches:**
- Unused variables (warning)
- Unhandled promises (warning)
- React hooks violations (error)
- Real bugs (error)

**What it allows:**
- `any` types (warning, not error)
- `console.log` (no restriction)
- Template literals with any type
- Common React patterns

## Running Lint

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix what's possible
npm run type-check  # TypeScript only
```

## Want Stricter Rules?

Edit `eslint.config.mjs` to tighten things up:

```javascript
// Turn warnings into errors
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-floating-promises': 'error',

// Add console restriction
'no-console': ['warn', { allow: ['warn', 'error'] }],
```
