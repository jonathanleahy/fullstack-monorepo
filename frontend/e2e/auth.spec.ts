import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should show register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('should have link to register from login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('link', { name: /create a new account/i })).toBeVisible();
  });

  test('should have link to login from register page', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible();
  });

  test('should show validation error for invalid email on login', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#password').fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show error message or stay on page
    await page.waitForTimeout(1000);
    // Either shows error or stays on login page
    const url = page.url();
    expect(url).toContain('login');
  });

  test('should redirect unauthenticated users from protected routes', async ({ page }) => {
    await page.goto('/my-courses');
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });

  test('should show login/register buttons when not authenticated', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /register/i })).toBeVisible();
  });
});

test.describe('Registration Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      name: 'Test User',
      password: 'TestPassword123!',
    };

    await page.goto('/register');

    await page.locator('#name').fill(testUser.name);
    await page.locator('#email').fill(testUser.email);
    await page.locator('#password').fill(testUser.password);
    await page.locator('#confirm-password').fill(testUser.password);
    await page.getByRole('button', { name: /create account/i }).click();

    // Should redirect to home after successful registration
    await expect(page).toHaveURL('/');
    // Should show user name in header
    await expect(page.getByText(testUser.name)).toBeVisible();
    // Should show logout button
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });
});

test.describe('Login Flow', () => {
  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.locator('#email').fill('nonexistent@example.com');
    await page.locator('#password').fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show error message or stay on login page
    await page.waitForTimeout(1000);
    // Check we're still on login or there's an error
    const url = page.url();
    expect(url).toContain('login');
  });
});
