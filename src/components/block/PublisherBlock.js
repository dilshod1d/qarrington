import React from 'react';
import Link from 'next/link';
import { purple } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PixRoundedIcon from '@mui/icons-material/PixRounded';
import OutboundRoundedIcon from '@mui/icons-material/OutboundRounded';
import { Box, Button, Card, Grid, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="black" fontWeight={700}>
                        Get the world's largest timely, reliable, and most accurate subscription data.
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        If you'd like to integrate the world's largest subscription data into your products or business model at large, Qarrington provides a simple REST API that can help you do beyond that.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ fontWeight: 700, color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            fetch data
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        You can get started by joining our weekly Q&A.
                    </Typography>
                </Grid>
                <Grid item xs={12} mt={6}>
                    <Grid container spacing={2}>
                        {cardItems && Array.isArray(cardItems) && cardItems?.map(({ _id, cardIcon, cardTitle, cardDetail }) => (
                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                <Link href={`/qa`}>
                                    <Card style={{ padding: '40px', cursor: 'pointer' }}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {cardIcon}
                                        </Box>
                                        <Box mt={1} style={{ textAlign: 'center' }}>
                                            <Box mb={1}>
                                                <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                    {cardTitle}
                                                </Typography>
                                                <Typography variant="body2" fontWeight={700} color="secondary">
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

const cardItems = [
    {
        cardIcon: <AccountCircleIcon color="primary" sx={{ fontSize: '55px', color: purple[200] }} />,
        cardTitle: "Open",
        cardDetail: "Create a Qarrington account without your personal data such as email. It's 100% free."
    },
    {
        cardIcon: <PixRoundedIcon color="primary" sx={{ fontSize: '55px', color: purple[800] }} />,
        cardTitle: "Decide",
        cardDetail: "Pick the monthly subscription data pricing plan that best suits your business needs."
    },
    {
        cardIcon: <OutboundRoundedIcon color="primary" sx={{ fontSize: '55px', color: purple[400] }} />,
        cardTitle: "Call",
        cardDetail: "Fetch subscription data through REST API and integrate the data into your products."
    }
]