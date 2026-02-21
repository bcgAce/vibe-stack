import type { NextRequest } from 'next/server';

/**
 * Parse pagination params from a request URL.
 *
 * Usage in API routes:
 *
 *   import { parsePagination, paginatedResponse } from '@/lib/pagination';
 *
 *   export async function GET(request: NextRequest) {
 *     const { page, limit, offset } = parsePagination(request);
 *     const items = await db.select().from(table).limit(limit).offset(offset);
 *     const total = await db.select({ count: count() }).from(table);
 *     return paginatedResponse(items, total[0].count, page, limit);
 *   }
 *
 * Query params: ?page=1&limit=20
 */

interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePagination(
  request: NextRequest,
  defaults: { page?: number; limit?: number; maxLimit?: number } = {},
): PaginationParams {
  const { page: defaultPage = 1, limit: defaultLimit = 20, maxLimit = 100 } = defaults;
  const url = new URL(request.url);

  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? String(defaultPage), 10));
  const limit = Math.min(
    maxLimit,
    Math.max(1, parseInt(url.searchParams.get('limit') ?? String(defaultLimit), 10)),
  );
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): Response {
  const totalPages = Math.ceil(total / limit);
  const result: PaginatedResult<T> = {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };

  return Response.json(result);
}
