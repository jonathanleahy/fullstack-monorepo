import { test, expect } from '@playwright/test';

test.describe('My Courses Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/my-courses');
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });
});

test.describe('My Courses Page - Authenticated', () => {
  // Helper to register and login
  async function registerAndLogin(page: import('@playwright/test').Page) {
    const email = `test-${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    const name = 'Test User';

    await page.goto('/register');
    await page.locator('#name').fill(name);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirm-password').fill(password);
    await page.getByRole('button', { name: /create account/i }).click();

    // Wait for redirect
    await expect(page).toHaveURL('/');
    return { email, password, name };
  }

  test('should show My Courses link when authenticated', async ({ page }) => {
    await registerAndLogin(page);
    await expect(page.locator('nav').getByRole('link', { name: /my courses/i })).toBeVisible();
  });

  test('should access my courses page when authenticated', async ({ page }) => {
    await registerAndLogin(page);

    await page.locator('nav').getByRole('link', { name: /my courses/i }).click();
    await expect(page).toHaveURL('/my-courses');
    await expect(page.getByRole('heading', { name: /my courses/i })).toBeVisible();
  });

  test('should show tabs for filtering courses', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('/my-courses');

    // Should have tabs
    await expect(page.getByRole('button', { name: /all courses/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /in progress/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /completed/i })).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('/my-courses');

    // Click In Progress tab
    await page.getByRole('button', { name: /in progress/i }).click();
    await page.waitForTimeout(500);

    // Click Completed tab
    await page.getByRole('button', { name: /completed/i }).click();
    await page.waitForTimeout(500);

    // Click All Courses tab
    await page.getByRole('button', { name: /all courses/i }).click();
    await page.waitForTimeout(500);

    // Page should still be functional
    await expect(page.getByRole('heading', { name: /my courses/i })).toBeVisible();
  });

  test('should show empty state when no courses enrolled', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('/my-courses');

    // New user should have no courses - wait for content to load
    // Wait for loading spinner to disappear and empty state to appear
    await page.waitForSelector('text=/Loading your courses/i', { state: 'hidden', timeout: 10000 }).catch(() => {});

    // Should show empty message or browse link
    const browseLink = page.getByRole('link', { name: /browse courses/i });
    await expect(browseLink).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to browse courses from empty state', async ({ page }) => {
    await registerAndLogin(page);
    await page.goto('/my-courses');

    // Wait for loading to complete
    await page.waitForSelector('text=/Loading your courses/i', { state: 'hidden', timeout: 10000 }).catch(() => {});

    // Click the Browse Courses link
    await page.getByRole('link', { name: /browse courses/i }).click();
    await expect(page).toHaveURL('/courses');
  });
});

test.describe('Course Enrollment Flow', () => {
  async function registerAndLogin(page: import('@playwright/test').Page) {
    const email = `test-${Date.now()}@example.com`;
    const password = 'TestPassword123!';
    const name = 'Test User';

    await page.goto('/register');
    await page.locator('#name').fill(name);
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#confirm-password').fill(password);
    await page.getByRole('button', { name: /create account/i }).click();

    await expect(page).toHaveURL('/');
    return { email, password, name };
  }

  test('should show enroll button on course detail page when authenticated', async ({ page }) => {
    await registerAndLogin(page);

    await page.goto('/courses');
    await page.waitForTimeout(1000);

    // Find and click first course
    const courseLink = page.locator('a[href^="/courses/"]').first();
    const count = await courseLink.count();

    if (count > 0) {
      await courseLink.click();
      await page.waitForTimeout(500);

      // Should see enroll button or "Start Learning" text
      const enrollButton = page.getByRole('button', { name: /enroll/i });
      const startButton = page.getByRole('button', { name: /start/i });

      const hasEnroll = await enrollButton.count() > 0;
      const hasStart = await startButton.count() > 0;
      expect(hasEnroll || hasStart).toBeTruthy();
    }
  });

  test('should show sign in prompt on course detail when not authenticated', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForTimeout(1000);

    // Find and click first course
    const courseLink = page.locator('a[href^="/courses/"]').first();
    const count = await courseLink.count();

    if (count > 0) {
      await courseLink.click();
      await page.waitForTimeout(500);

      // Should see sign in prompt
      const signInButton = page.getByRole('button', { name: /sign in/i });
      await expect(signInButton).toBeVisible();
    }
  });
});
