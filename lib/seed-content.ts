import type { Author, Category, Page, Post, Tag } from "@/lib/wordpress.d";

const now = "2026-08-22T09:00:00";

function entity(id: number, slug: string) {
  return {
    id,
    date: now,
    date_gmt: now,
    modified: now,
    modified_gmt: now,
    slug,
    status: "publish" as const,
    link: `/${slug}`,
    guid: { rendered: `/${slug}` },
  };
}

export const seedAuthor: Author = {
  id: 1,
  name: "Tech Wave Desk",
  url: "",
  description: "Editorial team at Tech Wave Media.",
  link: "/posts/authors",
  slug: "tech-wave-desk",
  avatar_urls: {},
  meta: {},
};

export const seedCategories: Category[] = [
  { ...tax(1, "Business", "business"), taxonomy: "category", parent: 0 },
  { ...tax(2, "Technology", "technology"), taxonomy: "category", parent: 0 },
  { ...tax(3, "Food", "food"), taxonomy: "category", parent: 0 },
  { ...tax(4, "Health", "health"), taxonomy: "category", parent: 0 },
  { ...tax(5, "Lifestyle", "lifestyle"), taxonomy: "category", parent: 0 },
  {
    ...tax(6, "Digital Marketing", "digital-marketing"),
    taxonomy: "category",
    parent: 0,
  },
  { ...tax(7, "AI", "ai"), taxonomy: "category", parent: 0 },
];

export const seedTags: Tag[] = [
  { ...tax(11, "Startups", "startups"), taxonomy: "post_tag" },
  { ...tax(12, "SEO", "seo"), taxonomy: "post_tag" },
  { ...tax(13, "Wellness", "wellness"), taxonomy: "post_tag" },
  { ...tax(14, "Machine Learning", "machine-learning"), taxonomy: "post_tag" },
  { ...tax(15, "Recipes", "recipes"), taxonomy: "post_tag" },
  { ...tax(16, "Leadership", "leadership"), taxonomy: "post_tag" },
];

function tax(id: number, name: string, slug: string) {
  return {
    id,
    count: 1,
    description: "",
    link: `/posts/?tag=${id}`,
    name,
    slug,
    meta: {},
  };
}

function html(paragraphs: string[]): string {
  return paragraphs.map((p) => `<p>${p}</p>`).join("");
}

function makePost(opts: {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  categoryId: number;
  tagIds: number[];
}): Post {
  const category = seedCategories.find((c) => c.id === opts.categoryId)!;
  const tags = seedTags.filter((t) => opts.tagIds.includes(t.id));
  return {
    ...entity(opts.id, opts.slug),
    title: { rendered: opts.title },
    content: { rendered: html(opts.body), protected: false },
    excerpt: { rendered: `<p>${opts.excerpt}</p>`, protected: false },
    author: 1,
    featured_media: 0,
    comment_status: "closed",
    ping_status: "closed",
    sticky: opts.id === 1,
    template: "",
    format: "standard",
    categories: [opts.categoryId],
    tags: opts.tagIds,
    meta: {},
    _embedded: {
      author: [seedAuthor],
      "wp:term": [[category], tags],
    },
  };
}

