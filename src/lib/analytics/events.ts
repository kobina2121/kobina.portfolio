export type PortfolioEventName =
  | "copy_email"
  | "download_cv"
  | "open_external_link"
  | "back_to_top";

type PortfolioEventDetail = {
  label?: string;
  href?: string;
  cvVersion?: string;
  source?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackPortfolioEvent(
  name: PortfolioEventName,
  detail: PortfolioEventDetail = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    name,
    ...detail,
  };

  window.dispatchEvent(
    new CustomEvent("portfolio:event", {
      detail: payload,
    }),
  );

  window.dataLayer?.push({
    event: `portfolio_${name}`,
    ...detail,
  });
}
