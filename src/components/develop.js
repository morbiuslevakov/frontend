import React from "react";
import { Alert, Offcanvas, InputGroup, Form as Fr, ListGroup, Button, Modal, Card, Col, Row } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import ReactDom from 'react-dom/client';

function HomeButton() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }

    return (
        <button style={{"display":"flex"}} onClick={handleClick} className="back-arrow">
            <svg style={{"display":"inline", "margin":"auto"}} width="50" height="40" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6068 12.5702C24.4352 12.5702 25.1068 11.8986 25.1068 11.0702C25.1068 10.2418 24.4352 9.57019 23.6068 9.57019V12.5702ZM1.3325 10.0095C0.74671 10.5953 0.74671 11.5451 1.3325 12.1309L10.8784 21.6768C11.4642 22.2626 12.414 22.2626 12.9998 21.6768C13.5855 21.091 13.5855 20.1413 12.9998 19.5555L4.51448 11.0702L12.9998 2.58491C13.5855 1.99912 13.5855 1.04938 12.9998 0.463589C12.414 -0.122198 11.4642 -0.122198 10.8784 0.463589L1.3325 10.0095ZM23.6068 9.57019L2.39316 9.57019V12.5702L23.6068 12.5702V9.57019Z" fill="gray"/>
            </svg>
            <h1 style={{"color":"gray", "display":"inline", "margin":"auto auto auto 1rem"}}>Назад</h1>
        </button>
    );
}

class Develop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-container">
                <HomeButton/>

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

export default connect(mapStateToProps)(Develop);