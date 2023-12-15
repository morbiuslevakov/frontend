import React from "react";
import { Alert, Offcanvas, InputGroup, Form as Fr, ListGroup, Button, Modal} from 'react-bootstrap';
import '../../App.css';
import { Navigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class OrderPayments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            fiat: this.props.fiat,
            bank: {},
            account: "",
            user: {}
        }
    }

    getBanks = async (fiat) => {
        const banksResponse = await fetch('http://localhost:8080/api/p2p/get-banks?currency=' + fiat);
        const cCR = await banksResponse.json();
        localStorage.setItem("banks", JSON.stringify(cCR));
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleShow = (value) => {
        this.setState({
            bank: value
        })
        const event = {
            target: {
                name:"bank",
                value:value
            }
        }
        this.props.addPayment()
        this.props.handleChange(event)
    }

    handleOnPayment = (event) => {
        if(event.target.checked) {
            event.target.checked = this.props.handleChangePayments("add", JSON.parse(event.target.value))?true:false;
        } else {
            this.props.handleChangePayments("remove", event.target.value);
        }
    }

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Navigate to="/register" />;
        }

        if (this.props.currentStep !== 2) {
            return null
        }

        this.getBanks(this.props.fiat);

        const banks = JSON.parse(localStorage.getItem("banks"));
        const user = JSON.parse(localStorage.getItem("user"));

        const content =
            user.payments===null?null:user.payments.map((value) => {
                return (
                    <div className="user-payments-block">
                        <ListGroup.Item style={{"borderBottom":"none!important"}} className="user-payments">
                            <h4 className="payment-method-title">{value.bank.name}</h4>
                            <p className="payment-method-text text-muted">{value.bank.name} · {value.bank.currency}</p>
                            <p className="payment-method-account text-muted">{value.account}</p>
                        </ListGroup.Item>
                        <Fr.Check value={JSON.stringify(value)} onChange={this.handleOnPayment} type="switch" id="switch"></Fr.Check>
                    </div>
                )
            })

        return(
            <div>
                <ListGroup>
                    <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
                        {this.props.previousButton}
                        <h4 className="mt-3">Добавьте методы оплаты <font color="gray">{this.props.currentStep}/3</font></h4>
                    </div>
                    {content}
                    <div style={{"backgroundColor":"#000", "float":"left!important"}} className="p2p-order-input p2p-order-blackspace"></div>
                    {
                        banks.map((value) => {
                            return (
                                <Button className="payment-add-btn" value={value.name} onClick={() => this.handleShow(value)}>
                                    <ListGroup.Item className="banks-list">
                                        {value.name}
                                        <svg className="drop-left" width="10" height="20" viewBox="0 0 14 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M8.57335 12L1.43414 4.3551C0.580323 3.4408 0.580323 1.95842 1.43414 1.04412C2.28796 0.129823 3.67228 0.129823 4.5261 1.04412L13.151 10.28C13.5931 10.7533 13.8062 11.3789 13.7906 11.9991C13.8067 12.6199 13.5935 13.2462 13.1511 13.72L4.52615 22.9559C3.67233 23.8702 2.28801 23.8702 1.43419 22.9559C0.580369 22.0416 0.58037 20.5592 1.43419 19.6449L8.57335 12Z"
                                                  fill="gray"/>
                                        </svg>
                                    </ListGroup.Item>
                                </Button>)
                        })
                    }
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

export default connect(mapStateToProps)(OrderPayments);