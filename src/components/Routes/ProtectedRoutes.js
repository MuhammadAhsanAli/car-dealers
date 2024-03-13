import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosRequest } from "../Api/AxiosRequest";
import { logout } from "../../store/Action";

const ProtectedRoute = ({ element }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        const checkLoginStatus = async () => {
            if (isLoggedIn) {
                try {
                    const response = await AxiosRequest("POST", "is_login");
                    if (response.status !== 200) {
                        dispatch(logout());
                    }
                } catch (error) {
                    console.error('Error checking login status:', error);
                    dispatch(logout());
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, [isLoggedIn, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
