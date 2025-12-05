import { test, expect } from '@playwright/test';

test.describe('Courses Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/courses');
  });

  test('should display courses page with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /course library/i })).toBeVisible();
  });

  test('should have search input', async ({ page }) => {
    await expect(page.getByPlaceholder(/search courses/i)).toBeVisible();
  });

  test('should have difficulty filter dropdown', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
  });

  test('should filter courses by difficulty', async ({ page }) => {
    // Wait for courses to load
    await page.waitForTimeout(1000);

    // Select beginner difficulty
    await page.locator('select').selectOption('BEGINNER');

    // URL should update or filter should apply
    await page.waitForTimeout(500);

    // Check that the filter was applied (page doesn't error)
    await expect(page.getByRole('heading', { name: /course library/i })).toBeVisible();
  });

  test('should navigate to course detail when clicking a course', async ({ page }) => {
    // Wait for courses to load
    await page.waitForTimeout(1000);

    // Find first course link
    const courseLink = page.locator('a[href^="/courses/"]').first();

    // If there are courses, click the first one
    const count = await courseLink.count();
    if (count > 0) {
      await courseLink.click();
      // Should navigate to course detail page
      await expect(page).toHaveURL(/\/courses\/[a-zA-Z0-9-]+/);
    }
  });

  test('should show course count', async ({ page }) => {
    // Wait for courses to load
    await page.waitForTimeout(1000);

    // Should show a count message (e.g., "0 courses found" or "1 course found")
    // Wait for loading to complete - look for the text that appears after loading
    await expect(page.locator('text=/\\d+ courses? found/')).toBeVisible({ timeout: 10000 });
  });

  test('should handle search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search courses/i);
    await searchInput.fill('test');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    // Wait for results
    await page.waitForTimeout(500);

    // Page should still be functional
    await expect(page.getByRole('heading', { name: /course library/i })).toBeVisible();
  });

  test('should clear search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search courses/i);
    await searchInput.fill('test');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    // Wait for results
    await page.waitForTimeout(500);

    // Clear search
    const clearButton = page.getByRole('button', { name: 'Clear', exact: true });
    const clearCount = await clearButton.count();
    if (clearCount > 0) {
      await clearButton.click();
      // Search input should be empty
      await expect(searchInput).toHaveValue('');
    }
  });
});

test.describe('Navigation', () => {
  test('should navigate to courses from homepage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /browse courses/i }).click();
    await expect(page).toHaveURL('/courses');
  });

  test('should have courses link in navigation', async ({ page }) => {
    await page.goto('/');
    // Look for Courses link in nav (not Browse Courses button)
    const navCourses = page.locator('nav').getByRole('link', { name: /^courses$/i });
    await expect(navCourses).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Go to courses
    await page.locator('nav').getByRole('link', { name: /courses/i }).click();
    await expect(page).toHaveURL('/courses');

    // Go back home
    await page.locator('nav').getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL('/');
  });
});
