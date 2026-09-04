// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";
import {
  resolveSeedCategory,
  seedAuthor,
  seedCategories,
  seedPages,
  seedPosts,
  seedPostsPaginated,
  seedTags,
} from "./seed-content";

// Single source of truth for WordPress configuration
const baseUrl = process.env.WORDPRESS_URL;
const isConfigured = Boolean(baseUrl);

if (!isConfigured) {
  console.warn(
    "WORDPRESS_URL environment variable is not defined - WordPress features will be unavailable"
  );
}

class WordPressAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string
  ) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

// Pagination types
export interface WordPressPaginationHeaders {
  total: number;
  totalPages: number;
}

export interface WordPressResponse<T> {
  data: T;
  headers: WordPressPaginationHeaders;
}

const USER_AGENT = "Next.js WordPress Client";
const CACHE_TTL = 3600; // 1 hour

type QueryValue = string | number | boolean | undefined;
type QueryParams = Record<string, QueryValue>;

/**
 * Pretty /wp-json URLs 301 into the headless theme HTML on this Railway
 * install (no working rewrite rules). rest_route always returns JSON.
 */
export function buildWordPressApiUrl(path: string, query?: QueryParams): string {
  if (!baseUrl) {
    throw new Error("WordPress URL not configured");
  }
  const restRoute = path.startsWith("/wp-json")
    ? path.replace(/^\/wp-json/, "") || "/"
    : path;
  return `${baseUrl.replace(/\/$/, "")}/?${querystring.stringify({
    rest_route: restRoute,
    ...query,
  })}`;
}

// Core fetch - throws on error (for functions that require data)
async function wordpressFetch<T>(
  path: string,
  query?: QueryParams,
  tags: string[] = ["wordpress"]
): Promise<T> {
  if (!baseUrl) {
    throw new Error("WordPress URL not configured");
  }

  const url = buildWordPressApiUrl(path, query);

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { tags, revalidate: CACHE_TTL },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  return response.json();
}

// Graceful fetch - returns fallback when WordPress unavailable or on error
async function wordpressFetchGraceful<T>(
  path: string,
  fallback: T,
  query?: QueryParams,
  tags: string[] = ["wordpress"]
): Promise<T> {
  if (!isConfigured) return fallback;

  try {
    return await wordpressFetch<T>(path, query, tags);
  } catch {
    console.warn(`WordPress fetch failed for ${path}`);
    return fallback;
  }
}

// Paginated fetch - returns response with headers
async function wordpressFetchPaginated<T>(
  path: string,
  query?: QueryParams,
  tags: string[] = ["wordpress"]
): Promise<WordPressResponse<T>> {
  if (!baseUrl) {
    throw new Error("WordPress URL not configured");
  }

  const url = buildWordPressApiUrl(path, query);

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { tags, revalidate: CACHE_TTL },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  return {
    data: await response.json(),
    headers: {
      total: parseInt(response.headers.get("X-WP-Total") || "0", 10),
      totalPages: parseInt(response.headers.get("X-WP-TotalPages") || "0", 10),
    },
  };
}

// Graceful paginated fetch - returns empty response when unavailable
async function wordpressFetchPaginatedGraceful<T>(
  path: string,
  query?: QueryParams,
  tags: string[] = ["wordpress"]
): Promise<WordPressResponse<T[]>> {
  const emptyResponse: WordPressResponse<T[]> = {
    data: [],
    headers: { total: 0, totalPages: 0 },
  };

  if (!isConfigured) return emptyResponse;

  try {
    return await wordpressFetchPaginated<T[]>(path, query, tags);
  } catch {
    console.warn(`WordPress paginated fetch failed for ${path}`);
    return emptyResponse;
  }
}

// Paginated posts with filter support
export async function getPostsPaginated(
  page: number = 1,
  perPage: number = 9,
  filterParams?: {
    author?: string;
    tag?: string;
    category?: string;
    search?: string;
  }
): Promise<WordPressResponse<Post[]>> {
  const query: QueryParams = {
    _embed: true,
    per_page: perPage,
    page,
  };

  // Build cache tags based on filters
  const cacheTags = ["wordpress", "posts", `posts-page-${page}`];

  if (filterParams?.search) {
    query.search = filterParams.search;
    cacheTags.push("posts-search");
  }
  if (filterParams?.author) {
    query.author = filterParams.author;
    cacheTags.push(`posts-author-${filterParams.author}`);
  }
  if (filterParams?.tag) {
    query.tags = filterParams.tag;
    cacheTags.push(`posts-tag-${filterParams.tag}`);
  }
  if (filterParams?.category) {
    query.categories = filterParams.category;
    cacheTags.push(`posts-category-${filterParams.category}`);
  }

  const response = await wordpressFetchPaginatedGraceful<Post>(
    "/wp-json/wp/v2/posts",
    query,
    cacheTags
  );

  if (response.data.length > 0) {
    return response;
  }

  return seedPostsPaginated(page, perPage, filterParams);
}

