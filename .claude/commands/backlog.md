---
description: Quickly capture an idea or task to your GitHub Issues backlog
---

# Backlog — Quick Idea Capture

Capture this to the backlog: $ARGUMENTS

## Steps

1. **Check GitHub CLI** — Run `gh auth status` to verify the user is authenticated. If not, tell them to run `/gh-setup` first.

2. **Parse the idea** — From the user's input, determine:
   - A clear, concise title (imperative voice, under 80 chars)
   - Which label fits best: `idea` (raw thought), `backlog` (defined work), `bug` (something broken), or `quick-win` (small + clear)
   - If the input is vague, ask one clarifying question before creating

3. **Create the issue** — Run:

   ```bash
   gh issue create --title "the title" --label "chosen-label" --body "Description or context"
   ```

   - Keep the body short — 1-3 sentences max
   - If the user gave enough context, don't ask for more

4. **Confirm** — Show the issue URL and a quick summary. Mention they can view their backlog anytime with:
   ```bash
   gh issue list --label backlog
   gh issue list --label idea
   ```

## Tips

- Bias toward creating quickly over perfecting the description — the point is low-friction capture
- If the user says something like "remind me to..." or "we should..." or "what if we...", treat it as an idea
- Multiple ideas in one message? Create multiple issues
