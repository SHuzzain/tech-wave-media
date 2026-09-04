import { Section, Container } from "@/components/craft";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { categoryMenu, contentMenu } from "@/menu.config";
import { SiteLogo } from "@/components/layout/site-logo";
import { siteConfig } from "@/site.config";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-12">
      <Section>
        <Container className="grid md:grid-cols-[1.6fr_0.7fr_0.7fr] gap-12">
          <div className="flex flex-col gap-4 not-prose">
            <Link href="/" className="inline-block">
              <SiteLogo height={80} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xl">
              {siteConfig.site_description}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Sections</h5>
            {categoryMenu.map((item) => (
              <Link
                className="hover:underline underline-offset-4"
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Site</h5>
            <Link
              className="hover:underline underline-offset-4"
              href="/seo-company-in-chennai"
            >
              Services (SEO)
            </Link>
            {contentMenu.map((item) => (
              <Link
                className="hover:underline underline-offset-4"
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
            <Link className="hover:underline underline-offset-4" href="/contact">
              Contact
            </Link>
            <Link className="hover:underline underline-offset-4" href="/admin">
              Editor login
            </Link>
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} All Rights Are Reserved |{" "}
            {siteConfig.site_name}
          </p>
        </Container>
      </Section>
    </footer>
  );
}
