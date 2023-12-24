import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import Wallet from "./pages/wallet/Wallet";
import { Trade } from "./pages/trade/Trade";
import P2P from "./pages/p2p/P2P";
import P2PSell from "./pages/p2p-sell/P2PSell";
import { history } from './helpers/history';
import Profile from "./pages/profile/Profile";
import OrderCreate from "./pages/order-create/OrderCreate";
import { SharedLayout } from "./pages/shared-layout/SharedLayout";
import { theme } from "./utils/constants/theme";
import { UserProvider } from "./context/user-context";

export const App = () => {
  return (
    <UserProvider >
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route path={"register"} element={<Register />}></Route>
              <Route path={"login"} element={<Login history={history} />}></Route>
              <Route path={"wallet"} element={<Wallet />}></Route>
              <Route path={"trade"} element={<Trade />}></Route>
              <Route path={"p2p"} element={<P2P />}></Route>
              <Route path={"p2p/create-order"} element={<OrderCreate />}></Route>
              <Route path={"p2p/sell"} element={<P2PSell />}></Route>
              <Route path={"profile"} element={<Profile />}></Route>
              <Route path={"*"} element={<Navigate to={"trade"} />}></Route>
              <Route path={""} element={<Navigate to={"trade"} />}></Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}