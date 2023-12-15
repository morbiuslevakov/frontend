import api from "./api";

class UserService {
    getSettings = () => {
        return api.get("/user/settings/" + JSON.parse(localStorage.getItem("user")).id);
    }

    addPayment = (bank, account) => {
        const type = "BANK";
        const userId = JSON.parse(localStorage.getItem("user")).id;
        return api.post("/p2p/add-payment", {
            type,
            bank,
            account,
            userId
        });
    }
}

const userservice = new UserService();
export default userservice;