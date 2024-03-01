import { expect, test } from "@playwright/test";

test("search command produces an empty result", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill('[aria-label="Command input"]', "search non_existing_value");
  await page.click('button:has-text("Submit")');
  await page.waitForSelector(".history-text", { state: "visible" });
  const output = await page.locator(".history-text").innerText();
  expect(output).toBe("No results found for given query!"); // Adjusted expectation
});

test("dataset with only one column behaves correctly", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill('[aria-label="Command input"]', "load_file data/appraisal");
  await page.click('button:has-text("Submit")');
  await page.fill('[aria-label="Command input"]', "view");
  await page.click('button:has-text("Submit")');
  await page.waitForSelector(".repl-history table tbody", { state: "visible" });
  const output = await page.locator(".repl-history table tbody").innerText();
  expect(output).toContain("City");
});

test("search with varying results", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill('[aria-label="Command input"]', "load_file data/appraisal");
  await page.click('button:has-text("Submit")');
  await page.fill('[aria-label="Command input"]', "search 1 New York");
  await page.click('button:has-text("Submit")');
  await page.waitForSelector(".repl-history table tbody", { state: "visible" });
  let output = await page.locator(".repl-history table tbody").innerText();
  expect(output).toContain("New York");
  await page.fill('[aria-label="Command input"]', "search 1 Non_Existent_City");
  await page.click('button:has-text("Submit")');
  await page.waitForSelector(".history-text", { state: "visible" });
  output = await page.locator(".history-text").innerText();
  expect(output).toBe("No results found for given query!"); // Adjusted expectation
});
