import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { categoryMenu, contentMenu } from "@/menu.config";
import { SiteLogo } from "@/components/layout/site-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export function Nav({ className, children, id }: NavProps) {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background border-b", className)}
      id={id}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 gap-4">
          <Link className="hover:opacity-80 transition-opacity shrink-0" href="/">
            <SiteLogo className="max-h-16" height={64} />
          </Link>
          {children}
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
              <Link href="/posts?focus=search">Search posts</Link>
            </Button>
            <Button asChild size="sm" className="hidden sm:flex">
              <Link href="/write-for-us">Write for Us</Link>
            </Button>
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
        <div className="hidden md:flex flex-wrap items-center gap-x-1 gap-y-1 border-t py-2 text-sm">
          <Link href="/" className="px-2 py-1 hover:text-primary font-medium">
            Home
          </Link>
          {categoryMenu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-1 text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/pages/services"
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
          >
            Services
          </Link>
          <Link
            href="/pages/about"
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-2 py-1 text-muted-foreground hover:text-foreground"
          >
            Contact
          </Link>
          {contentMenu
            .filter((item) => item.href === "/privacy-policy")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-1 text-muted-foreground hover:text-foreground ml-auto"
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
}
