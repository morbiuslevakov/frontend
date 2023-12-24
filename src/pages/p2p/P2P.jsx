import React from "react";
import { Button, Card } from 'react-bootstrap';
import { connect } from "react-redux";
import { ReactComponent as SendIcon } from '../../images/p2p/send-icon.svg'
import { ReactComponent as ReceiveIcon } from '../../images/p2p/receive-icon.svg'
import { ReactComponent as BoxIcon } from '../../images/p2p/box-icon.svg'
import { ReactComponent as AddIcon } from '../../images/p2p/add-icon.svg'

function P2P() {
    return (
        <div className="content-container">
            <div className="p2p-header mb-2">
                <h3 className="p2p-title mb-3">P2P Маркет</h3>
                <h6 className="p2p-description mb-3">Покупайте и продавайте крипту без посредников</h6>
                <div className="p2p-btns">
                    <a href={"/p2p/buy"}>
                        <Button className="btn p2p-btn btn-buy btn-secondary">
                            <SendIcon />
                            Купить
                        </Button>
                    </a>
                    <a href={"/p2p/sell"}>
                        <Button className="btn p2p-btn btn-sell btn-secondary">
                            <ReceiveIcon />
                            Продать
                        </Button>
                    </a>
                </div>
            </div>
            <div className="p2p-body">
                <Card className="p2p-card">
                    <a href="/p2p/orders" className="p2p-order-card" style={{ "borderBottom": "1px solid #000" }}>
                        <BoxIcon />
                        <div className="p2p-order-text">
                            <h5 className="p2p-order-title">Мои объявления</h5>
                            <p className="p2p-order-description">Настройки объявлений и платежей</p>
                        </div>
                    </a>
                    <a href="/p2p/create-order" className="p2p-order-card">
                        <AddIcon />
                        <div className="p2p-order-text">
                            <h5 style={{ "color": "#00ffff" }} className="p2p-order-title">Создать объявление</h5>
                        </div>
                    </a>
                </Card>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}
export default connect(mapStateToProps)(P2P);