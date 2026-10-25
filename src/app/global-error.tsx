"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#050505",
            color: "#ffffff",
            fontFamily:
              "Montserrat, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            padding: "2rem",
          }}
        >
          <section style={{ maxWidth: "34rem", textAlign: "center" }}>
            <p style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>
              Application error
            </p>
            <h1 style={{ marginTop: "1rem", fontSize: "2rem" }}>
              The site hit a hard refresh moment.
            </h1>
            <p
              style={{
                marginTop: "1rem",
                color: "#a1a1aa",
                lineHeight: 1.7,
              }}
            >
              Something unexpected happened before the normal page shell could
              load.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: "1.5rem",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "999px",
                background: "#ffffff",
                color: "#050505",
                padding: "0.8rem 1.2rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
