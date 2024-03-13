import { LOGIN_SUCCESS, LOGOUT } from '../Action';

const initialState = {
    isLoggedIn: false,
    token: null,
    user: null,
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN_SUCCESS:
            const { token, user } = action.payload;
            console.log(action.payload);
            return {
                ...state,
                isLoggedIn: true,
                token,
                user,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};

export default authReducer;
