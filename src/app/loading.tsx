import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="homepage-font bg-background text-foreground min-h-screen">
      <Container className="space-y-8 pt-32 pb-20">
        <Skeleton className="h-10 w-48 rounded-full" />
        <Skeleton className="h-20 max-w-2xl rounded-3xl" />
        <div className="grid gap-5 md:grid-cols-3">
          <Skeleton className="h-72 rounded-[1.75rem]" />
          <Skeleton className="h-72 rounded-[1.75rem]" />
          <Skeleton className="h-72 rounded-[1.75rem]" />
        </div>
      </Container>
    </main>
  );
}
