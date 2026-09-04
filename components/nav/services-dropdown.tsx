"use client";

import Link from "next/link";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServicesDropdownProps {
  hasSeoChild?: boolean;
}

export function ServicesDropdown({ hasSeoChild = true }: ServicesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 text-muted-foreground hover:text-foreground outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded">
        <span>Services</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-lg">
        <DropdownMenuItem asChild>
          <Link
            href="/seo-company-in-chennai"
            className="flex items-center gap-2.5 px-3 py-2 cursor-pointer font-medium"
          >
            <Search className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span>SEO Services</span>
              <span className="text-xs text-muted-foreground font-normal">
                Chennai SEO & Lead Gen
              </span>
            </div>
          </Link>
        </DropdownMenuItem>

        {hasSeoChild && (
          <DropdownMenuItem asChild>
            <Link
              href="/posts/categories/seo"
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-sm"
            >
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>SEO Blog & Articles</span>
                <span className="text-xs text-muted-foreground">
                  Read latest SEO insights
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
