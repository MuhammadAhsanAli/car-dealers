import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardContent, Typography, Tab, Tabs, Container, Box, Button, CircularProgress } from '@mui/material';
import { AxiosRequest } from "../Api/AxiosRequest";
import { useSelector } from "react-redux";
import { Description, LinkTag } from "../../styles/styles";
import { Link } from "react-router-dom";
import DescriptionRenderer from "./DescriptionRenderer";

function BodyContainer() {
    const [bodies, setBodies] = useState([]);
    const [cars, setCars] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const app = useSelector(state => state.app);

    useEffect(() => {
        fetchBodies();
    }, []);

    const fetchBodies = async () => {
        try {
            const response = await AxiosRequest("GET", "bodies");
            if (response.status === 200) {
                const data = response.data;
                setBodies(data);
                const initialCategory = data.length > 0 ? data[0].name : '';
                setActiveCategory(initialCategory);
                if (initialCategory) {
                    const initialBody = data.find(body => body.name === initialCategory);
                    if (initialBody) {
                        fetchCars(initialBody.id);
                    }
                }
            } else {
                console.error('Failed to fetch bodies');
            }
        } catch (error) {
            console.error('Error fetching bodies:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCars = async (bodyId) => {
        try {
            const response = await AxiosRequest("GET", `cars?body_id=${bodyId}`);
            if (response.status === 200) {
                const data = response.data;
                setCars(data);
            } else {
                console.error('Failed to fetch cars');
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleTabChange = (event, newCategory) => {
        setActiveCategory(newCategory);
        const selectedBody = bodies.find(body => body.name === newCategory);
        if (selectedBody) {
            fetchCars(selectedBody.id);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant={"h4"} mb={5} align={"center"}>
                Featured Inventory
            </Typography>
            <Container id="products-section">
                <Tabs value={activeCategory} onChange={handleTabChange} variant="fullWidth">
                    {bodies.map((body, index) => (
                        <Tab key={index} label={body.name} value={body.name} style={{ flexGrow: 1 }} />
                    ))}
                </Tabs>
            </Container>
            <Container>
                <Grid container spacing={2}>
                    {cars.map((car, carIndex) => (
                        <Grid item xs={12} sm={6} md={3} lg={3} key={carIndex}>
                            <LinkTag>
                                <Link to={`/detail/${car.id}`} className="link">
                                    <Card style={{ height: '400px' }}>
                                        <CardContent>
                                            <img src={app.imageUrl + car.image} alt={car.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                            <Typography variant="h6" component="div">
                                                {car.title}
                                            </Typography>
                                            <DescriptionRenderer htmlContent={car.description} />
                                            {car.price ? (
                                                <Typography variant="body1" color="text.primary" mt={3}>
                                                    Price: {app.currency}{car.price}
                                                </Typography>
                                            ) : (
                                                <Button variant="contained" size={"small"} color="primary" style={{ marginTop: '18px' }}>
                                                    Call for Price
                                                </Button>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            </LinkTag>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default BodyContainer;
