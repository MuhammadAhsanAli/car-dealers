import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import { Container, Paper } from "@mui/material";
import { BodyBox } from "../styles/styles";

function Layout({ children }) {
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box display="flex">
                <Header />
                <Sidebar />
                <BodyBox>
                    <Container>
                        <Paper className="paper">
                            {children}
                        </Paper>
                    </Container>
                </BodyBox>
            </Box>
        </ThemeProvider>
    );
}

export default Layout;
