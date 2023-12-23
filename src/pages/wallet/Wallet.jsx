import React, { Suspense } from "react";
import { Button, Modal, InputGroup, Form as Fr, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import P2PService from "../../services/p2p.service";
import PriceService from "../../services/price.service";
import EventBus from "../../utils/EventBus";
import Preloader from '../../components/Preloader';
import isLoggedIn from "../../utils/isLoggedIn";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { ReactComponent as CopyIcon } from '../../images/copy-icon.svg';
import { ReactComponent as DoneCopyIcon } from '../../images/done-copy-icon.svg';

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGet: false,
            showSend: false,
            isCopied: false,
            assets: [],
            walletAddress: "",
            tokenAmount: 0,
            tokenAlias: "",
            invalid: false,
            fiat: "RUB",
            loaded: false,
            balance: null,
            crypto: null
        }
    }

    onChangeWalletAddress = (e) => {
        this.setState({
            walletAddress: e.target.value
        })
    }
    onChangeTokenAmount = (e) => {
        this.state.assets.map((asset, key) => {
            if (((asset.balance ** asset.decimals) + asset.decimals) < ((asset.decimals ** e.target.value) + asset.decimals)) {
                this.setState({
                    invalid: true
                })
            } else {
                this.setState({
                    invalid: false,
                    tokenAmount: asset.decimals * e.target.value
                })
            }
            return asset;
        }
        )
    }
    onChangeTokenAlias = (e) => {
        this.setState({
            tokenAlias: e.target.value
        })
    }

    handleCloseGet = () => this.setState({ showGet: false });
    handleShowGet = () => {
        this.setState({
            showGet: true
        })
    };

    handleCloseSend = () => {
        this.setState({
            invalid: false,
            showSend: false
        })
    };
    handleShowSend = () => {
        this.setState({
            showSend: true
        })
    };

    copyTextToClipboard = () => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(this.state.address);
        } else {
            return document.execCommand('copy', true, this.state.address);
        }
    }

    handleCopyClick = () => {
        this.copyTextToClipboard()
            .then(() => {
                this.setState({
                    isCopied: true
                })
                setTimeout(() => {
                    this.setState({
                        isCopied: false
                    })
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSendTokens = (e) => {
        if (this.state.invalid) {
            return;
        }
        e.preventDefault();
        P2PService.sendTokens(
            this.state.walletAddress.toString(),
            this.state.tokenAmount.toString(),
            this.state.tokenAlias.toString()
        )
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const { history } = this.props;

        PriceService.setPrices(this.state.fiat).then(
            response => {
                this.setState({
                    crypto: response.data
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
        PriceService.setBalances(user?.address).then(
            response => {
                this.setState({
                    balance: response.data
                })
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!user) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }
        );
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <Suspense fallback={<Preloader />}>
                <div className="content-container">
                    <div className="profile">
                        <AccountCircleIcon />
                        <div className="transaction-buttons">
                            <button className="transaction-btn" onClick={this.handleShowSend}>
                                <ArrowCircleUpIcon fontSize="large" />
                                <p>Отправить</p>
                            </button>
                            <button className="transaction-btn" onClick={this.handleShowGet}>
                                <ArrowCircleDownIcon fontSize="large" />
                                <p>Получить</p>
                            </button>
                        </div>
                        <Modal show={this.state.showGet} onHide={this.handleCloseGet}>
                            <Modal.Header closeButton>
                                <Modal.Title>Ввод</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-3">
                                    <Fr.Control
                                        className="modal-form-control"
                                        placeholder="Recipient's address"
                                        aria-label="Address"
                                        aria-describedby="basic-addon2"
                                        value={user === null ? "[NO DATA]" : user.address}
                                        disabled
                                    />
                                    <Button variant="outline-secondary" id="button-addon2" onClick={this.handleCopyClick}>
                                        {this.state.isCopied ? <DoneCopyIcon /> : <CopyIcon />}
                                    </Button>
                                </InputGroup>
                            </Modal.Body>
                        </Modal>
                        <Modal show={this.state.showSend} onHide={this.handleCloseSend}>
                            <Modal.Header closeButton>
                                <Modal.Title>Вывод</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.invalid &&
                                    (<Alert key="danger" variant="danger">
                                        Недочтаточно средств
                                    </Alert>)
                                }
                                <Fr>
                                    <Fr.Group className="mb-3" controlId="walletAddress">
                                        <Fr.Label>Адрес кошелька</Fr.Label>
                                        <Fr.Control className="modal-form-control" onChange={this.onChangeWalletAddress} type="text" autoFocus />
                                    </Fr.Group>
                                    <Fr.Label for="token">Токен</Fr.Label>
                                    <Fr.Select onChange={this.onChangeTokenAlias} className="form-control" id="token" aria-label="Default select example">
                                        {(this.state.crypto !== null && this.state.balance !== null) &&
                                            Array.from(Object.entries(this.state.crypto.assets)).map((value) => {
                                                return <option key={value[0]}>{value[0]}</option>
                                            })
                                        }
                                    </Fr.Select>
                                    <Fr.Group className="mb-3" controlId="tokenAmount">
                                        <Fr.Label>Колличесво</Fr.Label>
                                        <Fr.Control className="modal-form-control" onChange={this.onChangeTokenAmount} type="number" min="1" />
                                        <Fr.Label className="commission-label">Комиссия сети</Fr.Label>
                                        <Fr.Label className="custom-label">{this.state.tokenAlias === "WAVES" ? "0.001 WAVES" : "1 YUSRA"}</Fr.Label>
                                    </Fr.Group>
                                </Fr>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="sendTokensButtons" variant="secondary" onClick={this.handleCloseSend}>Отмена</Button>
                                <Button className="sendTokensButtons" variant="primary" onClick={this.handleSendTokens}>Отправить</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <TableContainer className="table-container">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Токен</TableCell>
                                    <TableCell align="left">Цена</TableCell>
                                    <TableCell align="left">Колличество</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.crypto !== null && this.state.balance !== null) &&
                                    Array.from(Object.entries(this.state.crypto.assets)).map((value) => {
                                        return (
                                            <TableRow key={value[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="left">{value[0]}</TableCell>
                                                <TableCell align="left">{value[1].price.toFixed(2)}</TableCell>
                                                <TableCell align="left">
                                                    {this.state.balance !== null &&
                                                        new Map(Object.entries(this.state.balance.balance)).get(value[0]).balance
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Suspense>
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
export default connect(mapStateToProps)(Wallet);