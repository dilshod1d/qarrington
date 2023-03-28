import React from 'react';
import { Box, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
                <Typography variant="body2" color="secondary">
                    Dear, O'neyo! Welcome to your admin dashboard, where as part of the Qarrington team, you can seamlessly manage companies submitted by users. Based on your account permission, you can also manage the payouts going to and coming from user accounts. In addition to that, you will be able to manage several subscription data such as picks, pulls, pushes, and matches.
                </Typography>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Typography variant="body2" color="secondary">Qarrington, Inc. © 2023</Typography>
            </Box>

        </>

    )
}

export default Component