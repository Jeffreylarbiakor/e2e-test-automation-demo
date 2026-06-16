from playwright.sync_api import Page, expect

BASE_URL = "https://www.saucedemo.com"


def test_valid_login_redirects_to_inventory(page: Page):
    page.goto(BASE_URL)
    page.fill('[data-test="username"]', "standard_user")
    page.fill('[data-test="password"]', "secret_sauce")
    page.click('[data-test="login-button"]')

    expect(page).to_have_url(f"{BASE_URL}/inventory.html")
    expect(page.locator('[data-test="inventory-list"]')).to_be_visible()


def test_invalid_login_shows_error(page: Page):
    page.goto(BASE_URL)
    page.fill('[data-test="username"]', "standard_user")
    page.fill('[data-test="password"]', "wrong_password")
    page.click('[data-test="login-button"]')

    error = page.locator('[data-test="error"]')
    expect(error).to_be_visible()
    expect(error).to_contain_text("Username and password do not match")
