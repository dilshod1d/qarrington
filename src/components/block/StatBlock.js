import React from 'react';
import Link from 'next/link';
import { green } from '@mui/material/colors';
import { Badge, Box, Card, Grid, styled, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <ProductBadge badgeContent="stat"></ProductBadge>
                </Grid>
                <Typography sx={{ mt: 6, textAlign: 'center' }} variant="h5" color="secondary" fontWeight={600}>
                    Even though Qarrington is known as the world's first and largest subscription exchange, we don't like saying it because there might be thousands of alternatives out there. What matters the most to us is to further extend our services to more companies, users, and countries.
                </Typography>
                <Grid item xs={12} mt={6}>
                    <Grid container spacing={2}>
                        {cardItems && Array.isArray(cardItems) && cardItems?.map(({ _id, cardValue, cardDetail, cardVariant }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/qa`}>
                                    <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                        <Box mt={1} style={{ textAlign: 'center' }}>
                                            <Box mb={1}>
                                                <Typography gutterBottom variant="h2"
                                                    fontWeight={700} color="black"
                                                    sx={{ color: green[cardVariant] }}>
                                                    {cardValue}
                                                </Typography>
                                                <Typography textTransform="uppercase" variant="body2" fontWeight={700} color="secondary">
                                                    {cardDetail}
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

const ProductBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        color: '#ffffff',
        fontWeight: 800,
        background: '#000000',
        fontSize: '12px',
        textTransform: 'uppercase',
        padding: '20px 16px',
    },
}));

const cardItems = [
    {
        cardValue: "284",
        cardDetail: "Companies",
        cardVariant: 300
    },
    {
        cardValue: "278,250",
        cardDetail: "Users",
        cardVariant: 800
    },
    {
        cardValue: "120",
        cardDetail: "Countries",
        cardVariant: 400
    }
]