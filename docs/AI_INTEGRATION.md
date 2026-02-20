# AI Integration

## Overview

vibe-stack comes with Vercel AI SDK pre-configured for both **OpenAI** and **Anthropic/Claude**. You can use either (or both).

## Setup

### OpenAI

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Create an account and add billing
3. Go to API Keys and create a new key
4. Add to `.env.development.local`:

```bash
OPENAI_API_KEY=sk-your-key-here
```

### Anthropic (Claude)

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Create an account and add billing
3. Go to API Keys and create a new key
4. Add to `.env.development.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## Usage

### Text Generation

```typescript
import { generateWithAI } from '@/lib/ai';

// Uses OpenAI by default
const text = await generateWithAI('Write a haiku about coding');

// Use Anthropic instead
const text = await generateWithAI('Write a haiku about coding', undefined, 'anthropic');
```

### Type-Safe Object Generation (Recommended)

```typescript
import { generateTypedObject } from '@/lib/ai';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
});

// Returns a fully typed object — no JSON parsing needed
const result = await generateTypedObject(schema, 'Summarize this article: ...');
```

### In API Routes

```typescript
import { ApiResponse, withErrorHandling } from '@/lib/ai-response';
import { generateWithAI } from '@/lib/ai';

async function handlePOST(request: NextRequest) {
  const { prompt } = await request.json();
  const result = await generateWithAI(prompt);
  return ApiResponse.success({ result });
}

export const POST = withErrorHandling(handlePOST);
```

## Choosing a Provider

| Feature | OpenAI (GPT-4o) | Anthropic (Claude) |
|---------|-----------------|-------------------|
| Speed | Fast | Fast |
| Structured output | Excellent | Excellent |
| Long context | 128K tokens | 200K tokens |
| Code generation | Great | Great |
| Cost | ~$0.03/1K in | ~$0.03/1K in |

Both are excellent. Pick whichever you prefer, or try both and compare.

## Cost Tips

- Use `gpt-4o-mini` or `claude-haiku` for simple tasks (10x cheaper)
- Cache responses when possible
- Set reasonable `maxTokens` limits
- Monitor usage in your provider's dashboard
