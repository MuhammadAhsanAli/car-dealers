import React from 'react';
import ProductDetail from '../../components/Product/Detail';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "../../components/Theme/Header";
import Footer from "../../components/Theme/Footer";

function ProductPage() {
    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={1} mt={7}>
                    <Grid item xs={12}>
                        <ProductDetail/>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </div>
    );
}

export default ProductPage;
