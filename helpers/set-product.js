import axios from "axios";

export const setProduct = async (product) => {
    const productExists = await axios.post('http://localhost:443/api/check-product', {
        url: product.url
    })

    if (productExists.data.exists === true) {
        await axios.put('http://localhost:443/api/product', {
            url: product.url,
            current_price: product.current_price,
            previous_price: product.previous_price,
            unique_date: product.unique_date
        })
    } else {
        await axios.post('http://localhost:443/api/product', product)
    }
}