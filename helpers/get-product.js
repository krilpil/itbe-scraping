import axios from "axios";

export const getProduct = async (url) => {
    return await axios.get(`http://localhost:443/api/product/${encodeURIComponent(url)}`)
}