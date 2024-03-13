import React from 'react';
import { Typography } from '@mui/material';
import { Description } from "../../styles/styles";

function DescriptionRenderer({ htmlContent }) {
    return (
        <Description>
            <Typography variant="body2" className="desc" color="text.secondary" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </Description>
    );
}

export default DescriptionRenderer;
