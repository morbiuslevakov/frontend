import React, { Component } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import ChangePassword from "../../components/CustomModals/ChangePassword/ChangePassword";
import Preloader from "../../components/Preloader";
import UserService from "../../services/user.service";
import EventBus from "../../utils/EventBus";
import isLoggedIn from "../../utils/isLoggedIn";
import "./Profile.css";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            settings: null
        };
    }

    copyTextToClipboard = () => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(JSON.parse(localStorage.getItem("user")).address);
        } else {
            return document.execCommand('copy', true, JSON.parse(localStorage.getItem("user")).address);
        }
    }

    componentDidMount() {
        // const user = JSON.parse(localStorage.getItem("user"));
        const { history } = this.props;

        UserService.getSettings().then(
            response => {
                this.setState({
                    settings: response.data
                })
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!isLoggedIn) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }

        );
    }

    render() {
        return (
            <div className="content-container" style={{ "filter": `blur(${this.state.modalShow ? "8px" : "0px"})` }}>
                <ChangePassword
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />
                <div className="settings-container">
                    <img src="https://telegra.ph/file/2ff3ebc27de2eeb71374c.png" className="rounded-circle shadow-4 mb-4" style={{ "width": "150px", "margin": "auto" }} alt="Avatar" />
                    <Card className="profile-card">
                        <Card.Title className="profile-card-title mb-3">Основные</Card.Title>
                        <Card.Text className="text-muted" style={{ "margin-bottom": "5px" }}>Адрес</Card.Text>
                        <Card.Text>
                            {JSON.parse(localStorage.getItem("user")).address}
                            <IconButton style={{ width: '50px', height: '50px', marginLeft: '10px' }} >
                                <ContentCopyIcon onClick={this.copyTextToClipboard} />
                            </IconButton>
                        </Card.Text>
                    </Card>
                    <Card className="profile-card">
                        <Card.Title className="profile-card-title mb-3">Статистика аккаунта</Card.Title>
                        <div className="statistics">
                            <Alert key="warning-alert" variant="warning">
                                Статистика пока недоступна для вашего аккаунта.
                            </Alert>
                        </div>
                    </Card>
                    <Card className="profile-card">
                        <Card.Title className="profile-card-title mb-3">Безопасность</Card.Title>
                        <Button className="security-btn mb-3 btn-secondary" onClick={() => this.setState({ modalShow: true })}>Изменить пароль</Button>
                        {this.state.settings !== null ?
                            <Button className="security-btn btn-secondary mb-4">{this.state.settings.using2FA ? "Выключить 2FA" : "Включить 2FA"}</Button> :
                            <Button className="security-btn btn-secondary mb-3"></Button>
                        }
                        <Card.Text className="text-muted" style={{ "margin-bottom": "5px" }}>Email</Card.Text>
                        {this.state.settings !== null ?
                            <Card.Text>{this.state.settings.email}<EditIcon onClick={this.copyTextToClipboard} /></Card.Text> :
                            <Preloader />
                        }
                    </Card>
                    <Card className="profile-card">
                        <Card.Title className="profile-card-title mb-3">Настройки</Card.Title>
                    </Card>
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

export default connect(mapStateToProps)(Profile);