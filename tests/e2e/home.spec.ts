import { expect, test } from "@playwright/test";

test("renders the portfolio hero", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Hi, I'm a web designer and front-end developer",
    }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { name: "#projects" })).toBeVisible();
});
