import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConfig } from './store/Action';
import HomePage from './pages/index';
import DetailPage from './pages/ProductPage/index';
import LogInPage from './pages/LoginPage';
import InventoryModule from './admin/modules/inventory';
import InventoryCreate from './admin/modules/inventory/create';
import ProtectedRoute from './components/Routes/ProtectedRoutes';
import GuestRoute from './components/Routes/GuestRoutes';
import { configValues } from './config';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setConfig(configValues));
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/login" element={<GuestRoute element={<LogInPage />} />} />
                <Route path="/inventory" element={<ProtectedRoute element={<InventoryModule />} />} />
                <Route path="/create/:id?" element={<ProtectedRoute element={<InventoryCreate />} />} />
            </Routes>
        </Router>
    );
};

export default App;
