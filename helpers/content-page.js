import puppeteer from "puppeteer";

export const contentPage = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
            width: 1920,
            height: 1080
        },
    })

    const page = await browser.newPage()

    await page.goto(url, {
        timeout: 0,
        waitUntil: 'domcontentloaded'
    })

    const content = await page.content()

    browser.close()

    return content
}