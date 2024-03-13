import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Link } from 'react-router-dom';
import { Logo, LeftNavigation, RightNavigation } from '../../styles/styles';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Logo>
                    <DirectionsCarIcon className="icon" />
                    <Typography className="title" component={Link} to="/">
                        Car Dealers
                    </Typography>
                </Logo>
                <LeftNavigation>
                    <Typography component={Link} to="/" variant="body1">
                        Home
                    </Typography>
                </LeftNavigation>
                <RightNavigation>
                    <Typography component={Link} to="/login" variant="body1">
                        Login
                    </Typography>
                </RightNavigation>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
