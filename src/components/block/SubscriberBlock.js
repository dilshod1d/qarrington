import React from 'react';
import Link from 'next/link';
import { orange } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { Box, Button, Card, Grid, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="black" fontWeight={700}>
                        Buy, sell, and transfer subscriptions the same way you do with stocks.
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        In the past, you could only use your subscriptions with i.e. a movie streaming platform to watch movies. Today, Qarrington allows you to do the same but with the ability to sell the subscriptions.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ fontWeight: 700, color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            buy subscriptions
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        Kindly join our weekly Q&A to get early access.
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
        cardIcon: <AccountCircleIcon color="primary" sx={{ fontSize: '55px', color: orange[200] }} />,
        cardTitle: "Open",
        cardDetail: "Create a Qarrington account without your personal data such as email. It's 100% free."
    },
    {
        cardIcon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '55px', color: orange[800] }} />,
        cardTitle: "Connect",
        cardDetail: "Link your preferred physical or online bank account to your Qarrington account."
    },
    {
        cardIcon: <ArrowCircleLeftRoundedIcon color="primary" sx={{ fontSize: '55px', color: orange[400] }} />,
        cardTitle: "Pull",
        cardDetail: "Buy subscriptions during and after a company's ISO either with your credit or debit card."
    }
]