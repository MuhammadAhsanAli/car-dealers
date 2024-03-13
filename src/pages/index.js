import React from 'react';
import ProductCard from '../components/HomePage/ProductCard';
import Layout from "./Theme/Layout";
import {HomeContainer} from "../styles/styles";

function HomePage() {
    return (
        <Layout isHomePage={true}>
            <HomeContainer>
                <ProductCard/>
            </HomeContainer>
        </Layout>
    );
}

export default HomePage;
