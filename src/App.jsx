import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { PrivateRoute } from "./pages/private/PrivateRoute";
import { TransferPage } from "./pages/transfer/TransferPage";

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
              <Route path="wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
              <Route path="trade" element={<PrivateRoute><Trade /></PrivateRoute>} />
              <Route path="p2p/my-orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="p2p" element={<PrivateRoute><P2P /></PrivateRoute>} />
              <Route path="p2p/create-order" element={<PrivateRoute><OrderCreate /></PrivateRoute>} />
              <Route path="p2p/sell" element={<PrivateRoute><P2PSell /></PrivateRoute>} />
              <Route path="p2p/buy" element={<PrivateRoute><P2PBuy /></PrivateRoute>} />
              <Route path="p2p/sell/:dealId" element={<PrivateRoute><P2PSell /></PrivateRoute>} />
              <Route path="p2p/buy/:dealId" element={<PrivateRoute><P2PBuy /></PrivateRoute>} />
              <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="transfer" element={<PrivateRoute><TransferPage /></PrivateRoute>} />
              <Route path="" element={<PrivateRoute><P2P /></PrivateRoute>} />
              <Route path="*" element={<PrivateRoute><P2P /></PrivateRoute>} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}