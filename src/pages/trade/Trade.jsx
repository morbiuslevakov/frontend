import React from "react";
import { Card } from 'react-bootstrap';
import { connect } from "react-redux";
import { ReactComponent as P2PLogo } from '../../images/p2p-logo.svg'
import './trade.css'

class Trade extends React.Component {
    render() {
        return (
            <div className="content-container">
                <div className="service-cards">
                    <a className="service-link p2p" href="/p2p">
                        <Card className="service-card p2p">
                            <Card.Body>
                                <P2PLogo />
                                <Card.Title className="service-title">P2P Маркет</Card.Title>
                                <Card.Text className="service-text">
                                    Простой и безопасный обмен валюты: переведите свои фиатные средства в криптовалюту в несколько кликов!
                                    Мы создали пространство для безопасного обмена вашей фиатной валюты на цифровые активы.
                                    Доверьтесь нам - мы объединяем удобство, надёжность и скорость для вашего уверенного шага в мир криптофинансов.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </a>
                </div>
            </div>
        )
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

export default connect(mapStateToProps)(Trade);