/**
 * Fetches recent posts (up to 100). For paginated access use getPostsPaginated().
 * For fetching ALL posts (e.g., sitemap), use getAllPostsForSitemap().
 */
export async function getRecentPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
}): Promise<Post[]> {
  const query: QueryParams = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.search) query.search = filterParams.search;
  if (filterParams?.author) query.author = filterParams.author;
  if (filterParams?.tag) query.tags = filterParams.tag;
  if (filterParams?.category) query.categories = filterParams.category;

  const posts = await wordpressFetchGraceful<Post[]>(
    "/wp-json/wp/v2/posts",
    [],
    query,
    ["wordpress", "posts"]
  );
  return posts.length > 0 ? posts : seedPostsPaginated(1, 100, filterParams).data;
}

export async function getPostById(id: number): Promise<Post> {
  return wordpressFetch<Post>(`/wp-json/wp/v2/posts/${id}`);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await wordpressFetchGraceful<Post[]>(
    "/wp-json/wp/v2/posts",
    [],
    { slug, _embed: true },
    ["wordpress", "posts"]
  );
  return posts[0] ?? seedPosts.find((post) => post.slug === slug);
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = await wordpressFetchGraceful<Category[]>(
    "/wp-json/wp/v2/categories",
    [],
    { per_page: 100 },
    ["wordpress", "categories"]
  );
  const real = categories.filter((c) => c.slug !== "uncategorized");
  return real.length > 0 ? categories : seedCategories;
}

export interface NavMenuData {
  categories: {
    id: number;
    label: string;
    href: string;
    slug: string;
  }[];
  hasSeoChild: boolean;
  servicesCategory?: Category;
}

export async function getNavMenuData(): Promise<NavMenuData> {
  const allCategories = await getAllCategories();

  // Find if a 'services' parent category exists
  const servicesCat = allCategories.find((c) => c.slug === "services");
  
  // Find if 'seo' exists as a child under services or as a category
  const seoChild = allCategories.find(
    (c) => c.slug === "seo" && (servicesCat ? c.parent === servicesCat.id : true)
  );

  // Top-level editorial categories (exclude parent=services, exclude 'services' itself, exclude 'seo' which lives under services)
  const topCategories = allCategories.filter((c) => {
    if (servicesCat && (c.id === servicesCat.id || c.parent === servicesCat.id)) {
      return false;
    }
    if (c.slug === "services" || c.slug === "seo" || c.slug === "uncategorized") {
      return false;
    }
    return true;
  });

  return {
    categories: topCategories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      href: `/posts/categories/${cat.slug}`,
      slug: cat.slug,
    })),
    hasSeoChild: Boolean(seoChild),
    servicesCategory: servicesCat,
  };
}

export async function getCategoryById(id: number): Promise<Category> {
  return wordpressFetch<Category>(`/wp-json/wp/v2/categories/${id}`);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await wordpressFetchGraceful<Category[]>(
    "/wp-json/wp/v2/categories",
    [],
    { slug }
  );
  return categories[0] ?? resolveSeedCategory(slug);
}

export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", {
    categories: categoryId,
  });
}

export async function getPostsByTag(tagId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { tags: tagId });
}

export async function getTagsByPost(postId: number): Promise<Tag[]> {
  return wordpressFetch<Tag[]>("/wp-json/wp/v2/tags", { post: postId });
}

export async function getAllTags(): Promise<Tag[]> {
  const tags = await wordpressFetchGraceful<Tag[]>(
    "/wp-json/wp/v2/tags",
    [],
    { per_page: 100 },
    ["wordpress", "tags"]
  );
  return tags.length > 0 ? tags : seedTags;
}

export async function getTagById(id: number): Promise<Tag> {
  return wordpressFetch<Tag>(`/wp-json/wp/v2/tags/${id}`);
}

export async function getTagBySlug(slug: string): Promise<Tag | undefined> {
  const tags = await wordpressFetchGraceful<Tag[]>(
    "/wp-json/wp/v2/tags",
    [],
    { slug }
  );
  return tags[0] ?? seedTags.find((tag) => tag.slug === slug);
}

export async function getAllPages(): Promise<Page[]> {
  const pages = await wordpressFetchGraceful<Page[]>(
    "/wp-json/wp/v2/pages",
    [],
    { per_page: 100 },
    ["wordpress", "pages"]
  );
  return pages.length > 0 ? pages : seedPages;
}

export async function getPageById(id: number): Promise<Page> {
  return wordpressFetch<Page>(`/wp-json/wp/v2/pages/${id}`);
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const pages = await wordpressFetchGraceful<Page[]>(
    "/wp-json/wp/v2/pages",
    [],
    { slug },
    ["wordpress", "pages"]
  );
  return pages[0] ?? seedPages.find((page) => page.slug === slug);
}