export const seedPosts: Post[] = [
  makePost({
    id: 1,
    slug: "ai-agents-changing-small-business-operations",
    title: "How AI Agents Are Changing Small Business Operations in 2026",
    excerpt:
      "Practical ways founders can use AI agents for support, research, and operations without adding headcount.",
    categoryId: 7,
    tagIds: [14, 11],
    body: [
      "Artificial intelligence is no longer limited to chat windows. In 2026, small teams are assigning repeatable work to AI agents that draft replies, summarize research, and watch dashboards overnight.",
      "The useful pattern is narrow: one job, one tool, one human owner. Support triage, meeting notes, and first-pass SEO briefs are strong starting points. Broad “do everything” agents still create more cleanup than they save.",
      "Tech Wave Media recommends documenting prompts, reviewing outputs weekly, and keeping customer-facing copy under a named editor. That is how AI becomes a process, not a gamble.",
    ],
  }),
  makePost({
    id: 2,
    slug: "startup-growth-playbook-after-first-customers",
    title: "A Startup Growth Playbook After You Win Your First Customers",
    excerpt:
      "What to do in the 90 days after product-market signal: retention, pricing, and a channel you can repeat.",
    categoryId: 1,
    tagIds: [11, 16],
    body: [
      "Early traction feels like a finish line. It is usually a starting gun. The next 90 days should prove you can retain users, charge enough to survive, and buy or earn the next 50 customers on purpose.",
      "Talk to every paying user. Map why they stayed and why others left. Then pick one acquisition channel — search, partnerships, or outbound — and run it until the numbers are boringly consistent.",
      "Leadership at this stage is calendar discipline: founder time on customers, not on extra features nobody asked for.",
    ],
  }),
  makePost({
    id: 3,
    slug: "google-algorithm-updates-what-publishers-should-watch",
    title: "Google Algorithm Updates: What Publishers Should Watch This Year",
    excerpt:
      "A plain-language briefing on helpful content, E-E-A-T, and how magazine sites stay useful after ranking shifts.",
    categoryId: 6,
    tagIds: [12],
    body: [
      "Search updates punish thin pages and reward original reporting, clear authorship, and pages that answer a real question. Guest-post networks that publish interchangeable articles feel those changes first.",
      "For Tech Wave Media contributors, that means unique examples, sourced claims, and titles that match the article. Rank Math’s on-page score is a checklist, not a substitute for expertise.",
      "Watch Search Console for query drops after a core update, then improve the pages that lost impressions instead of publishing more of the same.",
    ],
  }),
  makePost({
    id: 4,
    slug: "weeknight-dinners-that-still-feel-like-a-treat",
    title: "Weeknight Dinners That Still Feel Like a Treat",
    excerpt:
      "Fast meals with restaurant energy: pantry sauces, one-pan protein, and a dessert you can assemble in five minutes.",
    categoryId: 3,
    tagIds: [15],
    body: [
      "A good weeknight dinner is not a 40-ingredient project. It is heat, salt, acid, and something crunchy. Think roasted vegetables with a yogurt sauce, pan-seared fish, or eggs over leftover rice with chili oil.",
      "Keep a “treat kit”: good olive oil, citrus, herbs, and a frozen dessert you can plate with fruit. That is how home cooking competes with takeout without the delivery wait.",
    ],
  }),
  makePost({
    id: 5,
    slug: "preventive-care-habits-that-compound",
    title: "Preventive Care Habits That Compound Over a Decade",
    excerpt:
      "Sleep, strength, screening, and stress — four boring habits that outperform fad protocols.",
    categoryId: 4,
    tagIds: [13],
    body: [
      "Health content often sells intensity. The evidence still favors consistency: sleep you can defend, two or three strength sessions a week, screenings your clinician recommends, and a plan for stress that is not another app you ignore.",
      "This is not medical advice. It is a reminder that lifestyle pages should send readers to qualified care and skip miracle claims. Tech Wave Media’s health desk will keep that bar.",
    ],
  }),
  makePost({
    id: 6,
    slug: "work-life-balance-is-a-calendar-problem",
    title: "Work-Life Balance Is a Calendar Problem, Not a Mindset Problem",
    excerpt:
      "Protect deep work, family time, and recovery the same way you protect a client meeting: they get a slot or they do not exist.",
    categoryId: 5,
    tagIds: [16, 13],
    body: [
      "Lifestyle advice that only says “set boundaries” leaves people with a full inbox and an empty evening. Put the boundary on the calendar first. Deep work, training, and family dinners need the same respect as a sales call.",
      "Technology jobs especially reward people who look available at all hours. The counter-move is visible hours and a teammate who covers the rest. That is management, not motivation.",
    ],
  }),
];

