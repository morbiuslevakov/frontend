import axios from "axios";
import { history } from '../helpers/history';
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const API_URL = "http://localhost:8080/api/";

class P2PService {

    sendTokens(address, amount, asset) {
        const user = JSON.parse(localStorage.getItem("user"));
        const username = user.username;
        const authHeader = "Bearer " + user.accessToken;
        return axios
            .post(API_URL + "transaction/send", { username, address, amount, asset }, {
                headers: {
                    'Authorization' : authHeader
                }
            })
            .then((response) => {
                console.log(JSON.stringify(response.data));
            });
    }

    createOrder(type, assetId, currency, priceType, price, assetAmount, minSum, paymentTime, paymentMethods, bankNames) {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const authHeader = "Bearer " + user.accessToken;
        type = type==="buy"?"BUY":"SELL";
        priceType = priceType==="floating"?"FLOATING":"FIXED";
        client.connect({}, () => {
            client.send('/app/create-order', {}, JSON.stringify({ 'type':type, 'assetId':assetId, 'currency':currency, 'priceType':priceType, 'price':price, 'assetAmount':assetAmount, 'minSum':minSum, 'paymentTime':paymentTime, 'paymentMethods':paymentMethods, 'userId':userId, 'bankNames':bankNames}));
        })
        // history.push("/p2p/buy");
        // window.location.reload();
    }
}

const p2pService = new P2PService();
export default p2pService;