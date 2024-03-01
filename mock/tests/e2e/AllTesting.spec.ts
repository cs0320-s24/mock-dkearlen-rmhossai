import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Navigate application's URL before each test.
  await page.goto("http://localhost:8000");
  await page.click('[aria-label="Login"]');
});

test("switching to brief mode shows only the output history", async ({
  page,
}) => {
  // Interact with the input box, press enter, and switch to brief mode (note: should be brief mode by default)
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No loaded file found!")).toBeVisible();
  // Shouldn't be attached (or visible for that matter)
  await expect(page.getByText("Command: view")).not.toBeAttached();
});

test("switching to verbose mode shows output AND command history", async ({
  page,
}) => {
  // Interact with the input box, press enter, and switch to VERBOSE mode. Should have the command there in addition to output.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No loaded file found!")).toBeVisible();
  await expect(page.getByText("Command: view")).toBeVisible();
});

test("Test loading and viewing appraisal CSV", async ({ page }) => {
  // Execute the 'load_file' command with working files. Click command input, fill in with load_file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();

  // Test viewing the cities CSV
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("State")).toBeVisible();
  await expect(page.getByText("Price")).toBeVisible();
});

test("Test loading, viewing, and searching an empty CSV", async ({ page }) => {
  // Should successfully get back filepath
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/empty")).toBeVisible();

  // Should get back nothing in response to view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("")).toBeNull;

  // Should find a command not found response to searching the CSV.
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("emptyfp search 20 Value");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command Not Found!")).toBeNull;
});

test("Test loading and viewing Houston appraisal data", async ({ page }) => {
  // These tests are exclusively just for querying differently shaped data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("State")).toBeVisible;
  await expect(page.getByText("TX")).toBeVisible;
});

test("Test successfully searching by column name and column index. Also tests LOAD -> SEARCH -> VIEW 2x in a row", async ({
  page,
}) => {
  // Check if the filepath was successfully loaded for appraisal data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();

  // View CSV data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("City")).toBeVisible;
  await expect(page.getByText("State")).toBeVisible;
  await expect(page.getByText("Price")).toBeVisible;

  // Search by column name for New York City data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Price 1000000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("NY")).toBeVisible;
  await expect(page.getByText("1000000")).toBeVisible;

  // Search by column index for New York City data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 2 1000000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("NY")).toBeVisible;
  await expect(page.getByText("1000000")).toBeVisible;

  // Check if the filepath was successfully loaded for LA data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/vibe");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/vibe")).toBeVisible();

  // View CSV data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Boston")).toBeVisible();
  await expect(page.getByText("New Orleans")).toBeVisible();

  // Search by column name for Los Angeles data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search State MA");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("MA")).toBeVisible;
  await expect(page.getByText("yes")).toBeVisible;


});

test("Test unsucessfully searching by column name and column index. Not in succession", async ({
  page,
}) => {
  // Check if the filepath was successfully loaded for New York City data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();

  // Search by column index for New York City data  -> NO VALUE response
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search 23 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No results found for given query!")).toBeVisible;

  // Search by column name for New York City data -> NO VALUE response
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Tim 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No results found for given query!")).toBeVisible;
});

/**
 * Test for LOAD -> LOAD -> LOAD. Ideally the load->view->search combo above would encompass
 * other cases where you do load->view->load->view or ***load->search->load->search***
 */
test("Test LOAD -> LOAD -> LOAD succession", async ({ page }) => {
  // Check if the filepath was successfully loaded for appraisal data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();

  // Check if the filepath was successfully loaded for vibe data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/vibe");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/vibe")).toBeVisible();

  // Check if the filepath was successfully loaded for career data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/career");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/career")).toBeVisible();

  // Check if the filepath successfully loaded for empty data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/empty")).toBeVisible();
});

/**
 * Test the independence of view and search queries. If view is NOT queried for, it shouldn't matter
 * with regards for being able to search (provided you've loaded a file).
 */
test("Test the independence of view and search queries", async ({ page }) => {
  // Check if the filepath was successfully loaded for overall CSV data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/appraisal")).toBeVisible();

  // Search by column name for Houston data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search price 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Houston")).toBeVisible;
  await expect(page.getByText("600000")).toBeVisible;

  // Search by column index for Los Angeles data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state CA");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Los Angeles")).toBeVisible;
  await expect(page.getByText("CA")).toBeVisible;
});

/**
 * VIEWING WITHOUT LOADING FIRST TEST
 */
// Check if the filepath was successfully loaded for LA data
test("viewing without loading first leads an error", async ({ page }) => {
  // View LA data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // DO NOT expect any HTML table elements to get rendered.
  await expect(page.getByText("City")).not.toBeVisible();
  await expect(page.getByText("New York City")).not.toBeVisible();
  await expect(page.getByText("Los Angeles")).not.toBeVisible();
  await expect(page.getByText("Chicago")).not.toBeVisible();

  // Throw an error message
  await expect(page.getByText("No loaded file found!")).toBeVisible;
});

