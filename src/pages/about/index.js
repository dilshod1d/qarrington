import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/topics/Navbar';
import Footer from '../../components/topics/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';

const Page = () => {

    return (

        <>

            <Head>
                <title>About • Qarrington</title>
                <meta
                    name="description"
                    content={`Buy, sell, & transfer the subscriptions of innovative startup companies. It's like buying cryptos, but instead of coins, it's product-backed subscriptions.`}
                />
            </Head>

            <Grid style={{ backgroundColor: '#fff' }}>

                <Navbar />

                <Container style={{ backgroundColor: '#fff' }}>
                    <Grid container spacing={2}>

                        <Grid item xs>
                            {/* <LeftSide /> */}
                        </Grid>

                        <Grid my={8} item xs={7}>

                            <Box style={{ padding: '0px 0px 0px 0px' }}>
                                <Typography variant="h1" fontWeight={700} color="black">
                                    Buy, sell, and transfer the subscriptions of startup companies.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    Qarrington is a subscription exchange, where everyone can buy, sell, and transfer the subscriptions of early-stage startup companies with lower fees.
                                </Typography>
                            </Box>

                            {/* card starts */}

                            <Grid item xs={12} my={4}>
                                <Grid container spacing={1}>

                                    {team && team.map(({ _id, name, isActive, avatar, content }) => (
                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <StyledBadge
                                                        overlap="circular"
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'right'
                                                        }}
                                                        variant={isActive}
                                                    >
                                                        <Avatar
                                                            style={{ width: 50, height: 50 }}
                                                            alt={name}
                                                            src={avatar}
                                                        />
                                                    </StyledBadge>
                                                </Box>
                                                <Box mt={2} style={{ textAlign: 'center' }}>
                                                    <Box mb={1}>
                                                        <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                            {name}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="body" fontWeight={600} color="secondary">
                                                            {content}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    ))}

                                </Grid>
                            </Grid>

                            {/* card ends */}

                            {/* footer starts */}

                            <Footer />

                            {/* footer ends */}

                        </Grid>

                        <Grid item xs>
                            {/* <RightSide /> */}
                        </Grid>

                    </Grid>
                </Container>
            </Grid >

        </>

    )
}

export default Page

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const team = [
    {
        _id: 1,
        name: "Jenn",
        email: "account@qarrington.com",
        avatar: "/assets/media/team/jenn.webp",
        content: "I joined Qarrington to help build the world's largest subscription models for startup companies.",
        isActive: "dot"
    },
    {
        _id: 2,
        name: "Banjo",
        email: "business@qarrington.com",
        avatar: "/assets/media/team/banjo.webp",
        content: "I created Qarrington with an unequivocal purpose, which is to become the Nasdaq for SaaS.",
        isActive: "dot"
    },
    {
        _id: 3,
        name: "Esra",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/esra.webp",
        content: "I joined Qarrington to support Banjo's vision to commoditize subscriptions for everyone.",
        isActive: ""
    },
    {
        _id: 4,
        name: "Dwight",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/dwight.webp",
        content: "I joined Qarrington to give more purchasing power to startups & their users during hard times.",
        isActive: ""
    },
    {
        _id: 5,
        name: "Maria",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/maria.webp",
        content: "I joined Qarrington to help startup companies raise capital that is equity and debt free.",
        isActive: ""
    },
    {
        _id: 6,
        name: "Alexa",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/alexa.webp",
        content: "I joined Qarrington to make subscription-based businesses more than subscriptions.",
        isActive: "dot"
    }
]