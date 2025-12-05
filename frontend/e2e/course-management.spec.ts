import { test, expect } from '@playwright/test';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    // Register and login a unique test user for each test
    const testEmail = `coursetest-${Date.now()}@example.com`;
    await page.goto('/register');
    await page.locator('#name').fill('Course Tester');
    await page.locator('#email').fill(testEmail);
    await page.locator('#password').fill('TestPassword123!');
    await page.locator('#confirm-password').fill('TestPassword123!');
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should show Create Course button on courses page', async ({ page }) => {
    await page.goto('/courses');
    await expect(page.getByRole('link', { name: /create course/i })).toBeVisible();
  });

  test('should navigate to create course page', async ({ page }) => {
    await page.goto('/courses');
    await page.getByRole('link', { name: /create course/i }).click();
    await expect(page).toHaveURL('/courses/new');
    await expect(page.getByRole('heading', { name: /create new course/i })).toBeVisible();
  });

  test('should display course form with required fields', async ({ page }) => {
    await page.goto('/courses/new');

    // Check course details card
    await expect(page.getByRole('heading', { name: /course details/i })).toBeVisible();
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();
    await expect(page.locator('#author')).toBeVisible();
    await expect(page.locator('#difficulty')).toBeVisible();
    await expect(page.locator('#estimatedHours')).toBeVisible();

    // Check lessons section
    await expect(page.getByRole('heading', { name: /lessons/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /add lesson/i })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/courses/new');

    // Clear any pre-filled values and submit
    await page.locator('#title').clear();
    await page.locator('#description').clear();
    await page.locator('#author').clear();
    await page.getByRole('button', { name: /create course/i }).click();

    // Should show validation errors
    await expect(page.getByText(/title is required/i)).toBeVisible();
    await expect(page.getByText(/description is required/i)).toBeVisible();
    await expect(page.getByText(/author is required/i)).toBeVisible();
  });

  test('should add a lesson', async ({ page }) => {
    await page.goto('/courses/new');

    // Click Add Lesson
    await page.getByRole('button', { name: /add lesson/i }).click();

    // Fill in lesson details
    await page.locator('#lesson-title').fill('Getting Started');
    await page.locator('#lesson-content').fill('This is the first lesson content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Lesson should appear in list
    await expect(page.getByText(/getting started/i)).toBeVisible();
  });

  test('should edit a lesson', async ({ page }) => {
    await page.goto('/courses/new');

    // Add a lesson first
    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('Original Title');
    await page.locator('#lesson-content').fill('Original content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Edit the lesson
    await page.getByRole('button', { name: /edit/i }).click();
    await page.locator('#lesson-title').fill('Updated Title');
    await page.getByRole('button', { name: /update lesson/i }).click();

    // Should show updated title
    await expect(page.getByText(/updated title/i)).toBeVisible();
  });

  test('should delete a lesson', async ({ page }) => {
    await page.goto('/courses/new');

    // Add a lesson
    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('Lesson to Delete');
    await page.locator('#lesson-content').fill('This will be deleted.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Verify lesson exists
    await expect(page.getByText(/lesson to delete/i)).toBeVisible();

    // Delete the lesson
    await page.getByRole('button', { name: /delete/i }).click();

    // Lesson should be gone
    await expect(page.getByText(/lesson to delete/i)).not.toBeVisible();
  });

  test('should create a complete course', async ({ page }) => {
    await page.goto('/courses/new');

    // Fill in course details
    await page.locator('#title').fill('Introduction to Testing');
    await page.locator('#description').fill('Learn how to write comprehensive tests for your applications.');
    await page.locator('#author').fill('Test Author');
    await page.locator('#difficulty').selectOption('BEGINNER');
    await page.locator('#estimatedHours').fill('5');

    // Add a lesson
    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('Getting Started with Tests');
    await page.locator('#lesson-content').fill('In this lesson, we will learn the basics of testing.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Submit the form
    await page.getByRole('button', { name: /create course/i }).click();

    // Should redirect to course detail page
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+$/);
    await expect(page.getByRole('heading', { name: /introduction to testing/i })).toBeVisible();
  });

  test('should navigate to edit page from course detail', async ({ page }) => {
    // First create a course
    await page.goto('/courses/new');
    await page.locator('#title').fill('Course to Edit');
    await page.locator('#description').fill('This course will be edited.');
    await page.locator('#author').fill('Editor');
    await page.locator('#estimatedHours').fill('3');

    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('First Lesson');
    await page.locator('#lesson-content').fill('Lesson content here.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    await page.getByRole('button', { name: /create course/i }).click();

    // Wait for redirect to course detail
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+$/);

    // Click edit button
    await page.getByRole('link', { name: /edit/i }).click();

    // Should be on edit page
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+\/edit$/);
    await expect(page.getByRole('heading', { name: /edit course/i })).toBeVisible();
  });

  test('should edit course details', async ({ page }) => {
    // Create a course first
    await page.goto('/courses/new');
    await page.locator('#title').fill('Original Course Title');
    await page.locator('#description').fill('Original description.');
    await page.locator('#author').fill('Original Author');
    await page.locator('#estimatedHours').fill('2');

    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('A Lesson');
    await page.locator('#lesson-content').fill('Some content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    await page.getByRole('button', { name: /create course/i }).click();
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+$/);

    // Go to edit page
    await page.getByRole('link', { name: /edit/i }).click();

    // Update the title
    await page.locator('#title').clear();
    await page.locator('#title').fill('Updated Course Title');

    // Save changes
    await page.getByRole('button', { name: /save changes/i }).click();

    // Should redirect back to course detail with updated title
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+$/);
    await expect(page.getByRole('heading', { name: /updated course title/i })).toBeVisible();
  });

  test('should delete a course', async ({ page }) => {
    // Create a course first
    await page.goto('/courses/new');
    await page.locator('#title').fill('Course to Delete');
    await page.locator('#description').fill('This will be deleted.');
    await page.locator('#author').fill('Author');
    await page.locator('#estimatedHours').fill('1');

    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('Only Lesson');
    await page.locator('#lesson-content').fill('Content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    await page.getByRole('button', { name: /create course/i }).click();
    await expect(page).toHaveURL(/\/courses\/[a-f0-9-]+$/);

    // Go to edit page
    await page.getByRole('link', { name: /edit/i }).click();

    // Click delete button
    await page.getByRole('button', { name: /delete course/i }).click();

    // Confirm deletion
    await expect(page.getByText(/are you sure/i)).toBeVisible();
    await page.getByRole('button', { name: /yes, delete/i }).click();

    // Should redirect to courses list
    await expect(page).toHaveURL('/courses');
  });

  test('should reorder lessons', async ({ page }) => {
    await page.goto('/courses/new');

    // Add first lesson
    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('First Lesson');
    await page.locator('#lesson-content').fill('First content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Add second lesson
    await page.getByRole('button', { name: /add lesson/i }).click();
    await page.locator('#lesson-title').fill('Second Lesson');
    await page.locator('#lesson-content').fill('Second content.');
    await page.getByRole('button', { name: /add lesson/i }).last().click();

    // Move second lesson up
    const moveUpButtons = page.locator('button[aria-label="Move up"]');
    await moveUpButtons.last().click();

    // Check order - Second Lesson should now be first
    const lessons = page.locator('.space-y-2 > div');
    await expect(lessons.first()).toContainText(/second lesson/i);
  });
});
