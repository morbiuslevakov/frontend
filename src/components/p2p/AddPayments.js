import React from "react";
import { Alert,  InputGroup, Form as Fr} from 'react-bootstrap';
import '../../App.css';
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class AddPayments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fiat: this.props.fiat,
            bank: "",
            account: "",
            user: {}
        }
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    handleShow = (value) => {
        this.setState({
            showModal: true,
            bank: value
        })
    }

    handleChangeAccount = (event) => {
        this.setState({
            account: event.target.value
        })
        this.props.handleChange(event)
    }

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Navigate to="/register" />;
        }

        if (this.props.currentStep !== 4) {
            return null
        }

        const banks = JSON.parse(localStorage.getItem("banks"));
        const user = JSON.parse(localStorage.getItem("user"));

        return(
            <div>
                <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
                    {this.props.previousButton}
                    <h4 className="mt-3">{this.props.bank.name} · {this.props.fiat}</h4>
                </div>
                <InputGroup className="p2p-order-input-group mb-3 mt-3">
                    <Fr.Control isInvalid={this.props.isInvalid} name="account" onChange={this.handleChangeAccount} className="p2p-order-field" placeholder="Аккаунт, номер карты или телефон" />
                    <Fr.Control.Feedback type="invalid">
                        <Alert key="danger" variant="danger">Метод оплаты уже добавлен.</Alert>
                    </Fr.Control.Feedback>
                </InputGroup>
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

export default connect(mapStateToProps)(AddPayments);