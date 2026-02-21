/**
 * Simple in-memory rate limiter for API routes.
 *
 * NOTE: Works for single-process servers (Railway, self-hosted).
 * For serverless (Vercel), each invocation gets a fresh instance, so this
 * won't persist across requests. Use Upstash Redis or Vercel KV instead:
 * https://upstash.com/blog/next-rate-limiting
 *
 * Usage:
 *   import { rateLimit } from '@/lib/rate-limit';
 *
 *   const limiter = rateLimit({ interval: 60_000, limit: 10 });
 *
 *   export async function POST(request: NextRequest) {
 *     const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
 *     const { success } = limiter.check(ip);
 *     if (!success) {
 *       return ApiResponse.error('Too many requests', 429);
 *     }
 *     // ... handle request
 *   }
 */

interface RateLimitOptions {
  /** Time window in milliseconds (default: 60 seconds) */
  interval?: number;
  /** Max requests per interval (default: 10) */
  limit?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

export function rateLimit({ interval = 60_000, limit = 10 }: RateLimitOptions = {}) {
  const tokens = new Map<string, { count: number; reset: number }>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const entry = tokens.get(key);

      if (!entry || now > entry.reset) {
        tokens.set(key, { count: 1, reset: now + interval });
        return { success: true, remaining: limit - 1, reset: now + interval };
      }

      if (entry.count >= limit) {
        return { success: false, remaining: 0, reset: entry.reset };
      }

      entry.count++;
      return { success: true, remaining: limit - entry.count, reset: entry.reset };
    },
  };
}
