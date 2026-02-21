const DEV_BASE_URL = 'http://localhost:3000';
const PROD_FALLBACK_BASE_URL = 'https://example.com';

function normalizeBaseUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (fromEnv) {
    return normalizeBaseUrl(fromEnv);
  }

  const fromVercel = process.env.VERCEL_URL?.trim();
  if (fromVercel) {
    return normalizeBaseUrl(`https://${fromVercel}`);
  }

  if (process.env.NODE_ENV === 'development') {
    return DEV_BASE_URL;
  }

  return PROD_FALLBACK_BASE_URL;
}
