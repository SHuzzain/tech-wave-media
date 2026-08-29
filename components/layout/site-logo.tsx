import { siteConfig } from "@/site.config";
import Image from "next/image";

export function SiteLogo({ height = 40 }: { height?: number }) {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.site_name}
      width={Math.round(height * 3.2)}
      height={height}
      style={{ width: "auto", height }}
      priority
    />
  );
}
