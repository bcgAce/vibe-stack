# Spec Prompt

Copy-paste this prompt into ChatGPT or Claude.ai **before** you start building. It'll generate a spec that works perfectly with the vibe-stack setup flow.

---

## The Prompt

```
I'm about to build a web app using a Next.js starter template. Help me write a short spec so my AI coding assistant can set everything up for me.

Here's what I want to build:

[DESCRIBE YOUR IDEA HERE — a few sentences is fine. What does it do? Who is it for?]

Based on that, write me a spec with these sections:

## App Name
A short working name for the project.

## One-Liner
One sentence describing what this app does.

## User Stories
3-7 bullet points starting with "As a user, I can..." covering the core features.
Only include what's needed for a first working version — not a wishlist.

## Data Model
List the main things the app stores. For each one:
- Name (e.g., Recipe, Workout, Invoice)
- Fields it needs (e.g., title, description, status, price)
- Relationships to other things (e.g., "a User has many Recipes")

Keep it simple. Only include what's needed for the user stories above.

## Pages
List the main pages/screens:
- What URL it lives at (e.g., /dashboard, /recipes, /recipes/[id])
- What it shows
- What actions the user can take on it

## Tech Requirements
Answer yes or no to each:
- Needs user accounts / sign-in? (yes/no)
- Needs a database? (yes/no — yes if it stores anything)
- Needs AI features? (yes/no — and if yes, what for?)

Keep the whole thing under 1 page. No implementation details, no tech stack decisions, no wireframes. Just what it does and what data it needs.
```

---

## Example Output

Here's what a good spec looks like:

> ## App Name
>
> RecipeBox
>
> ## One-Liner
>
> A personal recipe app where you save recipes and get AI-generated suggestions based on your ingredients.
>
> ## User Stories
>
> - As a user, I can sign up and log in to my account
> - As a user, I can add a recipe with a title, ingredients, and instructions
> - As a user, I can browse and search my saved recipes
> - As a user, I can enter ingredients I have and get AI recipe suggestions
> - As a user, I can save an AI-suggested recipe to my collection
>
> ## Data Model
>
> **Recipe**
>
> - title (text)
> - ingredients (text)
> - instructions (text)
> - source (enum: manual, ai-generated)
> - createdAt (timestamp)
> - userId (references User)
>
> ## Pages
>
> - `/` — Landing page with sign-in
> - `/recipes` — List of all my recipes, with search
> - `/recipes/new` — Form to add a new recipe
> - `/recipes/[id]` — View a single recipe
> - `/suggest` — Enter ingredients, get AI suggestions
>
> ## Tech Requirements
>
> - Needs user accounts? Yes
> - Needs a database? Yes
> - Needs AI features? Yes — generate recipe suggestions from ingredient lists

---

## What Happens Next

1. You create this spec in ChatGPT or Claude.ai
2. You clone the vibe-stack template and open it in VS Code
3. You open Claude Code and type `/setup`
4. When it asks what you're building, paste your spec
5. Claude sets up everything your spec needs — database, auth, AI, schema — and you start building
