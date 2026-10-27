import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/layout/empty-state";
import { IconLink } from "@/components/layout/icon-link";
import { Prose } from "@/components/layout/prose";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { SiteNavbar } from "@/components/site-navbar";

export const metadata: Metadata = {
  title: "Design System — Kobina",
  description: "Development reference for portfolio design tokens and UI.",
};

const swatches = [
  { label: "Background", className: "bg-background" },
  { label: "Foreground", className: "bg-foreground" },
  { label: "Surface", className: "bg-surface" },
  { label: "Muted", className: "bg-surface-muted" },
  { label: "Brand", className: "bg-accent-brand" },
] as const;

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="homepage-font bg-background text-foreground min-h-screen"
    >
      <SiteNavbar active="home" />
      <Container className="pt-32 pb-20">
        <Section spacing="sm">
          <SectionHeading
            eyebrow="Reference"
            title="Portfolio design system"
            description="A private development page for checking tokens, primitives, typography, and reusable layout components."
          />
        </Section>

        <Section spacing="sm" className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Color tokens</CardTitle>
              <CardDescription>
                Semantic surfaces shared across light and dark themes.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {swatches.map((swatch) => (
                <div
                  key={swatch.label}
                  className="border-border bg-surface rounded-2xl border p-3"
                >
                  <div
                    className={`border-border mb-3 h-16 rounded-xl border ${swatch.className}`}
                  />
                  <p className="text-sm font-semibold">{swatch.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>
                Montserrat body text, MonteCarlo signature, and fluid headings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="signature-logo text-5xl">Kobina</p>
              <h2 className="text-fluid-xl mt-6 font-black tracking-tight">
                Sharp digital interfaces.
              </h2>
              <Prose className="mt-4">
                <p>
                  Body copy uses readable spacing, strong contrast, and a
                  restrained line length for both themes.
                </p>
              </Prose>
            </CardContent>
          </Card>
        </Section>

        <Section spacing="sm">
          <SectionHeading
            eyebrow="Primitives"
            title="Shadcn UI base components"
            description="The baseline controls used for forms, cards, actions, feedback, and loading states."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Buttons, badges, and icon links.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Badge>Badge</Badge>
                <IconLink href="/">Home</IconLink>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fields</CardTitle>
                <CardDescription>Input, textarea, and labels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" placeholder="Kobina Kyereboah" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    placeholder="Tell me about the brief"
                  />
                </Field>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>States</CardTitle>
                <CardDescription>Empty and loading states.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-24 rounded-2xl" />
                <Separator />
                <EmptyState
                  title="Nothing here yet"
                  description="This pattern keeps empty areas intentional."
                />
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section spacing="sm">
          <div className="design-panel rounded-3xl p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="text-accent-brand size-5" />
              <h2 className="text-2xl font-black">Reusable surface</h2>
            </div>
            <p className="text-muted-copy mt-4 max-w-2xl text-sm leading-7">
              This panel uses the shared border, surface, shadow, and text
              tokens. It should remain readable in both white and dark themes.
            </p>
            <Button className="mt-6" variant="outline">
              <Mail className="size-4" />
              Contact action
            </Button>
          </div>
        </Section>
      </Container>
    </main>
  );
}
