import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Typography,
    Button,
    Tabs,
    Tab,
    Container,
    Card,
    CardContent,
    CardHeader,
    IconButton
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
    PriceChange,
    LocalGasStation as LocalGasStationIcon,
    LocationCity as LocationCityIcon,
    Palette as PaletteIcon,
    Home as HomeIcon,
    DriveEta,
    CalendarMonth,
} from '@mui/icons-material';
import TabPanel from "./TabPanel";
import { ActionButton } from "../../styles/styles";
import { AxiosRequest } from "../Api/AxiosRequest";
import { useSelector } from "react-redux";
import DescriptionRenderer from "../HomePage/DescriptionRenderer";

function DetailPage() {
    const { id } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const [value, setValue] = useState(0);
    const app = useSelector(state => state.app);

    // fetch car details based on the 'id' parameter
    const fetchCarDetails = async () => {
        try {
            const response = await AxiosRequest("GET", `cars/${id}`);
            setCarDetails(response.data);
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

    useEffect(() => {
        fetchCarDetails();
    }, [id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (!carDetails) {
        return <div>Loading...</div>; // Render loading indicator while data is being fetched
    }

    return (
        <Container>
            <Typography variant="h4" mb={5}>Car Details</Typography>
            <Carousel showThumbs={true} infiniteLoop>
                {carDetails.images.map((image, index) => (
                    <div key={index}>
                        <img src={app.imageUrl + image.image_path} alt={image.label} style={{ maxWidth: '100%', maxHeight: '70vh' }} />
                    </div>
                ))}
            </Carousel>

            <Grid container mt={4}>
                <Grid item xs={12} sm={9}>
                    <Typography variant="h5" mb={1}>Basic Info</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container alignItems="center">
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <PriceChange />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">Price: {app.currency}{carDetails.price}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <LocalGasStationIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">Make: {carDetails.make.name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <LocationCityIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">Model: {carDetails.model}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <PaletteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">Model No: {carDetails.model_number}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <HomeIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">VIN: {carDetails.vin}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <DriveEta />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1">Body: {carDetails.body.name}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container alignItems="center" spacing={2}>
                                <Grid item sm={2} xs={4}>
                                    <IconButton>
                                        <CalendarMonth />
                                    </IconButton>
                                </Grid>
                                <Grid item sm={10} xs={8}>
                                    <Typography variant="body1" >Year: {carDetails.year}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={3} mt={{ xs: 4 }} className="button-container">
                    <Card variant="outlined" mb={8}>
                        <CardHeader title="Call for pricing" />
                        <CardContent>
                            {['Get Pre-Approved', 'Book an Appointment', 'Already Pre-Approved?', 'I Want This'].map((text, index) => (
                                <ActionButton key={index} style={{ marginBottom: '1rem' }}>
                                    <Button variant="contained" color="primary" fullWidth>{text}</Button>
                                </ActionButton>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Tabs value={value} onChange={handleChange} mt={10}>
                <Tab label="Description" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <DescriptionRenderer htmlContent={carDetails.description} />
            </TabPanel>
        </Container>
    );
}

export default DetailPage;
