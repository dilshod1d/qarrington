import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../../components/topics/Navbar';
import Admin from '../../../components/topics/Admin';
import Company from '../../../components/topics/Company';
import Footer from '../../../components/topics/Footer';
import { blue } from '@mui/material/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { Box, Card, Container, Grid, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>Request • Qarrington</title>
                <meta
                    name="description"
                    content="hello"
                />
            </Head>

            <Navbar />

            <Container>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={3}>
                        <Admin />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6} mt={12} mb={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>

                                <Card style={{ padding: '60px', marginBottom: '10px' }}>
                                    <Typography variant="body" color="secondary" fontWeight={600}>
                                        To facilitate smooth payouts, it's important to keep your account details updated. Otherwise, your future payouts might be delayed.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Link href={`/account`}>
                                                    <Card style={{ padding: '40px', cursor: 'pointer' }}>
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

                                <Footer />

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Company />
                    </Grid>

                </Grid>
            </Container>

        </div>

    )
}

export default Page

const arrayItems = [
    {
        _id: 1,
        icon: <AccountCircleIcon color="primary" sx={{ fontSize: '40px', color: blue[200] }} />,
        title: "Open",
        detail: "Create an account, it's free.",
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
        icon: <ArrowCircleRightRoundedIcon color="primary" sx={{ fontSize: '40px', color: blue[400] }} />,
        title: "Push",
        detail: "Sell subscriptions to users.",
        tooltip: ""
    }
]