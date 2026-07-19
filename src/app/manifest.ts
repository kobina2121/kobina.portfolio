import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kobina Portfolio",
    short_name: "Kobina",
    description:
      "A premium portfolio for Kobina, a Ghana-based full stack developer.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: absoluteUrl("/icon"),
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: absoluteUrl("/apple-icon"),
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
