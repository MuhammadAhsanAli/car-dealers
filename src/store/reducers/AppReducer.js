import {TOGGLE_DRAWER, SET_CONFIG} from '../Action';

const initialState = {
    open: true,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {
                ...state,
                open: !state.open,
            };
        case SET_CONFIG:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default appReducer;