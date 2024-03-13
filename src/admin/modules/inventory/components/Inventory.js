import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { AxiosRequest } from "../../../../components/Api/AxiosRequest";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { InventoryContainer } from "../../../styles/styles";
import Box from "@mui/material/Box";

export default function Inventory() {
    const [inventoryData, setInventoryData] = useState([]);
    const app = useSelector(state => state.app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AxiosRequest("GET", `cars`);
                setInventoryData(response.data);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await AxiosRequest("DELETE", `cars/${id}`);
            alert('Item deleted successfully');
            setInventoryData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            alert('Failed to delete item. Please try again.');
        }
    };

    return (
        <InventoryContainer>
            <Title>Inventories</Title>
            <Box className="button-box">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/create"
                    className="create-button"
                >
                    Create
                </Button>
            </Box>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Body</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventoryData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                                <img src={app.imageUrl + row.image} alt={row.title} className="image" />
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.body}</TableCell>
                            <TableCell>
                                <IconButton component={Link} to={`/create/${row.id}`} className="action-button">
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(row.id)} className="action-button">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </InventoryContainer>
    );
}
