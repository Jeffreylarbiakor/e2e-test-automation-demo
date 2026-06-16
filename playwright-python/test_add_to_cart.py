from playwright.sync_api import Page, expect


def test_add_item_to_cart_updates_badge(logged_in_page: Page):
    page = logged_in_page
    page.click('[data-test="add-to-cart-sauce-labs-backpack"]')

    expect(page.locator('[data-test="shopping-cart-badge"]')).to_have_text("1")


def test_cart_contains_added_item(logged_in_page: Page):
    page = logged_in_page
    page.click('[data-test="add-to-cart-sauce-labs-backpack"]')
    page.click('[data-test="shopping-cart-link"]')

    expect(page.locator('[data-test="inventory-item-name"]')).to_contain_text(
        "Sauce Labs Backpack"
    )
