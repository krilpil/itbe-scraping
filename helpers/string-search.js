import {stringProcessing} from "./string-processing.js";

export const stringSearch = ($, element) => {
    const string = $(element).text()
    return stringProcessing(string)
}
