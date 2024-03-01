import { expect, test } from "@playwright/test";

test("viewing without loading throws an error", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click('[aria-label="Login"]');
  await page.fill('[aria-label="Command input"]', "view");
  await page.click('button:has-text("Submit")');
  await expect(page.getByText("New York City")).not.toBeVisible();
  await expect(page.getByText("Chicago")).not.toBeVisible();
  await expect(page.getByText("Houston")).not.toBeVisible();
  await expect(page.getByText("Phoenix")).not.toBeVisible();
  await expect(page.getByText("Load a file before querying!")).toBeVisible;
});

test("searching without loading throws an error", async ({ page }) => {
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Type Condo");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Los Angeles")).not.toBeVisible;
  await expect(page.getByText("800000")).not.toBeVisible;
  await expect(page.getByText("Load a file before querying!")).toBeVisible;
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Price 650980");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Houston")).not.toBeVisible;
  await expect(page.getByText("400000")).not.toBeVisible;
  await expect(page.getByText("Load a file before querying!")).toBeVisible;
});

test("Test incorrect query shapes ", async ({ page }) => {
  // not starting off with load_command whatsoever
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_adfadf filepath");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  // not accepting case sensitive, and any other formatting errors while typing commands
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("LOAd_FiLE filepath");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  // providing the wrong commands for view and search
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("searchsearchsearch yuh yuh yuh");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  // the command has the wrong length as determined by load, view, and search
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file filepath with extra arguments");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search with extra arguments");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view with extra arguments");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command may have an incorrect shape or may be incorrect elsewhere!"
    )
  ).not.toBeNull();
  // command input has filepaths that do not exist in the mock data, so the files should not be
  // processed whatsoever; there may only be one case where this is actualy true and that case is
  // where we are searching for parameters that are not mocked
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search nonsense text");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Command has the correct shape but the fields may be incorrect!"
    )
  ).not.toBeNull();
});
