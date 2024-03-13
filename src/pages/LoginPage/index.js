import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { LoginPage } from "../../styles/styles"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosRequest } from "../../components/Api/AxiosRequest";
import { loginSuccess } from '../../store/Action';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value.trim();
        const password = event.currentTarget.password.value.trim();

        // Validate email
        if (!email) {
            setEmailError('Email is required');
            return;
        } else if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        } else {
            setEmailError('');
        }

        // Validate password
        if (!password) {
            setPasswordError('Password is required');
            return;
        } else {
            setPasswordError('');
        }

        try {
            const response = await AxiosRequest("POST", "login", {
                email,
                password
            });

            if (!response.data.token) {
                throw new Error('Authentication failed');
            }

            dispatch(loginSuccess(response.data.token.access_token, response.data.token.user));
            navigate('/inventory');
        } catch (error) {
            handleLoginError(error);
        }
    };

    // Function to handle login errors
    const handleLoginError = (error: any) => {
        let errorMessage = 'Failed to log in';

        if (error.response && error.response.data.error) {
            const errorData = error.response.data.error;
            if (errorData.email) {
                setEmailError(errorData.email[0]);
            } else {
                setEmailError('');
            }

            if (errorData.password) {
                setPasswordError(errorData.password[0]);
            } else {
                setPasswordError('');
            }

            if (typeof errorData === 'string') {
                errorMessage = errorData;
            }
        }

        setError(errorMessage);
    };

    // Email validation function
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <LoginPage>
                <Grid container component="main">
                    <Grid item xs={false} sm={4} md={7} className="body" />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box className="box">
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} mt={1}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Typography variant="body2" color="error">
                                    {emailError}
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Typography variant="body2" color="error">
                                    {passwordError}
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="login-button"
                                >
                                    Sign In
                                </Button>
                                {error && (
                                    <Typography variant="body2" color="error">
                                        {error}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </LoginPage>
        </ThemeProvider>
    );
}

export default Login;
