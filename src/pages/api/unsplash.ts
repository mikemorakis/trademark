import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies }) => {
  const session = cookies.get('admin_session')?.value;
  if (session !== 'authenticated') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get('q') || 'trademark law';
  const page = url.searchParams.get('page') || '1';

  try {
    // Use Pexels API (free, 200 req/hour, no billing required)
    // Get a free key at https://www.pexels.com/api/new/
    const PEXELS_KEY = 'PASTE_YOUR_PEXELS_KEY_HERE';

    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&page=${page}&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    const data = await res.json();

    const images = (data.photos || []).map((img: any) => ({
      id: img.id,
      url: img.src.large,
      thumb: img.src.tiny,
      small: img.src.medium,
      alt: img.alt || query,
      author: img.photographer,
      authorUrl: img.photographer_url,
    }));

    return new Response(JSON.stringify({ images, total: data.total_results || 0 }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};
