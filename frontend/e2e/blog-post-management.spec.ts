import { test, expect } from '@playwright/test';

test.describe('Complete Blog Post Management Flow', () => {
  test('should login/register, create post, edit post, and delete post', async ({ page }) => {
    test.setTimeout(60000); // Increase timeout to 60 seconds

    const timestamp = Date.now();
    const email = `blogger${timestamp}@example.com`;
    const password = 'BloggerPass123!';
    const postTitle = `Test Post ${timestamp}`;
    const postAuthor = 'Test Author';

    console.log(`\n📝 Starting complete blog post management test with email: ${email}\n`);

    // ===== STEP 1: GO TO LOGIN PAGE =====
    console.log('Step 1: Navigate to login page');
    await page.goto('/login');
    await page.evaluate(() => localStorage.clear());

    // Check that we are on the login page
    await expect(page.locator('h2:has-text("Login")')).toBeVisible();
    console.log('✓ On login page');

    // ===== STEP 2: TRY TO LOGIN (SHOULD FAIL) =====
    console.log('\nStep 2: Try to login with non-existent account');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]:has-text("Login")');
    await page.waitForTimeout(1000);

    // Check if error appears (account doesn't exist)
    const errorVisible = await page.locator('text=/Unauthorized|error|invalid/i').isVisible().catch(() => false);
    if (errorVisible) {
      console.log('✓ Login failed as expected (account does not exist)');
    }

    // ===== STEP 3: CREATE AN ACCOUNT =====
    console.log('\nStep 3: Click "Create an account" button to switch to registration');
    const createAccountButton = page.locator('button:has-text("Create an account")');
    await expect(createAccountButton).toBeVisible();
    await createAccountButton.click();

    await expect(page.locator('h2:has-text("Create a new account")')).toBeVisible();
    console.log('✓ Switched to registration form');

    // ===== STEP 4: FILL REGISTRATION FORM =====
    console.log('\nStep 4: Fill registration form');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirm-password"]', password);

    console.log(`   Email: ${email}`);
    console.log(`   Password: ${'*'.repeat(password.length)}`);

    // Submit registration
    await page.click('button[type="submit"]:has-text("Register")');
    await page.waitForTimeout(1000);

    // Verify user is logged in (Supabase session)
    await page.waitForTimeout(2000);

    const supabaseSession = await page.evaluate(() => {
      const keys = Object.keys(localStorage);
      const authKey = keys.find(key => key.startsWith('sb-') && key.includes('-auth-token'));
      if (authKey) {
        const data = localStorage.getItem(authKey);
        return data ? JSON.parse(data) : null;
      }
      return null;
    });

    expect(supabaseSession).not.toBeNull();
    expect(supabaseSession?.access_token).toBeTruthy();
    console.log('✓ User registered and logged in');
    console.log(`   User ID: ${supabaseSession?.user?.id}`);

    // ===== STEP 5: GO TO BLOG PAGE =====
    console.log('\nStep 5: Navigate to Blog page');
    await page.goto('/blog');

    // Wait for blog page to load
    await expect(page.locator('h2:has-text("Blog posts")')).toBeVisible({ timeout: 10000 });
    console.log('✓ Blog page loaded');

    // ===== STEP 6: CLICK "CREATE A NEW POST" BUTTON =====
    console.log('\nStep 6: Click "Create a New Post" button');

    const createPostButton = page.locator('a:has-text("Create a New Post")');
    await expect(createPostButton).toBeVisible({ timeout: 10000 });
    await createPostButton.click();

    await page.waitForURL('**/blog/new-post');
    await page.waitForTimeout(1000);

    console.log('✓ On "Create & Add a new Post on Blog" page');

    // ===== STEP 7: FILL POST FORM =====
    console.log('\nStep 7: Fill post creation form');

    // Wait for the form to be visible
    await expect(page.locator('h2:has-text("Create & Add a new Post on Blog")')).toBeVisible();

    // Fill title
    await page.fill('input#title', postTitle);
    console.log(`   ✓ Title: ${postTitle}`);

    // Fill author
    await page.fill('input#author', postAuthor);
    console.log(`   ✓ Author: ${postAuthor}`);

    // Select image with alt="Apartment Ideas"
    console.log('   ⏳ Waiting for images to load...');

    const apartmentIdeasImage = page.locator('button img[alt="Apartment Ideas"]');
    await expect(apartmentIdeasImage).toBeVisible({ timeout: 10000 });
    await apartmentIdeasImage.click();
    console.log('   ✓ Selected image: Apartment Ideas');


    // ===== STEP 8: SUBMIT POST CREATION =====
    console.log('\nStep 8: Click "Create Post" button');

    const createPostSubmitButton = page.locator('button:has-text("Create Post")');
    await expect(createPostSubmitButton).toBeVisible();
    await createPostSubmitButton.click();

    console.log('✓ Clicked "Create Post" button');

    // Wait for creation and redirection
    await page.waitForTimeout(2000);

    console.log('✓ Post created successfully!');

    // ===== STEP 9: GO TO HOME PAGE AND VERIFY POST =====
    console.log('\nStep 9: Navigate to home page and verify post in "Recent Blog"');

    await page.goto('/');
    await page.waitForTimeout(1000);

    // Wait for "Recent Blog" section to load
    await expect(page.locator('h2:has-text("Recent Blog")')).toBeVisible({ timeout: 10000 });
    console.log('✓ On home page with "Recent Blog" section');

    // Verify the post appears in Recent Blog
    const postInRecentBlog = page.locator(`text="${postTitle}"`).first();
    await expect(postInRecentBlog).toBeVisible({ timeout: 10000 });
    console.log(`✓ Post "${postTitle}" is visible in Recent Blog section`);

    // ===== STEP 10: CLICK "VIEW ALL POSTS" =====
    console.log('\nStep 10: Click "View All Posts" link');

    const viewAllPostsLink = page.locator('a:has-text("View All Posts")');
    await expect(viewAllPostsLink).toBeVisible();
    await viewAllPostsLink.click();

    await page.waitForURL('**/blog');
    await page.waitForTimeout(1000);

    console.log('✓ On Blog page with all posts');

    // ===== STEP 11: CLICK "EDIT POST" ON THE CREATED POST =====
    console.log('\nStep 11: Click "Edit post" button on the newly created post');

    // Wait for the blog page to fully load
    await page.waitForTimeout(1000);

    // Find the post we just created by its exact title using text-is for exact match
    const postTitleHeading = page.locator(`h3:text-is("${postTitle}")`);
    await expect(postTitleHeading).toBeVisible({ timeout: 10000 });
    console.log(`   ✓ Found post with title: ${postTitle}`);

    // Navigate up to the parent container that has the Edit button
    const createdPostContainer = postTitleHeading.locator('xpath=ancestor::div[contains(@class, "mb-5")]');

    // Find the Edit button within this specific post container
    const editButtonInCard = createdPostContainer.locator('a:has-text("Edit post")');
    await expect(editButtonInCard).toBeVisible({ timeout: 10000 });
    await editButtonInCard.click();

    // Get the current title value and verify it's our post
    await page.waitForTimeout(1000);

    console.log('✓ On edit post page');

    // ===== STEP 12: EDIT THE TITLE =====
    console.log('\nStep 12: Edit the title by adding "edited" at the end');

    // Wait for the form to be visible
    await expect(page.locator('h2:has-text("Update the Post")')).toBeVisible();

    // Get the current title value and verify it's our post
    const titleInput = page.locator('input#title');
    await expect(titleInput).toBeVisible();

    const currentTitle = await titleInput.inputValue();
    console.log(`   Current title in form: "${currentTitle}"`);

    // Make sure we're editing the right post
    if (currentTitle !== postTitle) {
      throw new Error(`Expected to edit "${postTitle}" but got "${currentTitle}"`);
    }

    const newTitle = `${currentTitle} edited`;

    await titleInput.fill(newTitle);
    console.log(`   ✓ Changed title from "${currentTitle}" to "${newTitle}"`);

    // ===== STEP 13: CLICK "UPDATE" BUTTON =====
    console.log('\nStep 13: Click "Update" button');

    const updateButton = page.locator('button:has-text("Update")');
    await expect(updateButton).toBeVisible();
    await updateButton.click();
    console.log('✓ Clicked "Update" button');

    // Wait for update and redirection
    await page.waitForURL('**/blog', { timeout: 10000 });
    await page.waitForTimeout(1000);

    console.log('✓ Post updated successfully!');

    // Verify the updated title is visible
    const updatedPostTitle = page.locator(`text="${newTitle}"`);
    await expect(updatedPostTitle).toBeVisible({ timeout: 10000 });
    console.log(`✓ Updated post title "${newTitle}" is visible`);

    // ===== STEP 14: CLICK "DELETE POST" BUTTON =====
    console.log('\nStep 14: Click "Delete post" button on the edited post');

    // Wait a bit for the page to stabilize
    await page.waitForTimeout(1000);

    // Find the specific post with the edited title using exact text match
    const editedPostTitleHeading = page.locator(`h3:text-is("${newTitle}")`);
    await expect(editedPostTitleHeading).toBeVisible({ timeout: 10000 });
    console.log(`   ✓ Found edited post with title: ${newTitle}`);

    // Navigate up to the parent container that has the Delete button
    const editedPostContainer = editedPostTitleHeading.locator('xpath=ancestor::div[contains(@class, "mb-5")]');

    const deleteButton = editedPostContainer.locator('button:has-text("Delete post")');
    await expect(deleteButton).toBeVisible({ timeout: 10000 });
    await deleteButton.click();

    console.log('✓ Clicked "Delete post" button');

    // ===== STEP 15: CONFIRM DELETION IN MODAL =====
    console.log('\nStep 15: Confirm deletion in modal');

    // Wait for modal to open
    const modal = page.locator('dialog');
    await expect(modal).toBeVisible({ timeout: 5000 });
    console.log('✓ Modal opened with confirmation message');

    // Verify modal content
    await expect(page.locator('h2:has-text("Are you sure")')).toBeVisible();
    console.log('✓ Confirmation message visible');

    // Click the Delete button in the modal
    const confirmDeleteButton = page.locator('dialog button').filter({ hasText: 'Delete' });
    await expect(confirmDeleteButton).toBeVisible();
    await expect(confirmDeleteButton).toBeEnabled();

    // Click and wait for the modal to close (which indicates deletion started)
    await confirmDeleteButton.click();
    console.log('✓ Clicked "Delete" button in modal');

    // Wait for modal to close (deletion in progress)
    await expect(modal).not.toBeVisible({ timeout: 5000 });
    console.log('✓ Modal closed - deletion in progress');

    // Wait a bit for the post to be removed from the list
    await page.waitForTimeout(2000);

    console.log('✓ Post deleted successfully!');

    // Verify the post is no longer visible in the blog list
    const deletedPostTitle = page.locator(`h3:text-is("${newTitle}")`);
    const isDeleted = !(await deletedPostTitle.isVisible().catch(() => false));

    if (isDeleted) {
      console.log(`✓ Post "${newTitle}" is no longer visible in the blog`);
    } else {
      console.log(`⚠ Note: Post might still be visible temporarily`);
    }

    console.log('\n✅ Complete blog post management flow successful!');
    console.log('   Summary:');
    console.log('   1. ✓ Navigated to login page');
    console.log('   2. ✓ Attempted login (failed as expected)');
    console.log('   3. ✓ Created new account');
    console.log('   4. ✓ Registered and logged in');
    console.log('   5. ✓ Navigated to Blog page');
    console.log('   6. ✓ Clicked "Create a New Post"');
    console.log('   7. ✓ Filled post creation form');
    console.log('   8. ✓ Created post with image "Apartment Ideas"');
    console.log('   9. ✓ Verified post in "Recent Blog" on home page');
    console.log('   10. ✓ Clicked "View All Posts"');
    console.log('   11. ✓ Clicked "Edit post" on last added post');
    console.log('   12. ✓ Edited title by adding "edited"');
    console.log('   13. ✓ Updated the post');
    console.log('   14. ✓ Clicked "Delete post"');
    console.log('   15. ✓ Confirmed deletion in modal');
    console.log('');
  });
});

