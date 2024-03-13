import React from 'react';
import Button from '@mui/material/Button';
import { HeroWrapper, HeroContainer } from '../../styles/styles';
import { Container, Typography } from '@mui/material';

const HeroSection = () => {
    const appBarHeight = 50;

    const handleScrollToProducts = () => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <HeroWrapper appBarHeight={appBarHeight}>
            <HeroContainer>
                <Container className="content">
                    <Typography variant="h1">Welcome to Our Website</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    </Typography>
                    <Button variant="contained" className="button" color="primary" onClick={handleScrollToProducts}>
                        Get Started
                    </Button>
                </Container>
            </HeroContainer>
        </HeroWrapper>
    );
};

export default HeroSection;
