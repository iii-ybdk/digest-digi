DIGEST DIGI v1.1

Updates:
- Month-first Recaps UI
- Separate TLDR / The Futurist recap sections
- Explore filter by newsletter
- Further-reading article links via article_url
- Refresh stays on the current Today / Explore / Recaps tab
- Monthly recap data no longer appears in Today
- Live API uses no-store caching and reports bridge/auth errors correctly

Database columns:
id, date, period, source, title, verdict, summary, tags, actionable_takeaway, gmail_message_id, image_url, article_url

Vercel environment variables remain unchanged:
DIGEST_DATA_URL
DIGEST_DATA_KEY
