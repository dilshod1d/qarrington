import React from 'react';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Box, Button, Card, Grid, Tooltip, Typography } from '@mui/material';

const Component = () => {

    return (

        <>

            <Grid my={20}>
                <Grid mb={4} style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="black" fontWeight={700}>
                        Imagine raising $85M while keeping 100% of your company ownership.
                    </Typography>
                    <Typography sx={{ my: 1.5 }} variant="h5" color="secondary" fontWeight={600}>
                        We created Qarrington so founders of early-stage startup companies can raise capital that is not just equity-free, but also debt-free. We do this through an <Tooltip title="This is the process of listing a company on a subscription exchange, where its subscriptions can be sold to customers." placement="top">
                            <Typography
                                component="span"
                                fontWeight={700}
                                color="primary"
                                variant="h5"
                                sx={{
                                    "&:hover": {
                                        color: '#000'
                                    }
                                }}>Initial Subscription Offering</Typography></Tooltip> or ISO.
                    </Typography>
                    <Link href={`/qa`}>
                        <Button
                            size="large"
                            sx={{ fontWeight: 700, color: 'white', textTransform: 'uppercase', fontSize: '12px' }}
                            variant="contained"
                            fullWidth={false}
                        >
                            raise funds
                        </Button>
                    </Link>
                    <Typography sx={{ my: 2 }} variant="body2" color="secondary" fontWeight={400}>
                        We only onboard founders through our weekly Q&A.
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
        cardIcon: <AccountCircleIcon color="primary" sx={{ fontSize: '55px', color: blue[200] }} />,
        cardTitle: "Open",
        cardDetail: "Create a Qarrington account without your personal data such as email. It's 100% free."
    },
    {
        cardIcon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '55px', color: blue[800] }} />,
        cardTitle: "Connect",
        cardDetail: "Link your preferred physical or online bank account to your Qarrington account."
    },
    {
        cardIcon: <ArrowCircleRightRoundedIcon color="primary" sx={{ fontSize: '55px', color: blue[400] }} />,
        cardTitle: "Push",
        cardDetail: "Sell subscriptions to the subscribers that your company has whitelisted for its ISO."
    }
]