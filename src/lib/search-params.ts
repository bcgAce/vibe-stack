import type { NextRequest } from 'next/server';

/**
 * Parse search/filter params from a request URL into a typed object.
 *
 * Usage in API routes:
 *
 *   import { parseSearchParams } from '@/lib/search-params';
 *
 *   export async function GET(request: NextRequest) {
 *     const filters = parseSearchParams(request, {
 *       search: { type: 'string' },
 *       status: { type: 'enum', values: ['todo', 'in_progress', 'done'] },
 *       priority: { type: 'enum', values: ['low', 'medium', 'high'] },
 *       completed: { type: 'boolean' },
 *     });
 *
 *     // filters.search → string | undefined
 *     // filters.status → 'todo' | 'in_progress' | 'done' | undefined
 *     // filters.completed → boolean | undefined
 *
 *     let query = db.select().from(tasks);
 *     if (filters.status) query = query.where(eq(tasks.status, filters.status));
 *     if (filters.search) query = query.where(ilike(tasks.title, `%${filters.search}%`));
 *   }
 */

type ParamDef =
  | { type: 'string' }
  | { type: 'number' }
  | { type: 'boolean' }
  | { type: 'enum'; values: readonly string[] };

type ParsedValue<T extends ParamDef> = T extends { type: 'string' }
  ? string | undefined
  : T extends { type: 'number' }
    ? number | undefined
    : T extends { type: 'boolean' }
      ? boolean | undefined
      : T extends { type: 'enum'; values: readonly (infer V)[] }
        ? V | undefined
        : never;

type ParsedParams<T extends Record<string, ParamDef>> = {
  [K in keyof T]: ParsedValue<T[K]>;
};

export function parseSearchParams<T extends Record<string, ParamDef>>(
  request: NextRequest,
  schema: T,
): ParsedParams<T> {
  const url = new URL(request.url);
  const result = {} as Record<string, unknown>;

  for (const [key, def] of Object.entries(schema)) {
    const raw = url.searchParams.get(key);
    if (raw === null || raw === '') {
      result[key] = undefined;
      continue;
    }

    switch (def.type) {
      case 'string':
        result[key] = raw;
        break;
      case 'number': {
        const num = Number(raw);
        result[key] = isNaN(num) ? undefined : num;
        break;
      }
      case 'boolean':
        result[key] = raw === 'true' || raw === '1';
        break;
      case 'enum':
        result[key] = def.values.includes(raw) ? raw : undefined;
        break;
    }
  }

  return result as ParsedParams<T>;
}
