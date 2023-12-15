import api from "./api";
import TokenService from "./token.service";
import React from "react";
import { Navigate } from 'react-router-dom';

class AuthService {
    login(username, password, totpCode) {
        return api
            .post("/auth/signin", {
                username,
                password,
                totpCode
            })
            .then(response => {
                if (response.data.accessToken) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    register(username, email, password) {
        return api.post("/auth/signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return TokenService.getUser();
    }
}

export default new AuthService();