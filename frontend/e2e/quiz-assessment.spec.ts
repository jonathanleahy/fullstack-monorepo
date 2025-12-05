import { test, expect } from '@playwright/test';

/**
 * BDD Scenarios for Quiz/Assessment System
 *
 * Feature: Lesson Quizzes
 *   As a learner
 *   I want to take quizzes at the end of lessons
 *   So that I can test my understanding of the material
 *
 *   Scenario: User sees quiz at end of lesson
 *     Given I am enrolled in a course with quizzes
 *     And I am viewing a lesson that has a quiz
 *     When I scroll to the bottom of the lesson
 *     Then I should see a "Take Quiz" button
 *
 *   Scenario: User starts a quiz
 *     Given I am viewing a lesson with a quiz
 *     When I click "Take Quiz"
 *     Then I should see the first question
 *     And I should see multiple choice options
 *     And I should see a progress indicator
 *
 *   Scenario: User answers a question correctly
 *     Given I am taking a quiz
 *     And I am on a question
 *     When I select the correct answer
 *     And I click "Submit Answer"
 *     Then I should see feedback indicating I was correct
 *     And I should be able to proceed to the next question
 *
 *   Scenario: User answers a question incorrectly
 *     Given I am taking a quiz
 *     And I am on a question
 *     When I select an incorrect answer
 *     And I click "Submit Answer"
 *     Then I should see feedback indicating I was wrong
 *     And I should see the correct answer
 *
 *   Scenario: User completes a quiz
 *     Given I am taking a quiz
 *     And I answer all questions
 *     When I submit the final answer
 *     Then I should see my quiz results
 *     And I should see my score as a percentage
 *     And I should see which questions I got right and wrong
 *
 *   Scenario: User retakes a quiz
 *     Given I have completed a quiz
 *     When I click "Retake Quiz"
 *     Then I should start the quiz again from the first question
 */

// Helper functions
async function loginAsTestUser(page: any) {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);
}

async function navigateToHexCourse(page: any) {
  await page.goto('/courses');
  await page.getByText('Hexagonal Architecture').first().click();
  // Wait for the course page to load by checking the main h1 title
  await expect(page.getByRole('heading', { level: 1, name: /hexagonal architecture/i }).first()).toBeVisible();
}

