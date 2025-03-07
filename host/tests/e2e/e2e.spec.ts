import { test, expect, type Page } from '@playwright/test';
import { checkParagraphsElementsAreRendered } from '../custom';

test.use({
  viewport: { width: 1600, height: 1200 },
});

/* BOGOTA COORDS
test.use({
  geolocation: {
    latitude: 4.697054057773676,
    longitude: -74.03667855376031,
  },
});
*/

test.beforeEach(async ({ page, context }) => {
  await context.grantPermissions(['geolocation']);
  await page.goto('http://localhost:3000');
});

test.describe('CurrentWeatherWidget remote', () => {
  test('Current weather widget render', async ({ page }) => {
    await page.waitForSelector('[data-testid="current-weather-widget"]');
    await expect(page.getByTestId('current-weather-widget')).toBeVisible();
  });

  test('Change temperature type button', async ({ page }) => {
    await page.waitForSelector(
      '[data-testid="temperature-toggle"]:not(.is-skeleton)'
    );
    await expect(page.getByTestId('temperature-toggle')).toBeVisible();

    const textContentCelsius = await page
      .locator('[data-testid="current-weather-widget"]')
      .textContent();
    const countSymbolsCelsius = (textContentCelsius?.match(/°C/g) || []).length;
    expect(countSymbolsCelsius).toBe(3);

    //Change from Celsius to Fahrenheit
    await page.getByTestId('temperature-toggle').click();
    const textContentFahrenheit = await page
      .locator('[data-testid="current-weather-widget"]')
      .textContent();
    const countSymbolsFahrenheit = (textContentFahrenheit?.match(/°F/g) || [])
      .length;
    expect(countSymbolsFahrenheit).toBe(3);
  });

  test('Check that all <p> elements have text rendered', async ({ page }) => {
    await page.waitForSelector(
      '[data-testid="temperature-toggle"]:not(.is-skeleton)'
    );
    await checkParagraphsElementsAreRendered(
      page,
      '[data-testid="current-weather-widget"]'
    );
  });
});

test.describe('ForecastWeatherWidget remote', () => {
  test('ForecastWeatherWidget render', async ({ page }) => {
    await page.waitForSelector('[data-testid="forecast-weather-widget"]');
    await expect(page.getByTestId('forecast-weather-widget')).toBeVisible();
  });

  test('Check that all <p> elements have text rendered', async ({ page }) => {
    await page.waitForSelector(
      '[data-testid="forecast-weather-widget-cards"]:not(.is-skeleton)'
    );
    await checkParagraphsElementsAreRendered(
      page,
      '[data-testid="forecast-weather-widget"]'
    );
  });
});

test.describe('News Vue remote', () => {
  test('Vue app render', async ({ page }) => {
    //TODO: IMPROVE TESTS SELECTORS IN REMOTES APPS
    await page.waitForSelector('[data-testid="news-vue-widget"]');
    await expect(page.getByTestId('news-vue-widget')).toBeVisible();
  });
});
