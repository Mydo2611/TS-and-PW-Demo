import { expect, test } from "@playwright/test";

// Pre-condition: Login to the OrangeHRM with the admin account and create an account on the Admin page
test.beforeEach(async ({ page }) => {
    test.setTimeout(100000);
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    // Login with admin account
    await page.fill('input[name="username"]', "admin");
    await page.fill('input[name="password"]', "admin123");
    await page.locator('button[type="submit"]').click();
    // Create an account on the Admin page
    await page.locator('//span[text()="Admin"]').click();
    await page.waitForTimeout(3000);
    await page.locator('//button[text()=" Add "]').click();
    await page.waitForTimeout(3000);
    // Code to create an account here
    await page.locator('//label[text()="User Role"]/../../div/div/*').click();
    // await page.waitForSelector('div[role="listbox"]');
    // await page.locator('div[role="listbox"]//div[text()="Admin"]').click();
    const dropdown1 = await page.locator('//div[role="listbox"]');


    // Chọn phần tử từ danh sách dựa trên chỉ mục (index)
    const optionIndex1 = 1; // Chọn phần tử thứ hai trong danh sách
    const option1 = await page.locator(`//div[@role="option"][${optionIndex1 + 1}]`); // +1 vì chỉ mục bắt đầu từ 0
    await option1.click();

    await page.locator('//label[text()="Status"]/../../div/div/*').click();
    // await page.waitForSelector('div[role="listbox"]');
    // await page.locator('div[role="listbox"]//div[text()="Admin"]').click();
    const dropdown2 = await page.locator('//div[role="listbox"]');


    // Chọn phần tử từ danh sách dựa trên chỉ mục (index)
    const optionIndex2 = 1; // Chọn phần tử thứ hai trong danh sách
    const option2 = await page.locator(`//div[@role="option"][${optionIndex2 + 1}]`); // +1 vì chỉ mục bắt đầu từ 0
    await option2.click();

    // Emloyee Name
    await page.locator('//label[text()="Employee Name"]/../../div/div').click();
    await page.keyboard.type('James');
    await page.waitForTimeout(5000);
    const optionIndex3 = 1; // Chọn phần tử thứ hai trong danh sách
    const option3 = await page.locator(`//div[@role="option"][${optionIndex3}]`); // +1 vì chỉ mục bắt đầu từ 0
    await option3.click();

    // đặt mật username và mật khẩu
    await page.locator('//label[text()="Username"]/../../div/input').click();
    await page.keyboard.type('test003');
    await page.locator('//label[text()="Password"]/../../div/input').click();
    await page.keyboard.type('pass003');
    await page.locator('//label[text()="Confirm Password"]/../../div/input').click();
    await page.keyboard.type('pass003');

    // Save
    await page.locator('//button[text()=" Save "]').click();
    await page.waitForTimeout(5000);

    // Logout
    await page.locator('//ul/li/span/p').click();
    await page.waitForSelector('//a[text()="Logout"]', { timeout: 3000 })
    await page.locator('//a[text()="Logout"]').click();
    await page.waitForTimeout(3000);

});

// Test suite for logging in
test.describe("Login", () => {
    // TC01: Verify that the user can log in successfully when provided the username and password correctly
    test("User can log in with valid credentials", async ({ page }) => {
        // Step 1: Go to the OrangeHRM
        await page.goto("https://opensource-demo.orangehrmlive.com/");
        // Step 2: Input valid credentials for the account created at pre-condition
        await page.fill('input[name="username"]', "test003");
        await page.fill('input[name="password"]', "pass003");

        // Step 3: Click the Login button
        await page.locator('button[type="submit"]').click();
        // VP: Verify that the Dashboard page is displayed
        await expect(page).toHaveURL(
            "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
        );

        // Logout
        await page.locator('//ul/li/span/p').click();
        await page.waitForSelector('//a[text()="Logout"]', { timeout: 3000 })
        await page.locator('//a[text()="Logout"]').click();
        await page.waitForTimeout(3000);
    });

    // TC02: Verify that the user cannot log in successfully when providing an empty username
    test("User cannot log in with empty username", async ({ page }) => {
        // Step 1: Go to the OrangeHRM
        await page.goto("https://opensource-demo.orangehrmlive.com/");
        // Step 2: Leave the username with a blank value
        await page.fill('input[name="username"]', "");
        // Step 3: Input the valid password
        await page.fill('input[name="password"]', "pass002");
        // Step 3: Click the Login button
        await page.locator('button[type="submit"]').click();
        // VP: Verify that the "Required" message is displayed below the username textbox
        const isRequiredMessageDisplayed = await page.isVisible("//div/span[text()='Required']");
        expect(isRequiredMessageDisplayed).toBeTruthy();
        await page.fill('input[name="username"]', "12334");
        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(3000);
        const isCredentialsMessageDisplayed = await page.isVisible("//p[text()='Invalid credentials']");
        expect(isCredentialsMessageDisplayed).toBeTruthy();


    });
});
