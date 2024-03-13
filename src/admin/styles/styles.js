import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;

/* Navigation */
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    '& .title': {
        flexGrow: 1,
    },
    '& .icon': {
        marginRight: '36px',
        ...(open && { display: 'none' }),
    },
}));

/* Sidebar */
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
        '& .toolbar': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Set space between the elements
            px: [1],
        },
        '& .logo-div': {
            display: 'flex',
            alignItems: 'center',
        },
        '& .link': {
            color: 'inherit',
            textDecoration: 'none',
        }
    }),
);

/* Layout */
export const BodyBox = styled('div', { shouldForwardProp: (prop) => prop !== 'theme' })(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    overflow: 'auto',
    flexGrow: 1,
    height: '100vh',
    '& .paper': {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(12),
        padding: theme.spacing(2),
    },
    '& .login-button': {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

/* Inventory */
export const InventoryContainer = styled('div', { shouldForwardProp: (prop) => prop !== 'theme' })(({ theme }) => ({
    padding: '16px',
    '& .create-button': {
        marginBottom: theme.spacing(7),
    },
    '& .button-box': {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 2,
    },
    '& .image': {
        width: '50px',
        height: '50px',
    },
    '& .link': {
        textDecoration: 'none',
    },
    '& .action-button': {
        marginLeft: theme.spacing(3),
    },
}));