import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { orange } from '@mui/material/colors';
import MainNavbar from '../../../components/navbar/MainNavbar';
import MainLeftbar from '../../../components/leftbar/MainLeftbar';
import MainRightbar from '../../../components/rightbar/MainRightbar';
import DisclaimerFooter from '../../../components/footer/DisclaimerFooter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { Box, Card, Container, Grid, Typography } from '@mui/material';

const Page = () => {

    return (

        <div>

            <Head>
                <title>How to Use Qarrington as a SaaS Subscriber • Qarrington</title>
                <meta
                    name="description"
                    content="A SaaS Subscriber is the individual or institutional customer of an early-stage startup company, where products are provided on a subscription basis."
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
                                        A SaaS Subscriber is an individual or institutional customer of a startup, where products are provided on a subscription basis.
                                    </Typography>
                                </Card>

                                <Grid item xs={12} my={0}>
                                    <Grid container spacing={1}>

                                        {arrayItems && arrayItems.map(({ _id, icon, title, detail, tooltip }) => (
                                            <Grid key={_id} item xs={12} sm={6} md={6} lg={4}>
                                                <Link href={`/qa`}>
                                                    <Card style={{ padding: '35px', cursor: 'pointer' }}>
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

const arrayItems = [
    {
        _id: 1,
        icon: <AccountCircleIcon color="primary" sx={{ fontSize: '40px', color: orange[200] }} />,
        title: "Open",
        detail: "Create a Qarrington account, it's free.",
        tooltip: ""
    },
    {
        _id: 2,
        icon: <AccountBalanceRoundedIcon color="primary" sx={{ fontSize: '40px', color: orange[800] }} />,
        title: "Connect",
        detail: "Link your preferred bank account.",
        tooltip: ""
    },
    {
        _id: 3,
        icon: <ArrowCircleLeftRoundedIcon color="primary" sx={{ fontSize: '40px', color: orange[400] }} />,
        title: "Pull",
        detail: "Buy subscriptions during/after an ISO.",
        tooltip: ""
    }
]