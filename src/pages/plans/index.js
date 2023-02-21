import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Tooltip, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Plans • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees. Register without email!"
                />
            </Head>

            <HeaderMenu />

            <Container>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={9} mb={4}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>

                                {/* exchange plan starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '80px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                            usd
                                                        </Typography>
                                                        <Typography mt={0.8} mb={0.2} variant="h2" fontWeight={700} color="black">
                                                            00
                                                        </Typography>
                                                        <Tooltip title="If you currently don't have Qarrington subscriptions, you would have access to the features under this Standard Plan." placement="top">
                                                            <PlanBadge badgeContent="standard" color="secondary"></PlanBadge>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box mt={4}>
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            enjoy a 2.5% transaction fee
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            get access to limited subscriptions
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            receive bank transfers within 7 days
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '80px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                            usd
                                                        </Typography>
                                                        <Typography mt={0.8} mb={0.2} variant="h2" fontWeight={700} color="black">
                                                            25
                                                        </Typography>
                                                        <Tooltip title="If you have Qarrington subscriptions, each unit represents a month of access to the features under this Premium Plan." placement="top">
                                                            <PlanBadge badgeContent="premium" color="success"></PlanBadge>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box mt={4}>
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            enjoy a 0.5% transaction fee
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            get access to all subscriptions
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            receive payouts within 3 days
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* exchange plan ends */}

                                {/* block starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                                <Card style={{ padding: '60px' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                    We offer an array of innovative products. For example, the above pricing allows subscribers to buy and sell subscriptions, while the below plans allow companies to leverage our subscription data through REST API.
                                                    </Typography>
                                                </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* block ends */}

                                {/* request plan starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '80px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                            usd
                                                        </Typography>
                                                        <Typography mt={0.8} mb={0.2} variant="h2" fontWeight={700} color="black">
                                                           250
                                                        </Typography>
                                                        <Tooltip title="Access essential subscription data such as logo, name, ticker, description, industry, website, and historical prices." placement="top">
                                                            <PlanBadge badgeContent="essential" color="success"></PlanBadge>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box mt={4}>
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            request up to 10 subscription data
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            fetch up to 3 months of historical data
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            make up to 20k requests per month
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '80px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600} color="secondary" textTransform="uppercase">
                                                            usd
                                                        </Typography>
                                                        <Typography mt={0.8} mb={0.2} variant="h2" fontWeight={700} color="black">
                                                            750
                                                        </Typography>
                                                        <Tooltip title="Access enterprise data like historical point changes, percentage differences, volumes, and market capitalization." placement="top">
                                                            <PlanBadge badgeContent="enterprise" color="success"></PlanBadge>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box mt={4}>
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            request up to 20 subscription data
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            fetch up to 12 months of historical data
                                                        </Typography>
                                                        <Divider sx={{ my: 1 }} />
                                                        <Typography variant="body2" color="secondary" fontWeight={600}>
                                                            make up to 200k requests per month
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* request plan ends */}

                                <Footer />

                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <RightGrid />
                    </Grid>

                </Grid>

            </Container>

        </div>

    )
}

export default Page

const PlanBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: -8,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '14px 12px',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginTop: '12px',
        fontSize: '12px',
        cursor: 'pointer',
        '&.hover': {
            color: '#000'
        }
    },
}));

const CardTitle = {
    cursor: 'pointer',
    color: '#2ed573',
    '&:hover': {
        color: '#000000'
    }
};

const NewsTitle = {
    cursor: 'pointer',
    color: '#000000',
    '&:hover': {
        color: '#2ed573'
    }
};

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const help = [
    {
        _id: 1,
        name: "Alexa",
        email: "account@qarrington.com",
        avatar: "/assets/media/team/alexa.webp",
        content: "On Qarrington, we remain at your service for any future questions you might have with your Qarrington account in general."
    },
    {
        _id: 2,
        name: "Dwight",
        email: "business@qarrington.com",
        avatar: "/assets/media/team/dwight.webp",
        content: "If you have any further queries regarding how Qarrington works for businesses, kindly contact us through the below email."
    },
    {
        _id: 3,
        name: "Maria",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/maria.webp",
        content: "Should you need any further information on how Qarrington works for consumers, please get in touch with the below email."
    },
    {
        _id: 4,
        name: "Jenn",
        email: "platform@qarrington.com",
        avatar: "/assets/media/team/jenn.webp",
        content: "If we can be of any further assistance on how Qarrington works for platforms, kindly let us know via the below email."
    }
]