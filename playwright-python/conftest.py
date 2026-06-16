import pytest
from playwright.sync_api import Page

BASE_URL = "https://www.saucedemo.com"


@pytest.fixture
def logged_in_page(page: Page) -> Page:
    page.goto(BASE_URL)
    page.fill('[data-test="username"]', "standard_user")
    page.fill('[data-test="password"]', "secret_sauce")
    page.click('[data-test="login-button"]')
    page.wait_for_url("**/inventory.html")
    return page
