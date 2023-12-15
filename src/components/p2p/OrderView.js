import React from "react";
import { Alert, Offcanvas, InputGroup, Form as Fr, ListGroup, Button, Modal} from 'react-bootstrap';
import '../../App.css';
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import "./OrderView.css";

class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fiat: this.props.fiat,
            payments: this.props.payments,
            bank: "",
            account: "",
            user: {}
        }
    }

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Navigate to="/register" />;
        }

        if (this.props.currentStep !== 3) {
            return null
        }

        let foundPrice = "";
        const fiate = new Map(Object.entries(this.props.fiatCurrencies)).set("RUB", {"Nominal":"1", "CharCode":"RUB", "Value":"1"});
        const user = JSON.parse(localStorage.getItem("user"));
        console.log()

        fiate.forEach((value, key, map) => {
            foundPrice = this.props.crypto==="WAVES"?((this.props.cryptoCurrencies.get(this.props.crypto).data.lastPrice * this.props.fiatCurrencies.USD.Value) / (value.Value / value.Nominal)).toFixed(2):((this.props.cryptoCurrencies.get("WAVES").data.lastPrice*this.props.cryptoCurrencies.get(this.props.crypto).data.lastPrice) * this.props.fiatCurrencies.USD.Value).toFixed(2);
            if (value.CharCode === this.state.fiat) {
            }
        })

        const getNames = (array) => {
            let arr = [];
            array.map((value) => arr.push(value.bank.name))
            let uniАrr = [...new Set(arr)];
            if (uniАrr.length>=2) {
                let lastString = uniАrr.pop();
                let string = uniАrr.join(', ') + " и " + lastString;
                return string;
            } else if (uniАrr.length === 1) {
                return uniАrr[0];
            }
        }

        const bankNames = getNames(this.props.payments);


        return(
            <div>
                <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
                    {this.props.previousButton}
                    <h4 className="mt-3">Проверьте объявление <font color="gray">{this.props.currentStep}/3</font></h4>
                </div>
                <ListGroup>
                    <ListGroup.Item style={{"borderBottom":"none!important"}} className="order-view">
                        <div className="order-view-info">
                            <h4 style={{"font-size":"1rem", "color":"white"}} className="order-view-title">{this.props.priceType==="floating"?(foundPrice*(this.props.currentPrice*0.01)).toFixed(2):this.props.currentPrice.toFixed(2)} {this.props.fiat}</h4>
                            <p className="order-view-text">{this.props.priceType==="floating"?this.props.currentPrice+"% от рыночной цены за 1 "+this.props.crypto:"Цена за 1 "+this.props.crypto}</p>
                        </div>
                        <Button disabled className="p2p-deals-btn p2p-deals-btn-muted text-muted">{this.props.type==="buy"?"Продать":"Купить"}</Button>
                    </ListGroup.Item>
                    <ListGroup.Item style={{"borderBottom":"none!important"}} className="order-view">
                        <div className="order-view-owner-info">
                            <div className="order-view-info">
                                <h6 style={{"display":"block", "color":"white"}} className="order-view-title">{user.name}</h6>
                                <h6 style={{"display":"block"}} className="order-view-title">Сумма</h6>
                                <h6 style={{"display":"block"}} className="order-view-title">Лимиты</h6>
                                <h6 style={{"display":"block"}} className="order-view-title">Методы оплаты</h6>
                            </div>
                            <div style={{"margin-left":"1rem"}} className="order-view-info">
                                <h6 style={{"display":"block", "color":"white"}} className="order-view-text">Сделок: {user.deals} · {user.completedPercent}%</h6>
                                <h6 style={{"display":"block"}} className="order-view-text">{this.props.sum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} {this.props.crypto}</h6>
                                <h6 style={{"display":"block"}} className="order-view-text">{this.props.minSum.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} – {this.props.priceType==="floating"?((foundPrice*(this.props.currentPrice/100)*this.props.sum).toFixed(2)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '):((this.props.currentPrice*this.props.sum).toFixed(2)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} {this.props.fiat}</h6>
                                <h6 style={{"display":"block"}} className="order-view-text">{bankNames}</h6>
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
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

export default connect(mapStateToProps)(OrderView);