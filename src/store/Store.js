import { combineReducers, createStore } from 'redux';
import appReducer from './reducers/AppReducer';
import authReducer from './reducers/AuthReducer';

const persistedState = localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState'))
    : {};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, persistedState);

// Subscribe to store changes and save the state to local storage
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
