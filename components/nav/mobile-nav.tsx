"use client";

// React and Next Imports
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

// Utility Imports
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { SiteLogo } from "@/components/layout/site-logo";
import { contentMenu } from "@/menu.config";

export interface NavCategoryItem {
  id: number;
  label: string;
  href: string;
  slug: string;
}

interface MobileNavProps {
  categories?: NavCategoryItem[];
  hasSeoChild?: boolean;
}

export function MobileNav({
  categories = [],
  hasSeoChild = true,
}: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 border w-10 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader>
          <SheetTitle className="text-left">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setOpen}
            >
              <SiteLogo height={48} />
            </MobileLink>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <h3 className="text-small mt-6">Menu</h3>
            <Separator />

            {/* Home */}
            <MobileLink href="/" onOpenChange={setOpen}>
              Home
            </MobileLink>

            {/* Dynamic WordPress Categories */}
            {categories.map((cat) => (
              <MobileLink key={cat.href} href={cat.href} onOpenChange={setOpen}>
                {cat.label}
              </MobileLink>
            ))}

            {/* Services with Child Links */}
            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full text-lg py-1 hover:text-primary transition-colors text-left"
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 mr-4 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="ml-4 mt-2 space-y-2 border-l pl-3">
                  <MobileLink
                    href="/seo-company-in-chennai"
                    onOpenChange={setOpen}
                    className="text-base text-muted-foreground hover:text-foreground block"
                  >
                    SEO Services
                  </MobileLink>
                  {hasSeoChild && (
                    <MobileLink
                      href="/posts/categories/seo"
                      onOpenChange={setOpen}
                      className="text-base text-muted-foreground hover:text-foreground block"
                    >
                      SEO Blog & Articles
                    </MobileLink>
                  )}
                </div>
              )}
            </div>

            {/* Static Content Links */}
            <MobileLink href="/pages/about" onOpenChange={setOpen}>
              About
            </MobileLink>
            <MobileLink href="/contact" onOpenChange={setOpen}>
              Contact
            </MobileLink>

            <h3 className="text-small pt-6">More</h3>
            <Separator />
            {contentMenu.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
              >
                {item.label}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-lg", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
