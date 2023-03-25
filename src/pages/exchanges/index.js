import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/topics/Navbar';
import Footer from '../../components/topics/Footer';
import { Avatar, Badge, Box, Card, Container, Divider, Grid, styled, Typography } from '@mui/material';

const Page = () => {

    return (

        <>

            <Head>
                <title>Exchanges • Qarrington</title>
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
                                    Get yourself familiar with Qarrington users.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    Early-stage startup companies of all types, sizes, and from all industries use Qarrington to raise funds by selling subscriptions to customers; the end users.
                                </Typography>
                            </Box>

                            {/* card starts */}

                            <Grid item xs={12} my={4}>
                                <Grid container spacing={1}>

                                    {users && users.map(({ _id, name, route, isActive, avatar, content }) => (
                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                            <Link href={`/exchanges/${route}`}>
                                                <Card style={{ padding: '60px', cursor: 'pointer' }}>
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
                                            </Link>
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

const users = [
    {
        _id: 1,
        name: "NYSE",
        route: "nyse",
        avatar: "/assets/media/users/aadit.webp",
        content: "Source, vet, and list early-stage startup companies looking forward to raising funds.",
        isActive: ""
    },
    {
        _id: 2,
        name: "NASDAQ",
        route: "nasdaq",
        avatar: "/assets/media/users/caroline.webp",
        content: "Raise capital through an Initial Subscription Offering (ISO) without equity dilution.",
        isActive: "dot"
    },
    {
        _id: 3,
        name: "BINANCE",
        route: "binance",
        avatar: "/assets/media/users/fernando.webp",
        content: "Buy, sell, and transfer subscriptions during & after an Initial Subscription Offering.",
        isActive: "dot"
    },
    {
        _id: 4,
        name: "Publisher",
        route: "publisher",
        avatar: "/assets/media/users/emma.webp",
        content: "Get & track the world's largest subscription data from a reliable subscription exchange.",
        isActive: ""
    }
]