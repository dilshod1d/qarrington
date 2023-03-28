import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainNavbar from '../../components/navbar/MainNavbar';
import MainLeftbar from '../../components/leftbar/MainLeftbar';
import MainRightbar from '../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../components/footer/DisclaimerFooter';
import { Avatar, Badge, Box, Card, Container, Grid, styled, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Users • Qarrington</title>
                <meta
                    name="description"
                    content="Early-stage startup companies of all types, sizes, and industries use Qarrington to raise funds by selling subscriptions to the end users."
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
                                        Early-stage startup companies of all types, sizes, and industries use Qarrington to raise funds by selling subscriptions to the end users.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {users && users.map(({ _id, name, route, isActive, avatar, content }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={6}>
                                                <Link href={`/users/${route}`}>
                                                    <Card style={{ padding: '50px', cursor: 'pointer' }}>
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
                                                </Link>
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

const users = [
    {
        _id: 1,
        name: "Underwriters",
        route: "underwriters",
        avatar: "/assets/media/users/aadit.webp",
        content: "Source, vet, and list early-stage startup companies looking forward to raising funds.",
        isActive: ""
    },
    {
        _id: 2,
        name: "Founders",
        route: "founders",
        avatar: "/assets/media/users/caroline.webp",
        content: "Raise capital through an Initial Subscription Offering (ISO) without equity dilution.",
        isActive: "dot"
    },
    {
        _id: 3,
        name: "Subscribers",
        route: "subscribers",
        avatar: "/assets/media/users/fernando.webp",
        content: "Buy, sell, and transfer subscriptions during & after an Initial Subscription Offering.",
        isActive: "dot"
    },
    {
        _id: 4,
        name: "Publishers",
        route: "publishers",
        avatar: "/assets/media/users/emma.webp",
        content: "Get & track the world's largest subscription data from a reliable subscription exchange.",
        isActive: ""
    }
]