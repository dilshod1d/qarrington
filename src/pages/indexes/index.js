import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import Navbar from '../../components/topics/Navbar';
import Footer from '../../components/topics/Footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { Box, Card, Container, Divider, Grid, Typography } from '@mui/material';

const Page = () => {

    return (

        <>

            <Head>
                <title>How Subscriptions Can Outrun the 3 Major Stock Indexes • Qarrington</title>
                <meta
                    name="description"
                    content={`Buy & sell the subscriptions of innovative startups just like the S&P 500, DJIA, & Nasdaq Composite. But instead of shares, it's product-backed subscriptions.`}
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
                                    How subscriptions can outrun the 3 major stock indexes.
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Typography mt={1} variant="h5" fontWeight={500} color="secondary">
                                    Buy & sell the subscriptions of innovative startups just like the S&P 500, DJIA, & Nasdaq Composite. But instead of shares, it's product-backed subscriptions.
                                </Typography>
                            </Box>

                            {/* card starts */}

                            <Grid item xs={12} my={4}>
                                <Grid container spacing={1}>

                                    {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                        <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                            <Link href={`/account`}>
                                                <Card style={{ padding: '50px', cursor: 'pointer' }}>
                                                    <Box
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        {icon}
                                                    </Box>
                                                    <Box mt={1} style={{ textAlign: 'center' }}>
                                                        <Box mb={1}>
                                                            <Typography gutterBottom variant="h4" fontWeight={700} color="black">
                                                                {title}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="body2" fontWeight={600} color="secondary">
                                                                {detail}
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

const arrayItems = [
    {
        _id: 1,
        icon: <AccountCircleIcon color="primary" sx={{ fontSize: '40px', color: blue[200] }} />,
        title: "Open",
        detail: "Create a Qarrington account, it's free.",
        tooltip: ""
    },
    {
        _id: 2,
        icon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[800] }} />,
        title: "Connect",
        detail: "Link your preferred bank account.",
        tooltip: ""
    },
    {
        _id: 3,
        icon: <ArrowCircleLeftRoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[400] }} />,
        title: "Pull",
        detail: "Buy subscriptions during & after an ISO.",
        tooltip: ""
    }
]