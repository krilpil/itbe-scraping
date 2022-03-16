export const countPages = (amountProducts, pageProductsItems) => {
    return Math.ceil(amountProducts / pageProductsItems)
}