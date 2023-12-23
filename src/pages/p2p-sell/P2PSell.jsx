import React from "react";
import { Form as ListGroup } from 'react-bootstrap';
import '../../App.css';
import { connect } from "react-redux";
import axios from "axios";
import "./OrderView.css";
import "./P2PSell.css"

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
        axios.get("https://deaslideproperty.com/api/price/crypto/" + this.state.currency, {})
            .then((response) => {
                this.setState({
                    foundPrice: new Map(Object.entries(response.data.assets)).get(this.state.assetAlias).price
                })
            });
    }

    render() {

        const orderType = "BUY";
        const currency = "RUB";
        const assetAlias = "WAVES";
        const bankNames = ["Альфа-Банк", "Сбербанк"];

        axios.get(`https://deaslideproperty.com/api/p2p/get-orders?orderType=${orderType}&currency=${currency}&assetAlias=${assetAlias}&bankNames=${bankNames}`, {})
            .then((response) => {
                console.log(response.data)
            })

        return (
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