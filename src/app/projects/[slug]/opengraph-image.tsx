import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/portfolio-content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ProjectOpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({
  params,
}: ProjectOpenGraphImageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050505",
        color: "#ffffff",
        padding: 72,
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 28, color: "#a1a1aa" }}>Case Study</div>
        <div style={{ color: "#a1a1aa", fontSize: 28 }}>
          {project?.year ?? "Portfolio"}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            maxWidth: 860,
            fontSize: 86,
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.07em",
          }}
        >
          {project?.title ?? "Project not found"}
        </div>
        <div
          style={{
            maxWidth: 780,
            marginTop: 28,
            color: "#d4d4d8",
            fontSize: 28,
            lineHeight: 1.3,
          }}
        >
          {project?.outcome ?? "Explore selected project work by Kobina."}
        </div>
      </div>
      <div
        style={{
          width: 180,
          height: 6,
          background: "linear-gradient(90deg, #ffffff, #52525b)",
        }}
      />
    </div>,
    size,
  );
}
