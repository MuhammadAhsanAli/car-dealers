import { styled } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/* Navigation */
export const Logo = styled(Toolbar)({
    '& .icon': {
        fontSize: '32px',
        marginRight: '10px',
    },
    '& .title': {
        fontSize: '24px',
        textDecoration: 'none',
        color: "white",
    },
});

export const LeftNavigation = styled(Toolbar)`
    && {
        flex-grow: 1;
        font-size: 24px;
        a {
            text-decoration: none;
            color: white;
        }
    }
`;

export const RightNavigation = styled(Typography)`
    && {
        margin-right: 20px;
        a {
            text-decoration: none;
            color: white;
        }
    }
`;

/* Shared Styles */
const buttonMargin = '1rem';

/* Home Page */
export const HomeContainer = styled('div')({
    margin: '0 auto',
    maxWidth: 'calc(100% - 32px)'
});

export const HeroWrapper = styled('div')(({ theme, appBarHeight }) => ({
    position: 'relative',
    height: `calc(100vh - ${appBarHeight}px)`,
    backgroundImage: 'url("/images/her-section.jpg")',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));

export const HeroContainer = styled('div',{ shouldForwardProp: (prop) => prop !== 'theme' })(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    textAlign: 'center',
    zIndex: 2,
    '& .content': {
        color: 'white',
    },
    '& .button': {
        marginTop: theme.spacing(4),
    }
}));

/* Product Page */
export const ActionButton = styled('div')({
    marginBottom: buttonMargin
});

export const Description = styled('div')({
    '& .desc': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: '150rem',
    },
});

export const LinkTag = styled('div')({
    '& .link': {
        textDecoration: 'none',
    },
});

/* Login Page */
export const LoginPage = styled('div',{ shouldForwardProp: (prop) => prop !== 'theme' })(({ theme }) => ({
    '& .body': {
        backgroundImage: 'url(/images/signin-side.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    },
    '& .box': {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(7),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    '& .login-button': {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
}));
