import axios from 'axios';

export const TOKEN_SESSION_ATTRIBUTE_NAME = 'token';

export const registerSuccessfulLoginForJwt = (token) => {
    sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
    setupAxiosInterceptors();
};

export const logout = () => {
    sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
};

export const isUserLoggedIn = () => {
    let user = sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
};

export function setupAxiosInterceptors() {
    let token = sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);

    if (isUserLoggedIn()) {
        axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = 'Bearer ' + token;
                return config;
            }
        );
    }
}