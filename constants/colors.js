import axios from "axios";
const colors = await axios.get(`http://localhost:443/api/color`)

export const getColorId = (color) => {
    let colorId
    colors.data.forEach(element => {
        if (element["color_title"] === color) {
            colorId = element["color_id"]
        }
    })

    return colorId || 0
};

