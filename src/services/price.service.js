import api from "./api";
import TokenService from "./token.service";

const API_URL = "http://localhost:8080/api";

class PriceService {
    setPrices = (currency) => {
        return api.get("/price/crypto/" + currency);
    }
    setBalances = (address) => {
        return api.get("/asset/get-assets?address=" + address);
    }
}

const priceService = new PriceService();
export default priceService;