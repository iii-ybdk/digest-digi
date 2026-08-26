const fallback = [];

module.exports = async function handler(req, res) {
  // Keep the API fresh enough for a briefing while letting Vercel's edge absorb
  // repeated Sheet/Apps Script reads. Browser code also keeps a last-known-good copy.
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=900');

  const dataUrl = process.env.DIGEST_DATA_URL;
  const key = process.env.DIGEST_DATA_KEY;
  if (!dataUrl) return res.status(200).json({ live: false, items: fallback, error: 'bridge_not_configured', fetched_at: new Date().toISOString() });

  try {
    const u = new URL(dataUrl);
    if (key) u.searchParams.set('key', key);
    const response = await fetch(u.toString(), { cache: 'no-store' });
    if (!response.ok) throw new Error(`Bridge HTTP ${response.status}`);
    const body = await response.json();
    if (body && body.error) return res.status(200).json({ live: false, items: fallback, error: body.error, fetched_at: new Date().toISOString() });
    const items = Array.isArray(body) ? body : (Array.isArray(body.items) ? body.items : []);
    return res.status(200).json({ live: true, items, fetched_at: new Date().toISOString() });
  } catch (err) {
    console.error('Digest data bridge failed', err);
    return res.status(200).json({ live: false, items: fallback, error: 'bridge_failed', fetched_at: new Date().toISOString() });
  }
};
