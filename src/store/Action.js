export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = () => ({
    type: TOGGLE_DRAWER,
});

export const SET_CONFIG = 'SET_CONFIG';
export const setConfig = (config) => ({
    type: SET_CONFIG,
    payload: config,
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (token, user) => ({
    type: LOGIN_SUCCESS,
    payload: {isLoggedIn: true, token, user },
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: LOGOUT,
});
