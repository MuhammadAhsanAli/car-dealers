import React from 'react';
import { Container } from "@mui/material";
import Header from "../../components/Theme/Header";
import Footer from "../../components/Theme/Footer";
import HeroSection from '../../components/HomePage/HeroSection';
import Grid from "@mui/material/Grid";

function Layout({ children, isHomePage }) {
    return (
        <div>
            <Header />
            {isHomePage && <HeroSection />}
            <Container>
                <Grid container spacing={1} mt={isHomePage ? 10 : 0}>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default Layout;
