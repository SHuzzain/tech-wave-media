import { getCategoryBySlug, getPostsByCategorySlug } from "@/lib/wordpress";
import { MagazineCard } from "@/components/posts/magazine-card";
import { Section, Container, Prose } from "@/components/craft";
import { notFound } from "next/navigation";
import { categoryMenu } from "@/menu.config";
import type { Metadata } from "next";

export const revalidate = 3600;

export async function generateStaticParams() {
  return categoryMenu
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Articles in ${category.name} from Tech Wave Media.`,
    alternates: { canonical: `/posts/categories/${slug}` },
  };
}

export default async function CategoryArchive({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const posts = await getPostsByCategorySlug(slug);

  return (
    <Section>
      <Container className="max-w-6xl">
        <Prose>
          <h1>{category.name}</h1>
          <p className="text-muted-foreground">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </p>
        </Prose>
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {posts.map((post) => (
              <MagazineCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-muted-foreground">No stories in this section yet.</p>
        )}
      </Container>
    </Section>
  );
}
