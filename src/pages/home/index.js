import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';

const Page = () => {

    return (

        <div>

            <Head>
                <title>About • Qarrington</title>
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

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box>
                                                    <Typography mb={1.2} variant="h3" fontWeight={700} color="black">
                                                        Qarrington is a subscription exchange that lets you buy and sell the subscriptions of your favorite technology companies with lower fees.
                                                    </Typography>
                                                    <Typography variant="body" fontWeight={600} color="secondary">
                                                    Unlike stocks and cryptos that are backed literally with nothing, your subscriptions with a Qarrington company are backed by the underlying products of the company. Technically, subscriptions only give you access to a company's products and services, they neither represent investment nor ownership stakes in the firm.
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>


                                {/* intro starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="mailto:careers@qarrington.com?subject=Becoming a Qarrington">
                                                <Card style={{ padding: '60px', color: 'white', backgroundColor: '#2f3542', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        If you are interestd in becoming a Qarrington, feel free to email us a brief about yourself.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Link href="/help">
                                                <Card style={{ padding: '60px', color: 'white', backgroundColor: '#2ed573', cursor: 'pointer' }}>
                                                    <Typography variant="body" fontWeight={600}>
                                                        If you really enjoy what we do at Qarrington but need more information, kindly email us.
                                                    </Typography>
                                                </Card>
                                            </Link>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* intro ends */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {help && help.map(({ _id, name, isActive, avatar, content }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
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
                                                    <Box style={{ textAlign: 'center' }}>
                                                        <Box mt={2}>
                                                            <Typography variant="h4" fontWeight={700} color="black">
                                                                {name}
                                                            </Typography>
                                                            <Typography mt={1} variant="body2" fontWeight={600} color="secondary">
                                                                {content}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Card>
                                            </Grid>
                                        ))}

                                    </Grid>
                                </Grid>

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

const CardTitle = {
    cursor: 'pointer',
    color: '#2ed573',
    '&:hover': {
        color: '#000000'
    }
};

const help = [
    {
        _id: 1,
        name: "Jenn",
        email: "account@qarrington.com",
        avatar: "/assets/media/team/jenn.webp",
        content: "I joined Qarrington to help build the world's largest subscription models.",
        isActive: "dot"
    },
    {
        _id: 2,
        name: "Banjo",
        email: "business@qarrington.com",
        avatar: "/assets/media/team/banjo.webp",
        content: "I created Qarrington with a single purpose; to become the Nasdaq for SaaS.",
        isActive: "dot"
    },
    {
        _id: 3,
        name: "Esra",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/esra.webp",
        content: "I joined Qarrington to support Banjo's vision to commoditize subscriptions.",
        isActive: ""
    },
    {
        _id: 4,
        name: "Dwight",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/dwight.webp",
        content: "I joined Qarrington to give more power to consumers during hard times.",
        isActive: ""
    },
    {
        _id: 5,
        name: "Maria",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/maria.webp",
        content: "I joined Qarrington to help businesses and consumers boost purchasing power.",
        isActive: ""
    },
    {
        _id: 6,
        name: "Alexa",
        email: "consumer@qarrington.com",
        avatar: "/assets/media/team/alexa.webp",
        content: "I joined Qarrington to make subscription businesses more than subscriptions.",
        isActive: "dot"
    }
]