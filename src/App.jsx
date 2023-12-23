import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Wallet from "./pages/wallet/Wallet";
import Trade from "./pages/trade/Trade";
import P2P from "./pages/p2p/P2P";
import P2PSell from "./pages/p2p-sell/P2PSell";
import { history } from './helpers/history';
import AuthVerify from "./utils/auth-verify";
import EventBus from "./utils/EventBus";
import { logout } from "./actions/auth";
import AuthService from "./services/auth.service";
import Profile from "./pages/profile/Profile";
import OrderCreate from "./pages/order-create/OrderCreate";
import { SharedLayout } from "./pages/shared-layout/SharedLayout";
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/constants/theme";

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
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route exact path={"/register"} element={<Register history={history} />}></Route>
              <Route exact path={"/login"} element={<Login history={history} />}></Route>
              <Route exact path={"/wallet"} element={<Wallet />}></Route>
              <Route exact path={"/trade"} element={<Trade />}></Route>
              <Route exact path={"/p2p"} element={<P2P />}></Route>
              <Route exact path={"/p2p/create-order"} element={<OrderCreate />}></Route>
              <Route exact path={"/p2p/sell"} element={<P2PSell />}></Route>
              <Route exact path={"/profile"} element={<Profile />}></Route>
            </Route>
          </Routes>
          <AuthVerify logOut={logout} />
        </Router>
      </ThemeProvider>
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