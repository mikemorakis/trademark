import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params }) => {
  const { filename } = params;
  const db = env.DB;

  try {
    const row: any = await db.prepare('SELECT mime, data FROM images WHERE filename = ?').bind(filename).first();
    if (!row) {
      return new Response('Not found', { status: 404 });
    }

    const binary = Uint8Array.from(atob(row.data), c => c.charCodeAt(0));
    return new Response(binary, {
      headers: {
        'Content-Type': row.mime,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (e: any) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
};
