import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login(username, password, totpCode) {
        return api
            .post("/auth/signin", {
                email: username,
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

const authService = new AuthService();

export default authService;