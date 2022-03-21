import axios from "axios";
const brands = await axios.get(`http://localhost:443/api/brand`)

export const getBrandId = (brand) => {
    let colorId
    brands.data.forEach(element => {
        if (element["brand_title"] === brand) {
            colorId = element["brand_id"]
        }
    })

    return colorId || 0
};
