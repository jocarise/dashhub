import { expect, type Page } from '@playwright/test';

export async function checkParagraphsElementsAreRendered(
  page: Page,
  locator: string
) {
  const container = await page.locator(locator);
  const paragraphs = await container.locator('p');
  const count = await paragraphs.count();

  for (let i = 0; i < count; i++) {
    const paragraphText = await paragraphs.nth(i).textContent();

    expect(paragraphText?.trim()).not.toBe('');
  }
}
