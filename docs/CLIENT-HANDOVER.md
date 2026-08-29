# Client handover — write a post and hit Publish

For editors at Tech Wave Media. The public site is Next.js. You never edit the Next.js code. You work in WordPress.

## Open the admin

1. Go to `https://YOUR-FRONTEND/admin` (or the WordPress URL your developer sent).
2. Log in with the Editor account.

## Write a blog post

1. **Posts → Add New**.
2. Add a title. WordPress creates the URL slug under the title — keep it short and readable.
3. Write in the editor using headings (H2/H3), short paragraphs, lists, and images. Avoid page-builder blocks; they often do not show on the public site.
4. Set **Featured image** (right sidebar).
5. Set **Category** to exactly one of: Business, Technology, Food, Health, Lifestyle, Digital Marketing, AI.
6. Add tags if they help (Startups, SEO, Wellness, and so on).
7. Write a 1–2 sentence **Excerpt**.

## SEO check (Rank Math)

On the same screen, open the Rank Math panel (sidebar or below the editor).

1. Enter a **focus keyword** (the phrase you want the article to rank for).
2. Watch the score / traffic lights. Fix the easy items: keyword in title, in the first paragraph, in an H2, and in the SEO title/description.
3. Edit **SEO Title** and **Meta description** so they read well in Google. Do not stuff keywords.
4. Rank Math is a checklist. A green score does not replace original reporting.

Optional: if Rank Math Content AI or Jetpack AI is enabled, you can draft an outline there. Always rewrite in your own voice. Grammarly in the browser is fine.

## Publish so the live site updates

1. Click **Publish** (or Schedule).
2. Wait a few seconds. The **next-revalidate** plugin tells Next.js to refresh that article.
3. Open the public site: `https://YOUR-FRONTEND/posts/your-slug`.
4. If it looks old, hard-refresh. If it is still old after a minute, tell the developer — the webhook secret may be wrong.

## Guest posts

External writers send copy to **guestpost@technicalinterest.com** using the rules on **Write for Us**. You paste approved articles into WordPress as above. Do not publish scraped or previously published content.

## Do not

- Install plugins
- Change permalinks or Rank Math sitewide settings
- Publish empty “coming soon” posts just to fill a category
