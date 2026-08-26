DIGEST DIGI v1.2 — COOK BRANCH

Product model:
- Explore = master knowledge library: retain every substantive editorial story.
- Today = executive briefing selected/ranked from the library.
- Recaps = month-scale synthesis selected from actual archived stories.
- Future Ask Digi should query this archive first.

Backward-compatible database columns:
id, date, period, source, title, verdict, summary, tags, actionable_takeaway, gmail_message_id, image_url, article_url, issue_id, issue_title, key_facts, why_it_matters, entities, importance_score

The original first 12 columns remain unchanged. v1.2 fields are appended so existing v1.1 rows continue to work.

Ingestion invariant:
- inspect watched-sender Promotions messages instead of skipping by label
- exclude sponsor-only/promotional content
- archive ALL substantive editorial stories
- check Gmail message ID before writing
- append new rows only; never guess a new row index
- read/search back by Gmail message ID and verify persistence

Performance:
- Vercel API: 5-minute CDN cache with stale-while-revalidate
- Browser: last-known-good local cache, immediate cached render, silent background refresh

Vercel environment variables remain unchanged:
DIGEST_DATA_URL
DIGEST_DATA_KEY
