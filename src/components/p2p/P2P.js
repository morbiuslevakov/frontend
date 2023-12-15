import React from "react";
import { Button, Card } from 'react-bootstrap';
import { connect } from "react-redux";

function P2P(props) {
    return (
        <div className="content-container">
            <div className="p2p-header mb-2">
                <h3 className="p2p-title mb-3">P2P Маркет</h3>
                <h6 className="p2p-description mb-3">Покупайте и продавайте крипту без посредников</h6>
                <div className="p2p-btns">
                    <a href={"/p2p/buy"}>
                        <Button className="btn p2p-btn btn-buy btn-secondary">
                            <svg className="p2p-icon" width="20" height="20" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21.6449" cy="22.0702" r="21.516" fill="#6C757D"/>
                                <path d="M23.145 11.4634C23.145 10.635 22.4734 9.96344 21.645 9.96344C20.8165 9.96344 20.145 10.635 20.145 11.4634H23.145ZM20.5843 33.7378C21.1701 34.3235 22.1198 34.3235 22.7056 33.7378L32.2516 24.1918C32.8373 23.606 32.8373 22.6563 32.2516 22.0705C31.6658 21.4847 30.716 21.4847 30.1302 22.0705L21.645 30.5558L13.1597 22.0705C12.5739 21.4847 11.6241 21.4847 11.0384 22.0705C10.4526 22.6563 10.4526 23.606 11.0384 24.1918L20.5843 33.7378ZM20.145 11.4634L20.145 32.6771H23.145L23.145 11.4634H20.145Z" fill="white"/>
                            </svg>
                            Купить
                        </Button>
                    </a>
                    <a href={"/p2p/sell"}>
                        <Button className="btn p2p-btn btn-sell btn-secondary">
                            <svg className="p2p-icon" width="20" height="20" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="21.9999" cy="22.0702" r="21.516" fill="#6C757D"/>
                                <path d="M20.5 32.6771C20.5 33.5055 21.1716 34.1771 22 34.1771C22.8284 34.1771 23.5 33.5055 23.5 32.6771L20.5 32.6771ZM23.0607 10.4027C22.4749 9.81696 21.5251 9.81696 20.9393 10.4027L11.3934 19.9487C10.8076 20.5345 10.8076 21.4842 11.3934 22.07C11.9792 22.6558 12.9289 22.6558 13.5147 22.07L22 13.5847L30.4853 22.07C31.0711 22.6558 32.0208 22.6558 32.6066 22.07C33.1924 21.4842 33.1924 20.5345 32.6066 19.9487L23.0607 10.4027ZM23.5 32.6771L23.5 11.4634L20.5 11.4634L20.5 32.6771L23.5 32.6771Z" fill="white"/>
                            </svg>
                            Продать
                        </Button>
                    </a>
                </div>
            </div>
            <div className="p2p-body">
                <Card className="p2p-card">
                    <a href="/p2p/orders" className="p2p-order-card" style={{"border-bottom": "1px solid #000"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive p2p-order-icon align-middle" viewBox="0 0 16 16">
                            <path
                                d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <div className="p2p-order-text">
                            <h5 className="p2p-order-title">Мои объявления</h5>
                            <p className="p2p-order-description">Настройки объявлений и платежей</p>
                        </div>
                    </a>
                    <a href="/p2p/create-order" className="p2p-order-card">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#00ffff" className="bi bi-plus-circle p2p-order-icon align-middle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <div className="p2p-order-text">
                            <h5 style={{"color" : "#00ffff"}} className="p2p-order-title">Создать объявление</h5>
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