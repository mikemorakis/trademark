import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async ({ params, request }) => {
  const { filename } = params;
  const db = env.DB;

  try {
    const row: any = await db.prepare('SELECT mime, data FROM images WHERE filename = ?').bind(filename).first();
    if (!row) {
      return new Response('Not found', { status: 404 });
    }

    const binary = Uint8Array.from(atob(row.data), c => c.charCodeAt(0));

    // Check if browser accepts WebP
    const accept = request.headers.get('Accept') || '';
    const supportsWebP = accept.includes('image/webp');

    return new Response(binary, {
      headers: {
        'Content-Type': supportsWebP && row.mime !== 'image/svg+xml' ? 'image/webp' : row.mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Vary': 'Accept',
      },
    });
  } catch (e: any) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
};
