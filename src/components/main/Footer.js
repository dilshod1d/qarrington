import React from 'react';
import { Box, Typography } from '@mui/material';
import packageJson from '../../../package.json'

const Component = () => {

    return (

        <>

            <Box textAlign="center" sx={{ mb: 4 }}>
                <Typography variant="body2" color="secondary">Qarrington, Inc. © 2023 | version {packageJson.version}</Typography>
            </Box>

        </>

    )
}

export default Component