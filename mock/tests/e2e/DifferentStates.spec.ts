import { expect, test } from "@playwright/test";

test("application starts in brief mode", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  const output = await page.locator(".history-text").innerText();
  expect(output).toContain("Mode: Brief");
});

test("loading a CSV file affects subsequent commands", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill(
    '[aria-label="Command input"]',
    "load_file data/real_estate.csv"
  );
  await page.click('button:has-text("Submit")');
  await page.fill('[aria-label="Command input"]', "view");
  await page.click('button:has-text("Submit")');
  const output = await page.locator(".repl-history table tbody").innerText();
  expect(output).toContain("Phoenix");
});

test("switching between brief and verbose modes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill('[aria-label="Command input"]', "mode");
  await page.click('button:has-text("Submit")');
  let output = await page.locator(".history-text").innerText();
  expect(output).toContain("Mode: Verbose");
  await page.fill('[aria-label="Command input"]', "mode");
  await page.click('button:has-text("Submit")');
  output = await page.locator(".history-text").innerText();
  expect(output).toContain("Mode: Brief");
});

test("attempting commands when not authenticated is blocked", async ({
  page,
}) => {
  await page.goto("http://localhost:8000/");
  await page.fill(
    '[aria-label="Command input"]',
    "load_file data/real_estate.csv"
  );
  await page.click('button:has-text("Submit")');
  const output = await page.locator(".history-text").innerText();
  expect(output).toContain("Please authenticate to perform this action.");
});
