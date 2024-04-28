import { Page, test, expect } from "@playwright/test";
test.beforeAll(async () => {
  // Set timeout for this hook.
  test.setTimeout(100000);
});
test("Purchase iPhone 13 PRO", async ({ page }) => {
  // Step 1: Go to the website
  await page.goto("https://rahulshettyacademy.com/client");

  // Step 2: Login with user credentials
  await page.locator("input[id=userEmail]").fill("rahulshetty@gmail.com");
  await page.locator("input[id=userPassword]").fill("Iamking@000");
  await page.locator("input[id=login]").click();

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Step 3: Add iPhone 13 PRO to cart
  // const iphoneTextElement = await page.waitForSelector("b:has-text('IPHONE 13 PRO')");
  // const buttonTextElement = await page.waitForSelector("button:has-text('Add To Cart')");
  // const iphoneText = await iphoneTextElement.innerText();
  // const buttonText = await buttonTextElement.innerText();

  // if (iphoneText.includes('IPHONE 13 PRO') && buttonText.includes('Add To Cart')) {
  //   await page.click("button:has-text('Add To Cart')");
  // }
  await page.locator("//div/h5/b[text()='IPHONE 13 PRO']/../following-sibling::button[text()=' Add To Cart']").click();

  await page.waitForTimeout(3000);

  // Step 4: click on Cart button
  await page.locator("//ul/li[4]/button").click();

  // Step 5: Click on Checkout button
  await page.locator("button:has-text('Checkout')").click();

  // Step 6: enter V 
  await page.locator('input[placeholder="Select Country"]').click();
  //await page.locator("input[placeholder='Select Country']").fill("v");
  await page.keyboard.type('v');
 
  // Step 7: wait country visible
  await page.waitForSelector('//span[text()=" Vietnam"]', { timeout: 10000 })

  // Step 8: Select country
  const country = await page.$('//section/button[22]/span[text()=" Vietnam"]');

  if (country) {
    await country.click();
  } else {
    console.error("Không tìm thấy phần tử country");
  }

  // Step 9: Place order
  await page.click("text='Place Order'");

  // Step 10: move to order page
  await page.click("text=' Orders History Page '");

  // Step 11: Get Order ID
  const orderId = await page.textContent('//td[text()="IPHONE 13 PRO"]/../th');

  // Step 12: Verify Order ID
  const isOrderIdDisplayed = await page.isVisible(`text=${orderId}`);

  // Step 13: Expect Order ID to be displayed in My Orders
  await expect(isOrderIdDisplayed).toBeTruthy();
});
