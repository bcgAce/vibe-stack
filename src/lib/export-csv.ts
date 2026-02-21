/**
 * Convert an array of objects to CSV and return as a downloadable Response.
 *
 * Usage in API routes:
 *
 *   import { csvResponse } from '@/lib/export-csv';
 *
 *   export async function GET() {
 *     const data = await db.select().from(tasks);
 *     return csvResponse(data, 'tasks-export.csv');
 *   }
 *
 * Usage client-side (trigger download):
 *
 *   const res = await fetch('/api/tasks/export');
 *   const blob = await res.blob();
 *   const url = URL.createObjectURL(blob);
 *   const a = document.createElement('a');
 *   a.href = url;
 *   a.download = 'tasks.csv';
 *   a.click();
 */

export function toCsv<T extends Record<string, unknown>>(data: T[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        const str =
          value === null || value === undefined
            ? ''
            : typeof value === 'object'
              ? JSON.stringify(value)
              : String(value as string | number | boolean);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      })
      .join(','),
  );

  return [headers.join(','), ...rows].join('\n');
}

export function csvResponse<T extends Record<string, unknown>>(
  data: T[],
  filename = 'export.csv',
): Response {
  const csv = toCsv(data);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
