import api from "./api"

export const AuthLogin = async (data) => {
    const response = await api.post('/auth/login',data );
    return response;
}
export const Loginout = async () => {
    const response = await api.post('/auth/logout' );
    return response;
}
export const Forget = async () => {
    const response = await api.post('/auth/reset_password' );
    return response;
}