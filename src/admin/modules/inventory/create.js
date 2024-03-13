import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Typography,
    Grid,
    FormControlLabel,
    Switch,
    Box,
    IconButton,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction, CircularProgress
} from '@mui/material';
import { AddPhotoAlternate, Delete } from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Layout from "../../Theme/Layout";
import Title from "./components/Title";
import { AxiosRequest } from "../../../components/Api/AxiosRequest";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Form() {
    const { id } = useParams();
    const app = useSelector(state => state.app);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        body_id: '',
        make_id: '',
        model: '',
        model_number: '',
        vin: '',
        year: '',
        price: '',
        description: '',
        photos: [],
        available: false,
    });

    const [dropdownData, setDropdownData] = useState({
        makes: [],
        bodies: [],
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dropdownResponse = await AxiosRequest("GET",`cars/dropdown`);
                const dropdownData = dropdownResponse.data;

                let editDataResponse;
                if (id) {
                    editDataResponse = await AxiosRequest("GET",`cars/${id}`);
                }

                setDropdownData({
                    makes: dropdownData.makes,
                    bodies: dropdownData.bodies,
                });

                if (id && editDataResponse) {
                    const editData = editDataResponse.data;
                    setFormData({
                        body_id: editData.body_id,
                        make_id: editData.make_id,
                        model: editData.model,
                        model_number: editData.model_number,
                        vin: editData.vin,
                        year: editData.year,
                        price: editData.price,
                        description: editData.description,
                        photos: editData.images.map(image => ({url: app.imageUrl+image.image_path })),
                        available: editData.available === 1 ? true : false,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, app.imageUrl]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePhotoUpload = async (event) => {
        const files = event.target.files;
        const uploadPromises = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await AxiosRequest("POST",`images/store`, formData);
                const newImageName = response.data.data;
                uploadPromises.push({ file, url: URL.createObjectURL(file), new_name: newImageName });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        Promise.all(uploadPromises).then((uploadedPhotos) => {
            setFormData({ ...formData, photos: [...formData.photos, ...uploadedPhotos] });
        });
    };

    const handlePhotoDelete = async (index) => {
        const photoToDelete = formData.photos[index];
        const updatedPhotos = formData.photos.filter((_, i) => i !== index);

        try {
            setFormData({ ...formData, photos: updatedPhotos });
            if (photoToDelete.new_name) {
                await AxiosRequest("DELETE", `images/${photoToDelete.new_name}`);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            // Revert back to the original photos array if deletion fails
            setFormData({ ...formData, photos: updatedPhotos });
        }
    };

    const handleEditorChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const dataToSend = { ...formData, available: formData.available ? 1 : 0 };
        try {
            const response = id
                ? await AxiosRequest("PUT", `cars/${id}`, dataToSend)
                : await AxiosRequest("POST", `cars`, dataToSend);
            setLoading(false);
            console.log('Form data sent successfully:', response.data);
            alert('Form submitted successfully');
            navigate('/inventory');
        } catch (error) {
            setLoading(false);
            console.error('Error sending form data:', error);
            alert('Error submitting form');
        }
    };

    const handleAvailabilityChange = () => {
        setFormData({ ...formData, available: !formData.available });
    };

    return (
        <Layout>
            <Title>Car Details</Title>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Select Body</InputLabel>
                            <Select
                                label="Body"
                                name="body_id"
                                value={formData.body_id}
                                onChange={handleInputChange}
                            >
                                {dropdownData.bodies.map((body) => (
                                    <MenuItem key={body.id} value={body.id}>{body.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Select Make</InputLabel>
                            <Select
                                label="Make"
                                name="make_id"
                                value={formData.make_id}
                                onChange={handleInputChange}
                            >
                                {dropdownData.makes.map((make) => (
                                    <MenuItem key={make.id} value={make.id}>{make.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Model"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Model Number"
                            name="model_number"
                            value={formData.model_number}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="VIN"
                            name="vin"
                            value={formData.vin}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Year"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>Description</Typography>
                        <ReactQuill
                            value={formData.description}
                            onChange={handleEditorChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom>Upload Photos</Typography>
                        <input
                            accept="image/*"
                            id="upload-photos"
                            type="file"
                            multiple
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="upload-photos">
                            <IconButton component="span">
                                <AddPhotoAlternate />
                            </IconButton>
                        </label>
                        {formData.photos.length > 0 && (
                            <Box mt={2}>
                                <Typography variant="subtitle2">Selected Photos:</Typography>
                                <List dense>
                                    {formData.photos.map((photo, index) => (
                                        <ListItem key={index}>
                                            <Box display="flex" alignItems="center">
                                                {photo.uploading && <CircularProgress size={20} style={{ marginRight: '8px' }} />}
                                                {photo.url && <img src={photo.url} alt={photo.index} style={{ marginRight: '8px', width: 'auto', height: '40px' }} />}
                                                <ListItemText primary={photo.file ? photo.file.name : ''} />
                                            </Box>
                                            <ListItemSecondaryAction>
                                                {photo.deleting ? (
                                                    <CircularProgress size={20} />
                                                ) : (
                                                    <IconButton onClick={() => handlePhotoDelete(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}

                                </List>
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Switch checked={formData.available} onChange={handleAvailabilityChange} />}
                            label="Available"
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Box>
            </form>
        </Layout>
    );
}

export default Form;
