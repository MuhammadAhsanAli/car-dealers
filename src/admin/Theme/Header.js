import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar } from "../styles/styles";
import { toggleDrawer, logout } from '../../store/Action';
import { AxiosRequest } from "../../components/Api/AxiosRequest";
import { useNavigate } from 'react-router-dom';

function Header() {
    const { open } = useSelector(state => state.app);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (auth.isLoggedIn) {
            try {
                const response = await AxiosRequest("POST", "logout");
                if (response.status === 200) {
                    dispatch(logout());
                    navigate('/login');
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        } else {
            navigate('/login');
        }
    };

    const handleMenuButtonClick = () => {
        dispatch(toggleDrawer());
    };

    return (
        <AppBar open={open}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenuButtonClick}
                    className="icon"
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className="title"
                >
                    CMS
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                    <Typography ml={1}>Logout</Typography>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
