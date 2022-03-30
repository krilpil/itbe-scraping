import axios from "axios";
import {getProduct} from "./get-product.js";

export const setProduct = async (newProduct) => {
    const oldProduct = await getProduct(newProduct.url)

    if (oldProduct.data.code === 1) {
        console.log('Добавлен новый товар:')
        await axios.post('http://localhost:443/api/product', newProduct)
    } else {

        const productValue = {}

        // Проходим циклом по товарам из БД, если значения title, current_price, previous_price изменены,
        // то заносим ключ и значение в productValue
        for (const value in oldProduct.data.product) {
            if (value === 'title' || value === 'current_price' || value === 'previous_price') {
                if (oldProduct.data.product[value] !== newProduct[value]) {
                    productValue[value] = newProduct[value]
                }
            }
        }

        if (Object.keys(productValue).length !== 0) {
            await axios.put('http://localhost:443/api/product', productValue)
            console.log('Продукт был обновлен:')
        } else {
            console.log('Продукт не изменился:')
        }
    }
}