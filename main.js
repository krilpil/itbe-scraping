import cheerio from "cheerio"

import {removingLetters} from "./helpers/removing-letters.js";
import {contentPage} from "./helpers/content-page.js";
import {countPages} from "./helpers/count-pages.js";
import {dateNow} from "./helpers/date-now.js";
import {categories} from "./constants/tsum.js";
import {getColorId} from "./constants/colors.js";
import {getBrandId} from "./constants/brands.js";
import {setProduct} from "./helpers/set-product.js";
import {stringSearch} from "./helpers/string-search.js";


(async function main() {
    const siteInfo = {
        site_id: 3,
        unique_date: dateNow(),
        pageProductsItems: 60
    }

    for (const sex in categories) {
        for (const category of categories[sex]) {
            const productCategory = `https://www.tsum.ru/catalog/${category.url}`
            console.log(`${sex}: ${productCategory}`)

            let $ = cheerio.load(
                await contentPage(productCategory)
            )

            const amountPages = countPages(
                removingLetters($('.product-list__count').text()),
                siteInfo.pageProductsItems
            )

            const productLinks = []

            for (let page = 1; page <= 1; page++) {
                let $

                if (page === 1) {
                    $ = cheerio.load(
                        await contentPage(`${productCategory}`)
                    )
                } else {
                    $ = cheerio.load(
                        await contentPage(`${productCategory}?page=${page}`)
                    )
                }


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
                    sex: sex,
                    site_id: siteInfo.site_id,
                    title: stringSearch($, '.item__description'),
                    category_id: category.category_id,
                    brand_id: getBrandId(stringSearch($, '.item__specifications h1 a')),
                    color_id: getColorId(stringSearch($, '.color-switcher__subtext')),
                    current_price: productPrices($).currentPrice,
                    previous_price: productPrices($).previousPrice,
                    photos_url: productPhotos($),
                    vk_photos: [],
                    unique_date: siteInfo.unique_date
                }

                console.log(product)
                await setProduct(product)
            }
        }
    }
})()

const productPrices = ($) => {
    let currentPrice = removingLetters($('.price_type_retail').text())
    if (currentPrice > 0) {
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
