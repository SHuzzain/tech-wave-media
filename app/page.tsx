import { getRecentPosts } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { FeaturedHero, MagazineCard } from "@/components/posts/magazine-card";
import { categoryMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getRecentPosts();
  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <>
      <Section className="pt-8">
        <Container className="max-w-6xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Welcome to {siteConfig.site_name}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl mb-8">
            Stories across business, technology, and everyday life
          </h1>
          {featured ? <FeaturedHero post={featured} /> : <EmptyHome />}
        </Container>
      </Section>

      <Section>
        <Container className="max-w-6xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {categoryMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border px-3 py-1 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((post) => (
                <MagazineCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function EmptyHome() {
  return (
    <p className="text-muted-foreground">
      No stories yet. Connect WordPress or import the seed file in{" "}
      <code>wordpress/tech-wave-seed.xml</code>.
    </p>
  );
}
