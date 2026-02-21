import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { generateText, generateObject } from 'ai';
import type { LanguageModel } from 'ai';
import { z } from 'zod';

type Provider = 'openai' | 'anthropic';

// Models in preference order — falls back if the first isn't available on your account
const OPENAI_MODELS = ['gpt-5.2', 'gpt-4o'] as const;
const ANTHROPIC_MODELS = ['claude-opus-4-6', 'claude-sonnet-4-5-20250929'] as const;

function getModel(provider: Provider = 'openai'): LanguageModel {
  if (provider === 'anthropic') {
    return anthropic(process.env.ANTHROPIC_MODEL ?? ANTHROPIC_MODELS[0]);
  }
  return openai(process.env.OPENAI_MODEL ?? OPENAI_MODELS[0]);
}

// Simple text generation
export async function generateWithAI(
  prompt: string,
  systemMessage?: string,
  provider: Provider = 'openai',
) {
  const { text } = await generateText({
    model: getModel(provider),
    messages: [
      ...(systemMessage ? [{ role: 'system' as const, content: systemMessage }] : []),
      { role: 'user' as const, content: prompt },
    ],
  });

  return text;
}

// Type-safe object generation with Zod schemas
export async function generateTypedObject<T>(
  schema: z.ZodSchema<T>,
  prompt: string,
  systemMessage?: string,
  provider: Provider = 'openai',
): Promise<T> {
  const { object } = await generateObject({
    model: getModel(provider),
    schema: schema,
    prompt: systemMessage ? `${systemMessage}\n\n${prompt}` : prompt,
  });

  return object;
}

// Re-export providers for advanced usage
export { openai } from '@ai-sdk/openai';
export { anthropic } from '@ai-sdk/anthropic';
