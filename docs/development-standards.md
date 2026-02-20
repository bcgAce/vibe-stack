# Development Guidelines

These are guidelines, not rules. They'll help you write better code as your project grows.

## Code Quality Tips
- **DRY**: If you're copy-pasting, extract it into a function or component
- **Small components**: Try to keep components focused on one thing
- **TypeScript**: Let the types help you — they catch bugs before runtime
- **Error handling**: Show the user something useful when things go wrong

## Component Patterns
```typescript
// Keep components small and focused
export function UserCard({ user }: { user: User }) {
  return (
    <div className="p-4 border rounded-lg">
      <UserAvatar user={user} />
      <UserDetails user={user} />
    </div>
  );
}
```

## Git Tips
```bash
# Conventional commits make your history readable
git commit -m "feat: add user profile page"
git commit -m "fix: handle empty search results"
git commit -m "refactor: extract API helpers"
```

## Before Deploying
```bash
npm run lint        # Check for issues
npm run type-check  # Verify types
npm run build       # Make sure it builds
```