export async function getAllAuthors(): Promise<Author[]> {
  const authors = await wordpressFetchGraceful<Author[]>(
    "/wp-json/wp/v2/users",
    [],
    { per_page: 100 },
    ["wordpress", "authors"]
  );
  return authors.length > 0 ? authors : [seedAuthor];
}

export async function getAuthorById(id: number): Promise<Author> {
  return wordpressFetch<Author>(`/wp-json/wp/v2/users/${id}`);
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  return wordpressFetch<Author[]>("/wp-json/wp/v2/users", { slug }).then(
    (users) => users[0]
  );
}

export async function getPostsByAuthor(authorId: number): Promise<Post[]> {
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: authorId });
}

export async function getPostsByAuthorSlug(
  authorSlug: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug);
  return wordpressFetch<Post[]>("/wp-json/wp/v2/posts", { author: author.id });
}

export async function getPostsByCategorySlug(
  categorySlug: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  const posts = await wordpressFetchGraceful<Post[]>(
    "/wp-json/wp/v2/posts",
    [],
    { categories: category.id, _embed: true }
  );
  if (posts.length > 0) return posts;
  return seedPostsPaginated(1, 100, { category: categorySlug }).data;
}

export async function getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug);
  if (!tag) return [];
  const posts = await wordpressFetchGraceful<Post[]>(
    "/wp-json/wp/v2/posts",
    [],
    { tags: tag.id, _embed: true }
  );
  if (posts.length > 0) return posts;
  return seedPostsPaginated(1, 100, { tag: String(tag.id) }).data;
}

export async function getFeaturedMediaById(id: number): Promise<FeaturedMedia> {
  return wordpressFetch<FeaturedMedia>(`/wp-json/wp/v2/media/${id}`);
}

export async function searchCategories(query: string): Promise<Category[]> {
  return wordpressFetchGraceful<Category[]>(
    "/wp-json/wp/v2/categories",
    [],
    { search: query, per_page: 100 }
  );
}

export async function searchTags(query: string): Promise<Tag[]> {
  return wordpressFetchGraceful<Tag[]>("/wp-json/wp/v2/tags", [], {
    search: query,
    per_page: 100,
  });
}

export async function searchAuthors(query: string): Promise<Author[]> {
  return wordpressFetchGraceful<Author[]>("/wp-json/wp/v2/users", [], {
    search: query,
    per_page: 100,
  });
}

// Fetches ALL post slugs for generateStaticParams
// Returns empty array if WordPress is unavailable (allows build to succeed)
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const seedSlugs = seedPosts.map((post) => ({ slug: post.slug }));
  if (!isConfigured) return seedSlugs;

  try {
    const allSlugs: { slug: string }[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await wordpressFetchPaginated<Post[]>(
        "/wp-json/wp/v2/posts",
        { per_page: 100, page, _fields: "slug" }
      );

      allSlugs.push(...response.data.map((post) => ({ slug: post.slug })));
      hasMore = page < response.headers.totalPages;
      page++;
    }

    return allSlugs.length > 0 ? allSlugs : seedSlugs;
  } catch {
    console.warn("WordPress unavailable, using seed posts for static generation");
    return seedSlugs;
  }
}

// Fetches ALL posts for sitemap generation (paginates through all pages)
// Returns slug and modified date for each post
export async function getAllPostsForSitemap(): Promise<
  { slug: string; modified: string }[]
> {
  const seed = seedPosts.map((post) => ({
    slug: post.slug,
    modified: post.modified,
  }));
  if (!isConfigured) return seed;

  try {
    const allPosts: { slug: string; modified: string }[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await wordpressFetchPaginated<Post[]>(
        "/wp-json/wp/v2/posts",
        { per_page: 100, page, _fields: "slug,modified" }
      );

      allPosts.push(
        ...response.data.map((post) => ({
          slug: post.slug,
          modified: post.modified,
        }))
      );
      hasMore = page < response.headers.totalPages;
      page++;
    }

    return allPosts.length > 0 ? allPosts : seed;
  } catch {
    console.warn("WordPress unavailable, using seed posts for sitemap");
    return seed;
  }
}

// Enhanced pagination functions for specific queries
export async function getPostsByCategoryPaginated(
  categoryId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    categories: categoryId,
  });
}

export async function getPostsByTagPaginated(
  tagId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    tags: tagId,
  });
}

export async function getPostsByAuthorPaginated(
  authorId: number,
  page: number = 1,
  perPage: number = 9
): Promise<WordPressResponse<Post[]>> {
  return wordpressFetchPaginatedGraceful<Post>("/wp-json/wp/v2/posts", {
    _embed: true,
    per_page: perPage,
    page,
    author: authorId,
  });
}

export { WordPressAPIError };
