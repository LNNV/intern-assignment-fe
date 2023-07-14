import api from "./api";
import API_CONSTANTS from "./constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllShoes: () => {
        return api.get(API_CONSTANTS.SHOES.GET_ALL_SHOES).catch((err) => {throw err;})
    }
}