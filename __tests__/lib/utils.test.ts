import { describe, it, expect } from "vitest";
import { cn, stripDuplicateFeaturedImage } from "@/lib/utils";

describe("cn", () => {
  it("merges multiple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates conflicting Tailwind classes", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
    expect(cn("", "")).toBe("");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("stripDuplicateFeaturedImage", () => {
  const featured =
    "https://cms.example.com/wp-content/uploads/2026/08/ai-hero.jpg";

  it("removes the first body image when it is the featured file", () => {
    const html = `<figure class="wp-block-image"><img src="https://cms.example.com/wp-content/uploads/2026/08/ai-hero-1024x576.jpg" /></figure><p>Hello</p>`;
    expect(stripDuplicateFeaturedImage(html, featured)).toBe("<p>Hello</p>");
  });

  it("keeps a different first image", () => {
    const html = `<img src="https://cms.example.com/wp-content/uploads/2026/08/other.jpg" /><p>Hello</p>`;
    expect(stripDuplicateFeaturedImage(html, featured)).toBe(html);
  });
});
