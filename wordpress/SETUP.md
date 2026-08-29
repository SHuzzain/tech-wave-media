# WordPress setup — Tech Wave Media

This repo is a fork of [9d8dev/next-wp](https://github.com/9d8dev/next-wp). WordPress is the admin. Next.js is the public magazine.

## 1. Create the CMS

Use Railway’s next-wp template, or install WordPress on Cloudways/a VPS.

- Site title: **Tech Wave Media**
- Permalinks: **Post name** (Settings → Permalinks)
- REST API: default on. Confirm `https://YOUR-WP/wp-json/wp/v2/posts`

## 2. Users and roles

Keep yourself as **Administrator**.

Create the client as **Editor**:

1. Users → Add User
2. Role: Editor
3. They can write posts, upload media, and use Rank Math on posts
4. They cannot install plugins or change settings

Do not give the client Administrator.

## 3. Import sample content

1. Tools → Import → WordPress (install the importer if asked)
2. Upload [tech-wave-seed.xml](./tech-wave-seed.xml)
3. Assign the author to the Editor or Admin user
4. You should see 7 categories, tags, 6 posts, and pages: About, SEO Services, Write for Us, Privacy Policy

Contact stays on the Next.js route `/contact` (form). You can still create a WP page named Contact if you want it editable later.

## 4. Plugins (install and activate)

Required for this project:

| Plugin | Why |
|---|---|
| **next-revalidate** (zip in `/plugin/next-revalidate`) | Publish in WP refreshes Next.js |
| **Rank Math SEO** (free) | Focus keyword + SEO score while writing |
| **Site Kit by Google** | Search Console / Analytics |
| **Yoast Duplicate Post** | Clone a well-structured article |
| **Redirection** | URL changes |
| **Imagify or ShortPixel** | Compress images |
| **Wordfence or Solid Security** | Protect `/wp-admin` |

Optional (client pays the subscription):

- Rank Math Content AI
- Jetpack AI Assistant

Do **not** install WPGraphQL unless you change the Next.js fetch layer. This starter uses REST.

Upload next-revalidate: Plugins → Add New → Upload Plugin → use the folder `plugin/next-revalidate` (zip it first). Then Settings → Next.js Revalidation:

- Next.js URL = your Vercel/Railway frontend
- Secret = same as `WORDPRESS_WEBHOOK_SECRET`

## 5. Rank Math

1. Run the Rank Math setup wizard (connect Search Console if ready)
2. On each post: set **focus keyword**, review the score, fill SEO title and description
3. Next.js reads Rank Math via `/wp-json/rankmath/v1/getHead` and post meta. After install, open a live article and View Source — title/description should match Rank Math.

## 6. Headless theme (optional)

On Railway this may already be installed. Otherwise use a theme that redirects the WP frontend to Next.js so Google does not index two copies of the same post.

## 7. Connect Next.js

`.env.local`:

```
WORDPRESS_URL=https://your-wordpress-site.com
WORDPRESS_HOSTNAME=your-wordpress-site.com
WORDPRESS_WEBHOOK_SECRET=long-random-string
```

Visit `/admin` on the Next site — it redirects to `WORDPRESS_URL/wp-admin`.
