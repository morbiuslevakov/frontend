import React from "react";
import { Alert, Offcanvas, InputGroup, Form as Fr, ListGroup, Button, Modal, Card } from 'react-bootstrap';
import '../../App.css';
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./OrderView.css";
import "./P2PSell.css"
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import ReactDom from 'react-dom/client';
import PriceService from "../../services/price.service";


class P2PSell extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            stompClient: null,
            orders: [],
            currency: "RUB",
            assetAlias: "WAVES",
            orderType: "BUY",
            bankNames: ["Альфа-Банк"],
            foundPrice: 0
        }
    }

    setOrders = (orders) => {
        this.setState({
            orders: JSON.parse(orders)
        })
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/price/crypto/" + this.state.currency, {})
            .then((response) => {
                this.setState({
                    foundPrice: new Map(Object.entries(response.data.assets)).get(this.state.assetAlias).price
                })
            });

        // PriceService.setCurrencies();

        // JSON.parse(message.body).map((order) => {
        //     const getNames = (array) => {
        //         let arr = [];
        //         array.map((value) => arr.push(value.bank.name))
        //         let uniАrr = [...new Set(arr)];
        //         if (uniАrr.length>=2) {
        //             let lastString = uniАrr.pop();
        //             let string = uniАrr.join(', ') + " и " + lastString;
        //             return string;
        //         } else if (uniАrr.length === 1) {
        //             return uniАrr[0];
        //         }
        //     }
        //     const element = (
        //         <ListGroup className="order">{
        //             this.state.foundPrice!==0&&(
        //             <ListGroup.Item style={{"borderBottom": "none!important"}}
        //                             className="order-view order-list-item">
        //                 <div className="order-view-info">
        //                     <h4 style={{"font-size": "1rem", "color": "white"}}
        //                         className="order-view-title">{order.priceType === "FLOATING" ? (this.state.foundPrice * (order.price * 0.01)).toFixed(2) : order.price.toFixed(2)}</h4>
        //                     <p className="order-view-text">Цена за 1 {order.asset.alias}</p>
        //                 </div>
        //                 <Button className="p2p-deals-btn">Продать</Button>
        //             </ListGroup.Item>)}
        //             <ListGroup.Item style={{"borderBottom":"none!important"}} className="order-view order-list-item">
        //                 <div className="order-view-owner-info">
        //                     <div className="order-view-info">
        //                         <h6 style={{"display":"block", "color":"white"}} className="order-view-title">{order.user.name}</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-title">Сумма</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-title">Лимиты</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-title">Методы оплаты</h6>
        //                     </div>
        //                     <div style={{"margin-left":"1rem"}} className="order-view-info">
        //                         <h6 style={{"display":"block", "color":"white"}} className="order-view-text">Сделок: {order.user.deals} · {order.user.deals/100*order.user.completedDeals}%</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-text">{order.assetAmount} {order.asset.alias}</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-text">10 000 - 100 000 {order.currency}</h6>
        //                         <h6 style={{"display":"block"}} className="order-view-text">{getNames(order.paymentMethods)}</h6>
        //                     </div>
        //                 </div>
        //             </ListGroup.Item>
        //         </ListGroup>
        //     )
        //     let el = React.createElement('div', null, element);
        //     elements.push(el)
        // });
    }

    render() {
        const { isLoggedIn } = this.props;
        const { orders } = this.state;

        const orderType = "BUY";
        const currency = "RUB";
        const assetAlias = "WAVES";
        const bankNames = ["Альфа-Банк", "Сбербанк"];

        axios.get("http://localhost:8080/api/p2p/get-orders?" + `orderType=${orderType}&currency=${currency}&assetAlias=${assetAlias}&bankNames=${bankNames}`, {})
            .then((response) => {
                console.log(response.data)
            })

        return(
            <div>
                <div id="p2p-body" className="p2p-body">
                    <ListGroup id="orders-list" className="orders-list">

                    </ListGroup>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(P2PSell);