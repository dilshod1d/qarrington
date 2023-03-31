import React from 'react';
import Head from 'next/head';
import MainNavbar from '../../components/navbar/MainNavbar';
import MainLeftbar from '../../components/leftbar/MainLeftbar';
import MainRightbar from '../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../components/footer/DisclaimerFooter';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>About • Qarrington</title>
                <meta
                    name="description"
                    content="Qarrington is a subscription exchange, where everyone can buy, sell, & transfer the subscriptions of early-stage startup companies."
                />
            </Head>

            <MainNavbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainLeftbar />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                        Qarrington is a subscription exchange, where everyone can buy, sell, & transfer the subscriptions of early-stage startup companies.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {team && Array.isArray(team) && team.map(({ _id, name, isActive, avatar, content }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                <Card style={{ padding: '50px' }}>
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
                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                {content}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

                                <DisclaimerFooter />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <MainRightbar />
                    </Grid>

                </Grid>
            </Container>

        </div>

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