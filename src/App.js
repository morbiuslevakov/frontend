import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Wallet from "./components/Wallet";
import QR from "./components/QR";
import Trade from "./components/trade";
import PEPEBridge from "./components/PEPEBridge";
import Develop from "./components/develop";
import P2P from "./components/p2p/P2P";
import P2PSell from "./components/p2p/P2PSell";
import { history } from './helpers/history';
import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import { logout } from "./actions/auth";
import AuthService from "./services/auth.service";
import Header from "./components/Header/Header";
import Profile from "./components/Profile";
import OrderCreate from "./components/p2p/OrderCreate";

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    history.push("/login");
    window.location.reload();
  }

  render() {

    return (
      <Router history={history}>
        <Header />
        <div className="main-container">
          <Routes>
            <Route exact path={"/register"} element={<Register history={history} />}></Route>
            <Route exact path={"/login"} element={<Login history={history} />}></Route>
            <Route exact path={"/wallet"} element={<Wallet />}></Route>
            <Route exact path={"/trade"} element={<Trade />}></Route>
            <Route exact path={"/p2p"} element={<P2P />}></Route>
            <Route exact path={"/p2p/create-order"} element={<OrderCreate />}></Route>
            <Route exact path={"/p2p/sell"} element={<P2PSell />}></Route>
            <Route exact path={"/bridge"} element={<PEPEBridge />}></Route>
            <Route exact path={"/investments"} element={<Develop />}></Route>
            <Route exact path={"/downloads"} element={<Develop />}></Route>
            <Route exact path={"/qr"} element={<QR />}></Route>
            <Route exact path={"/profile"} element={<Profile />}></Route>
          </Routes>

          <AuthVerify logOut={logout} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);