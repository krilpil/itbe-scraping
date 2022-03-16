export const removingLetters = (price) => {
    return +price.toString().replace(/[^\d]/g, '')
}