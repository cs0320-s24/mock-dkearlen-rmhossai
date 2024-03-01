import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.goto("http://localhost:8000/");
  await expect(page.waitForSelector("button")).resolves.toBeTruthy();
});

test("after I click the button, its label increments", async ({ page }) => {
  // TODO WITH TA: Fill this in to test your button counter functionality!
  await page.goto("http://localhost:8000/");
  const initialLabel = await page.textContent("button");
  await page.click("button");
  await page.waitForFunction((initialLabel) => {
    const updatedLabel = document.querySelector("button")?.textContent;
    return updatedLabel != initialLabel;
  });
  const updatedLabel = await page.textContent("button");
  expect(parseInt(updatedLabel!.split(" ")[1])).toBe(
    parseInt(initialLabel!.split(" ")[1] + 1)
  );
  // await page.goto("http://localhost:8000/");
  // await expect(
  //   page.getByRole("button", { name: "Submitted 0 times" })
  // ).toBeVisible();
  // await page.getByRole("button", { name: "Submitted 0 times" }).click();
  // await page.getByRole("button", { name: "Submitted 1 time" }).click();
  // await page.getByRole("button", { name: "Submitted 2 times" }).click();
  // await page.getByRole("button", { name: "Submitted 3 times" }).click();
  // await expect(
  //   page.getByRole("button", { name: "Submitted 4 times" })
  // ).toBeVisible();
});

test("after I click the button, my command gets pushed", async ({ page }) => {
  // TODO: Fill this in to test your button push functionality!
  await page.goto("http://localhost:8000/");
  const initialHistoryCount = (await page.$$(".repl-history")).length;
  await page.click("button");
  await page.waitForFunction((initialCount) => {
    const newCount = document.querySelectorAll(".repl-history").length;
    return newCount > 0;
  });
  const newHistoryCount = (await page.$$(".repl-history")).length;
  expect(newHistoryCount).toBe(initialHistoryCount + 1);
});
