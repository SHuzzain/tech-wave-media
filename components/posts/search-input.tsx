"use client";

import { Input } from "@/components/ui/input";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef } from "react";

export function SearchInput({ defaultValue }: { defaultValue?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchParams.get("focus") !== "search") return;
    inputRef.current?.focus();
    const params = new URLSearchParams(searchParams.toString());
    params.delete("focus");
    const query = params.toString();
    replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, pathname, replace]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("focus");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      ref={inputRef}
      id="search"
      type="text"
      name="search"
      placeholder="Search posts..."
      defaultValue={defaultValue}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
