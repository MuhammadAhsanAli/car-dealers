import store from '../../store/Store';

export function configureAxios(instance) {
    instance.interceptors.request.use(
        config => {
            const { isLoggedIn, token } = store.getState().auth;
            if (isLoggedIn && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );
}