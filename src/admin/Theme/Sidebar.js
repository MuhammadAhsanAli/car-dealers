import React from 'react';
import { connect } from 'react-redux';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InventoryIcon from '@mui/icons-material/Inventory';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { Drawer } from '../styles/styles';
import { toggleDrawer } from '../../store/Action';
import Button from '@mui/material/Button';

function SidebarNavigation({ open, toggleDrawer }) {
    const handleToggleDrawer = () => {
        toggleDrawer();
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar className="toolbar">
                <div className="logo-div">
                    <IconButton>
                        <DirectionsCarIcon className="icon" />
                    </IconButton>
                    <Typography component={Link} to="/inventory" className="link">
                        Car Dealers
                    </Typography>
                </div>
                <IconButton onClick={handleToggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                <ListItemButton>
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>
                    <Button
                        component="a"
                        href="/inventory"
                        className="link"
                    >
                        <ListItemText component="a" href="/inventory" primary="Inventory" />
                    </Button>
                </ListItemButton>
            </List>
        </Drawer>
    );
}

const mapStateToProps = (state) => ({
    open: state.app.open,
});

const mapDispatchToProps = {
    toggleDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavigation);
