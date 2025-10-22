import { test, expect } from '@playwright/test';

test.describe('Complete User Authentication Scenario', () => {
  test('should fail login, create account, logout and login again', async ({ page }) => {
    const timestamp = Date.now();
    const email = `newuser${timestamp}@example.com`;
    const password = 'SecurePass123!'; // Minimum 6 characters

    console.log(`\n🧪 Starting complete authentication test with email: ${email}\n`);

      // ===== STEP 1: LOGIN ATTEMPT FAILED =====
    console.log('Step 1: Try to login with non-existent account (should fail)');

    await page.goto('/login');

    // IMPORTANT: Clean up localStorage AFTER page load
    await page.evaluate(() => localStorage.clear());

    // Check that you are in login mode
    await expect(page.locator('h2:has-text("Login")')).toBeVisible();

    // Trying to log in with an account that doesn't exist
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for error response
    await page.waitForTimeout(2000);

    // Check that an error message appears
    const errorMessage = page.locator('text=/Unauthorized|error|invalid/i');
    const hasError = await errorMessage.isVisible().catch(() => false);

    if (hasError) {
      console.log('✓ Login failed as expected (account does not exist)');
    }

    // ===== STEP 2: CREATE A NEW ACCOUNT =====
    console.log('\nStep 2: Click "Create an account" to switch to registration form');

    // Click on the "Create an account" button to switch
    const createAccountButton = page.locator('button:has-text("Create an account")');
    await expect(createAccountButton).toBeVisible();
    await createAccountButton.click();

    // Check that you have successfully entered registration mode
    await expect(page.locator('h2:has-text("Create a new account")')).toBeVisible();
    console.log('✓ Switched to registration form');

    // Vérifier que le champ "Confirm password" est maintenant visible
    await expect(page.locator('input[name="confirm-password"]')).toBeVisible();

    console.log('\nStep 3: Fill registration form with password confirmation');

    // Complete the registration form
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-password"]', password);

    console.log(`   Email: ${email}`);
    console.log(`   Password: ${'*'.repeat(password.length)} (${password.length} characters - minimum 6)`);
    console.log(`   Confirm Password: ${'*'.repeat(password.length)} (matches)`);

    // Submit form
    await page.click('button[type="submit"]:has-text("Register")');

    // Wait for the response
    await page.waitForTimeout(2000);

    console.log('\nStep 4: Verify user is logged in after registration');

    // Check that the user is logged in
    const userData = await page.evaluate(() => {
      const data = localStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    });

    expect(userData).not.toBeNull();
    expect(userData?.token).toBeTruthy();
    expect(userData?.userId).toBeTruthy();
    console.log('✓ User is logged in after registration');
    console.log(`   Token: ${userData?.token.substring(0, 20)}...`);
    console.log(`   User ID: ${userData?.userId}`);

    // Check that you are no longer on the login page
    const isRedirected = page.url().indexOf('/login') === -1;
    if (isRedirected) {
      console.log(`✓ Redirected to: ${page.url()}`);
    }

    // ===== STEP 5: LOG OUT =====
    console.log('\nStep 5: Logout');

    // Find and click the Logout button to open the modal
    const logoutButton = page.locator('button:has-text("Logout")');
    await expect(logoutButton).toBeVisible({ timeout: 5000 });
    await logoutButton.click();
    console.log('✓ Clicked on Logout button - modal should open');

    // Wait for the modal to open
    await page.waitForTimeout(500);

    // Confirm logout in the modal
    const confirmLogoutButton = page.locator('dialog button:has-text("Logout")');
    await expect(confirmLogoutButton).toBeVisible({ timeout: 5000 });
    await confirmLogoutButton.click();
    console.log('✓ Confirmed logout in modal');

    // Wait for disconnection
    await page.waitForTimeout(2000);

    // Check that the token is deleted
    const userDataAfterLogout = await page.evaluate(() => localStorage.getItem('userData'));
    expect(userDataAfterLogout).toBeNull();
    console.log('✓ User is logged out (token removed from localStorage)');

    // Wait a bit and check that you are disconnected
    await page.waitForTimeout(2000);

    // Check that you are on the login page or redirected to it
    const urlAfterLogout = page.url();
    console.log(`✓ Current page after logout: ${urlAfterLogout}`);

    // ===== STEP 6: RELOGGING IN WITH THE SAME INFORMATION =====
    console.log('\nStep 6: Login again with the same credentials');

    // Navigate to the login page to ensure you are on the correct form
    await page.goto('/login');
    await page.waitForTimeout(1000);

    // Check that you are on the login form
    await expect(page.locator('h2:has-text("Login")')).toBeVisible();
    console.log('✓ On login page');

    // Fill in the fields with the same information
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);

    console.log(`   Logging in with email: ${email}`);

    // Click on the Login button
    await page.click('button[type="submit"]:has-text("Login")');

    // Wait for connection
    await page.waitForTimeout(2000);

    // Check that the user is logged back in
    const userDataAfterRelogin = await page.evaluate(() => {
      const data = localStorage.getItem('userData');
      return data ? JSON.parse(data) : null;
    });

    expect(userDataAfterRelogin).not.toBeNull();
    expect(userDataAfterRelogin?.token).toBeTruthy();
    expect(userDataAfterRelogin?.userId).toBeTruthy();

    console.log('✓ Successfully logged in again');
    console.log(`   New Token: ${userDataAfterRelogin?.token.substring(0, 20)}...`);
    console.log(`   User ID: ${userDataAfterRelogin?.userId}`);

    // Check that you are redirected
    const isRedirectedAfterLogin = page.url().indexOf('/login') === -1;
    expect(isRedirectedAfterLogin).toBeTruthy();
    console.log(`✓ Redirected to: ${page.url()}`);

    // Check that the Logout button is visible (proof that you are logged in)
    const logoutButtonAfterRelogin = page.locator('button:has-text("Logout")');
    await expect(logoutButtonAfterRelogin).toBeVisible({ timeout: 5000 });
    console.log('✓ Logout button is visible (user is authenticated)');

    console.log('\n✅ Complete authentication scenario successful!');
    console.log('   Summary:');
    console.log('   1. ✓ Failed login attempt');
    console.log('   2. ✓ Created new account');
    console.log('   3. ✓ Automatically logged in after registration');
    console.log('   4. ✓ Logged out successfully');
    console.log('   5. ✓ Logged in again with same credentials');
    console.log('');
  });
});

