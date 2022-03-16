import cheerio from "cheerio"

import {removingLetters} from "./helpers/removing-letters.js";
import {contentPage} from "./helpers/content-page.js";
import {removingExtraSpaces} from "./helpers/removing-extra-spaces.js";
import {countPages} from "./helpers/count-pages.js";
import {dateNow} from "./helpers/date-now.js";
import {countPrice} from "./helpers/count-price.js";

(async function main() {
    const productsInfo = {
        site_id: 3,
        unique_date: dateNow()
    }
    const pageProductsItems = 60
    const productCategory = 'https://www.tsum.ru/catalog/krossovki-19739/'

    let $ = cheerio.load(
        await contentPage(productCategory)
    )

    const amountPages = countPages(
        removingLetters($('.product-list__count').text()),
        pageProductsItems
    )

    const productLinks = []

    for (let page = 1; page <= 1; page++) {
        let $ = cheerio.load(
            await contentPage(`${productCategory}?page=${page}`)
        )

        $('.product__image-wrapper').each((index, element) => {
            const link = `https://www.tsum.ru${$(element).attr('href')}`
            console.log(link)
            productLinks.push(link)
        })
    }
    console.log(productLinks.length)

    for (let link of productLinks) {
        const $ = cheerio.load(await contentPage(link))

        const product = {
            url: link,
            site_id: productsInfo.site_id,
            title: removingExtraSpaces($('.item__description').text()),
            color: $('.color-switcher__subtext').text(),
            current_price: productPrices($).currentPrice,
            previous_price: productPrices($).previousPrice,
            photos_url: productPhotos($),
            unique_date: productsInfo.unique_date
        }

        console.log(product)
    }
})()

const productPrices = ($) => {
    let currentPrice = removingLetters($('.price_type_retail').text())
    if (currentPrice > 0 ) {
        return {
            currentPrice: currentPrice,
            previousPrice: 0
        }
    } else {
        return {
            currentPrice: removingLetters(
                $('.price_type_new').text().split('(')[0]
            ),
            previousPrice: removingLetters(
                $('.price_type_old').text()
            )
        }
    }
}

const productPhotos = ($) => {
    const photos = []
    $('.slider-item__image').each((index, element) => {
        photos.push($(element).attr('src'))
    })
    return photos
}
