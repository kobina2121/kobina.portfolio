import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCaseStudyLoading() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen">
      <Container className="space-y-8 pt-32 pb-20">
        <Skeleton className="h-8 w-36 rounded-full" />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <Skeleton className="h-52 rounded-[2rem]" />
          <Skeleton className="h-40 rounded-[1.75rem]" />
        </div>
        <Skeleton className="h-80 rounded-[2rem]" />
        <div className="grid gap-5 md:grid-cols-3">
          <Skeleton className="h-56 rounded-[1.5rem]" />
          <Skeleton className="h-56 rounded-[1.5rem]" />
          <Skeleton className="h-56 rounded-[1.5rem]" />
        </div>
      </Container>
    </main>
  );
}
