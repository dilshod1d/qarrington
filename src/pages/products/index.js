import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HeaderMenu from '../../components/menus/HeaderMenu';
import RightGrid from '../../components/grids/RightGrid';
import { Avatar, Box, Card, Container, Grid, Typography } from '@mui/material';
import Footer from '../../components/main/Footer';
import Link from 'next/link';

const Page = () => {

    return (

        <div>

            <Head>
                <title>
                    Products • Qarrington
                </title>
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

                                {/* challenge starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Avatar
                                                            style={{ width: 50, height: 50 }}
                                                            alt="Why Qarrington"
                                                            src="/assets/media/publishers/cnbc.png"
                                                        />
                                                    </Box>
                                                    <Link href="/challenges">
                                                        <Typography variant="h5" fontWeight={700} my={1.5} sx={NewsTitle}>
                                                            Inflation in the eurozone is extremely high. Protestors in Italy used empty shopping trolleys to demonstrate high prices
                                                        </Typography>
                                                    </Link>
                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                        October 31, 2022
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box style={{ textAlign: 'center' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Avatar
                                                            style={{ width: 50, height: 50 }}
                                                            alt="Why Qarrington"
                                                            src="/assets/media/publishers/forbes.png"
                                                        />
                                                    </Box>
                                                    <Link href="/challenges">
                                                        <Typography variant="h5" fontWeight={700} my={1.5} sx={NewsTitle}>
                                                            The higher costs of doing business have been passed onto customers, leaving everyday Australians materially worse off.
                                                        </Typography>
                                                    </Link>
                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                        December 01, 2022
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* challenge ends */}

                                {/* product side starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {/* exchange side starts */}

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '0px' }}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Image
                                                        style={{ width: '100%', height: '100%' }}
                                                        alt="Buy, sell, and transfer your first subscriptions"
                                                        src="/assets/media/products/exchange.png"
                                                        height={282}
                                                        width={450}
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                            exchange
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                Buy, sell, and transfer your first subscriptions.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            Primarily, <b>Qarrington Exchange</b> allows businesses from any industry to list, buy, & sell subscriptions that are backed by products.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* exchange side ends */}

                                        {/* onboard side starts */}

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                            onboard
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                Give subscribers access to your scalable products.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            With <b>Qarrington Onboard</b>, listed companies will be able to grant product access to their subscribers 90 days after the listing.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '0px' }}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Image
                                                        style={{ width: '100%', height: '100%' }}
                                                        alt="Give subscribers access to your scalable products"
                                                        src="/assets/media/products/onboard.png"
                                                        height={282}
                                                        width={450}
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* onboard side ends */}

                                        {/* request side starts */}

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '0px' }}>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Image
                                                        style={{ width: '100%', height: '100%' }}
                                                        alt="Get reliable subscription data through REST API"
                                                        src="/assets/media/products/request.png"
                                                        height={282}
                                                        width={450}
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                            </Card>
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                            request
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                Get reliable subscription data through REST API.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            Technology companies of all types use <b>Qarrington Request</b> to get the most accurate, timely, and reliable subscription data.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* request side ends */}

                                    </Grid>
                                </Grid>

                                {/* product side ends */}

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