export const seedPages: Page[] = [
  {
    ...entity(101, "about"),
    title: { rendered: "About" },
    content: {
      rendered: html([
        "Tech Wave Media is an online publishing platform that connects readers with informative, relevant, and engaging content. We publish expert insights, practical guides, industry updates, and inspiring stories across business, technology, startups, lifestyle, health, travel, and other popular topics.",
        "Our goal is to give writers and professionals a trusted space to share their knowledge while helping readers stay informed, discover new ideas, and make better decisions.",
      ]),
      protected: false,
    },
    excerpt: {
      rendered: "<p>Who we are and why we publish.</p>",
      protected: false,
    },
    author: 1,
    featured_media: 0,
    parent: 0,
    menu_order: 1,
    comment_status: "closed",
    ping_status: "closed",
    template: "",
    meta: {},
  },
  {
    ...entity(102, "services"),
    title: { rendered: "SEO Services" },
    content: {
      rendered: html([
        "Tech Wave Media helps publishers and brands show up in search with clear information architecture, on-page SEO, and editorial standards.",
        "This page is a placeholder until the client supplies full services copy. Typical work includes technical audits, content briefs, and Rank Math configuration so writers can check focus keywords before they publish.",
        "Contact the team to discuss SEO retainers, guest-post guidelines, or a magazine site build.",
      ]),
      protected: false,
    },
    excerpt: {
      rendered: "<p>SEO and publishing services.</p>",
      protected: false,
    },
    author: 1,
    featured_media: 0,
    parent: 0,
    menu_order: 2,
    comment_status: "closed",
    ping_status: "closed",
    template: "",
    meta: {},
  },
  {
    ...entity(103, "write-for-us"),
    title: { rendered: "Write for Us" },
    content: {
      rendered: `
<p>Are you passionate about writing on business, technology, lifestyle, health, travel, food, entertainment, or other interesting topics? If you have valuable knowledge, practical advice, or compelling stories to share, Tech Wave Media welcomes your contribution.</p>
<p>We publish original, informative, and engaging articles that provide genuine value to our readers. Whether you are an experienced writer, an industry professional, or an enthusiastic blogger, we would be delighted to review your work.</p>
<h3>Topics We Accept</h3>
<ul>
<li>Business and entrepreneurship</li>
<li>Technology and software</li>
<li>Lifestyle and wellness</li>
<li>Health and fitness</li>
<li>Travel and tourism</li>
<li>Food and recipes</li>
<li>Home improvement</li>
<li>Entertainment and current trends</li>
<li>News and related topics</li>
</ul>
<p>We may also consider other relevant article ideas that match the interests of our audience.</p>
<h3>Content Requirements</h3>
<ul>
<li><strong>Original Content:</strong> The article must be completely original and must not have been published elsewhere.</li>
<li><strong>Useful Information:</strong> Include practical tips, expert advice, tutorials, case studies, or meaningful insights.</li>
<li><strong>Clear Structure:</strong> Use headings, short paragraphs, and bullet points.</li>
<li><strong>Engaging Writing:</strong> Use clear, natural, reader-friendly language.</li>
<li><strong>Relevant Topic:</strong> Suitable for Tech Wave Media and valuable to readers.</li>
</ul>
<h3>Submission Guidelines</h3>
<ol>
<li>Submit your article in Microsoft Word or Google Docs format.</li>
<li>Articles should contain approximately 800–1,500 words.</li>
<li>Include a short author biography of around 50–100 words.</li>
<li>You may add a link to your website or social media profile in the author bio.</li>
<li>Use proper headings and subheadings.</li>
<li>Include relevant images when required and provide appropriate credits.</li>
<li>Proofread carefully before submitting.</li>
</ol>
<h3>How to Submit</h3>
<p>Send your completed article or topic proposal to <a href="mailto:guestpost@technicalinterest.com">guestpost@technicalinterest.com</a>.</p>
<p>Subject line: <strong>Guest Post Submission – [Your Topic]</strong></p>
<p>Our editorial team generally provides feedback within 7–10 business days.</p>
`,
      protected: false,
    },
    excerpt: {
      rendered: "<p>Guest post guidelines for Tech Wave Media.</p>",
      protected: false,
    },
    author: 1,
    featured_media: 0,
    parent: 0,
    menu_order: 3,
    comment_status: "closed",
    ping_status: "closed",
    template: "",
    meta: {},
  },
  {
    ...entity(104, "privacy-policy"),
    title: { rendered: "Privacy Policy" },
    content: {
      rendered: `
<p>Tech Wave Media respects your privacy and is committed to providing a secure online experience. This notice explains how we collect, use, manage, and protect information when you access the Tech Wave Media website.</p>
<p>By visiting or using our website, you agree to the information handling practices described in this notice.</p>
<h3>Information We Receive From You</h3>
<p>We may collect personal details that you voluntarily provide while contacting us, subscribing, or using the website, including name, email address, postal address, telephone number, and other information you submit.</p>
<p>The site may also collect technical details such as IP address, browser type, device information, pages visited, and referring URL. We use this to operate the website, maintain quality, diagnose problems, and understand usage.</p>
<h3>How We Handle Your Information</h3>
<p>We may use information to respond to enquiries, send service updates, research opinions, improve content, and display relevant advertisements. Tech Wave Media does not sell, rent, or lease subscriber lists to third parties.</p>
<h3>Cookies</h3>
<p>Cookies may remember preferences, analyse traffic, and support advertising. You can reject cookies in your browser; some features may stop working.</p>
<h3>Advertising Cookies From External Providers</h3>
<p>Third-party advertising providers may place cookies subject to those providers’ policies.</p>
<h3>Email Updates</h3>
<p>Unsubscribe using the link in each newsletter. You may still receive essential administrative messages.</p>
<h3>Protection</h3>
<p>We take reasonable measures to protect personal information. No online transmission is completely secure.</p>
<h3>Revisions</h3>
<p>We may update this notice and publish the new version on this page. Continued use after an update indicates acceptance.</p>
<h3>Questions</h3>
<p>Contact us at <a href="mailto:hello@techwavemedia.com">hello@techwavemedia.com</a>.</p>
`,
      protected: false,
    },
    excerpt: {
      rendered: "<p>How Tech Wave Media handles visitor data.</p>",
      protected: false,
    },
    author: 1,
    featured_media: 0,
    parent: 0,
    menu_order: 4,
    comment_status: "closed",
    ping_status: "closed",
    template: "",
    meta: {},
  },
];

export function seedPostsPaginated(
  page: number,
  perPage: number,
  filter?: {
    author?: string;
    tag?: string;
    category?: string;
    search?: string;
  }
) {
  let posts = [...seedPosts];
  if (filter?.search) {
    const q = filter.search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.rendered.toLowerCase().includes(q) ||
        p.content.rendered.toLowerCase().includes(q)
    );
  }
  if (filter?.author) {
    posts = posts.filter((p) => String(p.author) === String(filter.author));
  }
  if (filter?.tag) {
    posts = posts.filter((p) => p.tags.map(String).includes(String(filter.tag)));
  }
  if (filter?.category) {
    const cat = resolveSeedCategory(filter.category);
    if (cat) {
      posts = posts.filter((p) => p.categories.includes(cat.id));
    } else {
      posts = [];
    }
  }
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  return {
    data: posts.slice(start, start + perPage),
    headers: { total, totalPages },
  };
}

export function resolveSeedCategory(idOrSlug: string): Category | undefined {
  return seedCategories.find(
    (c) => c.slug === idOrSlug || String(c.id) === idOrSlug
  );
}