/**
 * SEARCH WITHOUT LOADING FIRST TEST
 */
test("searching without loading first throws an error", async ({ page }) => {
  // Search by column index
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Type Price");
  await page.getByRole("button", { name: "Submit" }).click();

  // Expect the text you'd get back in a normal case to NOT show up
  await expect(page.getByText("Houston")).not.toBeVisible;
  await expect(page.getByText("400000")).not.toBeVisible;

  // Expect error message to show up
  await expect(page.getByText("No loaded file found!")).toBeVisible;

  // Search by column name
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search Price 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  // Expect text you'd get back in a normal case to not show up
  await expect(page.getByText("Houston")).not.toBeVisible;
  await expect(page.getByText("600000")).not.toBeVisible;
  // Expect error message to show up
  await expect(page.getByText("No loaded file found!")).toBeVisible;
});

/**
 * INCORRECT QUERY SHAPES
 * tests for querying incorrect shapes like incorrect parameters, incorrect amount of parameters, nonexistent filepaths,
 * etc.
 */
test("Test incorrect query shapes ", async ({ page }) => {
  // First part of command inputted isn't of the form "load_file, search, or view" in a case-sensitive manner

  // - 1. Just not load_file at all in any way
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_bubba formula");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Loading file failed!")).not.toBeNull();

  // - 2. Case sensitive. Strange capitalizations, letter swapping, spacing, etc. should not be accpeted
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("LOAd_FiLE fp2");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Loading file failed!")).not.toBeNull();

  // - 3. Incorrect input for search, view
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command not found!")).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("searchsearchsearch yuh yuh yuh");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command not found!")).not.toBeNull();

  // Command inputted is of the wrong length for load, search, and view
  await page.getByLabel("Command input").click();
  await page
    .getByLabel("Command input")
    .fill("load_file formula extra args are here");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Loading file failed!")).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search extra args args");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No results found for given query!")
  ).not.toBeNull();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search nonsense text");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No results found for given query!")
  ).not.toBeNull();
});
/**
 * Test that if malformed data is given, the correct response is returned.
 */
test("Test loading malformed data gives correct response", async ({
  page,
}) => {
  // Check if the filepath was successfully loaded for New York City data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal_malformed");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Cannot load malformed data!")).toBeVisible();
});
/**
 * Test that if a second load failed but the first passed, the first load is still the one on file.
 */
test("Test loading bad data after loading good data", async ({ page }) => {
  // Check if the filepath was successfully loaded for overall CSV data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File Loaded Successfully: data/appraisal")
  ).toBeVisible();

  // Try submitting a bad file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/nonexistent");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Loading file failed!")).toBeVisible(); 

  // Search by column name for Houston data (SHOULD STILL WORK)
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search price 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Houston")).toBeVisible;
  await expect(page.getByText("600000")).toBeVisible;

  // Search by column index for Los Angeles data (SHOULD STILL WORK)
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state CA");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Los Angeles")).toBeVisible;
  await expect(page.getByText("CA")).toBeVisible;
});

test("Test load search load search", async ({ page }) => {
  // Check if the filepath was successfully loaded for overall CSV data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File Loaded Successfully: data/appraisal")
  ).toBeVisible();

  // Search by column name for Houston data (SHOULD STILL WORK)
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search price 600000");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Houston")).toBeVisible;
  await expect(page.getByText("600000")).toBeVisible;

  // Try loading a new file
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/vibe");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("File Loaded Successfully: data/vibe")).toBeVisible();

  // Search by column index for Boston data (not in data/appraisal, but in data/vibe)
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("search state MA");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Boston")).toBeVisible;
  await expect(page.getByText("MA")).toBeVisible;
});

test("viewing without loading first then loading then viewing", async ({ page }) => {
  // View LA data
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // DO NOT expect any HTML table elements to get rendered.
  await expect(page.getByText("City")).not.toBeVisible();
  await expect(page.getByText("New York City")).not.toBeVisible();
  await expect(page.getByText("Los Angeles")).not.toBeVisible();
  await expect(page.getByText("Chicago")).not.toBeVisible();

  // Throw an error message
  await expect(page.getByText("No loaded file found!")).toBeVisible;

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_file data/appraisal");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File Loaded Successfully: data/appraisal")
  ).toBeVisible();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // Expect the HTML table elements to get rendered. We can't add city and New York City since they both hold "city", we'd have
  // to be more specific
  await expect(page.getByText("Los Angeles")).toBeVisible();
  await expect(page.getByText("Chicago")).toBeVisible();
});