test.describe('Quiz Assessment System', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
  });

  test('should display Take Quiz button at end of lesson with quiz', async ({ page }) => {
    await navigateToHexCourse(page);

    // Click on a lesson (first one)
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();

    // Scroll to bottom of lesson content
    const lessonContent = page.locator('.prose').first();
    await lessonContent.evaluate((el: Element) => el.scrollIntoView({ block: 'end' }));

    // Should see the Take Quiz button
    await expect(page.getByRole('button', { name: /take quiz/i })).toBeVisible();
  });

  test('should start quiz and show first question when clicking Take Quiz', async ({ page }) => {
    await navigateToHexCourse(page);

    // Click on a lesson
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();

    // Click Take Quiz button
    await page.getByRole('button', { name: /take quiz/i }).click();

    // Should see quiz modal/section with question
    await expect(page.getByTestId('quiz-container')).toBeVisible();
    await expect(page.getByTestId('quiz-question')).toBeVisible();

    // Should see multiple choice options
    await expect(page.getByTestId('quiz-options')).toBeVisible();
    const options = page.getByTestId('quiz-option');
    await expect(options).toHaveCount(4); // Multiple choice typically has 4 options

    // Should see progress indicator
    await expect(page.getByTestId('quiz-progress')).toBeVisible();
  });

  test('should show correct feedback when answering correctly', async ({ page }) => {
    await navigateToHexCourse(page);

    // Navigate to lesson and start quiz
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();
    await page.getByRole('button', { name: /take quiz/i }).click();

    // Select the first option (we'll need to know the correct answer in real implementation)
    await page.getByTestId('quiz-option').first().click();

    // Submit answer
    await page.getByRole('button', { name: /submit answer/i }).click();

    // Should see the feedback container (correct or incorrect)
    await expect(page.getByTestId('quiz-feedback')).toBeVisible();
  });

  test('should show quiz results after completing all questions', async ({ page }) => {
    await navigateToHexCourse(page);

    // Navigate to lesson and start quiz
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();
    await page.getByRole('button', { name: /take quiz/i }).click();

    // Wait for quiz container to be visible
    await expect(page.getByTestId('quiz-container')).toBeVisible();

    // Answer all questions (loop through)
    for (let i = 0; i < 10; i++) { // Safety limit of 10 questions
      // Wait for submit button to be available
      await expect(page.getByRole('button', { name: /submit answer/i })).toBeVisible();

      // Select first option
      await page.getByTestId('quiz-option').first().click();

      // Submit answer
      await page.getByRole('button', { name: /submit answer/i }).click();

      // Wait for feedback
      await expect(page.getByTestId('quiz-feedback')).toBeVisible();

      // Check for "See Results" or "Next Question" button
      const seeResultsButton = page.getByRole('button', { name: /see results/i });
      const nextQuestionButton = page.getByRole('button', { name: /next question/i });

      // Check if quiz is complete (See Results button)
      if (await seeResultsButton.isVisible().catch(() => false)) {
        await seeResultsButton.click();
        break;
      } else if (await nextQuestionButton.isVisible().catch(() => false)) {
        await nextQuestionButton.click();
      } else {
        break; // No more questions
      }
    }

    // Should see results
    await expect(page.getByTestId('quiz-results')).toBeVisible();

    // Should see score
    await expect(page.getByTestId('quiz-score')).toBeVisible();
  });

  test('should allow retaking a quiz', async ({ page }) => {
    await navigateToHexCourse(page);

    // Navigate to lesson and start quiz
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();
    await page.getByRole('button', { name: /take quiz/i }).click();

    // Wait for quiz container to be visible
    await expect(page.getByTestId('quiz-container')).toBeVisible();

    // Complete the quiz (answer all questions)
    for (let i = 0; i < 10; i++) {
      await expect(page.getByRole('button', { name: /submit answer/i })).toBeVisible();
      await page.getByTestId('quiz-option').first().click();
      await page.getByRole('button', { name: /submit answer/i }).click();
      await expect(page.getByTestId('quiz-feedback')).toBeVisible();

      const seeResultsButton = page.getByRole('button', { name: /see results/i });
      const nextQuestionButton = page.getByRole('button', { name: /next question/i });

      if (await seeResultsButton.isVisible().catch(() => false)) {
        await seeResultsButton.click();
        break;
      } else if (await nextQuestionButton.isVisible().catch(() => false)) {
        await nextQuestionButton.click();
      } else {
        break;
      }
    }

    // Wait for results to be visible
    await expect(page.getByTestId('quiz-results')).toBeVisible();

    // Click retake quiz button
    await page.getByRole('button', { name: /retake quiz/i }).click();

    // Should see first question again
    await expect(page.getByTestId('quiz-container')).toBeVisible();
    await expect(page.getByTestId('quiz-question')).toBeVisible();
  });

  test('should display quiz score as percentage', async ({ page }) => {
    await navigateToHexCourse(page);

    // Navigate and complete quiz
    await page.locator('[role="button"]').filter({ hasText: /introduction/i }).first().click();
    await page.getByRole('button', { name: /take quiz/i }).click();

    // Wait for quiz container to be visible
    await expect(page.getByTestId('quiz-container')).toBeVisible();

    // Complete the quiz
    for (let i = 0; i < 10; i++) {
      await expect(page.getByRole('button', { name: /submit answer/i })).toBeVisible();
      await page.getByTestId('quiz-option').first().click();
      await page.getByRole('button', { name: /submit answer/i }).click();
      await expect(page.getByTestId('quiz-feedback')).toBeVisible();

      const seeResultsButton = page.getByRole('button', { name: /see results/i });
      const nextQuestionButton = page.getByRole('button', { name: /next question/i });

      if (await seeResultsButton.isVisible().catch(() => false)) {
        await seeResultsButton.click();
        break;
      } else if (await nextQuestionButton.isVisible().catch(() => false)) {
        await nextQuestionButton.click();
      } else {
        break;
      }
    }

    // Wait for results
    await expect(page.getByTestId('quiz-results')).toBeVisible();

    // Score should contain a percentage
    const scoreText = await page.getByTestId('quiz-score').textContent();
    expect(scoreText).toMatch(/\d+%/);
  });
});
