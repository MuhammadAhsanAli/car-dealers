import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ element, defaultRedirect = "/inventory" }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    return !isLoggedIn ? element : <Navigate to={defaultRedirect} />;
};

export default GuestRoute;
