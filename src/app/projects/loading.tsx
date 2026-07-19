import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen">
      <Container className="pt-32 pb-20">
        <Skeleton className="mb-5 h-10 w-40 rounded-full" />
        <Skeleton className="h-28 max-w-3xl rounded-3xl" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Skeleton className="h-96 rounded-[1.75rem]" />
          <Skeleton className="h-96 rounded-[1.75rem]" />
          <Skeleton className="h-96 rounded-[1.75rem]" />
        </div>
      </Container>
    </main>
  );
}
