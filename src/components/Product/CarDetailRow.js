import React from "react";
import PropTypes from 'prop-types';
import { Grid, IconButton, Typography } from "@mui/material";

function CarDetailRow({ icon, title, value }) {
    return (
        <Grid item xs={6}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={2}>
                    <IconButton>
                        {icon}
                    </IconButton>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1">
                        {title}: {value}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

CarDetailRow.propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default CarDetailRow;
