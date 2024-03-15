import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Wallet } from "./pages/wallet/Wallet";
import { Trade } from "./pages/trade/Trade";
import { P2P } from "./pages/p2p/P2P";
import { P2PSell } from "./pages/p2p-sell/P2PSell";
import { Profile } from "./pages/profile/Profile";
import { OrderCreate } from "./pages/order-create/OrderCreate";
import { SharedLayout } from "./pages/shared-layout/SharedLayout";
import { theme } from "./utils/constants/theme";
import { UserProvider } from "./context/user-context";
import { P2PBuy } from "./pages/p2p-buy/P2PBuy";
import { ConfirmAccount } from "./pages/confirm-account/ConfirmAccount";
import { Orders } from "./pages/orders/Orders";

export const App = () => {
  return (
    <UserProvider >
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="confirm-account/:token" element={<ConfirmAccount />}></Route>
            <Route path="/" element={<SharedLayout />}>
              <Route path="register" element={<Register />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="wallet" element={<Wallet />}></Route>
              <Route path="trade" element={<Trade />}></Route>
              <Route path="p2p/my-orders" element={<Orders />}></Route>
              <Route path="p2p" element={<P2P />}></Route>
              <Route path="p2p/create-order" element={<OrderCreate />}></Route>
              <Route path="p2p/sell" element={<P2PSell />}></Route>
              <Route path="p2p/buy" element={<P2PBuy />}></Route>
              <Route path="p2p/sell/:dealId" element={<P2PSell />} />
              <Route path="p2p/buy/:dealId" element={<P2PBuy />} />
              <Route path="profile" element={<Profile />}></Route>
              <Route path="*" element={<Navigate to={"trade"} />}></Route>
              <Route path="" element={<Navigate to={"trade"} />}></Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}