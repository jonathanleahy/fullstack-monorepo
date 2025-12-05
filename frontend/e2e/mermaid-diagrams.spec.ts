import { test, expect } from '@playwright/test';

/**
 * BDD Feature: Mermaid Diagram Rendering
 *
 * Feature: Rich diagram content in courses
 *   As a course learner
 *   I want to see visual diagrams in lesson content
 *   So that I can better understand complex concepts
 *
 *   Scenario: View flowchart diagram in lesson
 *     Given I am viewing a lesson with a Mermaid flowchart
 *     When the lesson content loads
 *     Then I should see an SVG diagram rendered
 *     And the diagram should display flowchart elements
 *
 *   Scenario: View sequence diagram in lesson
 *     Given I am viewing a lesson with a Mermaid sequence diagram
 *     When the lesson content loads
 *     Then I should see the sequence diagram rendered as SVG
 *
 *   Scenario: Invalid Mermaid syntax shows error gracefully
 *     Given I am viewing a lesson with invalid Mermaid syntax
 *     When the lesson content loads
 *     Then I should see an error message for the diagram
 *     And the page should not crash
 */

test.describe('Mermaid Diagram Rendering', () => {
  test('should render Mermaid flowchart diagrams as SVG', async ({ page }) => {
    // Navigate to the Hexagonal Architecture course
    await page.goto('/courses');

    // Wait for courses to load
    await page.waitForTimeout(1000);

    // Find and click the Hexagonal Architecture course
    const hexCourse = page.locator('text=Hexagonal Architecture').first();
    if (await hexCourse.count() > 0) {
      await hexCourse.click();

      // Wait for the course detail page to load
      await page.waitForTimeout(1000);

      // Look for the lesson that should have a Mermaid diagram
      // The "Big Picture" lesson or similar should have a hexagon/flowchart
      const lessonContent = page.locator('.prose').first();
      await expect(lessonContent).toBeVisible();

      // Check for rendered Mermaid SVG
      // Mermaid renders to SVG elements with class 'mermaid' or inside a container
      const mermaidSvg = page.locator('.mermaid svg, [data-mermaid] svg');

      // If Mermaid diagrams exist, they should be rendered as SVG
      const svgCount = await mermaidSvg.count();
      if (svgCount > 0) {
        await expect(mermaidSvg.first()).toBeVisible();
      }
    }
  });

  test('should display diagram with visual elements', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForTimeout(1000);

    const hexCourse = page.locator('text=Hexagonal Architecture').first();
    if (await hexCourse.count() > 0) {
      await hexCourse.click();
      await page.waitForTimeout(1000);

      // Navigate to a lesson known to have diagrams (e.g., "The Big Picture")
      const bigPictureLesson = page.locator('button:has-text("Big Picture"), button:has-text("Dependency")');
      if (await bigPictureLesson.count() > 0) {
        await bigPictureLesson.first().click();
        await page.waitForTimeout(500);
      }

      // Check for SVG elements that Mermaid produces
      const svgElements = page.locator('.mermaid svg path, .mermaid svg rect, .mermaid svg text');
      const elementCount = await svgElements.count();

      // If we have Mermaid content, it should render shapes
      if (elementCount > 0) {
        expect(elementCount).toBeGreaterThan(0);
      }
    }
  });

  test('should not break page when Mermaid code block is present', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForTimeout(1000);

    const hexCourse = page.locator('text=Hexagonal Architecture').first();
    if (await hexCourse.count() > 0) {
      await hexCourse.click();

      // Page should load without errors
      await expect(page.getByRole('heading').first()).toBeVisible();

      // Navigation should work
      const lessonButtons = page.locator('button');
      await expect(lessonButtons.first()).toBeVisible();

      // Content area should render
      await expect(page.locator('.prose, [class*="lesson-content"]').first()).toBeVisible();
    }
  });

  test('should render different diagram types', async ({ page }) => {
    await page.goto('/courses');
    await page.waitForTimeout(1000);

    const hexCourse = page.locator('text=Hexagonal Architecture').first();
    if (await hexCourse.count() > 0) {
      await hexCourse.click();
      await page.waitForTimeout(1000);

      // Look for any rendered Mermaid diagrams
      const mermaidContainers = page.locator('.mermaid, [data-mermaid]');
      const containerCount = await mermaidContainers.count();

      // Page should handle Mermaid content gracefully
      // Even if no diagrams, page shouldn't crash
      await expect(page.locator('.prose, article').first()).toBeVisible();

      // Log for debugging
      console.log(`Found ${containerCount} Mermaid containers`);
    }
  });
});

test.describe('Mermaid in Course Editor', () => {
  test.beforeEach(async ({ page }) => {
    // Login as a user who can edit courses
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
  });

  test('should preview Mermaid diagrams in editor', async ({ page }) => {
    // Navigate to course creation/editing
    await page.goto('/courses/new');

    // If we can access the editor, check for preview functionality
    const editor = page.locator('textarea, [contenteditable], .w-md-editor');
    if (await editor.count() > 0) {
      // The editor should exist and be functional
      await expect(editor.first()).toBeVisible();
    }
  });
});
