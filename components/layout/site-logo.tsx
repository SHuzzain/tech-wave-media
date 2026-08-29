import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SiteLogo({
  className,
  height = 40,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.site_name}
      width={Math.round(height * 3.2)}
      height={height}
      className={cn("h-10 w-auto object-contain", className)}
      priority
    />
  );
}
