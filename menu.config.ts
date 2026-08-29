export type MenuItem = {
  label: string;
  href: string;
  slug?: string;
};

export const categoryMenu: MenuItem[] = [
  { label: "Business", href: "/posts/categories/business", slug: "business" },
  {
    label: "Technology",
    href: "/posts/categories/technology",
    slug: "technology",
  },
  { label: "Food", href: "/posts/categories/food", slug: "food" },
  { label: "Health", href: "/posts/categories/health", slug: "health" },
  { label: "Lifestyle", href: "/posts/categories/lifestyle", slug: "lifestyle" },
  {
    label: "Digital Marketing",
    href: "/posts/categories/digital-marketing",
    slug: "digital-marketing",
  },
  { label: "AI", href: "/posts/categories/ai", slug: "ai" },
];

export const mainMenu: MenuItem[] = [
  { label: "Home", href: "/" },
  ...categoryMenu,
  { label: "Services", href: "/pages/services" },
  { label: "About", href: "/pages/about" },
  { label: "Contact", href: "/contact" },
];

export const contentMenu: MenuItem[] = [
  { label: "All posts", href: "/posts" },
  { label: "Write for Us", href: "/write-for-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Categories", href: "/posts/categories" },
  { label: "Tags", href: "/posts/tags" },
];
