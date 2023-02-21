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
                    Opportunities • Qarrington
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
                                                            src="/assets/media/publishers/fox.png"
                                                        />
                                                    </Box>
                                                    <Link href="/challenges">
                                                        <Typography variant="h5" fontWeight={700} my={1.5} sx={NewsTitle}>
                                                            Inflation concerns hit a fever pitch for small business owners. Small business owners believe the 'worst is yet to come' on inflation.
                                                        </Typography>
                                                    </Link>
                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                        September 21, 2022
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
                                                            src="/assets/media/publishers/fortune.png"
                                                        />
                                                    </Box>
                                                    <Link href="/challenges">
                                                        <Typography variant="h5" fontWeight={700} my={1.5} sx={NewsTitle}>
                                                            U.K.’s inflation just hit a 40-year high, and the government warned that some may struggle to afford food and heating.
                                                        </Typography>
                                                    </Link>
                                                    <Typography variant="body2" fontWeight={600} color="secondary">
                                                        May 19, 2022
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* challenge ends */}

                                {/* user side starts */}

                                <Grid item xs={12} mb={2}>
                                    <Grid container spacing={2}>

                                        {/* company side starts */}

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
                                                        alt="Qarrington Use Cases"
                                                        src="/assets/media/opportunities/businesses.png"
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
                                                            companies
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                List, launch, and advance subscription products.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            As a technology company, you can use Qarrington to create, launch, and advance your subscription products to your customers.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* company side ends */}

                                        {/* subscriber side starts */}

                                        <Grid item xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ padding: '60px' }}>
                                                <Box>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={700} color="secondary" textTransform="uppercase">
                                                        subscribers
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                Buy, sell, and exchange your first subscriptions.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            As a online consumer, Qarrington is built with the purpose of allowing you to buy and sell the subscriptions of technology companies.
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
                                                        alt="Qarrington Use Cases"
                                                        src="/assets/media/opportunities/consumers.png"
                                                        height={282}
                                                        width={450}
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* subscriber side ends */}

                                        {/* platform side starts */}

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
                                                        alt="Qarrington Use Cases"
                                                        src="/assets/media/opportunities/platforms.png"
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
                                                            platforms
                                                        </Typography>
                                                        <Link href="/account/create">
                                                            <Typography variant="h4" fontWeight={700} my={1.2} sx={CardTitle}>
                                                                Fetch, integrate, and track timely subscription data.
                                                            </Typography>
                                                        </Link>
                                                        <Typography variant="body" fontWeight={500} color="secondary">
                                                            As a software platform, you can use Qarrington to seamlessly fetch, integrate, and track the world's largest subscription data.
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* platform side ends */}

                                    </Grid>
                                </Grid>

                                {/* user side ends */}

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