import React from 'react';
import Link from 'next/link';
import { green } from '@mui/material/colors';
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Component = () => {

    return (

        <>

            <Grid my={3}>

                <Grid style={{ textAlign: 'center' }}>
                    <Typography variant="h1" color="black" fontWeight={800}>
                        Buy, sell, & transfer the subscriptions of startups
                        <Tooltip title="Subscriptions only give you access to a company's products and services, they don't represent investments in the firm." placement="top">
                            <InfoRoundedIcon fontSize="small" color="primary" />
                        </Tooltip>
                    </Typography>
                    <Typography sx={{ my: 2 }} variant="h5" color="secondary" fontWeight={600}>
                        Qarrington is a subscription exchange, where early-stage startup companies are listed so customers can buy, sell, and transfer their subscriptions just like stocks or cryptos.
                    </Typography>
                </Grid>

                <Grid item xs={12} my={0}>
                    <Grid container spacing={2}>
                        {arrayItems && Array.isArray(arrayItems) && arrayItems?.map(({ _id, arrayValue, arrayDetail, arrayVariant }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/qa`}>
                                    <Card style={{ padding: '35px', background: green[arrayVariant], cursor: 'pointer' }}>
                                        <Box mt={1} style={{ textAlign: 'center' }}>
                                            <Box mb={1}>
                                                <Typography variant="h2" fontWeight={800} color="white">
                                                    {arrayValue}
                                                </Typography>
                                                <Typography textTransform="uppercase" variant="body2" fontWeight={700}
                                                    sx={{ color: '#00000080' }}>
                                                    {arrayDetail}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid>

        </>

    )
}

export default Component

const arrayItems = [
    {
        arrayValue: "284",
        arrayDetail: "Companies",
        arrayVariant: 300
    },
    {
        arrayValue: "278,250",
        arrayDetail: "Users",
        arrayVariant: 800
    },
    {
        arrayValue: "120",
        arrayDetail: "Countries",
        arrayVariant: 400
    }
]